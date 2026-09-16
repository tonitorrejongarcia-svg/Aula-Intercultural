/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQItem } from '../types';
import { HelpCircle, ChevronDown, BookOpen, MessageCircle } from 'lucide-react';

interface FAQProps {
  faqs?: FAQItem[];
  onGoToContact?: () => void;
}

export default function FAQ({ faqs = [], onGoToContact }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    const isOpening = openIndex !== idx;
    setOpenIndex(isOpening ? idx : null);
    
    if (isOpening && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById(`faq-item-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-slate-50" id="faq-section">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold font-sans uppercase tracking-wide border border-orange-200">
            <HelpCircle className="w-4 h-4 text-orange-600" />
            Dudas de Docentes en Activo
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Preguntas Frecuentes (FAQ)
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Consúltanos cuáles son las principales dudas que surgen al integrar estas dinámicas en el aula y cómo sortear con éxito los retos habituales de centro.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className="bg-white border rounded-3xl overflow-hidden transition-all duration-300 shadow-2xs scroll-mt-24"
                style={{
                  borderColor: isOpen ? '#0d9488' : '#e2e8f0',
                }}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-sans font-extrabold text-sm md:text-base text-slate-805 hover:bg-orange-50/15 cursor-pointer transition-all focus:outline-none"
                  aria-expanded={isOpen}
                  id={`faq-trigger-${index}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 pr-4">
                    <span className="font-mono text-[9px] text-emerald-800 font-extrabold uppercase tracking-widest shrink-0 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md w-fit">
                      {faq.category}
                    </span>
                    <span className="leading-snug text-slate-900">{faq.question}</span>
                  </div>
                  
                  {/* Chevron Icon holding rotation */}
                  <div className={`p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-orange-50 border-orange-200 text-orange-600' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Panel content style */}
                {isOpen && (
                  <div className="px-5 pb-6 pt-1 border-t border-slate-100 animate-fadeIn bg-[#fafbfb]/40">
                    <div className="flex gap-3">
                      {/* Sub-indicator */}
                      <div className="p-1 rounded bg-orange-50 text-orange-600 h-fit mt-1 shrink-0">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Small informational help snippet */}
        <div className="p-6 bg-orange-600 text-white rounded-3xl flex items-center gap-4 shadow-sm">
          <MessageCircle className="w-10 h-10 text-amber-300 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-extrabold text-sm">¿Tienes más dudas o casos particulares?</h4>
            <p className="text-xs text-orange-50">
              Accede al apartado de <button onClick={onGoToContact} className="font-bold underline underline-offset-2 hover:text-white transition-colors cursor-pointer">Contacto</button> en el menú superior principal. Estaremos encantados de acompañarte o compartir dinámicas personalizadas creadas por otros centros escolares.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
