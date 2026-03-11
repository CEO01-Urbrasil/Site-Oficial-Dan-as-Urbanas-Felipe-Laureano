import React, { useState } from 'react';
import { db, auth, registerWithEmail } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const quizQuestions = [
  {
    question: "Você é aluno atualmente ou já foi aluno?",
    options: ["Sou aluno atualmente", "Já fui aluno"]
  },
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
  const [status, setStatus] = useState(''); // 'Sou aluno atualmente' or 'Já fui aluno'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (answer: string) => {
    if (step === 0) {
      setStatus(answer);
    }
    setAnswers([...answers, answer]);
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      let user = auth.currentUser;
      if (!user) {
        user = await registerWithEmail(email, password);
      }
      
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name,
          email,
          status,
          quizResult: answers.join(' | '),
          createdAt: serverTimestamp()
        });
        setFinished(true);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (finished) {
    const isCurrent = status === 'Sou aluno atualmente';
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-['Anton'] text-[#F5C400] mb-6">
          {isCurrent ? "Sua Jornada de Evolução" : "Bem-vindo de Volta!"}
        </h2>
        <p className="text-lg mb-8 max-w-md">
          {isCurrent 
            ? "Como você já faz parte da nossa comunidade, preparamos uma trilha focada em maestria e novos desafios para elevar seu nível técnico." 
            : "Sentimos sua falta! Preparamos uma trilha especial para você se reconectar com a dança e descobrir as novas técnicas que desenvolvemos."}
        </p>
        <div className="space-y-4 w-full max-w-sm">
          <a href="/dashboard" className="block bg-[#F5C400] text-black px-8 py-4 rounded-xl font-bold uppercase">Acessar Sua Trilha</a>
          <a href="/" className="block text-gray-400 hover:text-white underline">Explorar todo o conteúdo</a>
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
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required className="w-full p-4 rounded-xl bg-[#111] border border-white/10" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-4 rounded-xl bg-[#111] border border-white/10" />
        {!auth.currentUser && (
          <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-4 rounded-xl bg-[#111] border border-white/10" />
        )}
        <button type="submit" className="w-full bg-[#F5C400] text-black p-4 rounded-xl font-bold uppercase">Finalizar</button>
      </form>
    </div>
  );
}
