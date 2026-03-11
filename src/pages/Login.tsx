import React, { useState } from 'react';
import { loginWithGoogle, loginWithEmail, registerWithEmail } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, UserPlus, ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getFriendlyErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/popup-closed-by-user':
        return 'O login com Google foi cancelado.';
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'E-mail ou senha incorretos.';
      case 'auth/email-already-in-use':
        return 'Este e-mail já está cadastrado.';
      case 'auth/weak-password':
        return 'A senha deve ter pelo menos 6 caracteres.';
      case 'auth/invalid-email':
        return 'O formato do e-mail é inválido.';
      default:
        return 'Ocorreu um erro na autenticação. Verifique seus dados e tente novamente.';
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      const user = await loginWithGoogle();
      
      // Check if it's a new user
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        navigate('/quiz');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(getFriendlyErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      if (activeTab === 'register') {
        await registerWithEmail(email, password);
        navigate('/quiz');
      } else {
        await loginWithEmail(email, password);
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(getFriendlyErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden font-['Barlow']">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.postimg.cc/CxtHhTGT/Audição_felipe_Laure_30.jpg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/95 to-zinc-950"></div>
      </div>
      
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium uppercase tracking-wider text-sm">Voltar ao Site</span>
      </Link>

      {/* Card */}
      <div className="z-10 bg-zinc-900/60 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/10 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="font-['Anton'] text-5xl text-[#F5C400] mb-2 tracking-wider">URBRASIL</h1>
          <p className="font-['Barlow_Condensed'] text-xl text-zinc-400 tracking-widest uppercase">
            Acesso à Comunidade
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-zinc-950/50 p-1 rounded-xl mb-8 border border-white/5">
          <button 
            type="button"
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'login' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            ENTRAR
          </button>
          <button 
            type="button"
            onClick={() => { setActiveTab('register'); setError(''); }}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'register' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            CADASTRAR
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="text-zinc-500" size={20} />
            </div>
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-950/50 border border-white/10 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400] transition-all placeholder:text-zinc-600"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="text-zinc-500" size={20} />
            </div>
            <input 
              type="password" 
              placeholder="Sua senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-950/50 border border-white/10 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400] transition-all placeholder:text-zinc-600"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#F5C400] text-zinc-950 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-[#FFD700] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {activeTab === 'register' ? <UserPlus size={20} /> : <LogIn size={20} />}
                {activeTab === 'register' ? 'CRIAR CONTA' : 'ENTRAR NA COMUNIDADE'}
              </>
            )}
          </button>
        </form>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Ou continue com</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          type="button"
          disabled={loading}
          className="w-full bg-white text-zinc-900 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
      </div>
    </div>
  );
}
