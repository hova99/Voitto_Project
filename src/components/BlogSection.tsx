import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';

const BlogSection: React.FC = () => {
  const blogPosts = [
    {
      id: 'choosing-right-blocks',
      title: 'How to choose the right block for your project',
      excerpt: 'Learn about different types of concrete blocks and which ones work best for various construction projects.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS9F0SRzpzhdxdO_MjaXFYGER9_o0WTX26jQ&s',
      author: 'Antony Kamau',
      readTime: '5 min read',
      date: 'Dec 15, 2024'
    },
    {
      id: 'future-kenyan-construction',
      title: 'The future of Kenyan construction: sustainability, tech, and speed',
      excerpt: 'Exploring how technology and sustainable practices are transforming the construction industry in Kenya.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB0U2Ej3TYn_twCgPmu2tf1eTVeVg2rt09Zg&s',
      author: 'Sarah Njeri',
      readTime: '7 min read',
      date: 'Dec 12, 2024'
    },
    {
      id: 'save-money-quality',
      title: '5 ways to save money without compromising on quality',
      excerpt: 'Practical tips for reducing construction costs while maintaining high standards and quality materials.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKwdl0C1mFwxOfmXOb3LFL1zb6BPYBh6yAmQ&s',
      author: 'David Kipchoge',
      readTime: '6 min read',
      date: 'Dec 10, 2024'
    },
    {
      id: 'blocks-two-storey-house',
      title: 'What block type for a 2-storey house?',
      excerpt: 'FAQ-style guide for developers and builders on selecting the right blocks for multi-storey construction.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoTa9Ytczu0S-1Mg43HUohSotfH4vAWMu8oA&s',
      author: 'Antony Kamau',
      readTime: '4 min read',
      date: 'Dec 8, 2024'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Construction Insights & Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert advice and industry insights to help you make informed construction decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-slate-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-blue-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{post.date}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm group"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors group"
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;