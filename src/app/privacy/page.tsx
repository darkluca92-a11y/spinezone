import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - SpineZone Physical Therapy San Diego',
  description: 'SpineZone Privacy Policy - How we protect your personal and medical information in compliance with HIPAA and California privacy laws.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-white section-padding">
      <div className="container-max max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">HIPAA Compliance</h2>
            <p className="text-gray-700 leading-relaxed">
              SpineZone Physical Therapy is committed to protecting your medical information in accordance with 
              the Health Insurance Portability and Accountability Act (HIPAA) and all applicable state and federal 
              privacy laws.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Protected Health Information (PHI)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Medical records and treatment history</li>
                <li>Diagnostic information and test results</li>
                <li>Insurance and billing information</li>
                <li>Appointment and scheduling data</li>
                <li>Progress notes and treatment plans</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, date of birth, and contact information</li>
                <li>Emergency contact details</li>
                <li>Government-issued identification numbers</li>
                <li>Demographic information</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800">Website and Technical Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP addresses (stored in hashed format)</li>
                <li>Browser and device information</li>
                <li>Website usage patterns and analytics</li>
                <li>Session information and login data</li>
                <li>Form submission data (contact forms)</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights Under HIPAA</h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-4">As our patient, you have the following rights regarding your protected health information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Right to Access:</strong> You may request copies of your medical records</li>
                <li><strong>Right to Amend:</strong> You may request corrections to your medical information</li>
                <li><strong>Right to Restrict:</strong> You may request limits on how we use your information</li>
                <li><strong>Right to Confidential Communication:</strong> You may request we contact you in a specific way</li>
                <li><strong>Right to Accounting:</strong> You may request a list of disclosures we have made</li>
                <li><strong>Right to File a Complaint:</strong> You may file complaints about our privacy practices</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Protect Your Information</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Technical Safeguards</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>256-bit encryption for data transmission and storage</li>
                <li>Secure user authentication with multi-factor options</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Automatic session timeouts (15 minutes for patient portal)</li>
                <li>Comprehensive audit logging of all data access</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800">Administrative Safeguards</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>HIPAA training for all staff members</li>
                <li>Regular privacy and security policy updates</li>
                <li>Designated Privacy Officer and Security Officer</li>
                <li>Business Associate Agreements with all vendors</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800">Physical Safeguards</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Secured facilities with controlled access</li>
                <li>Locked storage for physical records</li>
                <li>Secure disposal of confidential information</li>
                <li>Workstation security controls</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing and Disclosures</h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-4">We may share your health information only:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your written authorization</li>
                <li>For treatment, payment, and healthcare operations</li>
                <li>As required by law (court orders, public health reporting)</li>
                <li>For health oversight activities</li>
                <li>In emergency situations to protect your health</li>
                <li>To business associates under signed agreements</li>
              </ul>
              <p className="mt-4"><strong>We never sell your personal or health information to third parties.</strong></p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Privacy</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>Our website uses privacy-compliant analytics to improve user experience:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP addresses are anonymized and hashed before storage</li>
                <li>No personally identifiable information is collected without consent</li>
                <li>Session data is automatically expired after inactivity</li>
                <li>Contact form submissions are encrypted and securely processed</li>
                <li>We use essential cookies only; no tracking cookies</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <div className="text-gray-700 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Medical Records:</strong> Retained for 7 years after last treatment date</li>
                <li><strong>Audit Logs:</strong> Retained for 7 years for compliance purposes</li>
                <li><strong>Website Analytics:</strong> Retained for 2 years maximum</li>
                <li><strong>Contact Form Data:</strong> Retained for 1 year unless ongoing correspondence</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Breach Notification</h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-4">In the unlikely event of a data breach involving your protected health information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We will notify you within 60 days of discovering the breach</li>
                <li>We will notify the Department of Health and Human Services</li>
                <li>We will notify local media if the breach affects 500+ individuals</li>
                <li>We will provide details about the breach and steps to protect yourself</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="text-gray-700">
              <p className="mb-4">For privacy concerns, to exercise your rights, or to request access to your medical records:</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Privacy Officer</h3>
                <p className="text-blue-800">
                  <strong>SpineZone Physical Therapy</strong><br />
                  HIPAA Privacy Officer<br />
                  1234 Healing Way, Suite 200<br />
                  San Diego, CA 92101<br />
                  Phone: (858) 555-0123<br />
                  Email: privacy@spinezone-sandiego.com<br />
                  Fax: (858) 555-0124
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">File a Complaint</h3>
                <p className="text-green-800 mb-3">
                  You have the right to file a complaint if you believe your privacy rights have been violated.
                </p>
                <p className="text-green-700">
                  <strong>U.S. Department of Health and Human Services</strong><br />
                  Office for Civil Rights<br />
                  Phone: 1-800-368-1019<br />
                  Online: <a href="https://www.hhs.gov/hipaa/filing-a-complaint" className="text-blue-600 underline">www.hhs.gov/hipaa/filing-a-complaint</a>
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-4">
                We may update this privacy policy from time to time to reflect changes in our practices 
                or applicable laws. Any significant changes will be:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Posted on our website with the updated effective date</li>
                <li>Provided to you in writing or electronically if required by law</li>
                <li>Made available in our offices for your review</li>
              </ul>
              <p className="mt-4">
                <strong>We will never reduce your rights under this policy without your written consent.</strong>
              </p>
            </div>
          </section>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Acknowledgment</h3>
            <p className="text-gray-700 text-sm">
              By using our services or website, you acknowledge that you have read and understand this 
              Privacy Policy and our Notice of Privacy Practices. If you have questions about how your 
              information is handled, please contact our Privacy Officer.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}