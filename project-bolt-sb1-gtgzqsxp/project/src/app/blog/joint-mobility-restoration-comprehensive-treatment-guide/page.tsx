import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import { getBlogPost } from '@/lib/blog-data';
import type { Metadata } from 'next';

const POST_SLUG = 'joint-mobility-restoration-comprehensive-treatment-guide';

export async function generateMetadata(): Promise<Metadata> {
  const post = getBlogPost(POST_SLUG);
  
  if (!post) {
    return {
      title: 'Post Not Found - SpineZone Blog',
    };
  }

  return {
    title: `${post.title} - SpineZone Blog`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      'SpineZone',
      'San Diego joint mobility treatment',
      'shoulder pain treatment',
      'hip mobility therapy',
      'arthritis treatment San Diego'
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function JointMobilityPage() {
  const post = getBlogPost(POST_SLUG);

  if (!post) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding">
        <div className="container-max">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900">Joint Mobility Treatment</li>
            </ol>
          </nav>
          
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Blog
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                {post.category}
              </span>
              <span className="mx-3">•</span>
              <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
              <span className="mx-3">•</span>
              <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-2" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-gray-900">{post.author}</div>
                  <div className="text-sm text-gray-600">{post.authorTitle}</div>
                </div>
              </div>
              
              <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
                Share Article
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative">
        <div className="container-max">
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl -mt-16 mb-16">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg prose-blue max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-3">
                <span className="font-semibold text-gray-700">Tags:</span>
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Author Bio */}
            <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-8 h-8 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{post.author}</h4>
                  <p className="text-blue-600 font-semibold mb-3">{post.authorTitle}</p>
                  <p className="text-gray-600 leading-relaxed">
                    {post.author} is a joint mobility specialist and manual therapy expert at SpineZone. 
                    With extensive training in movement restoration and arthritis management, they help patients achieve pain-free mobility.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Restore Your Freedom of Movement</h3>
              <p className="text-xl mb-6 opacity-90">
                Don't let joint stiffness limit your activities. Discover how we can help restore your mobility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                >
                  Schedule Free Consultation
                </Link>
                <Link 
                  href="/services"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}