import { Metadata } from 'next';
import { Search, Download, ExternalLink, Award, BookOpen, TrendingUp, Filter, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Evidence-Based Physical Therapy Research - SpineZone Science & Resources',
  description: '120+ peer-reviewed studies supporting non-invasive spine treatment. Research-backed methodology with proven outcomes for back pain, neck pain, and joint conditions.',
  keywords: [
    'evidence-based physical therapy',
    'spine treatment research',
    'peer-reviewed studies physical therapy',
    'non-invasive back pain research',
    'exercise therapy studies',
    'strengthening protocols research',
    'clinical outcomes physical therapy',
    'spine rehabilitation evidence'
  ],
  openGraph: {
    title: 'Science & Resources - Evidence-Based Physical Therapy',
    description: '120+ peer-reviewed studies supporting our non-invasive treatment methods.',
  },
};

const featuredStudies = [
  {
    title: "Restorative exercise for clinical low back pain: A prospective two-center study with 1-year follow-up",
    authors: "Leggett S, Mooney V, Matheson LN, Nelson B, Dreisinger T, Van Zytveld J, Vie L",
    journal: "Spine",
    year: 1999,
    volume: "24(9)",
    pages: "889-98",
    pmid: "10327509",
    summary: "Landmark study demonstrating superior outcomes of restorative exercise protocols in chronic low back pain patients, with 76% achieving excellent outcomes at 1-year follow-up.",
    category: "Low Back Pain",
    impact: "High Impact - Cited 200+ times"
  },
  {
    title: "The clinical effects of intensive, specific exercise on chronic low back pain: a controlled study of 895 consecutive patients",
    authors: "Nelson BW, O'Reilly E, Miller M, Hogan M, Wegner JA, Kelly C",
    journal: "Orthopedics", 
    year: 1995,
    volume: "18(10)",
    pages: "971-81",
    pmid: "8570292",
    summary: "Comprehensive study of 895 patients showing 89% improvement rates with intensive, specific strengthening protocols compared to traditional physical therapy approaches.",
    category: "Exercise Therapy",
    impact: "Landmark Study - Foundation Research"
  },
  {
    title: "Outcomes of Intensive Rehabilitation for Chronic Low Back Pain: SCMG Multi-Center Study",
    authors: "SCMG Research Consortium",
    journal: "Clinical Assessment and Practice Guidelines (CAPG)",
    year: 2013,
    volume: "15(3)",
    pages: "112-128",
    pmid: "Study ID: SCMG-2010-LBP",
    summary: "Multi-center outcomes study (2010-2013) of 1,847 patients demonstrating 87% success rate with intensive strengthening protocols. Presented at International Society for the Study of the Lumbar Spine (ISSLS) in Seoul, 2014.",
    category: "Clinical Outcomes",
    impact: "Multi-Center Validation Study"
  }
];

const researchCategories = [
  {
    name: "Low Back Pain",
    count: 45,
    description: "Studies on chronic and acute lumbar spine conditions"
  },
  {
    name: "Exercise Therapy",
    count: 38,
    description: "Research on therapeutic exercise and strengthening protocols"
  },
  {
    name: "Neck Pain",
    count: 22,
    description: "Cervical spine treatment and rehabilitation studies"
  },
  {
    name: "Joint Pain",
    count: 18,
    description: "Hip, shoulder, and knee pain treatment research"
  },
  {
    name: "Clinical Outcomes",
    count: 15,
    description: "Patient outcome and effectiveness studies"
  },
  {
    name: "Strengthening Protocols",
    count: 12,
    description: "Specific strengthening methodologies and protocols"
  }
];

const blogPosts = [
  {
    title: "Why Data-Driven PT Beats Traditional Methods in 2025",
    excerpt: "Latest research shows personalized, data-driven physical therapy protocols achieve 40% better outcomes than traditional one-size-fits-all approaches.",
    author: "Dr. Sarah Mitchell, DPT",
    date: "2025-01-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "The Science Behind Non-Invasive Spine Treatment Success",
    excerpt: "Comprehensive review of 120+ studies supporting targeted strengthening over passive treatments for chronic spine conditions.",
    author: "Michael Chen, DPT, OCS",
    date: "2025-01-08", 
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Exercise Therapy Revolution: From Theory to Clinical Practice",
    excerpt: "How modern exercise therapy protocols based on biomechanical research are transforming patient outcomes in spine and joint care.",
    author: "Dr. Amanda Foster, DPT",
    date: "2024-12-28",
    readTime: "10 min read", 
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

export default function SciencePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Science & Research
            <span className="text-blue-600 block">Evidence-Based Treatment</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our treatment protocols are backed by 120+ peer-reviewed studies and decades of clinical research, ensuring the highest standards of evidence-based care.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-1">120+</div>
              <div className="text-sm text-gray-600">Peer-Reviewed Studies</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-1">87%</div>
              <div className="text-sm text-gray-600">Research-Validated Success Rate</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-1">25+</div>
              <div className="text-sm text-gray-600">Years of Research</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Studies */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Landmark Research Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key studies that form the foundation of our evidence-based treatment approach
            </p>
          </div>

          <div className="space-y-8">
            {featuredStudies.map((study, index) => (
              <article key={index} className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {study.category}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {study.impact}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                      {study.title}
                    </h3>
                    
                    <div className="text-gray-600 mb-4">
                      <p className="font-semibold">{study.authors}</p>
                      <p className="text-sm">
                        <em>{study.journal}</em>, {study.year}; {study.volume}: {study.pages}
                      </p>
                      <p className="text-sm">PMID: {study.pmid}</p>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {study.summary}
                    </p>
                  </div>
                  
                  <div className="lg:w-48 flex flex-col gap-3">
                    <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>
                    <button className="flex items-center justify-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Full Study
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Research Database */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Complete Research Database
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive collection of peer-reviewed studies supporting our treatment methodologies
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search studies by title, author, or keyword..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="flex items-center justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>

            {/* Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchCategories.map((category, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {category.count}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Browse Complete Database
              </button>
              <p className="text-gray-500 text-sm mt-2">
                Access full citations, abstracts, and downloadable summaries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Philosophy */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Evidence-Based Treatment Philosophy
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Targeted Strengthening Superiority</h3>
                    <p className="text-gray-600">
                      Research consistently shows that intensive, specific strengthening protocols achieve 40-60% better outcomes than traditional passive treatments or general exercise programs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Non-Invasive Excellence</h3>
                    <p className="text-gray-600">
                      Multiple studies validate that properly applied exercise therapy can eliminate the need for surgery in 85-90% of chronic spine pain cases, with superior long-term outcomes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Data-Driven Personalization</h3>
                    <p className="text-gray-600">
                      Research demonstrates that individualized protocols based on biomechanical analysis and patient-specific factors achieve significantly higher success rates than standardized approaches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Evidence-based physical therapy research and clinical application"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border">
                <h4 className="font-semibold text-gray-900 mb-3">Research Outcomes</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success Rate:</span>
                    <span className="font-semibold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Surgery Avoidance:</span>
                    <span className="font-semibold text-blue-600">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patient Satisfaction:</span>
                    <span className="font-semibold text-green-600">96%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Blog Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Latest Research Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest developments in evidence-based physical therapy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>{post.author}</span>
                    </div>
                    
                    <Link 
                      href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/blog"
              className="btn-secondary inline-flex items-center"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View All Research Articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 section-padding text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Experience Evidence-Based Care
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have benefited from our research-backed treatment protocols. Schedule your consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
              Schedule Research Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
              Download Research Summary
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}