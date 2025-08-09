import { Shield, CheckCircle, CreditCard, Phone, Clock, Users, AlertCircle } from 'lucide-react';

const insuranceProviders = [
  { name: 'Blue Cross Blue Shield', category: 'Major Insurer', coverage: '90%' },
  { name: 'Aetna', category: 'Major Insurer', coverage: '90%' },
  { name: 'Cigna', category: 'Major Insurer', coverage: '85%' },
  { name: 'UnitedHealth', category: 'Major Insurer', coverage: '85%' },
  { name: 'Kaiser Permanente', category: 'HMO', coverage: '95%' },
  { name: 'Anthem', category: 'Major Insurer', coverage: '85%' },
  { name: 'Humana', category: 'Medicare Advantage', coverage: '90%' },
  { name: 'Medicare', category: 'Government', coverage: '80%' },
  { name: 'Medicaid', category: 'Government', coverage: '75%' },
  { name: 'Tricare', category: 'Military', coverage: '100%' },
  { name: 'Workers\' Compensation', category: 'Injury Claims', coverage: '100%' },
  { name: 'Auto Insurance Claims', category: 'Accident Claims', coverage: '100%' }
];

const paymentOptions = [
  {
    title: 'Insurance Coverage',
    description: 'We handle all insurance verification and billing',
    features: [
      'Direct billing to insurance',
      'Pre-authorization assistance', 
      'Claims processing support',
      'Coverage verification'
    ],
    icon: Shield
  },
  {
    title: 'Flexible Payment Plans',
    description: 'Affordable payment options for all patients',
    features: [
      'Interest-free payment plans',
      '0% financing available',
      'Extended payment terms',
      'Automatic payment setup'
    ],
    icon: CreditCard
  },
  {
    title: 'Special Programs',
    description: 'Additional coverage options and discounts',
    features: [
      'Veterans benefits accepted',
      'Student discounts available',
      'Family package pricing',
      'Senior citizen discounts'
    ],
    icon: Users
  }
];

const costBreakdown = [
  {
    service: 'Initial Evaluation',
    insurancePrice: '$15-50',
    selfPayPrice: '$185',
    description: 'Comprehensive assessment and treatment plan'
  },
  {
    service: 'Physical Therapy Session',
    insurancePrice: '$20-40',
    selfPayPrice: '$135',
    description: 'One-on-one treatment session (60 minutes)'
  },
  {
    service: 'Specialized Treatment',
    insurancePrice: '$25-45',
    selfPayPrice: '$165',
    description: 'Advanced techniques like dry needling'
  },
  {
    service: 'Group Exercise Class',
    insurancePrice: '$10-25',
    selfPayPrice: '$75',
    description: 'Therapeutic exercise group session'
  }
];

