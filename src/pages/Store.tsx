import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, MessageCircle } from 'lucide-react';

export default function Store() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBuy = (productName: string) => {
    const message = encodeURIComponent(`Olá! Gostaria de comprar o produto: ${productName} da loja URBrasil.`);
    window.open(`https://wa.me/552422466753?text=${message}`, '_blank');
  };

  const products = [
    {
      id: 1,
      name: 'Camiseta Oficial URBrasil',
      price: 'R$ 89,90',
      image: 'https://i.postimg.cc/TPK1ms0g/foto_cara.png', // Corrected image URL
      rating: 5,
      badge: 'MAIS VENDIDO'
    },
    {
      id: 2,
      name: 'Moletom Canguru Danças Urbanas',
      price: 'R$ 189,90',
      image: 'https://i.postimg.cc/bwMHycQ5/Audição_felipe_Laure_12.jpg', // Placeholder
      rating: 4,
      badge: 'NOVO'
    },
    {
      id: 3,
      name: 'Calça Jogger Movimento',
      price: 'R$ 149,90',
      image: 'https://i.postimg.cc/VkTBfQjR/Audição_felipe_Laure_125.jpg', // Placeholder
      rating: 5,
      badge: ''
    },
    {
      id: 4,
      name: 'Boné Snapback Felipe Laureano',
      price: 'R$ 69,90',
      image: 'https://i.postimg.cc/CxtHhTGT/Audição_felipe_Laure_30.jpg', // Placeholder
      rating: 4,
      badge: ''
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-[#1A1A1A] pb-6">
          <div>
            <h1 className="font-['Anton'] text-4xl md:text-5xl text-[#F5C400] tracking-wider uppercase">Loja Oficial</h1>
            <p className="text-gray-400 font-['Barlow'] mt-2 text-lg">Vista a identidade do movimento.</p>
          </div>
          <button className="bg-[#111] border border-[#1A1A1A] p-4 rounded-full hover:bg-[#F5C400] hover:text-black transition-colors relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">0</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-[#111] border border-[#1A1A1A] rounded-2xl overflow-hidden group hover:border-[#F5C400] transition-colors flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-[#1A1A1A]">
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#F5C400] text-black text-xs font-bold px-3 py-1 rounded-full z-10 tracking-widest">
                    {product.badge}
                  </span>
                )}
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border transition-all z-20 ${
                    wishlist.includes(product.id) 
                    ? 'bg-red-500 border-red-500 text-white scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                    : 'bg-black/40 border-white/10 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                </button>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex gap-1 mb-3 text-[#F5C400]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < product.rating ? "currentColor" : "none"} className={i >= product.rating ? "text-gray-600" : ""} />
                  ))}
                </div>
                <h3 className="font-['Barlow_Condensed'] text-2xl font-bold mb-2 uppercase tracking-wide">{product.name}</h3>
                <p className="text-xl font-['Anton'] text-[#F5C400] mb-6 mt-auto">{product.price}</p>
                
                <button 
                  onClick={() => handleBuy(product.name)}
                  className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-[#F5C400] transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                >
                  <MessageCircle size={18} />
                  Comprar via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
