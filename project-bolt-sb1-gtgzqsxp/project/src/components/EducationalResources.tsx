import { BookOpen, Video, Download, ExternalLink, Clock, User, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const educationalContent = [
  {
    type: 'article',
    title: '5 Simple Exercises to Strengthen Your Core',
    description: 'Learn essential exercises that can be done at home to build core stability and prevent back pain.',
    readTime: '5 min read',
    difficulty: 'Beginner',
    author: 'Dr. Sarah Mitchell',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    link: '/blog/core-strengthening-exercises'
  },
  {
    type: 'video',
    title: 'Perfect Posture at Your Desk',
    description: 'Step-by-step video guide to setting up an ergonomic workspace and maintaining proper posture.',
    readTime: '8 min watch',
    difficulty: 'All Levels',
    author: 'Michael Chen, DPT',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    link: '/resources/ergonomic-workspace-setup'
  },
  {
    type: 'guide',
    title: 'Understanding Your Back Pain',
    description: 'Comprehensive guide explaining different types of back pain, causes, and when to seek professional help.',
    readTime: '12 min read',
    difficulty: 'Intermediate',
    author: 'Dr. Amanda Foster',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    link: '/blog/comprehensive-back-pain-treatment-san-diego'
  },
  {
    type: 'article',
    title: 'Sleep Positions for Spine Health',
    description: 'Discover the best sleeping positions and pillow arrangements to maintain spinal alignment throughout the night.',
    readTime: '6 min read',
    difficulty: 'Beginner',
    author: 'Dr. Sarah Mitchell',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    link: '/resources/sleep-spine-health'
  },
  {
    type: 'video',
    title: 'Morning Stretches for Back Pain Relief',
    description: 'Follow along with this gentle morning routine designed to reduce stiffness and prepare your spine for the day.',
    readTime: '10 min watch',
    difficulty: 'Beginner',
    author: 'Michael Chen, DPT',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    link: '/resources/morning-stretches-video'
  },
  {
    type: 'guide',
    title: 'Sports Injury Prevention Strategies',
    description: 'Essential techniques and exercises to prevent common sports injuries and maintain peak performance.',
    readTime: '15 min read',
    difficulty: 'Advanced',
    author: 'Michael Chen, DPT',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    link: '/blog/sports-injury-rehabilitation-get-back-in-the-game'
  }
];

const downloadables = [
  {
    title: 'Daily Posture Checklist',
    description: 'Printable checklist to maintain proper posture throughout your day',
    fileType: 'PDF',
    size: '1.2 MB'
  },
  {
    title: 'Home Exercise Routine Cards',
    description: 'Visual exercise cards for strengthening and stretching routines',
    fileType: 'PDF',
    size: '2.8 MB'
  },
  {
    title: 'Ergonomic Workspace Setup Guide',
    description: 'Complete guide to creating an ergonomic home office',
    fileType: 'PDF',
    size: '1.8 MB'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video': return Video;
    case 'guide': return BookOpen;
    default: return BookOpen;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'video': return 'text-red-600 bg-red-100';
    case 'guide': return 'text-purple-600 bg-purple-100';
    default: return 'text-blue-600 bg-blue-100';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'text-green-600 bg-green-100';
    case 'Intermediate': return 'text-orange-600 bg-orange-100';
    case 'Advanced': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export default function EducationalResources() {
  return (
    <section className="bg-white section-padding" aria-labelledby="resources-heading">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 id="resources-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Free Educational Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert-created content to help you understand your condition, learn self-care techniques, and maintain optimal spine health
          </p>
        </div>

        {/* Featured Resources */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {educationalContent.map((resource, index) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <article key={index} className="bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <TypeIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                    <Clock className="w-4 h-4 mr-1 ml-3" aria-hidden="true" />
                    <span>{resource.readTime}</span>
                    <span className="mx-2">•</span>
                    <User className="w-4 h-4 mr-1" aria-hidden="true" />
                    <span>{resource.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <Link 
                    href={resource.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    {resource.type === 'video' ? 'Watch Now' : 'Read More'}
                    <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Downloadable Resources */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Free Download Resources
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take your learning offline with these comprehensive guides and exercise routines
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {downloadables.map((download, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <Download className="w-8 h-8 text-blue-600 flex-shrink-0" aria-hidden="true" />
                  <div className="text-right">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{download.fileType}</span>
                    <div className="text-xs text-gray-500 mt-1">{download.size}</div>
                  </div>
                </div>
                
                <h4 className="font-bold text-gray-900 mb-2">{download.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{download.description}</p>
                
                <button className="w-full btn-primary text-sm">
                  Download Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="btn-secondary">
              View All Resources
            </button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Get Weekly Health Tips
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter for expert spine health tips, exercises, and the latest treatment insights delivered to your inbox
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button 
              type="submit"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm opacity-75 mt-4">
            No spam, unsubscribe at any time. Your privacy is protected.
          </p>
        </div>
      </div>
    </section>
  );
}