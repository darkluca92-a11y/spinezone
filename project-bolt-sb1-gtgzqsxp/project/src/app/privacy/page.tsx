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
              <p><strong>Medical Information:</strong> Treatment records, medical history, insurance information</p>
              <p><strong>Personal Information:</strong> Name, address, phone number, email address</p>
              <p><strong>Website Data:</strong> IP address, browser information, website usage analytics</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="text-gray-700">
              <p>For privacy concerns or to request access to your medical records:</p>
              <p className="mt-4">
                <strong>SpineZone Physical Therapy</strong><br />
                Privacy Officer<br />
                1234 Healing Way, Suite 200<br />
                San Diego, CA 92101<br />
                Phone: (858) 555-0123<br />
                Email: privacy@spinezone-sd.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}