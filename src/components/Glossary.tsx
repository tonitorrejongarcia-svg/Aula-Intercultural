/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GlossaryTerm } from '../types';
import { Search, Globe, BookOpen, Lightbulb, GraduationCap } from 'lucide-react';

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
    setExpandedTerm((prev) => (prev === word ? null : word));
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
            Un repositorio terminológico con rigor sociológico y ético. Evita el uso confuso o superficial de términos clave, proveyendo de herramientas conceptuales robustas para el diálogo y las programaciones de centro.
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
                  className="bg-white border border-slate-200 hover:border-orange-500/40 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-3xs"
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
        <div className="p-6 md:p-8 bg-orange-600 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <h4 className="font-sans font-extrabold text-white text-lg flex items-center gap-1.5">
              <GraduationCap className="w-5 h-5" />
              ¿Por qué cuidar la terminología?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-orange-50/90 leading-relaxed">
              "El lenguaje no sólo nombra la realidad, la crea. Desatascar la confusión terminológica entre multiculturalidad e interculturalidad dota a el alumnado de herramientas reales contra las fake-news de exclusión."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
