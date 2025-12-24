import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, Phone, X, ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: 'en', flag: 'gb' },
    { code: 'cs', flag: 'cz' },
    { code: 'de', flag: 'de' },
    { code: 'ru', flag: 'ru' }
  ];

  const currentFlag = languages.find(l => l.code === i18n.language)?.flag || 'gb';

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langOpen && !(e.target as Element).closest('.lang-dropdown')) {
        setLangOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen]);

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
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-white text-2xl tracking-tighter group-hover:bg-primary-dark transition-colors">
            T
          </div>
          <div className={`font-black text-xl tracking-tighter uppercase ${isScrolled ? 'text-white' : 'text-white'}`}>
            Trixor<span className="text-primary">.</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs xl:text-sm font-bold uppercase tracking-wider text-white/80 hover:text-primary transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>
          
        {/* Right Side: Language Dropdown + CTA */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          {/* Desktop Language Dropdown */}
          <div className="relative lang-dropdown">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 p-2 rounded hover:bg-white/10 transition-colors"
            >
              <img 
                src={`https://flagcdn.com/w20/${currentFlag}.png`}
                srcSet={`https://flagcdn.com/w40/${currentFlag}.png 2x`}
                width="20"
                alt={i18n.language}
                className="rounded-sm"
              />
              <ChevronDown size={14} className={`text-white transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[140px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-100 transition-colors ${
                      i18n.language === lang.code ? 'bg-neutral-50 font-semibold' : ''
                    }`}
                  >
                    <img 
                      src={`https://flagcdn.com/w20/${lang.flag}.png`}
                      srcSet={`https://flagcdn.com/w40/${lang.flag}.png 2x`}
                      width="20"
                      alt={lang.code}
                      className="rounded-sm"
                    />
                    <span className="text-neutral-700 text-sm uppercase font-medium">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 xl:px-5 py-2 text-xs xl:text-sm font-bold uppercase tracking-wide transition-colors whitespace-nowrap"
          >
            <Phone size={16} />
            <span>{t('nav.requestRate')}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-neutral-900 border-t border-neutral-800 p-6 flex flex-col gap-6 shadow-2xl">
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
          
          {/* Mobile Language Selector */}
          <div className="flex items-center gap-2 pt-4 border-t border-neutral-800">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-all ${
                  i18n.language === lang.code 
                    ? 'bg-primary text-white' 
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                }`}
              >
                <img 
                  src={`https://flagcdn.com/w20/${lang.flag}.png`}
                  srcSet={`https://flagcdn.com/w40/${lang.flag}.png 2x`}
                  width="18"
                  alt={lang.code}
                  className="rounded-sm"
                />
                <span className="text-xs uppercase font-bold">{lang.code}</span>
              </button>
            ))}
          </div>
          
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