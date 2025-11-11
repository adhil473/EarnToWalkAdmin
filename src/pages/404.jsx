import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Crown, Star, Zap, ArrowRight, Home } from 'lucide-react';

const MLMPageNotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [floatingCoins, setFloatingCoins] = useState([]);
  const [networkNodes, setNetworkNodes] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    // Create fewer floating money coins
    const coins = [];
    for (let i = 0; i < 6; i++) {
      coins.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 3,
        size: 24
      });
    }
    setFloatingCoins(coins);

// Create fewer network nodes
const nodes = [];
for (let i = 0; i < 4; i++) {
  nodes.push({
    id: i,
    left: 25 + Math.random() * 50,
    top: 25 + Math.random() * 50,
    delay: Math.random() * 2,
    size: 8
  });
}
setNetworkNodes(nodes);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 overflow-hidden flex items-center justify-center">
      
      {/* Floating money coins background */}
      <div className="absolute inset-0">
        {floatingCoins.map((coin) => (
          <div
            key={coin.id}
            className="absolute text-yellow-400 opacity-20 animate-bounce"
            style={{
              left: `${coin.left}%`,
              top: '-50px',
              animationDelay: `${coin.delay}s`,
              animationDuration: `${coin.duration}s`,
              fontSize: `${coin.size}px`,
              animation: `coinFall ${coin.duration}s ${coin.delay}s infinite linear`
            }}
          >
            <DollarSign />
          </div>
        ))}
      </div>

  {/* Network connection lines */}
  <div className="absolute inset-0 opacity-10">
    <svg className="w-full h-full">
      {networkNodes.map((node, index) => 
        networkNodes.slice(index + 1).map((targetNode, targetIndex) => (
          <line
            key={`${index}-${targetIndex}`}
            x1={`${node.left}%`}
            y1={`${node.top}%`}
            x2={`${targetNode.left}%`}
            y2={`${targetNode.top}%`}
            stroke="#10b981"
            strokeWidth="1"
            className="animate-pulse"
            style={{ animationDelay: `${node.delay}s` }}
          />
        ))
      )}
    </svg>
  </div>

  {/* Network nodes */}
  <div className="absolute inset-0">
    {networkNodes.map((node) => (
      <div
        key={node.id}
        className="absolute bg-emerald-400 rounded-full animate-ping"
        style={{
          left: `${node.left}%`,
          top: `${node.top}%`,
          width: `${node.size}px`,
          height: `${node.size}px`,
          animationDelay: `${node.delay}s`
        }}
      />
    ))}
  </div>

  {/* Top decorative elements - simplified */}
  <div className="absolute top-16 right-16 opacity-15">
    <TrendingUp className="w-12 h-12 text-emerald-400 animate-pulse" />
  </div>

  {/* Main content */}
  <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
    
    {/* 404 with minimal money theme */}
    <div className="mb-12 relative">
      <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text tracking-wider">
        404
      </h1>
      
      {/* Minimal dollar signs */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <DollarSign className="w-8 h-8 text-emerald-400 animate-pulse opacity-60" />
      </div>
      
      {/* Single pulsing ring */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-emerald-400 rounded-full opacity-10 animate-ping"></div>
    </div>

    {/* Simplified main text */}
    <div className="mb-12 space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-white animate-fadeInUp flex items-center justify-center gap-3" style={{animationDelay: '0.5s'}}>
        Page Not Found
      </h2>
      
      <p className="text-emerald-200 text-lg animate-fadeInUp" style={{animationDelay: '0.8s'}}>
        Your success journey continues elsewhere
      </p>
    </div>


    {/* Simple motivational text */}
    <div className="text-slate-400 italic animate-fadeInUp" style={{animationDelay: '1.2s'}}>
      "Success is just one step away"
    </div>
  </div>

  {/* Minimal bottom decorative elements */}
  <div className="absolute -bottom-20 -left-20 opacity-5">
    <div className="w-32 h-32 border border-emerald-400 rounded-full animate-spin-slow">
      <div className="w-full h-full flex items-center justify-center">
        <DollarSign className="w-8 h-8 text-emerald-400" />
      </div>
    </div>
  </div>

  {/* Custom CSS animations */}
  <style jsx>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes coinFall {
      0% {
        transform: translateY(-50px) rotate(0deg);
        opacity: 0.2;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }
    
    @keyframes glow {
      0%, 100% {
        text-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
      }
      50% {
        text-shadow: 0 0 40px rgba(34, 197, 94, 0.8), 0 0 60px rgba(251, 191, 36, 0.6);
      }
    }
    
    @keyframes typewriter {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
    }
    
    .animate-spin-slow {
      animation: spin-slow 8s linear infinite;
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-glow {
      animation: glow 2s ease-in-out infinite;
    }
    
    .animate-typewriter {
      animation: typewriter 2s steps(25) 1s forwards;
      width: 0;
    }
  `}</style>
</div>
  );
};

export default MLMPageNotFound;