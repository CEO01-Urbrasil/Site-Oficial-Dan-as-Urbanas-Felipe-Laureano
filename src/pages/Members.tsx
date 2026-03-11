import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, BookOpen, ShoppingBag, Users, ArrowRight } from 'lucide-react';

export default function Members() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Barlow']">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-['Anton'] text-3xl text-[#F5C400] tracking-wider">URBRASIL</Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-bold uppercase tracking-widest hover:text-[#F5C400] transition-colors">Voltar</Link>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="font-['Anton'] text-6xl md:text-8xl uppercase mb-6">
              UNIVERSO <span className="text-[#F5C400]">URBRASIL</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tudo o que você precisa para evoluir na dança, em um só lugar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'App Oficial', desc: 'Acompanhe sua jornada na palma da mão.', icon: Smartphone, link: '#' },
              { title: 'Blog', desc: 'Artigos, história e cultura urbana.', icon: BookOpen, link: '/blog' },
              { title: 'Loja', desc: 'Produtos exclusivos e oficiais.', icon: ShoppingBag, link: '/store' },
              { title: 'Comunidade', desc: 'Conecte-se com outros dançarinos.', icon: Users, link: '#' },
            ].map((item, i) => (
              <div key={i} className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-[#F5C400] transition-all group">
                <div className="w-16 h-16 bg-[#F5C400]/10 text-[#F5C400] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F5C400] group-hover:text-black transition-all">
                  <item.icon size={32} />
                </div>
                <h3 className="font-['Anton'] text-2xl uppercase tracking-wider mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{item.desc}</p>
                <Link to={item.link} className="inline-flex items-center gap-2 text-[#F5C400] font-bold uppercase tracking-widest text-sm hover:underline">
                  Acessar <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
