/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GlossaryTerm } from '../types';
import { Search, Globe, BookOpen, Lightbulb, GraduationCap, Check, ShieldCheck } from 'lucide-react';

interface GlossaryProps {
  glossaryTerms?: GlossaryTerm[];
}

export default function Glossary({ glossaryTerms = [] }: GlossaryProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLetter, setSelectedLetter] = useState<string>('todos');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  // Derive unique first letters for alphabetical filtration
  const alphabet = ['todos', ...Array.from(new Set(
    glossaryTerms.map(term => term.word.trim().charAt(0).toUpperCase())
  )).sort()];

  // Filter glossary logic
  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesSearch = term.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLetter = selectedLetter === 'todos' || 
                          term.word.trim().toUpperCase().startsWith(selectedLetter);

    return matchesSearch && matchesLetter;
  });

  const handleToggleExpand = (word: string) => {
    const isOpening = expandedTerm !== word;
    setExpandedTerm(isOpening ? word : null);
    if (isOpening && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById(`term-card-${word}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-slate-50" id="glossary-section">
      <div className="max-w-7xl mx-auto space-y-10">

         {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold font-sans uppercase tracking-wide border border-orange-200">
            <Globe className="w-3.5 h-3.5" />
            Glosario Conceptuado A-Z
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Diccionario Crítico Intercultural
          </h2>
          <p className="font-sans text-slate-650 text-sm sm:text-base leading-relaxed">
            Las palabras importan. Aquí encontrarás definiciones claras y rigurosas de los términos clave para evitar confusiones y contar con una base sólida a la hora de trabajar en el aula.
          </p>
        </div>

        {/* Controls: Search and Alphabetical Filter */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar término o definición..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                id="glossary-search"
              />
            </div>
            
            {/* Legend / Feedback */}
            <div className="md:col-span-7 text-xs text-slate-500 font-sans md:text-right">
              Mostrando <strong className="text-orange-600 font-bold">{filteredTerms.length}</strong> términos críticos de educación intercultural.
            </div>
          </div>

          {/* Alphabet Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-4">
            {alphabet.map((letter) => {
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`px-3 py-1.5 rounded-lg font-sans font-bold text-xs uppercase cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-orange-600 text-white shadow-sm' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  id={`letter-tab-${letter}`}
                >
                  {letter === 'todos' ? 'Ver Todos' : letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Glossary Terms Listing (Interactive Accordions) */}
        {filteredTerms.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-slate-500 font-sans text-sm italic">
            Ningún término coincide con los criterios de búsqueda actuales. Intenta con otra palabra clave.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredTerms.map((term) => {
              const isOpen = expandedTerm === term.word;
              return (
                <div 
                  key={term.word}
                  id={`term-card-${term.word}`}
                  className="bg-white border border-slate-200 hover:border-orange-500/40 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-3xs scroll-mt-24"
                >
                  <div className="space-y-3">
                    <div className="flex flex-col items-start gap-2">
                      <h3 className="font-sans font-extrabold text-lg text-slate-900 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
                        {term.word}
                      </h3>
                      {term.etymology && (
                        <span className="text-[10px] font-sans font-extrabold text-slate-500 italic leading-snug border border-slate-200 px-2 py-1.5 rounded-md bg-slate-50 max-w-full">
                          {term.etymology.split('.')[0]}
                        </span>
                      )}
                    </div>

                    <p className="font-sans text-slate-650 text-xs sm:text-sm leading-relaxed">
                      {term.definition}
                    </p>
                  </div>

                  {/* Accessible Collapsible Drawer for teacher tips */}
                  <div className="space-y-2">
                    {isOpen && term.pedagogicalTip && (
                      <div className="p-4 bg-orange-50/25 border border-orange-100 rounded-xl space-y-1.5 animate-fadeIn">
                        <h4 className="font-sans font-extrabold text-xs text-orange-800 flex items-center gap-1.5 uppercase tracking-wide">
                          <Lightbulb className="w-3.5 h-3.5 text-slate-500" />
                          Indicación Didáctica para Clase
                        </h4>
                        <p className="font-sans text-xs text-slate-600 leading-relaxed">
                          {term.pedagogicalTip}
                        </p>
                      </div>
                    )}

                    {term.pedagogicalTip && (
                      <button
                        onClick={() => handleToggleExpand(term.word)}
                        className={`w-full flex items-center justify-between text-xs font-sans font-extrabold pb-1 pt-2 border-t border-dashed border-slate-150 cursor-pointer ${
                          isOpen ? 'text-emerald-700' : 'text-orange-600 hover:text-teal-850'
                        }`}
                        id={`btn-expand-${term.word}`}
                      >
                        <span>{isOpen ? 'Ocultar sugerencia didáctica' : 'Desplegar sugerencia didáctica'}</span>
                        <span className="text-base select-none leading-none">{isOpen ? '−' : '＋'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Didactic Quote Section inside Glossary */}
        <div className="p-5 md:py-6 md:px-7 bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-2xl shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center border border-orange-500/20">
          <div className="lg:col-span-7 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[11px] font-bold uppercase tracking-wider font-sans backdrop-blur-xs border border-white/20">
              <GraduationCap className="w-3.5 h-3.5 text-orange-200" />
              Reflexión Pedagógica
            </div>
            <h3 className="font-sans font-bold text-white text-lg md:text-xl tracking-tight leading-snug">
              ¿Por qué cuidar la terminología?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-orange-50/90 leading-relaxed font-normal">
              «El lenguaje no solo nombra la realidad, también la construye. Despejar la confusión terminológica dota al alumnado de herramientas de pensamiento crítico para reconocer y desmontar los discursos de exclusión.»
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1">
              <strong className="text-white text-xs font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-orange-200 shrink-0" />
                Claridad y Rigor en el Aula
              </strong>
              <p className="text-[11px] text-orange-100/85 leading-relaxed">
                Permite debatir con conceptos precisos sin caer en tópicos folclóricos o superficiales.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1">
              <strong className="text-white text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-200 shrink-0" />
                Desarme de Bulos y Prejuicios
              </strong>
              <p className="text-[11px] text-orange-100/85 leading-relaxed">
                Ayuda al alumnado a identificar términos manipulados o estigmatizantes en redes sociales.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
