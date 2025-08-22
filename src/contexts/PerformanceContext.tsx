'use client';

import React, { createContext, useContext, useReducer, useCallback, useMemo, ReactNode } from 'react';

// Performance state interface
interface PerformanceState {
  isHydrated: boolean;
  criticalResourcesLoaded: boolean;
  webVitals: {
    lcp: number | null;
    fid: number | null;
    cls: number | null;
  };
  componentRenderCounts: Record<string, number>;
  intersectionTargets: Set<string>;
}

// Action types for performance optimization
type PerformanceAction =
  | { type: 'SET_HYDRATED'; payload: boolean }
  | { type: 'SET_CRITICAL_RESOURCES_LOADED'; payload: boolean }
  | { type: 'UPDATE_WEB_VITALS'; payload: Partial<PerformanceState['webVitals']> }
  | { type: 'INCREMENT_RENDER_COUNT'; payload: string }
  | { type: 'ADD_INTERSECTION_TARGET'; payload: string }
  | { type: 'REMOVE_INTERSECTION_TARGET'; payload: string };

// Initial state
const initialState: PerformanceState = {
  isHydrated: false,
  criticalResourcesLoaded: false,
  webVitals: {
    lcp: null,
    fid: null,
    cls: null,
  },
  componentRenderCounts: {},
  intersectionTargets: new Set(),
};

// Performance reducer with optimized state updates
function performanceReducer(state: PerformanceState, action: PerformanceAction): PerformanceState {
  switch (action.type) {
    case 'SET_HYDRATED':
      if (state.isHydrated === action.payload) return state;
      return { ...state, isHydrated: action.payload };

    case 'SET_CRITICAL_RESOURCES_LOADED':
      if (state.criticalResourcesLoaded === action.payload) return state;
      return { ...state, criticalResourcesLoaded: action.payload };

    case 'UPDATE_WEB_VITALS':
      const newWebVitals = { ...state.webVitals, ...action.payload };
      if (JSON.stringify(newWebVitals) === JSON.stringify(state.webVitals)) return state;
      return { ...state, webVitals: newWebVitals };

    case 'INCREMENT_RENDER_COUNT':
      const currentCount = state.componentRenderCounts[action.payload] || 0;
      return {
        ...state,
        componentRenderCounts: {
          ...state.componentRenderCounts,
          [action.payload]: currentCount + 1,
        },
      };

    case 'ADD_INTERSECTION_TARGET':
      if (state.intersectionTargets.has(action.payload)) return state;
      const newTargetsAdd = new Set(state.intersectionTargets);
      newTargetsAdd.add(action.payload);
      return { ...state, intersectionTargets: newTargetsAdd };

    case 'REMOVE_INTERSECTION_TARGET':
      if (!state.intersectionTargets.has(action.payload)) return state;
      const newTargetsRemove = new Set(state.intersectionTargets);
      newTargetsRemove.delete(action.payload);
      return { ...state, intersectionTargets: newTargetsRemove };

    default:
      return state;
  }
}

// Context interface
interface PerformanceContextType {
  state: PerformanceState;
  setHydrated: (hydrated: boolean) => void;
  setCriticalResourcesLoaded: (loaded: boolean) => void;
  updateWebVitals: (vitals: Partial<PerformanceState['webVitals']>) => void;
  incrementRenderCount: (componentName: string) => void;
  addIntersectionTarget: (targetId: string) => void;
  removeIntersectionTarget: (targetId: string) => void;
  getOptimizedClassName: (baseClassName: string, componentName: string) => string;
}

// Create context
const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

// Provider props
interface PerformanceProviderProps {
  children: ReactNode;
}

// Performance provider with memoized values
export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const [state, dispatch] = useReducer(performanceReducer, initialState);

  // Memoized action creators to prevent unnecessary re-renders
  const setHydrated = useCallback((hydrated: boolean) => {
    dispatch({ type: 'SET_HYDRATED', payload: hydrated });
  }, []);

  const setCriticalResourcesLoaded = useCallback((loaded: boolean) => {
    dispatch({ type: 'SET_CRITICAL_RESOURCES_LOADED', payload: loaded });
  }, []);

  const updateWebVitals = useCallback((vitals: Partial<PerformanceState['webVitals']>) => {
    dispatch({ type: 'UPDATE_WEB_VITALS', payload: vitals });
  }, []);

  const incrementRenderCount = useCallback((componentName: string) => {
    if (process.env.NODE_ENV === 'development') {
      dispatch({ type: 'INCREMENT_RENDER_COUNT', payload: componentName });
    }
  }, []);

  const addIntersectionTarget = useCallback((targetId: string) => {
    dispatch({ type: 'ADD_INTERSECTION_TARGET', payload: targetId });
  }, []);

  const removeIntersectionTarget = useCallback((targetId: string) => {
    dispatch({ type: 'REMOVE_INTERSECTION_TARGET', payload: targetId });
  }, []);

  // Optimized className generator for performance-aware styling
  const getOptimizedClassName = useCallback((baseClassName: string, componentName: string): string => {
    const renderCount = state.componentRenderCounts[componentName] || 0;
    const isFrequentlyRendered = renderCount > 10;
    
    let optimizedClassName = baseClassName;
    
    // Add GPU acceleration for frequently rendered components
    if (isFrequentlyRendered) {
      optimizedClassName += ' gpu-accelerated';
    }
    
    // Add containment for critical components
    if (state.criticalResourcesLoaded) {
      optimizedClassName += ' contain-layout-style';
    }
    
    return optimizedClassName;
  }, [state.componentRenderCounts, state.criticalResourcesLoaded]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo((): PerformanceContextType => ({
    state,
    setHydrated,
    setCriticalResourcesLoaded,
    updateWebVitals,
    incrementRenderCount,
    addIntersectionTarget,
    removeIntersectionTarget,
    getOptimizedClassName,
  }), [
    state,
    setHydrated,
    setCriticalResourcesLoaded,
    updateWebVitals,
    incrementRenderCount,
    addIntersectionTarget,
    removeIntersectionTarget,
    getOptimizedClassName,
  ]);

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}

// Custom hook for using performance context
export function usePerformance(): PerformanceContextType {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}

// Hook for tracking component renders in development
export function useRenderTracking(componentName: string) {
  const { incrementRenderCount } = usePerformance();
  
  React.useEffect(() => {
    incrementRenderCount(componentName);
  });
}

// Hook for optimized intersection observer management
export function useOptimizedIntersection(targetId: string) {
  const { addIntersectionTarget, removeIntersectionTarget, state } = usePerformance();
  
  React.useEffect(() => {
    addIntersectionTarget(targetId);
    return () => removeIntersectionTarget(targetId);
  }, [targetId, addIntersectionTarget, removeIntersectionTarget]);
  
  return {
    isTargetActive: state.intersectionTargets.has(targetId),
    activeTargetCount: state.intersectionTargets.size,
  };
}

// Hook for performance-aware CSS classes
export function useOptimizedStyles(baseClassName: string, componentName: string): string {
  const { getOptimizedClassName } = usePerformance();
  
  return useMemo(() => 
    getOptimizedClassName(baseClassName, componentName), 
    [baseClassName, componentName, getOptimizedClassName]
  );
}