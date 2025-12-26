import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Dumbbell, Users, Clock, Zap, 
  CheckCircle, ArrowRight, Smartphone, 
  Instagram, Twitter, Facebook, MapPin, 
  Briefcase, Heart, Mail, Phone, ChevronRight, Star, Play
} from 'lucide-react';
import "./App.css"

/* =========================================
   0. UTILS & STYLES (Custom Animations)
   ========================================= */

const AnimationStyles = () => (
  <style>{`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 15px rgba(220, 38, 38, 0.5); }
      50% { box-shadow: 0 0 30px rgba(220, 38, 38, 0.8); }
    }
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
    /* Text Stroke Effect */
    .text-stroke {
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
      color: transparent;
    }
    .text-stroke-red {
      -webkit-text-stroke: 1px #dc2626;
      color: transparent;
    }
    .bg-grid-pattern {
      background-image: linear-gradient(to right, #27272a 1px, transparent 1px),
                        linear-gradient(to bottom, #27272a 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: linear-gradient(to bottom, transparent, black, transparent);
    }
    .clip-slant {
      clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
    }
  `}</style>
);

const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          ref.current?.classList.add('active');
        }, delay);
      }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};

/* =========================================
   1. NAVBAR (Completely Redesigned)
   ========================================= */

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page, e) => {
    e?.preventDefault();
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-black/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer z-50" onClick={(e) => handleNav('home', e)}>
              <img 
                src="https://aheadfitness.ng/img/logo2.png" 
                alt="Ahead Fitness" 
                className="h-10 md:h-12 w-auto object-contain brightness-200" 
              />
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-10">
              {['Home', 'About', 'Services', 'Pricing'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={(e) => handleNav('home', e)}
                  className="text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white relative group transition-colors"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              
              <div className="flex items-center gap-4 ml-6">
                <button 
                  onClick={(e) => handleNav('careers', e)}
                  className="text-sm font-bold uppercase tracking-widest text-white hover:text-red-500 transition-colors"
                >
                  Careers
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-sm font-bold uppercase tracking-widest text-xs transition-all transform hover:-translate-y-1 shadow-[0_0_15px_rgba(220,38,38,0.4)] clip-slant">
                  Join Now
                </button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden z-50">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-red-500 transition-colors p-2">
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Full Screen Menu */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="flex flex-col space-y-8 text-center relative z-10">
          {['Home', 'About', 'Services', 'Pricing'].map((item, idx) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleNav('home', e)}
              className={`text-4xl font-black uppercase text-transparent text-stroke hover:text-white hover:text-stroke-none transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {item}
            </a>
          ))}
          <a 
            onClick={(e) => handleNav('careers', e)} 
            className={`text-4xl font-black uppercase text-red-600 hover:text-red-500 cursor-pointer transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Careers
          </a>
        </div>
      </div>
    </>
  );
};

/* =========================================
   2. HERO SECTION (Completely Redesigned)
   ========================================= */

const Hero = () => (
  <div id="home" className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-black">
    {/* Dynamic Background with Overlays */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1950&q=80" 
        alt="Gym Background" 
        className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_ease-in-out_infinite]" 
      />
      {/* Heavy Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-16">
      <div className="max-w-3xl">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-12 bg-red-600"></span>
            <span className="text-red-500 font-bold text-sm uppercase tracking-[0.3em]">Est. 2015</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            FORGE <br />
            <span className="text-stroke">YOUR</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">LEGACY</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-lg mb-10 leading-relaxed font-light border-l-4 border-red-600 pl-6">
            Stop wishing. Start working. Join the elite fitness community dedicated to breaking limits and setting new standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button className="bg-red-600 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] clip-slant flex items-center justify-center gap-2 group">
              Start Trial <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button className="border border-white/30 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
              <Play size={18} fill="currentColor" /> Watch Video
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-12 z-10">
      <div>
        <h4 className="text-3xl font-black text-white">01</h4>
        <p className="text-xs text-gray-400 uppercase tracking-widest">Motivation</p>
      </div>
      <div className="h-12 w-[1px] bg-white/20"></div>
      <div>
        <h4 className="text-3xl font-black text-white">02</h4>
        <p className="text-xs text-gray-400 uppercase tracking-widest">Discipline</p>
      </div>
      <div className="h-12 w-[1px] bg-white/20"></div>
      <div>
        <h4 className="text-3xl font-black text-white">03</h4>
        <p className="text-xs text-gray-400 uppercase tracking-widest">Success</p>
      </div>
    </div>
  </div>
);

/* =========================================
   3. FEATURES SECTION (Standard)
   ========================================= */

const Features = () => (
  <section className="py-24 bg-zinc-950 text-white relative">
    <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Dumbbell />, title: "Pro Equipment", desc: "Train with the best Hammer Strength machinery." },
          { icon: <Zap />, title: "HIIT Zones", desc: "Dedicated areas for high-intensity explosive workouts." },
          { icon: <Users />, title: "Community", desc: "Join a tribe that motivates you to show up every day." },
          { icon: <Clock />, title: "24/7 Access", desc: "Train on your schedule with round-the-clock access." }
        ].map((f, i) => (
          <RevealOnScroll key={i} delay={i * 100} className="bg-zinc-900/50 backdrop-blur-sm p-8 border border-zinc-800 hover:border-red-600 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(220,38,38,0.1)] rounded-xl">
            <div className="mb-6 w-14 h-14 bg-black rounded-lg flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-lg">
              {React.cloneElement(f.icon, { size: 28 })}
            </div>
            <h4 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors">{f.title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

/* =========================================
   4. APP DOWNLOAD SECTION
   ========================================= */

const AppDownload = () => {
  return (
    <div className="relative z-20 -mb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll className="bg-gradient-to-br from-red-700 via-red-900 to-black rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(220,38,38,0.3)] relative overflow-visible flex flex-col md:flex-row items-center">
          
          {/* Content */}
          <div className="w-full md:w-1/2 z-10 text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 italic">TRAIN ANYWHERE.</h3>
            <p className="text-gray-200 text-lg mb-8 max-w-md mx-auto md:mx-0">
              Download the <span className="font-bold text-white">Ahead Fitness App</span>. Book classes, track progress, and manage membership on the go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-xl hover:scale-105 transition-transform font-bold shadow-lg">
                <Smartphone size={24} />
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase">Get it on</div>
                  <div className="text-sm">Google Play</div>
                </div>
              </button>
              <button className="flex items-center justify-center gap-3 bg-black text-white border border-white/20 px-6 py-3 rounded-xl hover:scale-105 transition-transform font-bold shadow-lg">
                <Smartphone size={24} />
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase">Download on the</div>
                  <div className="text-sm">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* Phone Image - Floating Effect */}
          <div className="w-full md:w-1/2 relative flex justify-center md:justify-end h-[300px] md:h-auto">
             <img 
               src="https://aheadfitness.ng/img/app-preview.webp" 
               alt="App Preview" 
               className="md:absolute md:-bottom-12 md:right-12 w-auto h-[350px] md:h-[300px] object-contain drop-shadow-2xl animate-[float_4s_ease-in-out_infinite]"
             />
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

/* =========================================
   5. FOOTER
   ========================================= */

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-zinc-950 text-white pt-32 pb-8 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div>
            <img src="https://aheadfitness.ng/img/logo2.png" alt="Ahead Fitness" className="h-10 mb-6 brightness-0 invert" />
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Fitness is a journey, not a destination. Our mission is to inspire, support, and empower you to reach new heights.
            </p>
            <div className="flex gap-4">
               {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-zinc-900 flex items-center justify-center rounded-full hover:bg-red-600 hover:text-white transition-all hover:rotate-12 hover:scale-110 border border-zinc-800 text-gray-400">
                    <Icon size={18} />
                  </a>
               ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-red-600 rounded-full"></span> Useful Links
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {['Home', 'Careers', 'Services', 'Pricing'].map(link => (
                <li key={link} onClick={() => { setCurrentPage(link === 'Home' ? 'home' : link === 'Careers' ? 'careers' : 'home'); window.scrollTo(0,0); }} 
                    className="hover:text-red-500 cursor-pointer transition-colors flex items-center hover:translate-x-2 duration-300">
                  <ChevronRight size={14} className="mr-2 text-red-600" /> {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold uppercase mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-red-600 rounded-full"></span> Support
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {['Login', 'My Account', 'Privacy Policy', 'Terms'].map(link => (
                <li key={link} className="hover:text-red-500 cursor-pointer transition-colors flex items-center hover:translate-x-2 duration-300">
                  <ChevronRight size={14} className="mr-2 text-red-600" /> {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-red-600 rounded-full"></span> Contact
            </h4>
            <div className="space-y-4 text-sm text-gray-400">
              <p className="flex items-start gap-3"><MapPin size={18} className="text-red-600 shrink-0"/> 123 Fitness Ave, Kubwa, Abuja</p>
              <p className="flex items-center gap-3"><Phone size={18} className="text-red-600 shrink-0"/> 0913 443 3612</p>
              <p className="flex items-center gap-3"><Mail size={18} className="text-red-600 shrink-0"/> info@aheadfitness.ng</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 text-center">
          <p className="text-zinc-600 text-xs">
            Copyright © 2025 All rights reserved | <span className="text-red-600 font-bold">Ahead Fitness</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

/* =========================================
   6. INNER SECTIONS (About, Services, Pricing)
   ========================================= */

const About = () => (
  <section id="about" className="py-24 bg-black text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-20 relative z-10">
      <RevealOnScroll className="w-full lg:w-1/2 relative group">
        <div className="absolute -top-4 -left-4 w-1/2 h-1/2 border-t-2 border-l-2 border-red-600 transition-all duration-700 group-hover:w-full group-hover:h-full"></div>
        <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1350&q=80" alt="About" className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 rounded-sm shadow-2xl" />
        <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 border-b-2 border-r-2 border-red-600 transition-all duration-700 group-hover:w-full group-hover:h-full"></div>
      </RevealOnScroll>
      <RevealOnScroll className="w-full lg:w-1/2">
        <h4 className="text-red-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-8 h-[2px] bg-red-500"></span> About Us
        </h4>
        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">WE BUILD <br/><span className="text-stroke">CHAMPIONS</span></h2>
        <p className="text-gray-400 mb-10 text-lg leading-relaxed">
          At Ahead Fitness, we don't just sell memberships. We sell a lifestyle. With over 10 years of excellence, 
          we combine science-based training with raw passion.
        </p>
        <div className="space-y-8">
          {[
            { label: 'Body Building', val: '95%' }, 
            { label: 'Cardio Fitness', val: '98%' }, 
            { label: 'Crossfit', val: '92%' }
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2 text-sm font-bold uppercase tracking-wider">
                <span>{item.label}</span><span className="text-red-500">{item.val}</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-red-800 to-red-500 h-full rounded-full w-0 animate-[width_2s_ease-out_forwards]" style={{width: item.val, animationDelay: `${0.5 + idx * 0.2}s`}}></div>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-24 bg-zinc-950 text-white">
    <div className="max-w-7xl mx-auto px-4">
      <RevealOnScroll className="text-center mb-20">
        <h2 className="text-red-600 font-bold tracking-widest uppercase mb-4">Our Services</h2>
        <h3 className="text-4xl md:text-5xl font-black text-white">PUSH YOUR LIMITS</h3>
      </RevealOnScroll>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Personal Training", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800" },
          { title: "Group Fitness", img: "https://images.unsplash.com/photo-1574680096141-1cddd70fb668?w=800" },
          { title: "Body Building", img: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800" },
          { title: "Strength", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800" }
        ].map((s, i) => (
          <RevealOnScroll key={i} delay={i * 100} className="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer shadow-lg">
            <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h4 className="text-2xl font-bold text-white mb-2">{s.title}</h4>
              <div className="h-1 w-12 bg-red-600 mb-4 transition-all duration-300 group-hover:w-full"></div>
              <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                Professional guidance to reach your peak performance.
              </p>
              <button className="mt-4 flex items-center text-red-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                Explore <ArrowRight size={14} className="ml-2" />
              </button>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 bg-black text-white relative">
    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <RevealOnScroll className="text-center mb-20">
        <h2 className="text-red-600 font-bold tracking-widest uppercase mb-4">Pricing Plan</h2>
        <h3 className="text-4xl md:text-5xl font-black">CHOOSE YOUR GRIND</h3>
      </RevealOnScroll>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Daily", price: "₦ 3,000", bg: "bg-zinc-900" },
          { name: "Bi-Weekly", price: "₦ 20,000", bg: "bg-zinc-900" },
          { name: "Monthly", price: "₦ 30,000", bg: "bg-zinc-800", featured: true },
          { name: "Quarterly", price: "₦ 75,000", bg: "bg-zinc-900" }
        ].map((p, i) => (
          <RevealOnScroll key={i} delay={i * 100} className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col ${p.featured ? 'bg-zinc-900 border-red-600 scale-105 shadow-[0_0_30px_rgba(220,38,38,0.2)] z-10' : 'bg-black border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'}`}>
            {p.featured && (
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase rounded-bl-lg rounded-tr-lg">
                Most Popular
              </div>
            )}
            <h5 className={`text-sm font-bold uppercase tracking-widest mb-4 ${p.featured ? 'text-red-500' : 'text-gray-400'}`}>{p.name}</h5>
            <div className="text-3xl font-black mb-6 text-white">{p.price}</div>
            <ul className="space-y-4 mb-8 text-gray-400 text-sm flex-grow">
              <li className="flex items-center"><CheckCircle size={16} className="text-red-600 mr-3"/> Gym Access</li>
              <li className="flex items-center"><CheckCircle size={16} className="text-red-600 mr-3"/> Locker Room</li>
              <li className="flex items-center"><CheckCircle size={16} className="text-red-600 mr-3"/> Free WiFi</li>
              {p.featured && <li className="flex items-center"><CheckCircle size={16} className="text-red-600 mr-3"/> 1 PT Session</li>}
            </ul>
            <button className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 ${p.featured ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg' : 'bg-transparent border border-zinc-700 text-white hover:border-red-600 hover:text-red-500'}`}>
              Select Plan
            </button>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    if (weight && height) {
      const h = height / 100;
      const bmi = (weight / (h * h)).toFixed(1);
      let status = bmi < 18.5 ? 'Underweight' : bmi < 24.9 ? 'Healthy' : 'Overweight';
      setResult({ bmi, status });
    }
  };

  return (
    <section id="bmi" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center relative z-10">
        <RevealOnScroll className="w-full lg:w-1/2">
          <h2 className="text-4xl font-black text-white mb-6">BMI CHART</h2>
          <div className="bg-black border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
             <table className="w-full text-left text-gray-400">
              <thead><tr className="bg-zinc-900 text-red-500"><th className="py-4 px-6">BMI Range</th><th className="py-4 px-6">Status</th></tr></thead>
              <tbody className="divide-y divide-zinc-800">
                <tr className="hover:bg-zinc-900 transition-colors"><td className="py-4 px-6">Below 18.5</td><td className="py-4 px-6 text-yellow-500">Underweight</td></tr>
                <tr className="hover:bg-zinc-900 transition-colors"><td className="py-4 px-6">18.5 - 24.9</td><td className="py-4 px-6 text-green-500">Healthy</td></tr>
                <tr className="hover:bg-zinc-900 transition-colors"><td className="py-4 px-6">25.0 - 29.9</td><td className="py-4 px-6 text-orange-500">Overweight</td></tr>
                <tr className="hover:bg-zinc-900 transition-colors"><td className="py-4 px-6">30.0 & Above</td><td className="py-4 px-6 text-red-500">Obese</td></tr>
              </tbody>
            </table>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="w-full lg:w-1/2">
           <div className="bg-gradient-to-br from-zinc-900 to-black p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h3 className="text-3xl font-bold text-white mb-2">Calculate your BMI</h3>
            <p className="text-gray-400 mb-8 text-sm">Determine your ideal weight range.</p>
            <form onSubmit={calculate} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Height (cm)</label>
                  <input type="number" value={height} onChange={e=>setHeight(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-lg p-4 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all" placeholder="175" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Weight (kg)</label>
                  <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-lg p-4 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all" placeholder="70" />
                </div>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg uppercase tracking-widest shadow-lg hover:shadow-red-900/50 transition-all transform hover:-translate-y-1">
                Calculate Now
              </button>
            </form>
            {result && (
              <div className="mt-6 bg-zinc-800/50 p-6 rounded-xl border-l-4 border-red-600 animate-[fadeUp_0.5s_ease-out]">
                <p className="text-gray-400 text-xs uppercase mb-1">Result</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-white">{result.bmi}</span>
                  <span className={`text-lg font-bold uppercase ${result.status === 'Healthy' ? 'text-green-500' : 'text-red-500'}`}>{result.status}</span>
                </div>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

/* =========================================
   7. CAREERS PAGE (Standard)
   ========================================= */

const CareersPage = () => {
  const positions = [
    { title: "Supervisor", location: "Kubwa, Abuja", type: "Full-Time", desc: "Lead our team. Manage daily operations and ensure staff excellence." },
    { title: "Fitness Coach", location: "Kubwa, Abuja", type: "Part-Time", desc: "Lead high-energy HIIT, Spin, and Aerobics classes. Inspire the tribe." },
    { title: "Manager", location: "Kubwa, Abuja", type: "Full-Time", desc: "The captain of the ship. Ensure facility safety and member satisfaction." },
    { title: "Cleaner", location: "Kubwa, Abuja", type: "Full-Time", desc: "Maintain our 5-star hygiene standards. Create a welcoming environment." }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Careers Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1950&q=80" alt="Team" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="text-5xl md:text-7xl font-black mb-6">JOIN THE <span className="text-red-600">REVOLUTION</span></h1>
            <p className="text-xl text-gray-300">Build your career with the most dynamic fitness team in Abuja.</p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { icon: <Zap />, title: "Electric Atmosphere", desc: "Work somewhere you love coming to every day." },
              { icon: <Heart />, title: "Real Impact", desc: "Change lives through health and wellness." },
              { icon: <Users />, title: "Family Culture", desc: "We support each other to grow and succeed." }
            ].map((b, i) => (
              <RevealOnScroll key={i} delay={i * 100} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-red-600 transition-all hover:-translate-y-2">
                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center text-red-600 mb-6">
                  {React.cloneElement(b.icon, { size: 24 })}
                </div>
                <h4 className="text-xl font-bold mb-3">{b.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </RevealOnScroll>
            ))}
          </div>

          <h3 className="text-3xl font-black mb-12 border-l-4 border-red-600 pl-6">OPEN POSITIONS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {positions.map((job, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100} className="group bg-zinc-900 p-8 rounded-xl border border-zinc-800 hover:border-red-600 transition-all hover:bg-zinc-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">{job.title}</h4>
                    <div className="flex items-center gap-4 text-xs font-bold uppercase text-gray-500 mt-2">
                      <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                      <span className="flex items-center gap-1 text-red-500"><Briefcase size={12}/> {job.type}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-6">{job.desc}</p>
                <button className="text-white text-sm font-bold uppercase tracking-widest border-b border-red-600 pb-1 hover:text-red-500 transition-colors">Apply Now</button>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-red-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <RevealOnScroll className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-black mb-6">DON'T SEE YOUR ROLE?</h2>
          <p className="text-lg mb-10 opacity-90">We are always looking for talent. Send us your CV and tell us why you belong here.</p>
          <a href="mailto:info@aheadfitness.ng" className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 hover:scale-105 transition-all shadow-xl">
            <Mail size={20} /> Email Us
          </a>
        </RevealOnScroll>
      </section>
    </div>
  );
};

/* =========================================
   8. MAIN APP
   ========================================= */

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="font-sans antialiased bg-black text-gray-200 selection:bg-red-600 selection:text-white overflow-x-hidden">
      <AnimationStyles />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' ? (
        <>
          <Hero />
          <Features />
          <About />
          <Services />
          <Pricing />
          <BMI />
          <AppDownload />
        </>
      ) : (
        <CareersPage />
      )}
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;