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

const initialFacts = [
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

export default function Hero({ setActiveTab, heroTitle, heroSubtitle }: HeroProps) {
  const [facts, setFacts] = useState(initialFacts);
  // Pick a random starting pill to avoid repetitiveness
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * initialFacts.length));
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stats = [
    { value: "+30", label: "Minutos de Dinámica Promedio", detail: "Perfectas para tutorías estructuradas" },
    { value: "100%", label: "Contenido Disponible", detail: "Sin links rotos ni webs externas" },
    { value: "0€", label: "Recursos Accesibles", detail: "Libre reproducción para fines escolares" }
  ];

  const handleInspirePill = async () => {
    if (isGenerating) return;
    if (quoteIndex < facts.length - 1) {
      setQuoteIndex((prev) => prev + 1);
    } else {
      await generateNewPill();
    }
  };

  const generateNewPill = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-pill", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error al generar la píldora.");
      }
      
      const newFact = { title: data.title, text: data.text };
      setFacts(prev => [...prev, newFact]);
      setQuoteIndex(prev => prev + 1);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-slate-50" id="hero-section">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Texts and CTAs */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/60 text-orange-800 text-xs font-semibold uppercase tracking-wider font-sans">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            Recursos Didácticos Interactivos
          </div>

          <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
            {heroTitle ? (
              <span>{heroTitle}</span>
            ) : (
              <>
                Educar en la diferencia es <span className="text-transparent bg-clip-text bg-orange-600 font-extrabold">construir comunidad</span>.
              </>
            )}
          </h2>

          <p className="font-sans text-lg text-slate-600 leading-relaxed max-w-2xl">
            {heroSubtitle || "Una plataforma interactiva concebida para docentes de todas las etapas (Infantil, Primaria, Secundaria). Descubre marcos teóricos rigurosos, dinámicas de aula guiadas paso a paso, glosarios explicativos y estrategias para cultivar un aula inclusiva, crítica e intercultural."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setActiveTab('recursos')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-sans font-bold text-base rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-orange-500/30 cursor-pointer"
              id="hero-cta-recursos"
            >
              <BookOpen className="w-5 h-5" />
              Explorar Dinámicas de Aula
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('concepto')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-orange-600 hover:bg-orange-50/30 text-orange-700 font-sans font-bold text-base rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-600/20 cursor-pointer"
              id="hero-cta-concepto"
            >
              ¿Qué es la Interculturalidad?
            </button>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="font-sans font-extrabold text-3xl text-orange-600">{stat.value}</span>
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-4">
              <span className="text-white text-xs font-sans font-bold bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                Cooperación y Diálogo en el Aula
              </span>
            </div>
          </div>

          {/* Card: Sabías que... */}
          <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-500/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 text-slate-700 rounded-lg">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-lg text-slate-800">Píldora Pedagógica</h3>
            </div>

            <div className="min-h-[120px] flex flex-col justify-between">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center space-y-3 h-full animate-pulse py-4">
                  <div className="w-8 h-8 rounded-full border-4 border-slate-100 border-t-amber-500 animate-spin mx-auto" />
                  <p className="font-sans text-slate-400 text-xs italic tracking-wide text-center">
                    Creando píldora (unos segundos)...
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="font-sans font-extrabold text-base text-orange-700">
                    {facts[quoteIndex].title}
                  </h4>
                  <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                    "{facts[quoteIndex].text}"
                  </p>
                  {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                </div>
              )}
              
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={handleInspirePill}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-150 font-sans font-semibold text-xs rounded-xl transition-colors focus:outline-none cursor-pointer disabled:opacity-50"
                  id="inspire-fact-button"
                >
                  Inspirar otra píldora
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick interactive widget: Aula inclusiva checklist */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-white/15 rounded-lg">
                <HeartHandshake className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="font-sans font-bold text-lg">Tu Brújula Intercultural</h3>
            </div>
            <p className="font-sans text-sm text-emerald-100 mb-4">
              Criterios clave para identificar si un recurso de aula es realmente intercultural:
            </p>
            <ul className="space-y-3 font-sans text-xs text-emerald-50">
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
