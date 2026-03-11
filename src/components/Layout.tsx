import { Outlet, Link, useLocation } from 'react-router-dom';
import { User } from 'firebase/auth';
import { logout } from '../firebase';
import { Home, ShoppingBag, LogOut, User as UserIcon, FileText } from 'lucide-react';

export default function Layout({ user }: { user: User }) {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Início' },
    { path: '/blog', icon: FileText, label: 'Blog' },
    { path: '/store', icon: ShoppingBag, label: 'Loja' },
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white font-['Barlow'] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-[#1A1A1A] flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="font-['Anton'] text-3xl text-[#F5C400] tracking-wider">URBRASIL</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#F5C400] text-black font-bold' 
                    : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="uppercase tracking-wider text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1A1A1A]">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={user.photoURL || 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg'} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border border-[#F5C400]"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user.displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            SAIR
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#1A1A1A] flex justify-around p-4 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${
                isActive ? 'text-[#F5C400]' : 'text-gray-500'
              }`}
            >
              <Icon size={24} />
              <span className="text-[10px] uppercase font-bold">{item.label}</span>
            </Link>
          );
        })}
        <button onClick={logout} className="flex flex-col items-center gap-1 text-red-500">
          <LogOut size={24} />
          <span className="text-[10px] uppercase font-bold">Sair</span>
        </button>
      </nav>
    </div>
  );
}
