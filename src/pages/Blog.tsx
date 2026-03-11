import { useState, useEffect } from 'react';
import { hygraphClient, GET_POSTS, Post } from '../services/hygraph';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data: any = await hygraphClient.request(GET_POSTS);
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#F5C400]">
        <div className="animate-pulse text-2xl font-['Anton'] tracking-widest">CARREGANDO BLOG...</div>
      </div>
    );
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (post.descricao && post.descricao.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8 md:p-12 pb-32">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-[#1A1A1A] pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-['Anton'] text-5xl md:text-7xl text-[#F5C400] uppercase tracking-wider mb-4">
                URBRASIL BLOG
              </h1>
              <p className="font-['Barlow_Condensed'] text-xl text-gray-400 uppercase tracking-widest">
                Notícias, Artigos e Atualizações da Comunidade
              </p>
            </div>
            
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-500" size={18} />
              </div>
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111] border border-[#1A1A1A] text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400] transition-all font-['Barlow'] placeholder:text-gray-600"
              />
            </div>
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-[#111] rounded-2xl border border-[#1A1A1A]">
            <p className="text-gray-400 font-['Barlow'] text-lg">
              Nenhum artigo publicado no momento.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              (Crie posts no painel do Hygraph para que eles apareçam aqui)
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-[#111] rounded-2xl border border-[#1A1A1A]">
            <p className="text-gray-400 font-['Barlow'] text-lg">
              Nenhum artigo encontrado para "{searchQuery}".
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-[#F5C400] hover:underline font-['Barlow'] font-bold"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayedPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-[#111] rounded-2xl border border-[#1A1A1A] overflow-hidden group hover:border-[#F5C400] transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F5C400]/10"
                >
                  <div className="aspect-video relative overflow-hidden bg-[#1A1A1A]">
                    {post.file?.url ? (
                      <img 
                        src={post.file.url} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#333]">
                        <span className="font-['Anton'] text-4xl opacity-20">URBRASIL</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80"></div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-[#F5C400] font-['Barlow'] font-bold uppercase tracking-wider mb-4">
                      {post.date && (
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                    
                    <h2 className="font-['Anton'] text-2xl mb-3 text-white group-hover:text-[#F5C400] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-400 font-['Barlow'] text-sm mb-6 line-clamp-3 flex-1">
                      {post.descricao}
                    </p>
                    
                    <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-[#F5C400] transition-colors mt-auto w-fit">
                      LER ARTIGO <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length > visibleCount && (
              <div className="mt-16 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="bg-[#111] border border-[#1A1A1A] text-white px-10 py-4 rounded-full font-['Anton'] tracking-widest hover:bg-[#F5C400] hover:text-black hover:border-[#F5C400] transition-all flex items-center gap-4 group"
                >
                  CARREGAR MAIS <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
