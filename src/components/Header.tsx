/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Globe, Menu, X, GraduationCap, Compass, BookOpen, HelpCircle, MessageSquare, Sparkles, Lock, ExternalLink, ShieldAlert } from 'lucide-react';
import logo4 from '../assets/4-removebg-preview.png';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount?: number;
}

export default function Header({ activeTab, setActiveTab, pendingCount = 0 }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Compass },
    { id: 'concepto', label: '¿Qué es?', icon: GraduationCap },
    { id: 'hate-speech', label: 'Discursos de Odio', icon: ShieldAlert },
    { id: 'recursos', label: 'Recursos de Aula', icon: BookOpen },
    { id: 'glosario', label: 'Glosario', icon: Globe },
    { id: 'faq', label: 'Preguntas Frecuentes', icon: HelpCircle },
    { id: 'contacto', label: 'Contacto y Comunidad', icon: MessageSquare },
    { id: 'intranet', label: 'Acceso Administrador', icon: Lock },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo / Branding */}
        <button
          onClick={() => handleNavClick('inicio')}
          className="flex items-center gap-3.5 group text-left focus:outline-none cursor-pointer shrink-0"
          id="logo-button"
        >
          {/* Logo container */}
          <div className="group-hover:scale-[1.04] transition-all duration-350 ease-out cursor-pointer flex items-center justify-center">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center">
              <img src={logo4} alt="Logo Aula Intercultural" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-sans font-black text-base sm:text-xl tracking-tight leading-none">
              <span className="text-slate-900">Aula</span>{" "}
              <span className="text-slate-800 group-hover:text-orange-600 transition-colors duration-250">Intercultural</span>
            </h1>
            <p className="font-mono text-[7px] sm:text-[9px] text-slate-450 uppercase tracking-[0.15em] sm:tracking-widest font-extrabold mt-0.5 sm:mt-1">Pedagogía • Inclusión • Diversidad</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-nowrap">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-sans font-extrabold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm transform translate-y-[-1px]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold'
                }`}
                id={`nav-${item.id}`}
              >
                <Icon className="w-4 h-4 opacity-90" />
                {item.label}
              </button>
            );
          })}
          <div className="w-[1px] h-5 bg-slate-200 mx-2 shrink-0 hidden 2xl:block" />
          <a
            href="https://ais-pre-d7cuzigax4vxvpzdpcgyvx-439828789133.europe-west3.run.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden 2xl:flex items-center gap-1.5 px-3 py-2 rounded-xl font-sans font-bold text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 transition-all cursor-pointer shadow-3xs hover:-translate-y-0.5 shrink-0"
            id="nav-fullscreen"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Pantalla Completa
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          aria-label="Toggle Menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-150 py-4 px-6 shadow-xl z-50 animate-fadeIn">
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans font-extrabold text-sm text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    id={`mobile-nav-${item.id}`}
                  >
                    <Icon className="w-5 h-5 opacity-80" />
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li className="pt-2 border-t border-slate-100">
              <a
                href="https://ais-pre-d7cuzigax4vxvpzdpcgyvx-439828789133.europe-west3.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans font-bold text-sm text-left text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
                id="mobile-nav-fullscreen"
              >
                <ExternalLink className="w-5 h-5" />
                Abrir Pantalla Completa
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
