import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const quizQuestions = [
  {
    question: "Qual é o seu maior desafio hoje na dança?",
    options: ["Falta de técnica", "Falta de confiança", "Não sei por onde começar", "Quero evoluir mais rápido"]
  },
  {
    question: "Como você se sente ao dançar?",
    options: ["Livre", "Inseguro", "Energizado", "Frustrado"]
  }
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.currentUser) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        uid: auth.currentUser.uid,
        name,
        email,
        quizResult: answers.join(' | '),
        createdAt: serverTimestamp()
      });
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-['Anton'] text-[#F5C400] mb-6">Obrigado por compartilhar!</h2>
        <p className="text-lg mb-8">Temos o caminho ideal para você evoluir na dança.</p>
        <div className="space-y-4">
          <a href="#precos" className="block bg-[#F5C400] text-black px-8 py-4 rounded-xl font-bold uppercase">Agendar Aula Presencial</a>
          <p className="text-gray-400">Aulas online agendadas e nosso App chegam em breve!</p>
          <a href="/livros" className="block text-[#F5C400] underline">Conheça os livros de Felipe Laureano</a>
        </div>
      </div>
    );
  }

  if (step < quizQuestions.length) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white p-8 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-['Anton'] mb-8">{quizQuestions[step].question}</h2>
        <div className="grid gap-4 w-full max-w-md">
          {quizQuestions[step].options.map(opt => (
            <button key={opt} onClick={() => handleAnswer(opt)} className="bg-[#111] p-4 rounded-xl border border-white/10 hover:border-[#F5C400] transition-all">
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-['Anton'] mb-8">Para finalizar, conte-nos quem é você:</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required className="w-full p-4 rounded-xl bg-[#111] border border-white/10" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-4 rounded-xl bg-[#111] border border-white/10" />
        <button type="submit" className="w-full bg-[#F5C400] text-black p-4 rounded-xl font-bold uppercase">Finalizar</button>
      </form>
    </div>
  );
}
