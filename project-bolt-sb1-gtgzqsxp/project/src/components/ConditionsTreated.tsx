import { AlertCircle, Zap, Activity, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';

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
  return (
    <section className="bg-gray-50 section-padding" aria-labelledby="conditions-heading">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 id="conditions-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            San Diego Physical Therapy 2025: All Joint Pain Conditions Treated
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our specialized San Diego physical therapy 2025 team treats ALL joint pain conditions - spine, hips, shoulders, knees - with advanced non-invasive methods. 1M+ patient encounters of proven experience.
          </p>
          
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 font-semibold">
              ✓ 90% of our patients avoid surgery completely
            </p>
            <p className="text-green-700 text-sm mt-1">
              Most conditions respond excellently to our non-invasive treatment protocols
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {conditions.map((category, categoryIndex) => {
            const Icon = category.icon;
            const colors = getColorClasses(category.color);
            
            return (
              <div key={categoryIndex} className={`${colors.bg} ${colors.border} border rounded-2xl p-8`}>
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg ${colors.icon} mr-4`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.conditions.map((condition, conditionIndex) => (
                    <div key={conditionIndex} className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{condition.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${colors.accent} bg-white font-medium`}>
                          {condition.severity}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{condition.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Treatment Success */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Don't See Your Condition Listed?
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                We treat many more conditions beyond what's listed here. Our comprehensive evaluation process allows us to create personalized treatment plans for virtually any musculoskeletal condition.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Comprehensive diagnostic evaluation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Personalized treatment protocols</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Evidence-based treatment approaches</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Ongoing progress monitoring</span>
                </div>
              </div>
              
              <button className="btn-primary flex items-center group">
                Schedule Free Assessment
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>
            
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Physical therapist conducting comprehensive patient assessment and treatment planning"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}