export default function InsurancePayment() {
  return (
    <section className="bg-gray-50 section-padding" aria-labelledby="insurance-heading">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 id="insurance-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            San Diego Physical Therapy Insurance 2025 | Healthcare Financing Options
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            SpineZone works with virtually all major insurance providers serving San Diego and offers comprehensive payment plans to ensure your physical therapy treatment for back pain, neck pain, hip pain, shoulder pain, and knee pain is affordable and accessible. We handle all insurance verification and billing for seamless care.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full">✓ 98% Insurance Acceptance Rate</div>
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full">✓ Direct Insurance Billing</div>
            <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full">✓ 0% Financing Available</div>
          </div>
        </div>

        {/* Quick Benefits */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-green-100 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="font-bold text-green-800 mb-2">98% Insurance Acceptance</h3>
            <p className="text-green-700 text-sm">We work with virtually all insurance providers</p>
          </div>
          <div className="bg-blue-100 border border-blue-200 rounded-xl p-6 text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="font-bold text-blue-800 mb-2">No Referral Required</h3>
            <p className="text-blue-700 text-sm">Direct access to physical therapy services</p>
          </div>
          <div className="bg-orange-100 border border-orange-200 rounded-xl p-6 text-center">
            <CreditCard className="w-12 h-12 text-orange-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="font-bold text-orange-800 mb-2">0% Financing Available</h3>
            <p className="text-orange-700 text-sm">Interest-free payment plans available</p>
          </div>
        </div>

        {/* Insurance Providers */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Accepted Insurance Providers
            </h3>
            <p className="text-lg text-gray-600">
              We work with most major insurance plans. Don't see yours? Contact us to verify coverage.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {insuranceProviders.map((provider, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm">{provider.name}</div>
                  <div className="text-xs text-gray-600">{provider.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">{provider.coverage}</div>
                  <div className="text-xs text-gray-500">Coverage</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Don't See Your Insurance?</h4>
                <p className="text-blue-700 mb-3">
                  We may still be able to help with out-of-network benefits or payment plans. Many plans offer partial reimbursement for out-of-network providers.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                  Verify Your Coverage
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {paymentOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{option.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{option.description}</p>
                
                <ul className="space-y-3">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h3>
            <p className="text-lg text-gray-600">
              Know what to expect with our transparent pricing structure
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left p-4 font-semibold text-gray-900">Service</th>
                  <th className="text-center p-4 font-semibold text-gray-900">With Insurance</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Self-Pay</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.map((service, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold text-gray-900">{service.service}</td>
                    <td className="p-4 text-center">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        {service.insurancePrice}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                        {service.selfPayPrice}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">{service.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insurance Checker Tool */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Quick Insurance Coverage Checker
            </h3>
            <p className="text-lg text-gray-600">
              Enter your insurance information to get an instant coverage estimate
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select your insurance</option>
                  <option value="blue-cross">Blue Cross Blue Shield</option>
                  <option value="aetna">Aetna</option>
                  <option value="cigna">Cigna</option>
                  <option value="united">UnitedHealth</option>
                  <option value="kaiser">Kaiser Permanente</option>
                  <option value="anthem">Anthem</option>
                  <option value="humana">Humana</option>
                  <option value="medicare">Medicare</option>
                  <option value="medicaid">Medicaid</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select plan type</option>
                  <option value="ppo">PPO</option>
                  <option value="hmo">HMO</option>
                  <option value="epo">EPO</option>
                  <option value="pos">POS</option>
                  <option value="hsa">High Deductible/HSA</option>
                </select>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-200 mb-4">
              Check My Coverage
            </button>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                💡 <strong>Demo Mode:</strong> This tool provides general coverage information. For exact benefits verification, our insurance specialists will contact your provider directly.
              </p>
            </div>
          </div>
        </div>

        {/* Insurance Guide Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Complete Guide to Physical Therapy Insurance in San Diego 2025
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding your insurance benefits for physical therapy treatment can be complex. Our experts break down everything you need to know.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  What's Typically Covered?
                </h4>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>✓ Initial physical therapy evaluation</li>
                  <li>✓ Individual treatment sessions</li>
                  <li>✓ Manual therapy and joint mobilization</li>
                  <li>✓ Therapeutic exercises and stretching</li>
                  <li>✓ Pain management techniques</li>
                  <li>✓ Education and home exercise programs</li>
                  <li>✓ Progress assessments and plan adjustments</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Common Coverage Limitations
                </h4>
                <ul className="text-orange-700 space-y-2 text-sm">
                  <li>• Annual visit limits (typically 20-60 sessions)</li>
                  <li>• Prior authorization requirements</li>
                  <li>• Copayments and deductibles</li>
                  <li>• Network provider requirements</li>
                  <li>• Specific diagnosis code requirements</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  How SpineZone Helps You Maximize Benefits
                </h4>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>✓ Free insurance verification before your first visit</li>
                  <li>✓ Pre-authorization assistance when required</li>
                  <li>✓ Direct billing to your insurance company</li>
                  <li>✓ Claims tracking and follow-up</li>
                  <li>✓ Appeals support for denied claims</li>
                  <li>✓ Payment plan options for deductibles/copays</li>
                  <li>✓ Transparent pricing with no surprises</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="font-semibold text-purple-800 mb-3">Special Insurance Programs</h4>
                <div className="text-purple-700 space-y-2 text-sm">
                  <div><strong>Workers' Compensation:</strong> 100% coverage for work-related injuries</div>
                  <div><strong>Auto Insurance (PIP):</strong> Coverage for car accident injuries</div>
                  <div><strong>VA Benefits:</strong> Full coverage for qualifying veterans</div>
                  <div><strong>Medicare:</strong> Coverage with physician referral</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 mt-8">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-4">Don't Let Insurance Confusion Delay Your Treatment</h4>
              <p className="text-gray-600 mb-4">
                Our insurance specialists will verify your benefits, explain your coverage, and handle all the paperwork so you can focus on recovery.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Free Insurance Verification Now
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Financing Options */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Financing in San Diego
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't let cost prevent you from getting the care you need. We offer multiple financing solutions to fit any budget.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-4">CareCredit Financing</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">0% interest for 6, 12, or 18 months</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Extended payment plans available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Instant approval in most cases</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Can be used for family members</span>
                </li>
              </ul>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Apply for CareCredit
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-4">SpineZone Payment Plans</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">In-house financing with flexible terms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">No credit check required</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Automatic payment setup</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Start treatment immediately</span>
                </li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Setup Payment Plan
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            San Diego's Most Trusted Physical Therapy Insurance & Payment Team
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Our certified insurance specialists have helped over 50,000 San Diego residents navigate their benefits and find affordable physical therapy treatment options for joint pain, spine conditions, and sports injuries. We'll handle everything so you can focus on getting better.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-3" aria-hidden="true" />
              <div className="font-semibold mb-1">Direct Insurance Line</div>
              <div className="text-lg">(858) 555-0123</div>
              <div className="text-sm opacity-75">Press 2 for Insurance</div>
            </div>
            
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 mb-3" aria-hidden="true" />
              <div className="font-semibold mb-1">Insurance Hours</div>
              <div className="text-lg">Mon-Fri: 7AM-7PM</div>
              <div className="text-sm opacity-75">Same-day responses</div>
            </div>

            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 mb-3" aria-hidden="true" />
              <div className="font-semibold mb-1">Success Rate</div>
              <div className="text-lg">98% Approval</div>
              <div className="text-sm opacity-75">For treatment authorization</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
              Verify My Benefits Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
              Schedule Free Consultation
            </button>
          </div>
          
          <div className="mt-6 text-sm opacity-75">
            ⚡ Most insurance verifications completed within 2 hours | 💳 All major credit cards accepted
          </div>
        </div>
      </div>
    </section>
  );
}