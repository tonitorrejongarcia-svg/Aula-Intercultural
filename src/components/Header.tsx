/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Globe, Menu, X, GraduationCap, Compass, BookOpen, HelpCircle, MessageSquare, Sparkles, Lock, ExternalLink, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
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
          className="flex items-center gap-3.5 group text-left focus:outline-none cursor-pointer"
          id="logo-button"
        >
          {/* Overlapping, multi-layered visual badge container */}
          <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-teal-600 via-emerald-450 to-indigo-600 shadow-md group-hover:scale-[1.04] transition-all duration-350 ease-out">
            <div className="bg-slate-900 rounded-[14px] p-2.5 flex items-center justify-center relative overflow-hidden">
              {/* Decorative radial lighting in background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.3)_0%,transparent_70%)] animate-pulse" />
              
              {/* Dynamic layered icons representing intercultural mapping */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Globe className="w-5.5 h-5.5 text-teal-400 animate-[spin_25s_linear_infinite] z-10" />
                <Sparkles className="w-3.5 h-3.5 text-amber-400 absolute -top-1 -right-1 z-25 animate-bounce" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-sans font-black text-xl tracking-tight leading-none">
              <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-indigo-600 bg-clip-text text-transparent">Aula</span>{" "}
              <span className="text-slate-800 group-hover:text-teal-600 transition-colors duration-250">Intercultural</span>
            </h1>
            <p className="font-mono text-[9px] text-slate-450 uppercase tracking-widest font-extrabold mt-1">Pedagogía • Inclusión • Diversidad</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
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
          <div className="w-[1px] h-5 bg-slate-200 mx-2 shrink-0" />
          <a
            href="https://ais-pre-d7cuzigax4vxvpzdpcgyvx-439828789133.europe-west3.run.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-sans font-bold text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 transition-all cursor-pointer shadow-3xs hover:-translate-y-0.5"
            id="nav-fullscreen"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Pantalla Completa
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          aria-label="Toggle Menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-150 py-4 px-6 shadow-xl z-50 animate-fadeIn">
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
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans font-bold text-sm text-left text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer"
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
