/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Globe, 
  Heart, 
  ShieldCheck, 
  ChevronUp, 
  Mail, 
  BookOpen, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import logoHoruelo from '../assets/logo-horuelo.jpg';
import designedByDixome from '../assets/designed-by-dixome.png';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [dixomeError, setDixomeError] = useState(false);

  // Fallback direct URL strategies for the logo
  const logoSources = [
    logoHoruelo, // Local asset import first
    "https://i.postimg.cc/68nRT3Q6/logo-horuelo.jpg",
    "https://i.postimg.cc/68nRT3Q6/logo-horuelo-trimmed.jpg",
    "https://i.postimg.cc/68nRT3Q6/logo-horuelo-part.jpg",
    "https://i.postimg.cc/68nRT3Q6/logo.jpg",
    "https://i.postimg.cc/68nRT3Q6/logo.png",
    "https://i.postimg.cc/68nRT3Q6/image.jpg",
    "https://i.postimg.cc/68nRT3Q6/image.png"
  ];
  
  const [logoSourceIndex, setLogoSourceIndex] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoError = () => {
    if (logoSourceIndex < logoSources.length) {
      setLogoSourceIndex(prev => prev + 1);
    }
  };

  const isLogoFailedAll = logoSourceIndex >= logoSources.length;
  const logoSrc = !isLogoFailedAll ? logoSources[logoSourceIndex] : '';

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 px-6 md:px-12 border-t border-slate-800 relative overflow-hidden" id="main-footer">
      {/* Decorative gradient blur in the background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <a 
                href="https://horuelo.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block shrink-0 hover:scale-105 transition-transform duration-300"
              >
                {!isLogoFailedAll ? (
                  <img 
                    src={logoSrc} 
                    alt="Asociación Horuelo Logo" 
                    className="h-11 w-auto object-contain bg-white px-2.5 py-1.5 rounded-xl shadow-md border border-slate-100"
                    referrerPolicy="no-referrer"
                    onError={handleLogoError}
                  />
                ) : (
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl shadow-md">
                    <span className="text-teal-400 font-sans font-black text-xs sm:text-sm tracking-tight">Asociación</span>
                    <span className="text-white font-sans font-black text-xs sm:text-sm bg-gradient-to-r from-teal-500 to-indigo-500 px-2 py-0.5 rounded-lg">Horuelo</span>
                  </div>
                )}
              </a>
              <div>
                <h4 className="font-sans font-black text-lg text-white leading-tight tracking-tight">Aula Intercultural</h4>
                <p className="font-mono text-[9px] text-teal-400 uppercase tracking-widest font-extrabold mt-0.5">Asociación Horuelo</p>
              </div>
            </div>
            
            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-sm">
              Un rincón pedagógico interactivo de libre distribución para la formación de docentes de educación secundaria, diseñado para transformar aulas a través del respeto activo, la decolonialidad y la justicia social.
            </p>

            {/* Core Values Tag Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] font-sans font-bold bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
                ✊ Justicia Social
              </span>
              <span className="text-[10px] font-sans font-bold bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
                🌍 Diversidad Activa
              </span>
              <span className="text-[10px] font-sans font-bold bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
                🎓 Pedagogía Crítica
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links Map (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-teal-400 font-extrabold flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Mapa de Navegación
            </h5>
            <ul className="space-y-3 font-sans text-xs">
              <li>
                <button 
                  onClick={() => handleNavClick('inicio')} 
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-left font-semibold"
                  id="footer-nav-inicio"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-teal-400 transition-colors" />
                  Inicio y Presentación
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('concepto')} 
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-left font-semibold"
                  id="footer-nav-concepto"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-teal-400 transition-colors" />
                  La Educación Intercultural
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('recursos')} 
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-left font-semibold"
                  id="footer-nav-recursos"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-teal-400 transition-colors" />
                  Recursos Didácticos y Aula
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('glosario')} 
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-left font-semibold"
                  id="footer-nav-glosario"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-teal-400 transition-colors" />
                  Glosario Crítico A-Z
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Accessibility Commitments (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-teal-400 font-extrabold flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Accesibilidad Web
            </h5>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Esta interfaz educativa respeta rigurosamente las pautas de diseño accesible <strong>WCAG 2.1 Nivel AA</strong>, asegurando altos contrastes, escalabilidad tipográfica y legibilidad estructurada para toda la comunidad educativa.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-teal-300 text-[10px] font-sans font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" /> Cumplimiento WCAG 2.1 AA
            </div>
          </div>

          {/* Column 4: Contact & Web Support (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-teal-400 font-extrabold flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" /> Enlaces de Interés
            </h5>
            <div className="space-y-3 font-sans text-xs">
              <a 
                href="https://horuelo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all group"
              >
                <span className="font-semibold">Web Horuelo</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition-colors" />
              </a>
              <a 
                href="mailto:asociacion@horuelo.com" 
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all group"
              >
                <span className="font-semibold">Email Soporte</span>
                <Mail className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition-colors" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright, author and back to top info */}
        <div className="mt-8 pt-8 border-t border-slate-850 flex flex-col md:flex-row items-center justify-between gap-5 font-sans text-[11px] text-slate-500">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-slate-450">
              © {currentYear} Aula Intercultural — Asociación Horuelo. Todos los derechos reservados.
            </p>
            <p className="text-slate-550 text-[10px]">
              Fichas didácticas de libre distribución para uso pedagógico no lucrativo en institutos y centros de educación secundaria.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {/* Design attribution */}
            <a 
              href="https://horuelo.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 group opacity-80 hover:opacity-100 transition-opacity"
            >
              <span className="text-slate-550 text-[10px] font-semibold">Desarrollo y diseño por</span>
              {!dixomeError ? (
                <img 
                  src={designedByDixome} 
                  alt="Dixome" 
                  className="h-4.5 w-auto object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                  onError={() => setDixomeError(true)}
                />
              ) : (
                <span className="text-teal-400 font-sans text-[11px] font-black tracking-tight hover:text-white transition-colors">Dixome</span>
              )}
            </a>

            <span className="hidden sm:inline text-slate-800">|</span>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer font-bold text-[10px]"
              title="Volver a la parte superior de la página"
              id="footer-back-to-top"
            >
              <ChevronUp className="w-3.5 h-3.5 animate-bounce" />
              <span>Volver arriba</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
