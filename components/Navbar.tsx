import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, Phone, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If it's a page route (not an anchor)
    if (href.startsWith('/') && !href.includes('#')) {
      navigate(href);
      setIsMobileMenuOpen(false);
      return;
    }

    // Handle anchor links
    const [path, anchor] = href.split('#');
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/' && path === '/') {
      navigate('/');
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // We're already on the right page, just scroll
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: 'nav',
        start: 'bottom top',
      }
    });
    navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
      backgroundColor: '#00000050',
      backdropFilter: 'blur(10px)',
      duration: 1,
      ease: 'power1.inOut'
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.equipment'), href: '/#equipment' },
    { name: t('nav.lanes'), href: '/#lanes' },
    { name: t('nav.fleet'), href: '/#fleet' },
    { name: t('nav.careers'), href: '/careers' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-900 shadow-xl py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-white text-2xl tracking-tighter group-hover:bg-primary-dark transition-colors">
            T
          </div>
          <div className={`font-black text-xl tracking-tighter uppercase ${isScrolled ? 'text-white' : 'text-white'}`}>
            Trixor<span className="text-primary">.</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-bold uppercase tracking-wider text-white/80 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors"
          >
            <Phone size={16} />
            <span>{t('nav.requestRate')}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-900 border-t border-neutral-800 p-6 flex flex-col gap-6 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-bold uppercase tracking-wider text-white hover:text-primary"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="w-full text-center bg-primary hover:bg-primary-dark text-white px-5 py-4 font-bold uppercase tracking-wide"
          >
            {t('nav.requestRate')}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;