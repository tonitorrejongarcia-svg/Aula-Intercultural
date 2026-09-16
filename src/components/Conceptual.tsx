/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Award, ShieldAlert, Sparkles, HelpCircle, ArrowRightLeft, BookOpenCheck, BrainCircuit, Users, Eye, HelpCircle as HelpIcon } from 'lucide-react';

const ALL_MYTHS = [
  {
    id: "m1",
    myth: "La educación intercultural busca integrar y amoldar al alumnado migrante en la cultura autóctona receptora.",
    reality: "Asimilacionismo encubierto. La interculturalidad no exige mutilar la identidad de origen. Al contrario, promueve un cambio mutuo y recíproco. Toda la escuela (docentes, familias nativas y alumnos) se transforma a través del diálogo sin que un grupo actúe como molde absoluto.",
    conceptName: "Frente al Asimilacionismo"
  },
  {
    id: "m2",
    myth: "Se reduce a implementar jornadas escolares de gastronomía extranjera, danzas típicas o celebrar el Día de las Culturas.",
    reality: "Multiculturalismo folclórico. Reducir la cultura a platos típicos y vestimentas de colores fosiliza los estereotipos y obvia las necesidades profundas. La verdadera interculturalidad opera bajo el agua de la marea: analiza valores morales, la equidad socioeconómica y el racismo sistémico.",
    conceptName: "Más allá del Folclor"
  },
  {
    id: "m3",
    myth: "Esta pedagogía sólo es pertinente en institutos con alta presencia de alumnos procedentes de otros países.",
    reality: "Inmunización contra el sesgo. Un instituto monolingüe o socialmente uniforme es donde más urge la intervención. Previene el auge de burbujas morales etnocéntricas y capacita a las futuras generaciones para cohabitar sanamente en sociedades radicalmente diversas.",
    conceptName: "Urgencia Global"
  },
  {
    id: "m4",
    myth: "Tratar a todos por igual requiere 'no ver colores' ni diferencias culturales en clase.",
    reality: "Daltonismo Racial. Ignorar las diferencias reales silencia las desigualdades sistémicas que sufren ciertos estudiantes. Tratar con verdadera equidad exige reconocer y validar las identidades diversas, no borrarlas bajo un estándar normativo blanco.",
    conceptName: "Falsa Ceguera al Color"
  },
  {
    id: "m5",
    myth: "El rol del profesorado es mantener una neutralidad absoluta y evitar debates incómodos.",
    reality: "Falacia de Neutralidad. La pretendida objetividad suele imponer la visión de la cultura dominante por defecto. La pedagogía crítica asume el conflicto como una herramienta clave para desmontar prejuicios y enseñar pensamiento crítico.",
    conceptName: "Docencia Crítica"
  },
  {
    id: "m6",
    myth: "Si un alumno no domina el idioma vehicular, no puede aportar aprendizajes de valor al grupo.",
    reality: "El Mito del Déficit Lingüístico. Considerar la barrera idiomática como 'retraso' aísla al estudiante. Validar su lengua materna y usar metodologías visuales cooperativas demuestra que la inteligencia y la participación trascienden la gramática local.",
    conceptName: "Pluralismo Lingüístico"
  },
  {
    id: "m7",
    myth: "Si te esfuerzas, triunfas en los estudios, sin importar de dónde vengas ni qué acento tengas.",
    reality: "Meritocracia Ciega. El mito del esfuerzo aislado ignora que el racismo sistémico, la pobreza y las expectativas del docente actúan como frenos estructurales. No todos corren la misma carrera ni salen desde la misma casilla.",
    conceptName: "Meritocracia Ciega"
  },
  {
    id: "m8",
    myth: "Decir que los alumnos asiáticos son muy buenos en matemáticas es un elogio, no racismo.",
    reality: "Estereotipo Positivo. Los prejuicios 'buenos' deshumanizan, generan ansiedad académica y borran la individualidad del estudiante, encasillándolo en expectativas irreales. Además, usan a una minoría para atacar a otras.",
    conceptName: "Minoría Modelo"
  },
  {
    id: "m9",
    myth: "Es deber exclusivo de los grupos minoritarios integrarse y adaptarse a las normas del centro educativo.",
    reality: "Integración Unidireccional. La integración nunca es deber de una sola parte. Exige que el centro escolar y el grupo mayoritario también se transformen, revisen sus privilegios y abran espacios verdaderos de co-gobernanza.",
    conceptName: "El peso de la integración"
  },
  {
    id: "m10",
    myth: "Los conflictos en el patio o en clase surgen porque las culturas son sencillamente incompatibles.",
    reality: "Choque de Civilizaciones. Rara vez el problema es la cultura en abstracto; casi siempre son conflictos por falta de recursos, desigualdad de poder, malentendidos lingüísticos o prejuicios institucionales no abordados.",
    conceptName: "Guerra Cultural"
  },
  {
    id: "m11",
    myth: "La inclusión y diversidad son temas transversales ideales para tratar el viernes a última hora en tutoría.",
    reality: "Inclusión como Anexo. Si solo está en tutoría, es un mero accesorio. La educación intercultural debe empapar transversalmente los problemas de matemáticas, las lecturas de literatura y la selección de figuras en la clase de historia.",
    conceptName: "Relegación al Anexo"
  }
];

