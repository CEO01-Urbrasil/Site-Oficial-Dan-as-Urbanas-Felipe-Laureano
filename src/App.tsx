import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Store from './pages/Store';
import Blog from './pages/Blog';
import Quiz from './pages/Quiz';
import FelipeLaureano from './pages/FelipeLaureano';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#F5C400]">
        <div className="animate-pulse text-2xl font-['Anton'] tracking-widest">CARREGANDO...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/felipe-laureano" element={<FelipeLaureano />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/quiz" element={<Quiz />} />
        
        {/* Authenticated Routes */}
        <Route element={user ? <Layout user={user} /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/store" element={<Store />} />
          <Route path="/blog" element={<Blog />} />
        </Route>

        {/* Fallback for old /app links */}
        <Route path="/app/*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
