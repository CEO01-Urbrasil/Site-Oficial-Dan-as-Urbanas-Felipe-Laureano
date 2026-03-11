import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, BookOpen, Star, Zap, Instagram, Youtube, Facebook, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FelipeLaureano() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Barlow'] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#F5C400] hover:scale-105 transition-transform font-bold uppercase tracking-widest text-sm">
            <ArrowLeft size={20} /> Voltar para Home
          </Link>
          <div className="logo font-['Anton'] text-2xl text-[#F5C400] tracking-wider">URBRASIL</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="font-['Anton'] text-[30vw] leading-none text-center select-none">FELIPE</div>
        </div>
        
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-[#F5C400] text-black font-['Anton'] px-4 py-1 mb-6 transform -skew-x-12">
                DIRETOR & FUNDADOR
              </div>
              <h1 className="font-['Anton'] text-7xl md:text-9xl leading-[0.8] uppercase tracking-tighter mb-8">
                FELIPE <br />
                <span className="text-[#F5C400]">LAUREANO</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-lg mb-10 font-medium leading-relaxed">
                Dançarino, coreógrafo e pesquisador das Danças Urbanas com mais de 15 anos de trajetória dedicados à arte do movimento.
              </p>
              <div className="flex gap-6">
                <a href="https://instagram.com/felipelaureano.o" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://youtube.com/urbanamentebr" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all">
                  <Youtube size={20} />
                </a>
                <a href="https://wa.me/552422466753?text=Olá,%20gostaria%20de%20falar%20com%20o%20Felipe%20Laureano!" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all">
                  <MessageCircle size={20} />
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative group">
                <img 
                  src="https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg" 
                  alt="Felipe Laureano" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F5C400] -z-10 rounded-2xl rotate-12"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[#F5C400] -z-10 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Presentation & Summary Section */}
      <section className="py-24 px-6 bg-[#0F0F0F]">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            >
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/426z4FvxmWw" 
                title="Apresentação Felipe Laureano" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-['Anton'] text-5xl uppercase mb-8 leading-none">
                TRAJETÓRIA EM <span className="text-[#F5C400]">FOCO</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-medium">
                <p>
                  Com mais de 15 anos de experiência, Felipe Laureano é o idealizador da URBRASIL e uma das maiores referências em Danças Urbanas da Região Serrana. Sua trajetória é marcada pela busca constante da essência do movimento, unindo técnica apurada à transformação social.
                </p>
                <p>
                  Através de sua metodologia inclusiva, Felipe dedica-se a democratizar a dança, impactando desde crianças em seu primeiro contato com a arte até grupos da terceira idade e inclusão PCD, provando que o movimento é uma linguagem universal de liberdade.
                </p>
                <div className="pt-4">
                  <div className="flex items-center gap-4 text-[#F5C400] font-bold uppercase tracking-widest text-sm">
                    <div className="w-12 h-px bg-[#F5C400]"></div>
                    O Legado do Movimento
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 px-6">
        <div className="container max-w-7xl mx-auto">
          <h2 className="font-['Anton'] text-5xl uppercase mb-16 text-center">CONQUISTAS & <span className="text-[#F5C400]">LEGADO</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="text-[#F5C400]" size={32} />,
                title: "Premiações Nacionais",
                desc: "Vencedor e finalista em diversos festivais de dança urbana pelo Brasil, destacando-se pela técnica e criatividade coreográfica."
              },
              {
                icon: <Zap className="text-[#F5C400]" size={32} />,
                title: "Fundador da URBRASIL",
                desc: "Criou o maior polo de Danças Urbanas de Petrópolis, estabelecendo uma metodologia de ensino própria e inclusiva."
              },
              {
                icon: <Star className="text-[#F5C400]" size={32} />,
                title: "Impacto Social",
                desc: "Idealizador de projetos que levam a dança para comunidades, escolas públicas e grupos de inclusão PCD."
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#111] p-10 rounded-3xl border border-white/5 hover:border-[#F5C400]/30 transition-all group">
                <div className="mb-6 transform group-hover:scale-110 transition-transform inline-block">
                  {item.icon}
                </div>
                <h3 className="font-['Anton'] text-2xl uppercase mb-4 tracking-wide">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-[#F5C400] text-black">
        <div className="container max-w-5xl mx-auto text-center">
          <BookOpen size={64} className="mx-auto mb-8 opacity-20" />
          <h2 className="font-['Anton'] text-5xl md:text-7xl uppercase mb-10 leading-none">FILOSOFIA DE <br /> ENSINO</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-bold italic leading-tight mb-8">
              "A dança não é sobre o quão alto você pode pular ou quão rápido você pode girar. É sobre a verdade que você coloca em cada movimento e como você usa seu corpo para contar sua própria história."
            </p>
            <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
            <p className="text-lg font-medium opacity-80">
              Felipe acredita na dança como ferramenta de autoconhecimento e empoderamento. Suas aulas focam no desenvolvimento da consciência corporal, na liberdade de expressão e no respeito às raízes culturais das Danças Urbanas.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="container max-w-7xl mx-auto text-center relative z-10">
          <h2 className="font-['Anton'] text-6xl md:text-8xl uppercase mb-12 leading-none">VAMOS <span className="text-[#F5C400]">DANÇAR?</span></h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Agende uma aula experimental com Felipe Laureano e descubra o poder do movimento.
          </p>
          <a href="https://wa.me/552422466753?text=Olá,%20gostaria%20de%20agendar%20uma%20aula%20experimental!" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 bg-[#F5C400] text-black font-['Anton'] text-3xl px-12 py-6 rounded-2xl hover:scale-105 transition-transform">
            AGENDAR AGORA <MessageCircle size={32} />
          </a>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F5C400]/5 rounded-full blur-[120px] -z-0"></div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] py-10 px-6 border-t border-white/5 text-center">
        <div className="logo font-['Anton'] text-2xl text-[#F5C400] tracking-wider mb-4">URBRASIL</div>
        <div className="text-xs text-gray-600 uppercase tracking-widest">
          © 2026 Felipe Laureano. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
