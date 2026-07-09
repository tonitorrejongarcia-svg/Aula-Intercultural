/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, Sparkles, Clock, Users, ArrowRight, Lightbulb, HeartHandshake } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  heroTitle?: string;
  heroSubtitle?: string;
}

export default function Hero({ setActiveTab, heroTitle, heroSubtitle }: HeroProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const pedagogicalFacts = [
    {
      title: "Desarmar el etnocentrismo",
      text: "La educación intercultural beneficia a TODO el alumnado, no solo a extranjeros. Les provee de una visión crítica indispensable para desenvolverse en entornos complejos."
    },
    {
      title: "Impacto del lenguaje corporal",
      text: "El 80% de los malentendidos culturales se producen bajo la línea de flotación de las diferencias invisibles: concepción del tiempo, gestualidad o modales morales."
    },
    {
      title: "Enfoque curricular transversal",
      text: "No se trata de celebrar 'Días de la gastronomía', sino de impregnar asignaturas como matemáticas, química o historia con las aportaciones de todas las civilizaciones."
    }
  ];

  const stats = [
    { value: "+30", label: "Minutos de Dinámica Promedio", detail: "Perfectas para tutorías estructuradas" },
    { value: "100%", label: "Contenido Disponible", detail: "Sin links rotos ni webs externas" },
    { value: "0€", label: "Recursos Accesibles", detail: "Libre reproducción para fines escolares" }
  ];

  const handleNextFact = () => {
    setQuoteIndex((prev) => (prev + 1) % pedagogicalFacts.length);
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-gradient-to-b from-teal-50/60 via-indigo-50/25 to-white" id="hero-section">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Texts and CTAs */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100/60 text-teal-800 text-xs font-semibold uppercase tracking-wider font-sans">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin" />
            Recursos Didácticos Interactivos
          </div>

          <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
            {heroTitle ? (
              <span>{heroTitle}</span>
            ) : (
              <>
                Educar en la diferencia es <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 font-extrabold">construir comunidad</span>.
              </>
            )}
          </h2>

          <p className="font-sans text-lg text-slate-600 leading-relaxed max-w-2xl">
            {heroSubtitle || "Una plataforma interactiva concebida para docentes de educación secundaria. Descubre marcos teóricos rigurosos, dinámicas empíricas de aula con cronómetros integrados, glosarios explicativos y estrategias para cultivar un aula inclusiva, crítica e intercultural."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setActiveTab('recursos')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-sans font-bold text-base rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-teal-500/30 cursor-pointer"
              id="hero-cta-recursos"
            >
              <BookOpen className="w-5 h-5" />
              Explorar Dinámicas de Aula
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('concepto')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-teal-600 hover:bg-teal-50/30 text-teal-700 font-sans font-bold text-base rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-600/20 cursor-pointer"
              id="hero-cta-concepto"
            >
              ¿Qué es la Interculturalidad?
            </button>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="font-sans font-extrabold text-3xl text-teal-600">{stat.value}</span>
                <h4 className="font-sans font-bold text-sm text-slate-800">{stat.label}</h4>
                <p className="font-sans text-xs text-slate-500">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic & Interactive Sidebar / Widget Area */}
        <div className="lg:col-span-5 space-y-6">
          {/* Beautiful support image */}
          <div className="rounded-3xl overflow-hidden shadow-md border border-slate-150 aspect-video bg-slate-100 relative group" id="hero-support-image-card">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
              alt="Alumnado diverso cooperando"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent flex items-end p-4">
              <span className="text-white text-xs font-sans font-bold bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                Cooperación y Diálogo en Secundaria
              </span>
            </div>
          </div>

          {/* Card: Sabías que... */}
          <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-lg text-slate-800">Píldora Pedagógica</h3>
            </div>

            <div className="min-h-[120px] flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-sans font-extrabold text-base text-teal-700">
                  {pedagogicalFacts[quoteIndex].title}
                </h4>
                <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  "{pedagogicalFacts[quoteIndex].text}"
                </p>
              </div>

              <button
                onClick={handleNextFact}
                className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-150 font-sans font-semibold text-xs rounded-xl transition-colors focus:outline-none cursor-pointer"
                id="next-fact-button"
              >
                Inspirar otra píldora
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              </button>
            </div>
          </div>

          {/* Quick interactive widget: Aula inclusiva checklist */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-white/15 rounded-lg">
                <HeartHandshake className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="font-sans font-bold text-lg">Tu Brújula Intercultural</h3>
            </div>
            <p className="font-sans text-sm text-indigo-100 mb-4">
              Criterios clave para identificar si un recurso de aula es realmente intercultural:
            </p>
            <ul className="space-y-3 font-sans text-xs text-indigo-50">
              <li className="flex items-start gap-2">
                <span className="text-amber-300 font-bold">✔</span>
                <span>¿Visibiliza la asimetría de privilegios o se limita a un festejo folclórico?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-300 font-bold">✔</span>
                <span>¿Da voz activa a los alumnos para tejer puentes, en lugar de encasillarlos?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-300 font-bold">✔</span>
                <span>¿Involucra un espacio seguro para el diálogo horizontal guiado?</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