export default function Conceptual() {
  const [activePillar, setActivePillar] = useState(0);
  const [revealedMyths, setRevealedMyths] = useState<Record<number, boolean>>({});

  const [displayMyths, setDisplayMyths] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorAI, setErrorAI] = useState<string | null>(null);

  // Helper function to pick 3 random myths
  const shuffleAndPick = (array: any[], n: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  useEffect(() => {
    setDisplayMyths(shuffleAndPick(ALL_MYTHS, 3));
  }, []);

  const handleSelectPillar = (idx: number) => {
    setActivePillar(idx);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('pillar-detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setErrorAI(null);
    setRevealedMyths({}); // Reset reveals
    try {
      const response = await fetch('/api/generate-myths', { method: 'POST' });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      const newMyths = data.map((m: any, i: number) => ({
        id: `ai-${Date.now()}-${i}`,
        myth: m.myth,
        reality: m.reality,
        conceptName: m.conceptName
      }));
      setDisplayMyths(newMyths);
    } catch (err: any) {
      console.error(err);
      setErrorAI("Hubo un fallo temporal al conectar con la IA. Se han cargado otros mitos de reserva.");
      setDisplayMyths(shuffleAndPick(ALL_MYTHS, 3));
    } finally {
      setIsGenerating(false);
    }
  };

  const pillars = [
    {
      title: "1. Reconocimiento de la Diversidad",
      description: "Supera la vieja máxima asimilacionista que abogaba por la 'neutralidad' o la homogeneidad. Reconocer la diversidad implica legitimar las distintas lenguas, procedencias e historias como tesoros comunitarios insustituibles en el aula.",
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
    setRevealedMyths((prev) => {
      const isOpening = !prev[id];
      if (isOpening && window.innerWidth < 1024) {
        setTimeout(() => {
          document.getElementById(`myth-card-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
      return {
        ...prev,
        [id]: isOpening
      };
    });
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-slate-50" id="conceptual-section">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold font-sans uppercase tracking-wide border border-orange-200">
            <BrainCircuit className="w-4 h-4 text-orange-600" />
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
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Modelo Clave de Análisis
            </span>
            <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-950 tracking-tight leading-tight">
              La Teoría del Iceberg Cultural de Edward T. Hall
            </h3>
            <p className="font-sans text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
              La cultura humana es semejante a un témpano flotante en el océano. Solo una pequeña fracción es captable instantáneamente por un observador externo (la gastronomía popular, la música de fiesta o el modo de vestir). El resto del volumen descansa sumergido:
            </p>

            <ul className="space-y-3 font-sans text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2 bg-orange-50/40 p-3 rounded-xl border border-orange-100/50">
                <span className="text-orange-600 font-extrabold mt-0.5">▲ Punta visible (15%):</span>
                <span>Aspectos folclóricos, literatura clásica, bailes folclóricos y festividades icónicas. Es fácil de tolerar pero frágil frente al análisis crítico.</span>
              </li>
              <li className="flex items-start gap-2 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/50">
                <span className="text-emerald-700 font-extrabold mt-0.5">▼ Zona sumergida (85%):</span>
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-4">
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
            {displayMyths.map((item) => {
              const isRevealed = !!revealedMyths[item.id];
              return (
                <button 
                  key={item.id} 
                  id={`myth-card-${item.id}`}
                  onClick={() => toggleMyth(item.id)}
                  className="min-h-[300px] flex flex-col justify-between border rounded-2xl p-6 transition-all duration-300 relative overflow-hidden bg-white text-left outline-none cursor-pointer select-none scroll-mt-24"
                  style={{
                    borderColor: isRevealed ? '#0d9488' : '#e2e8f0',
                    boxShadow: isRevealed ? '0 12px 20px -8px rgba(13, 148, 136, 0.2)' : '0 1px 3px 0 rgba(0,0,0,0.02)'
                  }}
                >
                  <div className="space-y-4 w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                        {item.conceptName}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full font-sans font-bold text-[9px] border uppercase ${
                        isRevealed 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
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
                            ❌ {item.conceptName}:
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                            "{item.myth}"
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3 animate-fadeIn">
                          <h4 className="font-sans font-extrabold text-base text-emerald-700 flex items-center gap-1.5 leading-tight">
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
                      ? 'bg-emerald-50/10 border-emerald-300 text-emerald-700' 
                      : 'bg-rose-500 border-transparent text-white'
                  }`}>
                    {isRevealed ? 'Volver a ver el Mito' : 'Revelar Realidad Pedagógica'}
                  </div>
                </button>
              );
            })}
                    </div>
          
          <div className="flex flex-col items-center gap-3 pt-6">
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-sans font-bold rounded-xl transition-all shadow-md focus:ring-4 focus:ring-slate-900/10 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analizando falacias inéditas...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  Descubrir 3 nuevos mitos
                </>
              )}
            </button>
            {errorAI && <span className="text-[10px] text-rose-500 font-sans">{errorAI}</span>}
          </div>
        </div>

        {/* Foundational Pillars: Interactive Tabs slider */}
        <div className="bg-slate-100/50 border border-slate-200/80 rounded-3xl p-6 md:p-10 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600 animate-bounce" />
              <h3 className="font-sans font-extrabold text-xl md:text-2xl text-slate-900">
                Los Cuatro Pilares del Enfoque Intercultural
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-2xl leading-normal">
              Navega entre los pilares estructurados por pedagogos para sustentar un plan de educación inclusivo y transformador.
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
                    onClick={() => handleSelectPillar(idx)}
                    className={`w-full flex items-center gap-3.5 p-4 rounded-xl font-sans font-bold text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-orange-600 text-white shadow-md transform translate-x-1' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80'
                    } focus:outline-none`}
                    id={`pillar-tab-${idx}`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'bg-orange-50 text-orange-700'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm leading-tight">{pillar.title.substring(3)}</span>
                  </button>
                );
              })}
            </div>

            {/* Display panel (Interactive details) */}
            <div id="pillar-detail-panel" className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xs scroll-mt-24">
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
                  <Sparkles className="w-3.5 h-3.5 text-slate-500" /> Reflexión sugerida
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
