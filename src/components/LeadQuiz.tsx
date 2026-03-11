import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, MessageCircle, X } from 'lucide-react';

interface LeadQuizProps {
  onClose: () => void;
}

export default function LeadQuiz({ onClose }: LeadQuizProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    style: '',
    plan: '',
    suggestion: ''
  });

  const styles = ['Hip Hop', 'House', 'Breaking', 'Infantil', 'PCD', 'Terceira Idade'];
  const plans = ['1x na Semana', '2x na Semana'];

  const handleSend = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de me inscrever na URBrasil.\n\n` +
      `Estilo escolhido: ${data.style}\n` +
      `Plano escolhido: ${data.plan}\n` +
      `Sugestão/Comentário: ${data.suggestion || 'Nenhuma'}`
    );
    window.open(`https://wa.me/552422466753?text=${message}`, '_blank');
    onClose();
  };

  const steps = [
    {
      title: 'Qual estilo você quer dominar?',
      content: (
        <div className="grid grid-cols-2 gap-4">
          {styles.map(style => (
            <button
              key={style}
              onClick={() => { setData({...data, style}); setStep(1); }}
              className="p-4 bg-[#1A1A1A] border border-white/10 rounded-xl hover:border-[#F5C400] transition-all text-left"
            >
              {style}
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Qual o seu plano ideal?',
      content: (
        <div className="grid grid-cols-1 gap-4">
          {plans.map(plan => (
            <button
              key={plan}
              onClick={() => { setData({...data, plan}); setStep(2); }}
              className="p-6 bg-[#1A1A1A] border border-white/10 rounded-xl hover:border-[#F5C400] transition-all text-left flex justify-between items-center"
            >
              {plan}
              <ArrowRight size={20} />
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Alguma sugestão ou dúvida?',
      content: (
        <div className="space-y-4">
          <textarea
            value={data.suggestion}
            onChange={(e) => setData({...data, suggestion: e.target.value})}
            className="w-full p-4 bg-[#1A1A1A] border border-white/10 rounded-xl text-white focus:border-[#F5C400] outline-none"
            rows={4}
            placeholder="Conte-nos um pouco mais..."
          />
          <button
            onClick={handleSend}
            className="w-full bg-[#F5C400] text-black font-bold py-4 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Enviar para WhatsApp
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl w-full max-w-lg relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X /></button>
        
        <h2 className="font-['Anton'] text-3xl uppercase mb-8">{steps[step].title}</h2>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {steps[step].content}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
