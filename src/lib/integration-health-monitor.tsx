/**
 * Integration Health Monitor and Fallback System
 * Monitors third-party service health and provides graceful fallbacks
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Service status enumeration
export enum ServiceStatus {
  HEALTHY = 'healthy',
  DEGRADED = 'degraded',
  UNHEALTHY = 'unhealthy',
  UNKNOWN = 'unknown',
  MAINTENANCE = 'maintenance'
}

// Service configuration interface
interface ServiceConfig {
  name: string;
  displayName: string;
  healthCheckUrl?: string;
  healthCheckMethod?: 'GET' | 'POST' | 'HEAD';
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  checkInterval?: number;
  criticalityLevel: 'critical' | 'important' | 'optional';
  fallbackEnabled: boolean;
  mockDataAvailable: boolean;
}

// Service health data
interface ServiceHealth {
  status: ServiceStatus;
  lastChecked: Date;
  responseTime?: number;
  errorMessage?: string;
  consecutiveFailures: number;
  uptime: number;
  totalRequests: number;
  failedRequests: number;
  averageResponseTime: number;
}

// Health check result
interface HealthCheckResult {
  status: ServiceStatus;
  responseTime: number;
  error?: string;
  details?: Record<string, any>;
}

// Integration monitoring context interface
interface IntegrationMonitorContextType {
  services: Map<string, ServiceHealth>;
  isServiceHealthy: (serviceName: string) => boolean;
  getServiceStatus: (serviceName: string) => ServiceStatus;
  getServiceHealth: (serviceName: string) => ServiceHealth | null;
  checkServiceHealth: (serviceName: string) => Promise<HealthCheckResult>;
  enableFallback: (serviceName: string) => void;
  disableFallback: (serviceName: string) => void;
  getOverallHealth: () => { healthy: number; total: number; critical: string[] };
}

// Service configurations
const serviceConfigs: Record<string, ServiceConfig> = {
  calendly: {
    name: 'calendly',
    displayName: 'Calendly Scheduling',
    healthCheckUrl: 'https://calendly.com/api/health',
    timeout: 5000,
    retryAttempts: 2,
    checkInterval: 2 * 60 * 1000, // 2 minutes
    criticalityLevel: 'important',
    fallbackEnabled: true,
    mockDataAvailable: true
  },
  
  googleMaps: {
    name: 'googleMaps',
    displayName: 'Google Maps',
    healthCheckUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 
      ? `https://maps.googleapis.com/maps/api/geocode/json?address=test&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      : undefined,
    timeout: 8000,
    retryAttempts: 3,
    checkInterval: 5 * 60 * 1000, // 5 minutes
    criticalityLevel: 'important',
    fallbackEnabled: true,
    mockDataAvailable: true
  },
  
  supabase: {
    name: 'supabase',
    displayName: 'Supabase Database',
    healthCheckUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`
      : undefined,
    healthCheckMethod: 'HEAD',
    timeout: 3000,
    retryAttempts: 2,
    checkInterval: 1 * 60 * 1000, // 1 minute
    criticalityLevel: 'critical',
    fallbackEnabled: true,
    mockDataAvailable: true
  },
  
  vapiAI: {
    name: 'vapiAI',
    displayName: 'Vapi AI Assistant',
    healthCheckUrl: 'https://api.vapi.ai/health',
    timeout: 6000,
    retryAttempts: 2,
    checkInterval: 3 * 60 * 1000, // 3 minutes
    criticalityLevel: 'optional',
    fallbackEnabled: true,
    mockDataAvailable: false
  }
};

// Health monitor class
class IntegrationHealthMonitor {
  private services = new Map<string, ServiceHealth>();
  private checkIntervals = new Map<string, NodeJS.Timeout>();
  private fallbackEnabled = new Map<string, boolean>();
  private listeners: Array<(services: Map<string, ServiceHealth>) => void> = [];

  constructor() {
    this.initializeServices();
    this.startHealthChecks();
  }

  private initializeServices(): void {
    Object.values(serviceConfigs).forEach(config => {
      this.services.set(config.name, {
        status: ServiceStatus.UNKNOWN,
        lastChecked: new Date(),
        consecutiveFailures: 0,
        uptime: 100,
        totalRequests: 0,
        failedRequests: 0,
        averageResponseTime: 0
      });
      
      this.fallbackEnabled.set(config.name, config.fallbackEnabled);
    });
  }

  private startHealthChecks(): void {
    Object.values(serviceConfigs).forEach(config => {
      // Initial health check
      this.performHealthCheck(config.name);
      
      // Set up periodic checks
      const interval = setInterval(() => {
        this.performHealthCheck(config.name);
      }, config.checkInterval);
      
      this.checkIntervals.set(config.name, interval);
    });
  }

  private async performHealthCheck(serviceName: string): Promise<HealthCheckResult> {
    const config = serviceConfigs[serviceName];
    const service = this.services.get(serviceName);
    
    if (!config || !service) {
      throw new Error(`Service ${serviceName} not configured`);
    }

    const startTime = performance.now();
    let result: HealthCheckResult;

    try {
      if (!config.healthCheckUrl) {
        // No health check URL configured, assume healthy if no errors reported
        result = {
          status: ServiceStatus.HEALTHY,
          responseTime: 0,
          details: { reason: 'No health check configured' }
        };
      } else {
        result = await this.executeHealthCheck(config);
      }

      // Update success metrics
      service.consecutiveFailures = 0;
      service.totalRequests++;
      service.responseTime = result.responseTime;
      service.averageResponseTime = this.calculateAverageResponseTime(service, result.responseTime);
      
    } catch (error) {
      // Update failure metrics
      service.consecutiveFailures++;
      service.totalRequests++;
      service.failedRequests++;
      
      result = {
        status: this.determineStatusFromFailures(service.consecutiveFailures),
        responseTime: performance.now() - startTime,
        error: (error as Error).message
      };
    }

    // Update service health
    service.status = result.status;
    service.lastChecked = new Date();
    service.responseTime = result.responseTime;
    service.errorMessage = result.error;
    service.uptime = this.calculateUptime(service);

    // Notify listeners
    this.notifyListeners();

    // Log health status changes
    if (result.status !== ServiceStatus.HEALTHY) {
      console.warn(`Service ${config.displayName} health check failed:`, result);
    } else {
      console.log(`Service ${config.displayName} health check passed (${Math.round(result.responseTime)}ms)`);
    }

    return result;
  }

  private async executeHealthCheck(config: ServiceConfig): Promise<HealthCheckResult> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      const startTime = performance.now();
      
      const response = await fetch(config.healthCheckUrl!, {
        method: config.healthCheckMethod || 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'SpineZone-HealthCheck/1.0'
        }
      });

      const responseTime = performance.now() - startTime;
      clearTimeout(timeoutId);

      let status: ServiceStatus;
      if (response.ok) {
        status = ServiceStatus.HEALTHY;
      } else if (response.status >= 500) {
        status = ServiceStatus.UNHEALTHY;
      } else {
        status = ServiceStatus.DEGRADED;
      }

      return {
        status,
        responseTime,
        details: {
          httpStatus: response.status,
          statusText: response.statusText
        }
      };

    } catch (error) {
      clearTimeout(timeoutId);
      
      if ((error as Error).name === 'AbortError') {
        throw new Error('Health check timeout');
      }
      
      throw error;
    }
  }

  private determineStatusFromFailures(consecutiveFailures: number): ServiceStatus {
    if (consecutiveFailures >= 3) return ServiceStatus.UNHEALTHY;
    if (consecutiveFailures >= 2) return ServiceStatus.DEGRADED;
    return ServiceStatus.HEALTHY;
  }

  private calculateAverageResponseTime(service: ServiceHealth, newResponseTime: number): number {
    const totalTime = (service.averageResponseTime * (service.totalRequests - 1)) + newResponseTime;
    return totalTime / service.totalRequests;
  }

  private calculateUptime(service: ServiceHealth): number {
    if (service.totalRequests === 0) return 100;
    return ((service.totalRequests - service.failedRequests) / service.totalRequests) * 100;
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(new Map(this.services)));
  }

  // Public methods
  public subscribe(listener: (services: Map<string, ServiceHealth>) => void): () => void {
    this.listeners.push(listener);
    
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public isServiceHealthy(serviceName: string): boolean {
    const service = this.services.get(serviceName);
    return service?.status === ServiceStatus.HEALTHY;
  }

  public shouldUseFallback(serviceName: string): boolean {
    const service = this.services.get(serviceName);
    const fallbackEnabled = this.fallbackEnabled.get(serviceName);
    
    return !!(fallbackEnabled && service && 
      (service.status === ServiceStatus.UNHEALTHY || 
       service.status === ServiceStatus.UNKNOWN));
  }

  public getServiceStatus(serviceName: string): ServiceStatus {
    return this.services.get(serviceName)?.status || ServiceStatus.UNKNOWN;
  }

  public getServiceHealth(serviceName: string): ServiceHealth | null {
    return this.services.get(serviceName) || null;
  }

  public async checkServiceHealth(serviceName: string): Promise<HealthCheckResult> {
    return this.performHealthCheck(serviceName);
  }

  public enableFallback(serviceName: string): void {
    this.fallbackEnabled.set(serviceName, true);
  }

  public disableFallback(serviceName: string): void {
    this.fallbackEnabled.set(serviceName, false);
  }

  public getOverallHealth(): { healthy: number; total: number; critical: string[] } {
    const critical: string[] = [];
    let healthy = 0;
    let total = 0;

    this.services.forEach((health, serviceName) => {
      const config = serviceConfigs[serviceName];
      total++;
      
      if (health.status === ServiceStatus.HEALTHY) {
        healthy++;
      } else if (config?.criticalityLevel === 'critical') {
        critical.push(config.displayName);
      }
    });

    return { healthy, total, critical };
  }

  public destroy(): void {
    this.checkIntervals.forEach(interval => clearInterval(interval));
    this.checkIntervals.clear();
    this.listeners = [];
  }
}

// Singleton instance
const healthMonitor = new IntegrationHealthMonitor();

// React context for integration monitoring
const IntegrationMonitorContext = createContext<IntegrationMonitorContextType | null>(null);

// Provider component
export const IntegrationMonitorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Map<string, ServiceHealth>>(new Map());

  useEffect(() => {
    const unsubscribe = healthMonitor.subscribe(setServices);
    return unsubscribe;
  }, []);

  const contextValue: IntegrationMonitorContextType = {
    services,
    isServiceHealthy: healthMonitor.isServiceHealthy.bind(healthMonitor),
    getServiceStatus: healthMonitor.getServiceStatus.bind(healthMonitor),
    getServiceHealth: healthMonitor.getServiceHealth.bind(healthMonitor),
    checkServiceHealth: healthMonitor.checkServiceHealth.bind(healthMonitor),
    enableFallback: healthMonitor.enableFallback.bind(healthMonitor),
    disableFallback: healthMonitor.disableFallback.bind(healthMonitor),
    getOverallHealth: healthMonitor.getOverallHealth.bind(healthMonitor)
  };

  return (
    <IntegrationMonitorContext.Provider value={contextValue}>
      {children}
    </IntegrationMonitorContext.Provider>
  );
};

// Hook for using integration monitor
export const useIntegrationMonitor = (): IntegrationMonitorContextType => {
  const context = useContext(IntegrationMonitorContext);
  if (!context) {
    throw new Error('useIntegrationMonitor must be used within IntegrationMonitorProvider');
  }
  return context;
};

// Service-specific hooks
export const useServiceHealth = (serviceName: string) => {
  const monitor = useIntegrationMonitor();
  const [health, setHealth] = useState<ServiceHealth | null>(null);

  useEffect(() => {
    const updateHealth = () => {
      setHealth(monitor.getServiceHealth(serviceName));
    };

    updateHealth();
    const unsubscribe = healthMonitor.subscribe(updateHealth);
    
    return unsubscribe;
  }, [serviceName, monitor]);

  return {
    health,
    isHealthy: monitor.isServiceHealthy(serviceName),
    shouldUseFallback: healthMonitor.shouldUseFallback(serviceName),
    status: monitor.getServiceStatus(serviceName)
  };
};

// Utility functions for fallback decisions
const integrationUtils = {
  // Check if service should use fallback
  shouldUseFallback: (serviceName: string): boolean => {
    return healthMonitor.shouldUseFallback(serviceName);
  },

  // Get service display name
  getServiceDisplayName: (serviceName: string): string => {
    return serviceConfigs[serviceName]?.displayName || serviceName;
  },

  // Check if mock data is available
  hasMockData: (serviceName: string): boolean => {
    return serviceConfigs[serviceName]?.mockDataAvailable || false;
  },

  // Get service criticality
  getServiceCriticality: (serviceName: string): string => {
    return serviceConfigs[serviceName]?.criticalityLevel || 'optional';
  },

  // Force health check
  forceHealthCheck: async (serviceName: string): Promise<HealthCheckResult> => {
    return healthMonitor.checkServiceHealth(serviceName);
  },

  // Get all service configurations
  getAllServiceConfigs: (): Record<string, ServiceConfig> => {
    return { ...serviceConfigs };
  }
};

// Status badge component
export const ServiceStatusBadge: React.FC<{ serviceName: string; showDetails?: boolean }> = ({ 
  serviceName, 
  showDetails = false 
}) => {
  const { health, status } = useServiceHealth(serviceName);
  const config = serviceConfigs[serviceName];

  if (!config) return null;

  const getStatusColor = (status: ServiceStatus): string => {
    switch (status) {
      case ServiceStatus.HEALTHY: return 'bg-green-100 text-green-800';
      case ServiceStatus.DEGRADED: return 'bg-yellow-100 text-yellow-800';
      case ServiceStatus.UNHEALTHY: return 'bg-red-100 text-red-800';
      case ServiceStatus.MAINTENANCE: return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      <div className={`w-2 h-2 rounded-full mr-1.5 ${
        status === ServiceStatus.HEALTHY ? 'bg-green-400' :
        status === ServiceStatus.DEGRADED ? 'bg-yellow-400' :
        status === ServiceStatus.UNHEALTHY ? 'bg-red-400' : 'bg-gray-400'
      }`} />
      {config.displayName}
      {showDetails && health && (
        <span className="ml-2 text-xs opacity-75">
          {health.responseTime ? `${Math.round(health.responseTime)}ms` : ''}
        </span>
      )}
    </div>
  );
};

// System health dashboard component
export const SystemHealthDashboard: React.FC = () => {
  const monitor = useIntegrationMonitor();
  const [overallHealth, setOverallHealth] = useState({ healthy: 0, total: 0, critical: [] as string[] });

  useEffect(() => {
    const updateOverallHealth = () => {
      setOverallHealth(monitor.getOverallHealth());
    };

    updateOverallHealth();
    const unsubscribe = healthMonitor.subscribe(updateOverallHealth);
    
    return unsubscribe;
  }, [monitor]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.values(serviceConfigs).map(config => (
          <div key={config.name} className="border rounded-lg p-3">
            <ServiceStatusBadge serviceName={config.name} showDetails />
            <div className="mt-2 text-xs text-gray-500">
              Criticality: {config.criticalityLevel}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-900">
              Overall Health: {overallHealth.healthy}/{overallHealth.total} services healthy
            </span>
            {overallHealth.critical.length > 0 && (
              <div className="text-sm text-red-600 mt-1">
                Critical services down: {overallHealth.critical.join(', ')}
              </div>
            )}
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            overallHealth.critical.length === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {overallHealth.critical.length === 0 ? 'All Systems Operational' : 'Service Degradation'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Development utilities
if (process.env.NODE_ENV === 'development') {
  (window as any).integrationHealthDebug = {
    monitor: healthMonitor,
    utils: integrationUtils,
    configs: serviceConfigs,
    checkAll: () => {
      Object.keys(serviceConfigs).forEach(serviceName => {
        healthMonitor.checkServiceHealth(serviceName);
      });
    },
    getStatus: () => {
      const status: Record<string, any> = {};
      Object.keys(serviceConfigs).forEach(serviceName => {
        const health = healthMonitor.getServiceHealth(serviceName);
        if (health) {
          status[serviceName] = health;
        }
      });
      return status;
    }
  };
}

// Export types and utilities
export { type ServiceConfig, type ServiceHealth, type HealthCheckResult };
export { healthMonitor, integrationUtils };
export default IntegrationHealthMonitor;