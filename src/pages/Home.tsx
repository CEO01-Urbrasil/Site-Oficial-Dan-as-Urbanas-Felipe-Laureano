import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Instagram, 
  Youtube, 
  MessageCircle, 
  ChevronDown, 
  Music, 
  Zap, 
  Star, 
  Users, 
  Smartphone,
  Clock,
  ArrowLeft
} from 'lucide-react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 30 });

  useEffect(() => {
    // Scroll and Reveal Logic
    const handleScroll = () => {
      const s = window.scrollY;
      const g = document.getElementById('ghost');
      if (g) g.style.transform = `translate(-50%,calc(-50% + ${s * 0.3}px))`;
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
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg" 
            alt="Felipe Laureano" 
            className="w-full h-full object-cover opacity-40 grayscale"
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
              <span className="text-[#F5C400] whitespace-nowrap">FELIPE LAUREANO</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-lg mb-10 font-medium">
              Aulas exclusivas com <span className="whitespace-nowrap">Felipe Laureano</span> em Petrópolis. Hip Hop, Charme, Afro e Contemporâneo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#precos" className="bg-[#F5C400] text-black font-['Anton'] text-2xl px-10 py-5 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                QUERO COMEÇAR AGORA <ArrowRight size={24} />
              </a>
              <a href="#sobre" className="border border-white/20 hover:bg-white/5 text-white font-bold px-10 py-5 rounded-xl flex items-center justify-center gap-3 transition-all">
                CONHECER O PROJETO
              </a>
            </div>
          </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute bottom-10 right-10 hidden lg:block">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-xs">
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
              HIP HOP • CHARME • AFRO • CONTEMPORÂNEO • URBRASIL • MOVIMENTO • 
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
                  src="https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg" 
                  alt="Felipe Laureano" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
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
                  <span className="whitespace-nowrap">Felipe Laureano</span> é uma das maiores referências em danças urbanas da região. Com passagens por grandes palcos e workshops internacionais, ele traz para Petrópolis uma metodologia única que une técnica, história e expressão.
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Hip Hop Dance', desc: 'Fundamentos, grooves e coreografias da cultura urbana.', icon: Music },
              { title: 'Charme', desc: 'Elegância, passos sociais e a essência dos bailes black.', icon: Star },
              { title: 'Dança Afro', desc: 'Conexão ancestral, força e ritmos tradicionais.', icon: Zap },
              { title: 'Contemporâneo', desc: 'Expressão, fluidez e pesquisa de movimento.', icon: Users },
            ].map((item, i) => (
              <div key={i} className="bg-[#1A1A1A] p-10 rounded-3xl border border-white/5 hover:border-[#F5C400] transition-all group">
                <div className="w-16 h-16 bg-[#F5C400] rounded-2xl flex items-center justify-center text-black mb-8 transform group-hover:rotate-12 transition-transform">
                  <item.icon size={32} />
                </div>
                <h3 className="font-['Anton'] text-3xl mb-4 uppercase tracking-wider">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
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
            <img src="https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg" className="rounded-3xl aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all" alt="Dance 1" />
            <img src="https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg" className="rounded-3xl aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all mt-12" alt="Dance 2" />
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="rev py-32 bg-[#0A0A0A] px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F5C400] to-transparent opacity-20"></div>
        
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="st font-['Anton'] text-6xl md:text-8xl uppercase mb-4">ESCOLHA SEU <span className="text-[#F5C400]">PLANO</span></h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">Invista no seu talento e faça parte do movimento.</p>
            
            {/* Countdown Timer */}
            <div className="inline-flex items-center gap-4 bg-[#111] border border-[#F5C400]/30 px-6 py-3 rounded-2xl">
              <Clock className="text-[#F5C400]" size={20} />
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Oferta expira em:</span>
              <div className="flex gap-2 font-['Anton'] text-2xl text-[#F5C400]">
                <span>{formatNum(timeLeft.h)}h</span>
                <span>{formatNum(timeLeft.m)}m</span>
                <span>{formatNum(timeLeft.s)}s</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plano Starter */}
            <div className="p-card bg-[#111] p-10 rounded-3xl border border-white/5 flex flex-col relative group">
              <div className="mb-8">
                <h3 className="font-['Anton'] text-3xl uppercase tracking-wider mb-2">STARTER</h3>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">1x por semana</p>
              </div>
              <div className="mb-8">
                <div className="text-5xl font-['Anton'] text-[#F5C400]">R$ 130<span className="text-lg text-gray-500">/mês</span></div>
                <p className="text-xs text-gray-600 mt-2 font-bold uppercase">Pix ou Boleto</p>
                <p className="text-xs text-gray-600 mt-1">Cartão: R$ 143/mês</p>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-[#F5C400]" /> Acesso a 1 modalidade
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-[#F5C400]" /> Material de apoio digital
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-[#F5C400]" /> Certificado de participação
                </li>
              </ul>
              <a href="https://wa.me/5524992211941?text=Quero%20me%20inscrever%20no%20Plano%201x%20por%20semana" className="w-full border border-white/20 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center">
                Selecionar Plano
              </a>
            </div>

            {/* Plano Evolução - DESTACADO */}
            <div className="p-card featured bg-[#111] p-10 rounded-3xl border-2 border-[#F5C400] flex flex-col relative transform md:-translate-y-4 shadow-[0_0_50px_rgba(245,196,0,0.1)]">
              <div className="p-badge absolute -top-5 left-1/2 -translate-x-1/2 bg-[#F5C400] text-black font-['Anton'] px-6 py-2 rounded-full text-sm tracking-widest">
                MAIS ESCOLHIDO
              </div>
              <div className="mb-8">
                <h3 className="font-['Anton'] text-3xl uppercase tracking-wider mb-2">EVOLUÇÃO</h3>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">2x por semana</p>
              </div>
              <div className="mb-8">
                <div className="text-5xl font-['Anton'] text-[#F5C400]">R$ 160<span className="text-lg text-gray-500">/mês</span></div>
                <p className="text-xs text-gray-600 mt-2 font-bold uppercase">Pix ou Boleto</p>
                <p className="text-xs text-gray-600 mt-1">Cartão: R$ 176/mês</p>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white text-sm font-bold">
                  <CheckCircle2 size={18} className="text-[#F5C400]" /> Acesso a 2 modalidades
                </li>
                <li className="flex items-center gap-3 text-white text-sm font-bold">
                  <CheckCircle2 size={18} className="text-[#F5C400]" /> Desconto em Workshops
                </li>
                <li className="flex items-center gap-3 text-white text-sm font-bold">
                  <CheckCircle2 size={18} className="text-[#F5C400]" /> Acesso antecipado a eventos
                </li>
                <li className="flex items-center gap-3 text-white text-sm font-bold">
                  <CheckCircle2 size={18} className="text-[#F5C400]" /> Mentoria em grupo mensal
                </li>
              </ul>
              <a href="https://wa.me/5524992211941?text=Quero%20me%20inscrever%20no%20Plano%202x%20por%20semana" className="w-full bg-[#F5C400] text-black py-5 rounded-xl font-['Anton'] text-xl uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center">
                QUERO ESTE PLANO
              </a>
            </div>

            {/* Plano Anual */}
            <div className="p-card bg-[#111] p-10 rounded-3xl border border-white/5 flex flex-col relative">
              <div className="absolute top-6 right-6">
                <div className="bg-green-500/10 text-green-500 text-[10px] font-bold px-3 py-1 rounded-full border border-green-500/20 uppercase tracking-widest">
                  Melhor Custo-Benefício
                </div>
              </div>
              <div className="mb-8">
                <h3 className="font-['Anton'] text-3xl uppercase tracking-wider mb-2">ANUAL</h3>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">2x por semana</p>
              </div>
              <div className="mb-8">
                <div className="text-5xl font-['Anton'] text-[#F5C400]">12x R$ 160</div>
                <p className="text-xs text-gray-600 mt-2 font-bold uppercase">Sem acréscimo no cartão</p>
                <p className="text-xs text-green-500 mt-1 font-bold uppercase">Preço travado por 1 ano</p>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-[#F5C400]" /> Proteção contra reajustes
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-[#F5C400]" /> Camiseta URBrasil Grátis
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-[#F5C400]" /> 1 Workshop internacional incluso
                </li>
              </ul>
              <a href="https://wa.me/5524992211941?text=Quero%20saber%20mais%20sobre%20o%20Plano%20Anual%2012x" className="w-full border border-white/20 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center">
                Assinar Anual
              </a>
            </div>
          </div>

          {/* Garantia */}
          <div className="mt-20 text-center bg-[#111] p-8 rounded-3xl border border-white/5 max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle2 size={32} />
              </div>
            </div>
            <h4 className="font-['Anton'] text-2xl uppercase mb-2">RISCO ZERO</h4>
            <p className="text-gray-500 text-sm">
              Experimente sua primeira aula. Se não se adaptar, devolvemos seu investimento sem perguntas. 
              Acreditamos tanto na nossa metodologia que o risco é todo nosso.
            </p>
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
          <a href="https://wa.me/5524992645678" className="inline-flex items-center gap-4 bg-black text-[#F5C400] font-['Anton'] text-3xl px-12 py-6 rounded-2xl hover:scale-105 transition-transform">
            QUERO ME INSCREVER <ArrowRight size={32} />
          </a>
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

      {/* Footer */}
      <footer className="bg-[#111] py-20 px-6 border-t border-white/5">
        <div className="container max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="fbr font-['Anton'] text-4xl text-[#F5C400] mb-6">URBRASIL</div>
            <p className="text-gray-500 max-w-sm mb-8">
              O maior movimento de danças urbanas da região serrana. Transformando vidas através do movimento e da cultura.
            </p>
            <div className="fsocial flex gap-6">
              <a href="https://instagram.com/felipelaureano.o" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#F5C400] transition-colors"><Instagram size={24} /></a>
              <a href="https://youtube.com/urbanamentebr" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#F5C400] transition-colors"><Youtube size={24} /></a>
              <a href="https://wa.me/5524992645678" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#F5C400] transition-colors"><MessageCircle size={24} /></a>
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
            <p className="text-[#F5C400] font-bold text-sm">(24) 99264-5678</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-600 uppercase tracking-widest">
          © 2026 Felipe Laureano. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
