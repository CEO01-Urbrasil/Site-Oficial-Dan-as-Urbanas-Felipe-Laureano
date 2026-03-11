import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Play, Info, Heart, MessageCircle, Send } from 'lucide-react';
import { hygraphClient, GET_POSTS, Post } from '../services/hygraph';

export default function Dashboard({ user }: { user: User }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const [hygraphPosts, setHygraphPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch Firebase Posts (Community Feed)
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch Hygraph Posts (Classes/Content)
    const fetchHygraphData = async () => {
      try {
        const data: any = await hygraphClient.request(GET_POSTS);
        setHygraphPosts(data.posts);
      } catch (error) {
        console.error("Error fetching from Hygraph:", error);
      }
    };
    fetchHygraphData();

    return () => unsubscribe();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await addDoc(collection(db, 'posts'), {
        text: newPost,
        authorName: user.displayName,
        authorPhoto: user.photoURL,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        likes: 0
      });
      setNewPost('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const playlists = [
    {
      title: 'Hip Hop Dance - Centro de Petrópolis',
      items: [
        { id: 1, title: 'Fundamentos', img: 'https://i.postimg.cc/CxtHhTGT/Audição_felipe_Laure_30.jpg' },
        { id: 2, title: 'Groove Básico', img: 'https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg' },
        { id: 3, title: 'Texturas', img: 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg' },
        { id: 4, title: 'Footwork', img: 'https://i.postimg.cc/CxtHhTGT/Audição_felipe_Laure_30.jpg' },
      ]
    },
    {
      title: 'House Dance - Petrópolis RJ',
      items: [
        { id: 5, title: 'Jacking', img: 'https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg' },
        { id: 6, title: 'Footwork House', img: 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg' },
        { id: 7, title: 'Lofting', img: 'https://i.postimg.cc/CxtHhTGT/Audição_felipe_Laure_30.jpg' },
        { id: 8, title: 'Musicalidade', img: 'https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg' },
      ]
    },
    {
      title: 'Dança Infantil - Aulas em Petrópolis',
      items: [
        { id: 9, title: 'Coordenação', img: 'https://i.postimg.cc/CxtHhTGT/Audição_felipe_Laure_30.jpg' },
        { id: 10, title: 'Ritmo e Diversão', img: 'https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg' },
        { id: 11, title: 'Expressão Corporal', img: 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg' },
        { id: 12, title: 'Coreografias Kids', img: 'https://i.postimg.cc/CxtHhTGT/Audição_felipe_Laure_30.jpg' },
      ]
    },
    {
      title: 'Street Dance & Afro House - RJ',
      items: [
        { id: 13, title: 'Bases do Street', img: 'https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg' },
        { id: 14, title: 'Kuduro & Afro', img: 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg' },
        { id: 15, title: 'Energia e Flow', img: 'https://i.postimg.cc/CxtHhTGT/Audição_felipe_Laure_30.jpg' },
        { id: 16, title: 'Sequências', img: 'https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg' },
      ]
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0A0A0A] text-white pb-20 md:pb-0">
      
      {/* Main Content (Netflix Style) */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full">
          <img 
            src="https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg" 
            alt="Imagem de destaque: Felipe Laureano em aula de dança urbana" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mb-4 inline-block tracking-widest">ESTÚDIO NO CENTRO DE PETRÓPOLIS</span>
            <h1 className="font-['Anton'] text-5xl md:text-7xl mb-4 text-[#F5C400] tracking-wide">
              A FÍSICA DO <br/>MOVIMENTO
            </h1>
            <p className="text-gray-300 max-w-xl mb-6 font-['Barlow'] text-lg">
              Aprenda Hip Hop, House, Street Dance e Afro House com Felipe Laureano. O melhor estúdio de dança no Centro de Petrópolis, RJ. Desconstrua o vocabulário e domine as danças urbanas.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black font-bold py-3 px-8 rounded flex items-center gap-2 hover:bg-gray-200 transition-colors">
                <Play fill="currentColor" size={20} />
                ASSISTIR AGORA
              </button>
              <button className="bg-gray-500/50 text-white font-bold py-3 px-8 rounded flex items-center gap-2 hover:bg-gray-500/70 transition-colors backdrop-blur-sm">
                <Info size={20} />
                MAIS INFORMAÇÕES
              </button>
            </div>
          </div>
        </div>

        {/* Playlists Rows */}
        <div className="p-8 space-y-12">
          
          {/* Hygraph Dynamic Content */}
          {hygraphPosts.length > 0 && (
            <div>
              <h2 className="font-['Barlow_Condensed'] text-2xl font-bold mb-4 tracking-wider">AULAS RECENTES (HYGRAPH)</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {hygraphPosts.map((post) => (
                  <div key={post.id} className="min-w-[250px] md:min-w-[300px] aspect-video relative rounded-md overflow-hidden group cursor-pointer snap-start flex-shrink-0">
                    <img 
                      src={post.file?.url || 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg'} 
                      alt={`Capa da aula: ${post.title}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play fill="white" size={48} className="text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                      <p className="font-bold text-lg">{post.title}</p>
                      {post.descricao && <p className="text-xs text-gray-300 line-clamp-1">{post.descricao}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {playlists.map((playlist, idx) => (
            <div key={idx}>
              <h2 className="font-['Barlow_Condensed'] text-2xl font-bold mb-4 tracking-wider">{playlist.title}</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {playlist.items.map((item) => (
                  <div key={item.id} className="min-w-[250px] md:min-w-[300px] aspect-video relative rounded-md overflow-hidden group cursor-pointer snap-start flex-shrink-0">
                    <img src={item.img} alt={`Capa da aula: ${item.title}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play fill="white" size={48} className="text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                      <p className="font-bold text-lg">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar (Instagram Feed + Spotify) */}
      <div className="w-full lg:w-[400px] bg-[#111] border-l border-[#1A1A1A] flex flex-col h-screen sticky top-0">
        
        {/* Spotify Embed */}
        <div className="p-6 border-b border-[#1A1A1A]">
          <h3 className="font-['Anton'] text-xl text-[#F5C400] mb-4 tracking-wider">VIBE DA SEMANA</h3>
          <iframe 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>

        {/* Community Feed */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          <h3 className="font-['Anton'] text-xl text-[#F5C400] mb-6 tracking-wider">COMUNIDADE URBRASIL</h3>
          
          {/* Post Form */}
          <form onSubmit={handlePost} className="mb-8 relative flex items-center">
            <img 
              src={user.photoURL || 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg'} 
              alt="You" 
              className="w-10 h-10 rounded-full absolute left-2 object-cover border border-[#333]"
            />
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Deixe um recado para a turma..."
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-full py-4 pl-14 pr-14 text-sm focus:outline-none focus:border-[#F5C400] transition-colors"
            />
            <button 
              type="submit" 
              disabled={!newPost.trim()}
              className="absolute right-4 text-[#F5C400] disabled:opacity-50 hover:scale-110 transition-transform"
            >
              <Send size={20} />
            </button>
          </form>

          {/* Posts List */}
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-hide">
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center text-sm">Nenhum recado ainda. Seja o primeiro!</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-[#1A1A1A] rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={post.authorPhoto || 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg'} 
                      alt={post.authorName} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-sm">{post.authorName}</p>
                      <p className="text-xs text-gray-500">
                        {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Agora'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">{post.text}</p>
                  <div className="flex items-center gap-4 text-gray-500 border-t border-[#333] pt-3">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors text-xs font-bold">
                      <Heart size={16} /> {post.likes || 0}
                    </button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors text-xs font-bold">
                      <MessageCircle size={16} /> Responder
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
