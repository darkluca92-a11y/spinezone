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
            Insurance & Payment Information
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We work with most major insurance providers and offer flexible payment options to make your treatment affordable and accessible
          </p>
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

        {/* Contact for Insurance Questions */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Questions About Coverage?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our insurance specialists are here to help verify your benefits and explain your coverage options
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex items-center justify-center">
              <Phone className="w-6 h-6 mr-3" aria-hidden="true" />
              <div className="text-left">
                <div className="font-semibold">Call Our Insurance Team</div>
                <div className="text-lg">(858) 555-0123</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Clock className="w-6 h-6 mr-3" aria-hidden="true" />
              <div className="text-left">
                <div className="font-semibold">Available Hours</div>
                <div className="text-lg">Mon-Fri: 8AM-6PM</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
              Verify Insurance Benefits
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}