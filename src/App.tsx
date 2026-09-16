/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Conceptual from './components/Conceptual';
import HateSpeech from './components/HateSpeech';
import Resources from './components/Resources';
import Glossary from './components/Glossary';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import InclusiveAudit from './components/InclusiveAudit';
import CircleTimeDebate from './components/CircleTimeDebate';
import AccessibleReader from './components/AccessibleReader';
import AdminPanel from './components/AdminPanel';
import { Activity, GlossaryTerm, FAQItem } from './types';
import { INITIAL_ACTIVITIES, GLOSSARY_TERMS, FAQS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large' | 'xl'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Unified States for Dynamic Content
  const [activities, setActivities] = useState<Activity[]>([]);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [generalTexts, setGeneralTexts] = useState({
    heroTitle: '',
    heroSubtitle: '',
    supportEmail: 'contacto@aulaintercultural.es'
  });

  // Load state from localStorage on mount, or fallback to default data
  useEffect(() => {
    try {
      // 1. Activities
      const storedActivities = localStorage.getItem('intercultural_activities_all');
      if (storedActivities) {
        let parsed = JSON.parse(storedActivities);
        // Normalize targetGrades globally
        // Remove any corrupted data (e.g. FAQ items that accidentally got saved as activities)
        parsed = parsed.filter(a => a.title && a.id);

        parsed = parsed.map(a => {
           let lower = (a.targetGrade || '').toLowerCase();
           let newGrade = a.targetGrade;
           if (lower.includes('todas las etapas') || lower.includes('todos los niveles') || lower.includes('cualquier')) {
               newGrade = 'Todos los Niveles';
           } else if (lower.includes('eso') && lower.includes('bachillerato')) {
               newGrade = 'ESO y Bachillerato';
           } else if (lower.includes('eso')) {
               newGrade = 'ESO';
           } else if (lower.includes('bachillerato')) {
               newGrade = 'Bachillerato';
           } else if (lower.includes('primaria')) {
               newGrade = 'Primaria';
           } else if (lower.includes('infantil')) {
               newGrade = 'Infantil';
           }
           a.targetGrade = newGrade;
           return a;
        });
        // Force update if we added new defaults and they are missing, or if they are missing the new 'situations' fields
        const hasNewDefaults = parsed.some(a => a.id === 'res-conflictos-1') && parsed.some(a => a.id === 'cooperativo-1');
        const hasSituations = parsed.some(a => a.id === 'la-maleta-intercultural' && a.situations && a.situations.length > 0);
        const hasInfantil = parsed.some(a => a.id === 'las-gafas-magicas');
        if (!hasNewDefaults || !hasSituations || !hasInfantil) {
          const merged = [...INITIAL_ACTIVITIES, ...parsed.filter(a => a.isCustom)];
          setActivities(merged);
          localStorage.setItem('intercultural_activities_all', JSON.stringify(merged));
        } else {
          setActivities(parsed);
          // Force save to persist the cleaned up targetGrades and removed blank items
          localStorage.setItem('intercultural_activities_all', JSON.stringify(parsed));
        }
      } else {
        setActivities(INITIAL_ACTIVITIES);
        localStorage.setItem('intercultural_activities_all', JSON.stringify(INITIAL_ACTIVITIES));
      }

      // 2. Glossary
      const storedGlossary = localStorage.getItem('intercultural_glossary_all');
      if (storedGlossary) {
        let parsed = JSON.parse(storedGlossary);
        // Clean up accidental duplicate from local testing
        if (parsed.some(t => t.word === 'Etnocentrismo EDITADO')) {
           parsed = parsed.filter(t => t.word !== 'Etnocentrismo EDITADO');
        }
        
        // Remove ANY case-insensitive duplicates (keeping the first one found)
        const seen = new Set();
        const deduplicated = [];
        for (const term of parsed) {
            const lowerWord = term.word.toLowerCase();
            if (!seen.has(lowerWord)) {
                seen.add(lowerWord);
                deduplicated.push(term);
            }
        }
        parsed = deduplicated;

        // Merge missing new default terms from GLOSSARY_TERMS
        let updated = false;
        GLOSSARY_TERMS.forEach(defaultTerm => {
           if (!parsed.some(t => t.word.toLowerCase() === defaultTerm.word.toLowerCase())) {
               parsed.push(defaultTerm);
               updated = true;
           }
        });

        // Always sort alphabetically to maintain order, and force save to clean dupes
        parsed.sort((a, b) => a.word.localeCompare(b.word));
        localStorage.setItem('intercultural_glossary_all', JSON.stringify(parsed));

        setGlossaryTerms(parsed);
      } else {
        setGlossaryTerms(GLOSSARY_TERMS);
        localStorage.setItem('intercultural_glossary_all', JSON.stringify(GLOSSARY_TERMS));
      }

      // 3. FAQs
      const storedFaqs = localStorage.getItem('intercultural_faqs_all');
      if (storedFaqs) {
        let parsed = JSON.parse(storedFaqs);
        
        // Merge missing new default faqs from FAQS
        let updated = false;
        FAQS.forEach(defaultFaq => {
           if (!parsed.some(f => f.question === defaultFaq.question)) {
               parsed.push(defaultFaq);
               updated = true;
           }
        });
        
        if (updated) {
           localStorage.setItem('intercultural_faqs_all', JSON.stringify(parsed));
        }

        setFaqs(parsed);
      } else {
        setFaqs(FAQS);
        localStorage.setItem('intercultural_faqs_all', JSON.stringify(FAQS));
      }

      // 4. General Texts
      const storedTexts = localStorage.getItem('intercultural_general_texts');
      if (storedTexts) {
        let parsed = JSON.parse(storedTexts);
        const oldSub = 'Una plataforma interactiva concebida para docentes de educación secundaria. Descubre marcos teóricos rigurosos, dinámicas empíricas de aula guiadas paso a paso, glosarios explicativos y estrategias para cultivar un aula inclusiva, crítica e intercultural.';
        const newSub = 'Una plataforma interactiva concebida para docentes de todas las etapas (Infantil, Primaria, Secundaria). Descubre marcos teóricos rigurosos, dinámicas de aula guiadas paso a paso, glosarios explicativos y estrategias para cultivar un aula inclusiva, crítica e intercultural.';
        if (parsed.heroSubtitle && parsed.heroSubtitle.includes('docentes de educación secundaria')) {
           parsed.heroSubtitle = parsed.heroSubtitle.replace('docentes de educación secundaria', 'docentes de todas las etapas (Infantil, Primaria, Secundaria, Bachillerato)');
           localStorage.setItem('intercultural_general_texts', JSON.stringify(parsed));
        }
        if (parsed.heroTitle === 'Aula Intercultural de Secundaria') {
           parsed.heroTitle = 'Educar en la diferencia es construir comunidad.';
           localStorage.setItem('intercultural_general_texts', JSON.stringify(parsed));
        }
        setGeneralTexts(parsed);
      } else {
        const defaultTexts = {
          heroTitle: 'Educar en la diferencia es construir comunidad.',
          heroSubtitle: 'Una plataforma interactiva concebida para docentes de todas las etapas (Infantil, Primaria, Secundaria). Descubre marcos teóricos rigurosos, dinámicas de aula guiadas paso a paso, glosarios explicativos y estrategias para cultivar un aula inclusiva, crítica e intercultural.',
          supportEmail: 'contacto@aulaintercultural.es'
        };
        setGeneralTexts(defaultTexts);
        localStorage.setItem('intercultural_general_texts', JSON.stringify(defaultTexts));
      }
    } catch (e) {
      console.error('Error initializing state from localStorage:', e);
    }
  }, []);

  // Handle adding a new custom activity
  const handleAddCustomActivity = (newAct: Activity) => {
    const updated = [newAct, ...activities];
    setActivities(updated);
    try {
      localStorage.setItem('intercultural_activities_all', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving custom activity:', e);
    }
  };

  // Handle clearing all custom activities
  const handleClearCustomActivities = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar de forma permanente todas las dinámicas propuestas de la comunidad?')) {
      const updated = activities.filter(a => !a.isCustom);
      setActivities(updated);
      try {
        localStorage.setItem('intercultural_activities_all', JSON.stringify(updated));
      } catch (e) {
        console.error('Error clearing custom activities:', e);
      }
    }
  };

  // Restore Defaults
  const handleRestoreDefaults = () => {
    setActivities(INITIAL_ACTIVITIES);
    setGlossaryTerms(GLOSSARY_TERMS);
    setFaqs(FAQS);
    const defaults = {
      heroTitle: 'Educar en la diferencia es construir comunidad.',
      heroSubtitle: 'Una plataforma interactiva concebida para docentes de todas las etapas (Infantil, Primaria, Secundaria). Descubre marcos teóricos rigurosos, dinámicas de aula guiadas paso a paso, glosarios explicativos y estrategias para cultivar un aula inclusiva, crítica e intercultural.',
      supportEmail: 'contacto@aulaintercultural.es'
    };
    setGeneralTexts(defaults);

    localStorage.setItem('intercultural_activities_all', JSON.stringify(INITIAL_ACTIVITIES));
    localStorage.setItem('intercultural_glossary_all', JSON.stringify(GLOSSARY_TERMS));
    localStorage.setItem('intercultural_faqs_all', JSON.stringify(FAQS));
    localStorage.setItem('intercultural_general_texts', JSON.stringify(defaults));
  };

  // Derived state: customActivities for Contact page community board
  const customActivities = activities.filter(a => a.isCustom && a.isApproved);
  
  // Derived state: approved activities to show in Resources
  const approvedActivities = activities.filter(a => !a.isCustom || a.isApproved);

  // Scroll to main container on tab change for superior UX
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className={`min-h-screen text-[#1f2937] flex flex-col font-sans transition-all selection:bg-orange-600 selection:text-white ${fontSizeScale === 'large' ? 'font-scale-large' : fontSizeScale === 'xl' ? 'font-scale-xl' : ''} ${highContrast ? 'theme-high-contrast' : 'bg-[#fbfbfa]'}`}>
      {/* Dynamic Header navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container - Tab Content Routing */}
      <main className="flex-grow">
        {activeTab === 'inicio' && (
          <div className="animate-fadeIn">
            {/* Main banner and statistics */}
            <Hero 
              setActiveTab={setActiveTab} 
              heroTitle={generalTexts.heroTitle}
              heroSubtitle={generalTexts.heroSubtitle}
            />
            
            {/* Quick overview layout of resources inside home page for high fidelity */}
            <div className="bg-white/60 border-t border-b border-slate-200/80 py-16 px-4 md:px-8 shadow-2xs backdrop-blur-xs">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="text-xs font-mono font-bold text-orange-700 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full border border-orange-200/40">
                    AULA DE DIVERSIDAD
                  </span>
                  <h3 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight">
                    Recursos metodológicos listos para descargar y tutorizar
                  </h3>
                  <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed">
                    Nuestras dinámicas escolares están concebidas por y para el aula. Cada ficha técnica incluye objetivos, curso recomendado, materiales requeridos, y preguntas clave de cierre.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('recursos')}
                      className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-sans font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                      id="home-visit-recursos-btn"
                    >
                      Ir a los Recursos de Aula
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
                  <h4 className="font-sans font-extrabold text-slate-900 text-lg">¿Por qué usar Aula Intercultural?</h4>
                  <ul className="space-y-3 font-sans text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2.5 rounded-xl bg-slate-50/50 p-3 border border-slate-100">
                      <span className="text-orange-600 font-bold text-sm leading-none mt-0.5">💬</span>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Debates Estructurados</strong>
                        <span>Herramientas contra el racismo cotidiano facilitando la resolución grupal de conflictos.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 rounded-xl bg-slate-50/50 p-3 border border-slate-100">
                      <span className="text-rose-500 font-bold text-sm leading-none mt-0.5">⏱</span>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Cronómetro Integrado</strong>
                        <span>Controla las fases de juego sin perder el ritmo ni requerir apps auxiliares o interrupciones.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 rounded-xl bg-slate-50/50 p-3 border border-slate-100">
                      <span className="text-slate-500 font-bold text-sm leading-none mt-0.5">✍</span>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Glosario de Soporte</strong>
                        <span>Rigor metodológico inmediato a golpe de click para programaciones docentes de calidad.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CLASSROOM INTERACTIVE TOOLKIT SECTION */}
            <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="text-xs font-mono font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100 shadow-3xs inline-block">
                  Caja de Herramientas Interactivas
                </span>
                <h3 className="font-sans font-extrabold text-3xl text-slate-900 tracking-tight md:text-4xl">
                  Taller de Tutoría Activa
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                  Prueba estos dos recursos dinámicos para medir el enfoque inclusivo de tus temarios o lanzar debates espontáneos en el aula.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <InclusiveAudit />
                <CircleTimeDebate />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'concepto' && (
          <div className="animate-fadeIn">
            <Conceptual />
          </div>
        )}

        {activeTab === 'hate-speech' && (
          <div className="animate-fadeIn">
            <HateSpeech />
          </div>
        )}

        {activeTab === 'recursos' && (
          <div className="animate-fadeIn">
            <Resources activities={approvedActivities} />
          </div>
        )}

        {activeTab === 'glosario' && (
          <div className="animate-fadeIn">
            <Glossary glossaryTerms={glossaryTerms} />
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="animate-fadeIn">
            <FAQ faqs={faqs} onGoToContact={() => setActiveTab('contacto')} />
          </div>
        )}

        {activeTab === 'contacto' && (
          <div className="animate-fadeIn">
            <Contact
              onAddCustomActivity={handleAddCustomActivity}
              customActivities={customActivities}
              onClearCustomActivities={handleClearCustomActivities}
            />
          </div>
        )}

        {activeTab === 'intranet' && (
          <div className="animate-fadeIn">
            <AdminPanel
              activities={activities}
              setActivities={setActivities}
              glossaryTerms={glossaryTerms}
              setGlossaryTerms={setGlossaryTerms}
              faqs={faqs}
              setFaqs={setFaqs}
              generalTexts={generalTexts}
              setGeneralTexts={setGeneralTexts}
              onRestoreDefaults={handleRestoreDefaults}
            />
          </div>
        )}
      </main>

      {/* Accessibility floating assist panel */}
      <AccessibleReader
        fontSizeScale={fontSizeScale}
        setFontSizeScale={setFontSizeScale}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* Global Footer component */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
