import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Facebook,
  Twitter,
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Music, 
  Zap, 
  Star, 
  Users, 
  Smartphone,
  Clock,
  ArrowLeft,
  Quote
} from 'lucide-react';
import LeadQuiz from '../components/LeadQuiz';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 30 });

  useEffect(() => {
    // Scroll and Reveal Logic
    const handleScroll = () => {
      const s = window.scrollY;
      const g = document.getElementById('ghost');
      if (g) g.style.transform = `translate(-50%,calc(-50% + ${s * 0.3}px))`;
      
      const h = document.getElementById('hero-bg');
      if (h) h.style.transform = `translateY(${s * 0.15}px) scale(${1 + s * 0.0002})`;

      const b = document.getElementById('hero-badge');
      if (b) b.style.transform = `translateY(${s * -0.2}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('act');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.rev').forEach((el) => obs.observe(el));

    // Countdown Timer Logic
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        else {
          clearInterval(timer);
          return prev;
        }
        return { h, m, s };
      });
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      obs.disconnect();
      clearInterval(timer);
    };
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  const ModalidadeCarousel = ({ images }: { images: { url: string, caption: string }[] }) => {
    const [current, setCurrent] = useState(0);

    const next = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrent((prev) => (prev + 1) % images.length);
    };
    const prev = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <div className="relative group/carousel aspect-square rounded-2xl overflow-hidden mb-6 bg-[#111] border border-white/5">
        <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((img, i) => (
            <div key={i} className="min-w-full h-full relative">
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <p className="text-[10px] text-white font-bold uppercase tracking-[0.2em] leading-tight">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prev} 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#F5C400] hover:text-black hover:scale-110 z-20 border border-white/10"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next} 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#F5C400] hover:text-black hover:scale-110 z-20 border border-white/10"
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {images.map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full transition-all ${current === i ? 'bg-[#F5C400] scale-125' : 'bg-white/30'}`} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="landing-page bg-[#0A0A0A] text-white font-['Barlow'] overflow-x-hidden">
      {/* Header */}
      <header className="header fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="logo font-['Anton'] text-3xl text-[#F5C400] tracking-wider">URBRASIL</div>
          <nav className="hidden md:flex items-center gap-10">
            <a href="#sobre" className="text-sm font-bold uppercase tracking-widest hover:text-[#F5C400] transition-colors">Sobre</a>
            <a href="#modalidades" className="text-sm font-bold uppercase tracking-widest hover:text-[#F5C400] transition-colors">Aulas</a>
            <a href="#precos" className="text-sm font-bold uppercase tracking-widest hover:text-[#F5C400] transition-colors">Planos</a>
            <Link to="/blog" className="text-sm font-bold uppercase tracking-widest hover:text-[#F5C400] transition-colors">Blog</Link>
            <Link to="/login" className="bg-[#F5C400] text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform">
              Entrar
            </Link>
          </nav>
          <button className="md:hidden text-[#F5C400]">
            <Zap size={28} />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero relative min-h-screen flex items-center pt-20 overflow-hidden" id="hero">
        <div className="ghost absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Anton'] text-[20vw] opacity-[0.03] pointer-events-none select-none z-0" id="ghost">URBRASIL</div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            id="hero-bg"
            src="https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg" 
            alt="Felipe Laureano" 
            className="w-full h-full object-cover opacity-40 grayscale will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 container max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-[#F5C400] text-black font-['Anton'] px-4 py-1 mb-6 transform -skew-x-12">
              O LEGADO DO MOVIMENTO
            </div>
            <h1 className="font-['Anton'] text-6xl md:text-8xl lg:text-9xl leading-[0.8] uppercase tracking-tighter mb-8">
              DANÇAS <br />
              URBANAS COM <br />
              <Link to="/felipe-laureano" className="text-[#F5C400] whitespace-nowrap hover:underline decoration-2 underline-offset-8">FELIPE LAUREANO</Link>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-lg mb-10 font-medium">
              Aulas exclusivas com <Link to="/felipe-laureano" className="whitespace-nowrap hover:text-[#F5C400] transition-colors">Felipe Laureano</Link> em Petrópolis. Hip Hop, House, Breaking, Infantil, PCD e Terceira Idade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#precos" className="bg-[#F5C400] text-black font-['Anton'] text-2xl px-10 py-5 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                QUERO COMEÇAR AGORA <ArrowRight size={24} />
              </a>
              <a href="#sobre" className="border border-white/20 hover:bg-white/5 text-white font-bold px-10 py-5 rounded-xl flex items-center justify-center gap-3 transition-all">
                CONHECER O PROJETO
              </a>
            </div>
            <a href="#sobre" className="inline-flex items-center gap-2 text-white/70 hover:text-[#F5C400] transition-colors mt-6 font-bold uppercase tracking-widest text-sm">
              Saiba Mais <ChevronDown size={16} />
            </a>
          </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute bottom-10 right-10 hidden lg:block" id="hero-badge">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-xs will-change-transform">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#F5C400] rounded-full flex items-center justify-center text-black">
                <Users size={24} />
              </div>
              <div>
                <div className="text-2xl font-['Anton']">+500</div>
                <div className="text-xs text-gray-500 uppercase font-bold">Alunos Impactados</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">Junte-se ao maior movimento de dança urbana da região serrana.</p>
          </div>
        </div>
      </section>

      {/* Banner */}
      <div className="mq bg-[#F5C400] py-4 overflow-hidden whitespace-nowrap border-y-4 border-black">
        <div className="flex gap-10 animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-['Anton'] text-4xl text-black uppercase tracking-widest">
              HIP HOP • HOUSE • BREAKING • INFANTIL • PCD • TERCEIRA IDADE • URBRASIL • 
            </span>
          ))}
        </div>
      </div>

      {/* Sobre */}
      <section id="sobre" className="rev py-32 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="piw relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#F5C400] relative z-10">
                <img 
                  src="https://i.postimg.cc/HsMZz9sy/DSC_6966.jpg" 
                  alt="Felipe Laureano" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-white/10 rounded-3xl -z-0"></div>
              
              <div className="absolute -top-6 -left-6 bg-black p-6 border border-white/10 rounded-2xl z-20 shadow-2xl">
                <div className="text-[#F5C400] font-['Anton'] text-5xl line-height-1">15+</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Anos de Experiência</div>
              </div>
            </div>

            <div>
              <h2 className="st font-['Anton'] text-6xl md:text-7xl uppercase mb-8 leading-none">
                O MESTRE POR TRÁS DO <span className="text-[#F5C400]">MOVIMENTO</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-400 font-medium">
                <p>
                  <Link to="/felipe-laureano" className="whitespace-nowrap font-bold text-white hover:text-[#F5C400] transition-colors">Felipe Laureano</Link> é uma das maiores referências em danças urbanas da região. Com passagens por grandes palcos e workshops internacionais, ele traz para Petrópolis uma metodologia única que une técnica, história e expressão.
                </p>
                <p>
                  Fundador da URBRASIL, Felipe acredita que a dança é uma ferramenta de transformação social e autoconhecimento. Suas aulas não são apenas sobre passos, mas sobre encontrar sua própria voz através do corpo.
                </p>
              </div>

              <div className="video-wrapper mt-12 aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#111] relative group">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/6Ym_X96766U" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section id="modalidades" className="mods rev bg-[#111] py-32 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="st font-['Anton'] text-6xl md:text-8xl uppercase mb-4">NOSSAS <span className="text-[#F5C400]">AULAS</span></h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Escolha o estilo que mais combina com sua energia e comece sua jornada.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Hip Hop Dance', 
                desc: 'Fundamentos, grooves e coreografias da cultura urbana.', 
                icon: Music,
                images: [
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'Groove e atitude no palco.' },
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'Técnica e expressão corporal.' },
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'Energia das ruas em cada passo.' }
                ]
              },
              { 
                title: 'House Dance', 
                desc: 'Fluidez, footwork e a energia das pistas de Chicago.', 
                icon: Zap,
                images: [
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'Fluidez e ritmo constante.' },
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'A essência das pistas de Chicago.' },
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'Conexão com a música eletrônica.' }
                ]
              },
              { 
                title: 'Breaking', 
                desc: 'Acrobacias, power moves e a essência do breaking original.', 
                icon: Star,
                images: [
                  { url: 'https://i.postimg.cc/V6kSHtWJ/Tayna_Sampaio_36.gif', caption: 'A arte do breaking.' },
                  { url: 'https://i.postimg.cc/V6kSHtWJ/Tayna_Sampaio_36.gif', caption: 'A arte do breaking.' }
                ]
              },
              { 
                title: 'Dança Infantil', 
                desc: 'Desenvolvimento lúdico e coordenação para os pequenos.', 
                icon: Users,
                images: [
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'Diversão e aprendizado lúdico.' },
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'Primeiros passos na cultura urbana.' }
                ]
              },
              { 
                title: 'Dança para PCD', 
                desc: 'Inclusão total e adaptação criativa através do movimento.', 
                icon: CheckCircle2,
                images: [
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'Superação e arte sem limites.' },
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'O corpo como instrumento de voz.' }
                ]
              },
              { 
                title: 'Terceira Idade', 
                desc: 'Saúde, ritmo e socialização para a melhor idade.', 
                icon: Clock,
                images: [
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'Vitalidade e alegria no movimento.' },
                  { url: 'https://i.postimg.cc/HLBn5xDq/34842538_1935308959853686_5717212640527253504_n.jpg', caption: 'Saúde física e mental através da dança.' }
                ]
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#1A1A1A] p-8 rounded-3xl border border-white/5 hover:border-[#F5C400] transition-all group">
                <ModalidadeCarousel images={item.images} />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#F5C400] rounded-xl flex items-center justify-center text-black transform group-hover:rotate-12 transition-transform shrink-0">
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-['Anton'] text-2xl uppercase tracking-wider">{item.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para Quem */}
      <section className="rev py-32 px-6">
        <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="st font-['Anton'] text-6xl md:text-8xl uppercase mb-8 leading-none">PARA QUEM É A <span className="text-[#F5C400]">URBRASIL?</span></h2>
            <div className="space-y-6">
              {[
                'Iniciantes que nunca dançaram e querem começar.',
                'Dançarinos que buscam aperfeiçoamento técnico.',
                'Pessoas que buscam uma atividade física prazerosa.',
                'Quem quer fazer parte de uma comunidade vibrante.',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="text-[#F5C400] mt-1 shrink-0" size={24} />
                  <p className="text-xl text-gray-400 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <img src="https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg" className="rounded-3xl aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all" alt="Alunos da URBrasil praticando dança urbana" />
            <img src="https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg" className="rounded-3xl aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all mt-12" alt="Grupo de dança urbana da URBrasil em apresentação" />
          </div>
        </div>
      </section>
      
      {/* Depoimentos */}
      <section className="rev py-32 bg-[#111] px-6 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="st font-['Anton'] text-6xl md:text-8xl uppercase mb-4">O QUE DIZEM <span className="text-[#F5C400]">NOSSOS ALUNOS</span></h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Histórias reais de quem vive a cultura urbana todos os dias.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ana Silva",
                role: "Aluna de Hip Hop",
                text: "A URBrasil mudou minha forma de ver a dança. O Felipe é um mestre incrível que nos desafia a cada aula a encontrar nossa própria identidade.",
                img: "https://picsum.photos/seed/ana/200/200"
              },
              {
                name: "Lucas Santos",
                role: "Aluno de House",
                text: "Ambiente acolhedor e técnica de alto nível. Comecei como iniciante e hoje me sinto confiante para improvisar em qualquer pista.",
                img: "https://picsum.photos/seed/lucas/200/200"
              },
              {
                name: "Mariana Costa",
                role: "Mãe de Aluna",
                text: "Minha filha ama as aulas infantis. O desenvolvimento da coordenação e da confiança dela é nítido. Uma escola que realmente se importa.",
                img: "https://picsum.photos/seed/mari/200/200"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-[#1A1A1A] p-10 rounded-3xl border border-white/5 relative group hover:border-[#F5C400]/50 transition-all">
                <Quote className="absolute top-8 right-8 text-[#F5C400]/20 group-hover:text-[#F5C400]/40 transition-colors" size={48} />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#F5C400]">
                    <img 
                      src={testimonial.img} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-['Anton'] text-xl uppercase tracking-wider">{testimonial.name}</h4>
                    <p className="text-[#F5C400] text-xs font-bold uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>

                <p className="text-gray-400 italic leading-relaxed font-medium">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Depoimentos */}
      <section className="rev py-32 bg-[#111] px-6 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="st font-['Anton'] text-6xl md:text-8xl uppercase mb-4">O QUE DIZEM <span className="text-[#F5C400]">NOSSOS ALUNOS</span></h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Histórias reais de quem vive a cultura urbana todos os dias.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ana Silva",
                role: "Aluna de Hip Hop",
                text: "A URBrasil mudou minha forma de ver a dança. O Felipe é um mestre incrível que nos desafia a cada aula a encontrar nossa própria identidade.",
                img: "https://picsum.photos/seed/ana/200/200"
              },
              {
                name: "Lucas Santos",
                role: "Aluno de House",
                text: "Ambiente acolhedor e técnica de alto nível. Comecei como iniciante e hoje me sinto confiante para improvisar em qualquer pista.",
                img: "https://picsum.photos/seed/lucas/200/200"
              },
              {
                name: "Mariana Costa",
                role: "Mãe de Aluna",
                text: "Minha filha ama as aulas infantis. O desenvolvimento da coordenação e da confiança dela é nítido. Uma escola que realmente se importa.",
                img: "https://picsum.photos/seed/mari/200/200"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-[#1A1A1A] p-10 rounded-3xl border border-white/5 relative group hover:border-[#F5C400]/50 transition-all">
                <Quote className="absolute top-8 right-8 text-[#F5C400]/20 group-hover:text-[#F5C400]/40 transition-colors" size={48} />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#F5C400]">
                    <img 
                      src={testimonial.img} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-['Anton'] text-xl uppercase tracking-wider">{testimonial.name}</h4>
                    <p className="text-[#F5C400] text-xs font-bold uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>

                <p className="text-gray-400 italic leading-relaxed font-medium">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section id="eventos" className="rev py-32 px-6 bg-[#0A0A0A]">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="st font-['Anton'] text-6xl md:text-8xl uppercase mb-4">PRÓXIMOS <span className="text-[#F5C400]">EVENTOS</span></h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Não perca nossas próximas experiências e workshops.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Workshop de Breaking',
                date: '25 de Março',
                location: 'Sede URBrasil, Petrópolis',
                link: '#'
              },
              {
                title: 'Aulão de Hip Hop',
                date: '10 de Abril',
                location: 'Praça da Liberdade, Petrópolis',
                link: '#'
              },
              {
                title: 'URBrasil Battle',
                date: '05 de Maio',
                location: 'Centro Cultural, Petrópolis',
                link: '#'
              }
            ].map((evento, i) => (
              <div key={i} className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-[#F5C400] transition-all group">
                <div className="text-[#F5C400] font-bold uppercase tracking-widest text-xs mb-2">{evento.date}</div>
                <h3 className="font-['Anton'] text-2xl uppercase tracking-wider mb-2">{evento.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{evento.location}</p>
                <button onClick={() => setShowQuiz(true)} className="inline-block border border-white/20 px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-[#F5C400] hover:text-black transition-all">
                  Saiba Mais
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="rev py-32 bg-[#0A0A0A] px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F5C400] to-transparent opacity-20"></div>
        
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="st font-['Anton'] text-6xl md:text-8xl uppercase mb-4">ESCOLHA SEU <span className="text-[#F5C400]">PLANO</span></h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">Invista em você e faça parte do movimento.</p>
            <p className="text-sm font-bold uppercase tracking-widest text-[#F5C400]">Junte-se a +500 alunos que já otimizaram seus resultados</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 1x na Semana */}
            <div className="bg-[#111] p-10 rounded-3xl border border-white/5 flex flex-col">
              <h3 className="font-['Anton'] text-3xl uppercase tracking-wider mb-6">1x NA SEMANA</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-gray-400">Mensal (Ancoragem)</span>
                  <span className="text-2xl font-bold">R$ 130,00</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <div className="font-bold">6 Meses (15% OFF)</div>
                    <div className="text-xs text-green-500 uppercase">Economize R$ 117,00</div>
                  </div>
                  <span className="text-2xl font-bold text-[#F5C400]">R$ 663,00</span>
                </div>
                <div className="flex justify-between items-center pb-4">
                  <div>
                    <div className="font-bold">1 Ano (30% OFF)</div>
                    <div className="text-xs text-green-500 uppercase">Economize R$ 468,00</div>
                    <div className="text-xs text-gray-500">Apenas R$ 91,00/mês</div>
                  </div>
                  <span className="text-2xl font-bold text-[#F5C400]">R$ 1.092,00</span>
                </div>
              </div>
              <button onClick={() => setShowQuiz(true)} className="mt-10 w-full border border-white/20 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center">
                Invista em você
              </button>
            </div>

            {/* 2x na Semana - DESTACADO */}
            <div className="bg-[#111] p-10 rounded-3xl border-2 border-[#F5C400] flex flex-col relative shadow-[0_0_50px_rgba(245,196,0,0.1)]">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#F5C400] text-black font-['Anton'] px-6 py-2 rounded-full text-sm tracking-widest uppercase">
                Mais Escolhido
              </div>
              <h3 className="font-['Anton'] text-3xl uppercase tracking-wider mb-6">2x NA SEMANA</h3>
              <div className="space-y-6 flex-1">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-gray-400">Mensal (Ancoragem)</span>
                  <span className="text-2xl font-bold">R$ 160,00</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <div className="font-bold">6 Meses (15% OFF)</div>
                    <div className="text-xs text-green-500 uppercase">Economize R$ 144,00</div>
                  </div>
                  <span className="text-2xl font-bold text-[#F5C400]">R$ 816,00</span>
                </div>
                <div className="flex justify-between items-center pb-4">
                  <div>
                    <div className="font-bold">1 Ano (30% OFF)</div>
                    <div className="text-xs text-green-500 uppercase">Economize R$ 576,00</div>
                    <div className="text-xs text-gray-500">Apenas R$ 112,00/mês</div>
                  </div>
                  <span className="text-2xl font-bold text-[#F5C400]">R$ 1.344,00</span>
                </div>
              </div>
              <button onClick={() => setShowQuiz(true)} className="mt-10 w-full bg-[#F5C400] text-black py-5 rounded-xl font-['Anton'] text-xl uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center">
                Invista em você
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Audition */}
      <section className="audition rev py-32 bg-[#F5C400] text-black px-6">
        <div className="container max-w-7xl mx-auto text-center">
          <h2 className="st font-['Anton'] text-7xl md:text-9xl uppercase mb-8 leading-none">AUDIÇÃO <br /> HISTÓRICA</h2>
          <p className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-12 max-w-3xl mx-auto">
            Faça parte da companhia oficial URBrasil e represente o movimento em competições e palcos nacionais.
          </p>
          <button onClick={() => setShowQuiz(true)} className="inline-flex items-center gap-4 bg-black text-[#F5C400] font-['Anton'] text-3xl px-12 py-6 rounded-2xl hover:scale-105 transition-transform">
            QUERO ME INSCREVER <ArrowRight size={32} />
          </button>
        </div>
      </section>

      {/* App Section */}
      <section className="app-section rev py-32 px-6 bg-[#0A0A0A] border-t border-white/5">
        <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="piw relative">
            <div className="relative z-10 w-full max-w-[300px] mx-auto aspect-[9/19] bg-[#111] rounded-[3rem] border-8 border-[#1A1A1A] overflow-hidden shadow-[0_0_100px_rgba(245,196,0,0.15)]">
              <img src="https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg" className="w-full h-full object-cover grayscale opacity-50" alt="App Preview" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="font-['Anton'] text-4xl text-[#F5C400] mb-4">URBRASIL APP</div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Em Breve na App Store e Google Play</p>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5C400]/5 rounded-full blur-3xl -z-0"></div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F5C400]/10 text-[#F5C400] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#F5C400]/20">
              <Smartphone size={14} /> TECNOLOGIA & MOVIMENTO
            </div>
            <h2 className="st font-['Anton'] text-6xl md:text-7xl uppercase mb-8 leading-none">SUA JORNADA NO <span className="text-[#F5C400]">BOLSO</span></h2>
            <p className="text-xl text-gray-400 mb-10 font-medium">
              Acompanhe seu progresso, acesse conteúdos exclusivos, gerencie suas aulas e conecte-se com a comunidade através do nosso aplicativo oficial.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                <div className="text-[#F5C400] font-bold mb-2 uppercase tracking-widest text-xs">Aulas Online</div>
                <p className="text-sm text-gray-500">Assista tutoriais e coreografias de qualquer lugar.</p>
              </div>
              <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                <div className="text-[#F5C400] font-bold mb-2 uppercase tracking-widest text-xs">Comunidade</div>
                <p className="text-sm text-gray-500">Troque experiências com outros alunos da rede.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section rev py-32 px-6 bg-[#111]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="st font-['Anton'] text-6xl uppercase mb-16 text-center">DÚVIDAS <span className="text-[#F5C400]">FREQUENTES</span></h2>
          <div className="space-y-4">
            {[
              { q: 'Preciso ter experiência para começar?', a: 'Não! Temos turmas específicas para iniciantes absolutos.' },
              { q: 'Qual a idade mínima?', a: 'Atendemos crianças a partir de 7 anos, jovens e adultos.' },
              { q: 'Onde as aulas acontecem?', a: 'Nossa sede fica no coração de Petrópolis, com infraestrutura completa.' },
              { q: 'Posso fazer uma aula experimental?', a: 'Com certeza! Agende agora pelo nosso WhatsApp.' },
            ].map((faq, i) => (
              <div key={i} className="faq-item bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold uppercase tracking-wider">{faq.q}</span>
                  <ChevronDown className={`text-[#F5C400] transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="p-6 pt-0 text-gray-400 border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="social-section py-24 px-6 bg-black relative overflow-hidden">
        <div className="container max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#F5C400]/10 text-[#F5C400] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#F5C400]/20">
            <Users size={14} /> COMUNIDADE URBRASIL
          </div>
          <h2 className="st font-['Anton'] text-6xl md:text-8xl uppercase mb-12 leading-none">SIGA O <span className="text-[#F5C400]">MOVIMENTO</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <a href="https://instagram.com/urbrasil" target="_blank" rel="noreferrer" className="group p-10 bg-[#111] rounded-3xl border border-white/5 hover:border-[#F5C400]/50 transition-all">
              <Instagram size={48} className="mx-auto mb-6 text-gray-500 group-hover:text-[#F5C400] transition-colors" />
              <div className="font-['Anton'] text-xl uppercase tracking-wider">Instagram</div>
              <div className="text-xs text-gray-600 uppercase tracking-widest mt-2">@urbrasil</div>
            </a>
            <a href="https://instagram.com/felipelaureano.o" target="_blank" rel="noreferrer" className="group p-10 bg-[#111] rounded-3xl border border-white/5 hover:border-[#F5C400]/50 transition-all">
              <Instagram size={48} className="mx-auto mb-6 text-gray-500 group-hover:text-[#F5C400] transition-colors" />
              <div className="font-['Anton'] text-xl uppercase tracking-wider">Instagram</div>
              <div className="text-xs text-gray-600 uppercase tracking-widest mt-2">@felipelaureano.o</div>
            </a>
            <a href="https://youtube.com/urbanamentebr" target="_blank" rel="noreferrer" className="group p-10 bg-[#111] rounded-3xl border border-white/5 hover:border-[#F5C400]/50 transition-all">
              <Youtube size={48} className="mx-auto mb-6 text-gray-500 group-hover:text-[#F5C400] transition-colors" />
              <div className="font-['Anton'] text-xl uppercase tracking-wider">YouTube</div>
              <div className="text-xs text-gray-600 uppercase tracking-widest mt-2">Urbanamente BR</div>
            </a>
            <a href="https://facebook.com/urbrasil" target="_blank" rel="noreferrer" className="group p-10 bg-[#111] rounded-3xl border border-white/5 hover:border-[#F5C400]/50 transition-all">
              <Facebook size={48} className="mx-auto mb-6 text-gray-500 group-hover:text-[#F5C400] transition-colors" />
              <div className="font-['Anton'] text-xl uppercase tracking-wider">Facebook</div>
              <div className="text-xs text-gray-600 uppercase tracking-widest mt-2">URBrasil Oficial</div>
            </a>
            <button onClick={() => setShowQuiz(true)} className="group p-10 bg-[#111] rounded-3xl border border-white/5 hover:border-[#F5C400]/50 transition-all">
              <MessageCircle size={48} className="mx-auto mb-6 text-gray-500 group-hover:text-[#F5C400] transition-colors" />
              <div className="font-['Anton'] text-xl uppercase tracking-wider">WhatsApp</div>
              <div className="text-xs text-gray-600 uppercase tracking-widest mt-2">(24) 2246-6753</div>
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F5C400]/5 rounded-full blur-[120px] -z-0"></div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] py-20 px-6 border-t border-white/5">
        <div className="container max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="fbr font-['Anton'] text-4xl text-[#F5C400] mb-6">URBRASIL</div>
            <p className="text-gray-500 max-w-sm mb-8">
              O maior movimento de danças urbanas da região serrana. Transformando vidas através do movimento e da cultura.
            </p>
            <div className="fsocial flex gap-6">
              <a href="https://instagram.com/urbrasil" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#F5C400] transition-colors"><Instagram size={24} /></a>
              <a href="https://instagram.com/felipelaureano.o" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#F5C400] transition-colors"><Instagram size={24} /></a>
              <a href="https://youtube.com/urbanamentebr" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#F5C400] transition-colors"><Youtube size={24} /></a>
              <a href="https://facebook.com/urbrasil" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#F5C400] transition-colors"><Facebook size={24} /></a>
              <a href="https://twitter.com/urbrasil" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#F5C400] transition-colors"><Twitter size={24} /></a>
              <button onClick={() => setShowQuiz(true)} className="text-gray-400 hover:text-[#F5C400] transition-colors"><MessageCircle size={24} /></button>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Links Rápidos</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#modalidades" className="hover:text-white transition-colors">Modalidades</a></li>
              <li><a href="#precos" className="hover:text-white transition-colors">Planos e Preços</a></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Área do Aluno</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Contato</h4>
            <p className="text-gray-500 text-sm mb-4">Petrópolis, RJ - Brasil</p>
            <p className="text-gray-500 text-sm mb-4">contato@urbrasil.com.br</p>
            <p className="text-[#F5C400] font-bold text-sm">(24) 2246-6753</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-600 uppercase tracking-widest">
          © 2026 Felipe Laureano. Todos os direitos reservados.
        </div>
      </footer>
      {showQuiz && <LeadQuiz onClose={() => setShowQuiz(false)} />}
    </div>
  );
}
