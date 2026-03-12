import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const blogPosts = [
  {
    id: 'urbrasil-creator-labs-2026',
    title: 'URBrasil: Lançamento do Laboratório de Criadores, Batalhas e Projetos de Dança',
    excerpt: 'Temos a emoção de anunciar o lançamento do Laboratório de Criadores URBrasil, Batalhas e Mercado de Projetos, apresentado pela Fundação de Cultura de Petrópolis, que acontecerá de 10 a 16 de setembro de 2026.',
    date: '12 Mar 2026',
    author: 'Equipe URBrasil',
    image: 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg',
    content: `
      <p>Temos a emoção de anunciar o lançamento do <strong>Laboratório de Criadores URBrasil, Batalhas e Mercado de Projetos</strong>, apresentado pela Fundação de Cultura de Petrópolis, que acontecerá de 10 a 16 de setembro de 2026.</p>
      <p>Apoiando escritores, diretores, produtores, criadores de séries e coreógrafos emergentes de Petrópolis e de todo o Brasil, esses programas oferecem workshops práticos de desenvolvimento profissional, mentoria personalizada e orientação de projetos com profissionais da indústria aclamados internacionalmente. Você também pode se inscrever para esses programas através da nossa plataforma online.</p>
      <p>Antes de enviar sua inscrição, certifique-se de se registrar para os <strong>Bootcamps URBrasil</strong> - o primeiro em 18 de março. O segundo em 22 de abril, em parceria com a Prefeitura de Petrópolis. Venha fazer perguntas, fortalecer sua inscrição e ganhar confiança para apresentar sua visão artística.</p>
    `
  },
  {
    id: 'felipe-laureano-estrategia-festivais',
    title: 'Felipe Laureano: Como Transformar Duas Coreografias em Prêmios Nacionais',
    excerpt: 'O diretor e coreógrafo explica como a forma, o caráter e a estratégia de festivais levaram a duas indicações de destaque para "O Vizinho Perfeito" e "A Rua é Nossa".',
    date: '10 Mar 2026',
    author: 'Redação URBrasil',
    image: 'https://i.postimg.cc/CxtHhTGT/Audição_felipe_Laure_30.jpg',
    content: `
      <p>O diretor e coreógrafo Felipe Laureano explica como a forma, o caráter e a estratégia de festivais levaram a duas indicações de destaque para as peças "O Vizinho Perfeito" e "A Rua é Nossa" nos maiores festivais de dança urbana do país.</p>
      <p>Nesta entrevista exclusiva, mergulhamos no processo criativo que transformou ideias simples em espetáculos premiados, destacando a importância da narrativa corporal e da conexão com o público.</p>
    `
  },
  {
    id: 'segredos-direcao-danca-urbana',
    title: 'Os Segredos de Direção por Trás de "Hamnet" na Dança Urbana',
    excerpt: 'Descubra o que a abordagem profundamente pessoal de Felipe Laureano para o espetáculo pode ensinar a todo diretor sobre história, personagem e como tirar os dançarinos de suas cabeças.',
    date: '08 Mar 2026',
    author: 'Equipe URBrasil',
    image: 'https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg',
    content: `
      <p>Descubra o que a abordagem profundamente pessoal de Felipe Laureano para o espetáculo pode ensinar a todo diretor sobre história, personagem e como tirar os dançarinos de suas cabeças.</p>
      <p>A transição do pensamento analítico para a pura expressão corporal é um dos maiores desafios na dança urbana. Neste artigo, exploramos as técnicas utilizadas nos ensaios da URBrasil em Petrópolis para alcançar a verdadeira essência do movimento.</p>
    `
  },
  {
    id: 'bootcamp-urbrasil-preparacao',
    title: 'Bootcamp URBrasil: Prepare-se para o Mercado da Dança',
    excerpt: 'Saiba tudo sobre o primeiro Bootcamp URBrasil no dia 18 de março. Uma oportunidade única para fortalecer sua inscrição e construir confiança.',
    date: '05 Mar 2026',
    author: 'Equipe URBrasil',
    image: 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg',
    content: `
      <p>O mercado da dança está em constante evolução. O Bootcamp URBrasil, que acontece no dia 18 de março em Petrópolis, é a sua chance de se preparar para os desafios da indústria criativa.</p>
      <p>Aprenda a fazer o pitch do seu projeto, entenda as dinâmicas de financiamento cultural e conecte-se com outros criadores da região serrana.</p>
    `
  },
  {
    id: 'mentoria-projetos-petropolis',
    title: 'Mentoria de Projetos: Conectando Talentos em Petrópolis',
    excerpt: 'Como o programa de mentoria da URBrasil está ajudando jovens talentos da região serrana a alcançarem palcos internacionais.',
    date: '01 Mar 2026',
    author: 'Redação URBrasil',
    image: 'https://i.postimg.cc/CxtHhTGT/Audição_felipe_Laure_30.jpg',
    content: `
      <p>A mentoria é uma peça chave no desenvolvimento de qualquer artista. Na URBrasil, nosso programa de mentoria conecta jovens talentos de Petrópolis com profissionais aclamados internacionalmente.</p>
      <p>Conheça as histórias de sucesso de alunos que transformaram suas paixões em carreiras sólidas através da orientação adequada e muito suor nos estúdios.</p>
    `
  },
  {
    id: 'danca-financiamento-internacional',
    title: 'Financiamento Internacional para Projetos de Dança',
    excerpt: 'Um guia completo sobre como o Mercado de Projetos da URBrasil facilita o acesso a fundos internacionais para criadores locais.',
    date: '25 Fev 2026',
    author: 'Equipe URBrasil',
    image: 'https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg',
    content: `
      <p>Captar recursos é um dos maiores desafios para produtores culturais. O Mercado de Projetos da URBrasil, em parceria com instituições internacionais, abre portas para o financiamento de espetáculos e pesquisas em dança.</p>
      <p>Neste guia, detalhamos os critérios de seleção e como você pode preparar seu portfólio para atrair investidores globais para a cena de Petrópolis.</p>
    `
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-b border-[#1A1A1A] pb-6">
          <h1 className="font-['Anton'] text-4xl md:text-5xl text-[#F5C400] tracking-wider uppercase">Blog URBrasil</h1>
          <p className="text-gray-400 font-['Barlow'] mt-2 text-lg">Notícias, artigos e novidades sobre o movimento em Petrópolis.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-[#111] border border-[#1A1A1A] rounded-2xl overflow-hidden group hover:border-[#F5C400] transition-colors flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                <h2 className="font-['Barlow_Condensed'] text-2xl font-bold mb-3 uppercase tracking-wide leading-tight group-hover:text-[#F5C400] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="mt-auto inline-flex items-center gap-2 text-[#F5C400] font-bold uppercase tracking-widest text-sm hover:gap-3 transition-all"
                >
                  Ler Matéria Completa <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
