'use client';

import { useState } from 'react';
import { AlertCircle, Zap, Activity, Users, ChevronDown, ChevronUp } from 'lucide-react';

const conditions = [
  {
    category: "Spine Conditions",
    icon: AlertCircle,
    color: "blue",
    conditions: [
      { name: "Herniated Discs", severity: "Common", description: "Bulging or ruptured spinal discs causing nerve compression" },
      { name: "Sciatica", severity: "Painful", description: "Radiating pain from lower back down the leg" },
      { name: "Spinal Stenosis", severity: "Progressive", description: "Narrowing of spinal canal causing pressure on nerves" },
      { name: "Chronic Back Pain", severity: "Persistent", description: "Long-term pain affecting daily activities and quality of life" }
    ]
  },
  {
    category: "Neck & Cervical",
    icon: Zap,
    color: "green",
    conditions: [
      { name: "Whiplash", severity: "Acute", description: "Neck injury from rapid back-and-forth movement" },
      { name: "Cervical Radiculopathy", severity: "Radiating", description: "Pinched nerve in neck causing arm pain and numbness" },
      { name: "Tech Neck", severity: "Modern", description: "Forward head posture from prolonged screen use" },
      { name: "Chronic Neck Pain", severity: "Persistent", description: "Ongoing neck discomfort limiting range of motion" }
    ]
  },
  {
    category: "Joint & Mobility",
    icon: Activity,
    color: "purple",
    conditions: [
      { name: "Shoulder Impingement", severity: "Limiting", description: "Restricted shoulder movement causing pain and weakness" },
      { name: "Hip Arthritis", severity: "Degenerative", description: "Joint cartilage breakdown causing stiffness and pain" },
      { name: "Knee Pain", severity: "Variable", description: "Various knee conditions affecting mobility and function" },
      { name: "Joint Stiffness", severity: "Restricting", description: "Reduced range of motion in major joints" }
    ]
  },
  {
    category: "Sports & Activity",
    icon: Users,
    color: "orange",
    conditions: [
      { name: "Sports Injuries", severity: "Acute", description: "Activity-related injuries requiring specialized rehabilitation" },
      { name: "Overuse Injuries", severity: "Gradual", description: "Repetitive stress injuries from training or work activities" },
      { name: "Post-Surgery Recovery", severity: "Rehabilitative", description: "Recovery and strengthening after orthopedic procedures" },
      { name: "Performance Optimization", severity: "Preventive", description: "Injury prevention and performance enhancement for athletes" }
    ]
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: { bg: "bg-blue-50", icon: "bg-blue-100 text-blue-600", accent: "text-blue-600", border: "border-blue-200" },
    green: { bg: "bg-green-50", icon: "bg-green-100 text-green-600", accent: "text-green-600", border: "border-green-200" },
    purple: { bg: "bg-purple-50", icon: "bg-purple-100 text-purple-600", accent: "text-purple-600", border: "border-purple-200" },
    orange: { bg: "bg-orange-50", icon: "bg-orange-100 text-orange-600", accent: "text-orange-600", border: "border-orange-200" }
  };
  return colors[color as keyof typeof colors];
};

export default function ConditionsTreated() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <section className="bg-gray-50 section-padding" aria-labelledby="conditions-heading">
      <div className="container-max">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="conditions-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            San Diego Physical Therapy 2025: All Joint Pain Conditions Treated
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
            Our specialized San Diego physical therapy 2025 team treats ALL joint pain conditions - spine, hips, shoulders, knees - with advanced non-invasive methods. 1M+ patient encounters of proven experience.
          </p>
          
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 font-semibold text-sm sm:text-base">
              ✓ 90% of our patients avoid surgery completely
            </p>
            <p className="text-green-700 text-xs sm:text-sm mt-1">
              Most conditions respond excellently to our non-invasive treatment protocols
            </p>
          </div>
        </div>

        {/* Mobile-first accordion design, desktop grid */}
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 mb-12 sm:mb-16">
          {conditions.map((category, categoryIndex) => {
            const Icon = category.icon;
            const colors = getColorClasses(category.color);
            const isExpanded = expandedCards.has(categoryIndex);
            
            return (
              <div key={categoryIndex} className={`${colors.bg} ${colors.border} border rounded-2xl overflow-hidden`}>
                {/* Header - always visible, clickable on mobile */}
                <button
                  className="w-full p-4 sm:p-6 lg:p-8 text-left lg:cursor-default"
                  onClick={() => toggleCard(categoryIndex)}
                  aria-expanded={isExpanded}
                  aria-controls={`category-${categoryIndex}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 sm:p-3 rounded-lg ${colors.icon} mr-3 sm:mr-4 flex-shrink-0`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{category.category}</h3>
                    </div>
                    <div className="lg:hidden">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Content - collapsible on mobile, always expanded on desktop */}
                <div 
                  id={`category-${categoryIndex}`}
                  className={`
                    px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 
                    lg:block ${isExpanded ? 'block' : 'hidden'}
                  `}
                >
                  <div className="space-y-3 sm:space-y-4">
                    {category.conditions.map((condition, conditionIndex) => (
                      <div key={conditionIndex} className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base pr-2">{condition.name}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${colors.accent} bg-white font-medium flex-shrink-0`}>
                            {condition.severity}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{condition.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}