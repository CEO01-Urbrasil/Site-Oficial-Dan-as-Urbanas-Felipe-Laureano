import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { blogPosts } from './Blog';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-8">
        <h1 className="font-['Anton'] text-4xl text-[#F5C400] mb-4">Matéria não encontrada</h1>
        <Link to="/blog" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Voltar para o Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#F5C400] transition-colors mb-8 font-bold uppercase tracking-widest text-sm">
          <ArrowLeft size={16} /> Voltar para o Blog
        </Link>

        <article className="bg-[#111] border border-[#1A1A1A] rounded-3xl overflow-hidden">
          <div className="relative h-[40vh] md:h-[50vh] w-full">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent"></div>
          </div>
          
          <div className="p-8 md:p-12 -mt-20 relative z-10">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-2 rounded-full border border-white/5"><Calendar size={16} className="text-[#F5C400]" /> {post.date}</span>
              <span className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-2 rounded-full border border-white/5"><User size={16} className="text-[#F5C400]" /> {post.author}</span>
            </div>
            
            <h1 className="font-['Anton'] text-4xl md:text-6xl text-[#F5C400] mb-8 tracking-wider leading-tight">
              {post.title}
            </h1>
            
            <div 
              className="prose prose-invert prose-lg max-w-none font-['Barlow'] text-gray-300 leading-relaxed
                prose-p:mb-6 prose-strong:text-white prose-strong:font-bold prose-a:text-[#F5C400] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
