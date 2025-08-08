import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/blog-data';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
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
      'physical therapy San Diego',
      'spine treatment',
      'non-invasive treatment'
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

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getBlogPosts()
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding">
        <div className="container-max">
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
                    {post.author} is a leading expert in physical therapy and spine treatment at SpineZone. 
                    With years of experience in non-invasive treatment approaches, they are dedicated to helping 
                    patients achieve lasting pain relief and improved quality of life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 section-padding">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Related Articles
              </h2>
              <p className="text-xl text-gray-600">
                Continue exploring insights in {post.category.toLowerCase()}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Calendar className="w-3 h-3 mr-1" aria-hidden="true" />
                      <time dateTime={relatedPost.publishDate}>
                        {new Date(relatedPost.publishDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </time>
                      <span className="mx-2">•</span>
                      <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
                      <span>{relatedPost.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:underline">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 section-padding text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have found relief through our non-invasive treatment approaches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
              Schedule Free Consultation
            </button>
            <Link 
              href="/blog"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}