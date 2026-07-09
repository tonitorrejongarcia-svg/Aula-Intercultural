/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Award, ShieldAlert, Sparkles, HelpCircle, ArrowRightLeft, BookOpenCheck, BrainCircuit, Users, Eye, HelpCircle as HelpIcon } from 'lucide-react';

export default function Conceptual() {
  const [activePillar, setActivePillar] = useState(0);
  const [revealedMyths, setRevealedMyths] = useState<Record<number, boolean>>({});

  const myths = [
    {
      id: 1,
      myth: "La educación intercultural busca integrar y amoldar al alumnado migrante en la cultura autóctona receptora.",
      reality: "Asimilacionismo encubierto. La interculturalidad no exige mutilar la identidad de origen. Al contrario, promueve un cambio mutuo y recíproco. Toda la escuela (docentes, familias nativas y alumnos) se transforma a través del diálogo sin que un grupo actúe como molde absoluto.",
      conceptName: "Frente al Asimilacionismo"
    },
    {
      id: 2,
      myth: "Se reduce a implementar jornadas escolares de gastronomía extranjera, danzas típicas o celebrar el Día de las Culturas.",
      reality: "Multiculturalismo folclórico. Reducir la cultura a platos típicos y vestimentas de colores fosiliza los estereotipos y obvia las necesidades profundas. La verdadera interculturalidad opera bajo el agua de la marea: analiza valores morales, la equidad socioeconómica y el racismo sistémico.",
      conceptName: "Más allá del Folclor"
    },
    {
      id: 3,
      myth: "Esta pedagogía sólo es pertinente en institutos con alta presencia de alumnos procedentes de otros países.",
      reality: "Inmunización contra el sesgo. Un instituto monolingüe o socialmente uniforme es donde más urge la intervención. Previene el auge de burbujas morales etnocéntricas y capacita a las futuras generaciones para cohabitar sanamente en sociedades radicalmente diversas.",
      conceptName: "Urgencia Global"
    }
  ];

  const pillars = [
    {
      title: "1. Reconocimiento de la Diversidad",
      description: "Supera la vieja máxima asimilacionista que abogaba por la 'neutralidad' o la homogeneidad. Reconocer la diversidad implica legitimar las distintas lenguas, procedencias e historias como tesoros comunitarios insustituibles en el aula de secundaria.",
      icon: Users,
      academicQuote: "La identidad no se anula por la igualdad de derechos; se consolida en ella."
    },
    {
      title: "2. Justicia Social y Equidad",
      description: "Combate la idea falaz de la meritocracia ciega. Reconoce activamente que existen abismos legales, prejuicios lingüísticos y barreras raciales de partida. Dispone recursos específicos para equilibrar las oportunidades efectivas de aprendizaje de todo el grupo.",
      icon: ShieldAlert,
      academicQuote: "Dar a todos lo mismo es igualdad; dar a cada uno lo que necesita para prosperar es justicia."
    },
    {
      title: "3. Diálogo Simétrico y Horizontal",
      description: "Promueve relaciones donde ninguna cosmovisión se erige como dueña o jueza absoluta del saber. El aula se concibe como un foro inclusivo permanente centrado en el respeto mutuo, donde se desbaratan las relaciones jerárquicas coloniales de la ciencia tradicional.",
      icon: ArrowRightLeft,
      academicQuote: "El diálogo real no asimila al interlocutor; genera un tercer espacio compartido."
    },
    {
      title: "4. Transversalidad Curricular",
      description: "Rechaza el modelo de 'añadir un anexo' temporal al temario escolar. Exige rehacer las unidades didácticas principales del curso (historia, literatura, matemáticas, ciencias) incorporando de raíz los aportes intelectuales de civilizaciones no occidentales.",
      icon: BookOpenCheck,
      academicQuote: "El saber escolar debe dejar de tener un único centro geográfico de validez."
    }
  ];

  const toggleMyth = (id: number) => {
    setRevealedMyths((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-b from-white via-teal-50/10 to-slate-50/50" id="conceptual-section">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold font-sans uppercase tracking-wide border border-teal-200">
            <BrainCircuit className="w-4 h-4 text-teal-600" />
            Enfoque Conceptual y Pedagógico
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight">
            ¿Qué entendemos por Educación Intercultural?
          </h2>
          <p className="font-sans text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Un marco educativo transformador que va mucho más allá de la tolerancia formal. Busca reconstruir la práctica docente diaria bajo principios de justicia social, decolonialidad del saber y diálogo de igual a igual.
          </p>
        </div>

        {/* METÁFORA DEL ICEBERG + EXPLANATION WITH SUPPORTING IMAGE */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="conceptual-iceberg-presentation">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Modelo Clave de Análisis
            </span>
            <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-950 tracking-tight leading-tight">
              La Teoría del Iceberg Cultural de Edward T. Hall
            </h3>
            <p className="font-sans text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
              La cultura humana es semejante a un témpano flotante en el océano. Solo una pequeña fracción es captable instantáneamente por un observador externo (la gastronomía popular, la música de fiesta o el modo de vestir). El resto del volumen descansa sumergido:
            </p>

            <ul className="space-y-3 font-sans text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2 bg-teal-50/40 p-3 rounded-xl border border-teal-100/50">
                <span className="text-teal-600 font-extrabold mt-0.5">▲ Punta visible (15%):</span>
                <span>Aspectos folclóricos, literatura clásica, bailes folclóricos y festividades icónicas. Es fácil de tolerar pero frágil frente al análisis crítico.</span>
              </li>
              <li className="flex items-start gap-2 bg-indigo-50/40 p-3 rounded-xl border border-indigo-100/50">
                <span className="text-indigo-600 font-extrabold mt-0.5">▼ Zona sumergida (85%):</span>
                <span>Leyes invisibles de cortesía, concepción de la puntualidad y el tiempo, roles morales y de género, noción del espacio vital y asunción del pudor familiar. En esta profundidad es donde suceden los choques más duros de convivencia escolar.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 h-80 rounded-2xl overflow-hidden shadow-md border border-slate-200 relative group">
            <img
              src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=700&q=80"
              alt="Prístino iceberg azul en el océano polar helado"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent flex items-end p-4">
              <span className="bg-white/95 text-slate-800 text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 backdrop-blur-xs leading-none">
                La zona invisible rige el comportamiento
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Blocks: Myths vs Realities */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-rose-500" />
            <h3 className="font-sans font-extrabold text-xl md:text-2xl text-slate-900">
              Desmontando Falacias: Mitos y Realidades
            </h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-2xl leading-normal">
            Pulsa en cada una de las tarjetas para darles la vuelta de forma interactiva y confrontar las falsas creencias pedagógicas más habituales con su realidad empírica.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {myths.map((item) => {
              const isRevealed = !!revealedMyths[item.id];
              return (
                <button 
                  key={item.id} 
                  onClick={() => toggleMyth(item.id)}
                  className="min-h-[300px] flex flex-col justify-between border rounded-2xl p-6 transition-all duration-300 relative overflow-hidden bg-white text-left outline-none cursor-pointer select-none"
                  style={{
                    borderColor: isRevealed ? '#0d9488' : '#e2e8f0',
                    boxShadow: isRevealed ? '0 12px 20px -8px rgba(13, 148, 136, 0.2)' : '0 1px 3px 0 rgba(0,0,0,0.02)'
                  }}
                  id={`btn-toggle-myth-${item.id}`}
                >
                  <div className="space-y-4 w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                        {item.conceptName}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full font-sans font-bold text-[9px] border uppercase ${
                        isRevealed 
                          ? 'bg-teal-50 text-teal-800 border-teal-200' 
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {isRevealed ? 'REALIDAD REVELADA' : 'FASE: MITO'}
                      </span>
                    </div>

                    {/* Content change based on click state with smooth transition styling */}
                    <div className="transition-all duration-300 w-full">
                      {!isRevealed ? (
                        <div className="space-y-3">
                          <h4 className="font-sans font-extrabold text-base text-rose-600 flex items-center gap-1.5 leading-tight">
                            ❌ El Mito Escolar:
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                            "{item.myth}"
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3 animate-fadeIn">
                          <h4 className="font-sans font-extrabold text-base text-teal-700 flex items-center gap-1.5 leading-tight">
                            ✔ La Realidad Científica:
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {item.reality}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Toggle visual label at bottom */}
                  <div className={`w-full py-2 rounded-xl font-sans font-bold text-[10px] tracking-wide text-center border mt-6 ${
                    isRevealed 
                      ? 'bg-teal-50/10 border-teal-300 text-teal-700' 
                      : 'bg-rose-500 border-transparent text-white'
                  }`}>
                    {isRevealed ? 'Volver a ver el Mito' : 'Revelar Realidad Pedagógica'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Foundational Pillars: Interactive Tabs slider */}
        <div className="bg-slate-100/50 border border-slate-200/80 rounded-3xl p-6 md:p-10 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600 animate-bounce" />
              <h3 className="font-sans font-extrabold text-xl md:text-2xl text-slate-900">
                Los Cuatro Pilares del Enfoque Intercultural
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-2xl leading-normal">
              Navega entre los pilares estructurados por pedagogos de secundaria para sustentar un plan de educación inclusivo y transformador.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            {/* Navigation Tabs (Vertical in desktop) */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                const isSelected = activePillar === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePillar(idx)}
                    className={`w-full flex items-center gap-3.5 p-4 rounded-xl font-sans font-bold text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-md transform translate-x-1' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80'
                    } focus:outline-none`}
                    id={`pillar-tab-${idx}`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'bg-teal-50 text-teal-700'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm leading-tight">{pillar.title.substring(3)}</span>
                  </button>
                );
              })}
            </div>

            {/* Display panel (Interactive details) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-rose-500 font-bold">
                    Pilar {activePillar + 1} de la Guía Docente
                  </span>
                  <h4 className="font-sans font-extrabold text-xl md:text-2xl text-slate-900 mt-1">
                    {pillars[activePillar].title}
                  </h4>
                </div>
                
                <p className="font-sans text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                  {pillars[activePillar].description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/50 rounded-xl p-4 italic">
                <p className="font-sans text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Reflexión sugerida
                </p>
                <p className="font-sans text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  "{pillars[activePillar].academicQuote}"
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
