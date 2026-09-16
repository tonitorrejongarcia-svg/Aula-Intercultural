
import { useState, useEffect } from 'react';
import { ShieldCheck, HelpCircle, AlertCircle, RefreshCw, Award, ArrowRight, Lightbulb, CheckCircle2, Shuffle } from 'lucide-react';

interface AuditOption {
  text: string;
  score: number;
  tip: string;
}

interface AuditQuestion {
  id: number;
  text: string;
  options: AuditOption[];
}

const ALL_QUESTIONS: AuditQuestion[] = [
  {
    id: 1,
    text: '¿Cómo se aborda la presencia de colectivos diversos en tu programación docente?',
    options: [
      { text: 'Se reduce a celebrar fechas señaladas, trajes típicos o gastronomía de forma esporádica.', score: 0, tip: 'Cuidado con el "Multiculturalismo Folclórico". Reducir la cultura a platos típicos petrifica los estereotipos.' },
      { text: 'Se mencionan como ejemplos puntuales cuando encaja en alguna asignatura específica de geografía o tutoría.', score: 1, tip: 'Es un avance, pero sigue considerándose un "anexo" prescindible.' },
      { text: 'Se integran sus aportes científicos, literarios e históricos de forma sistémica y natural, decolonizando el saber.', score: 2, tip: '¡Excelente! Así se enseña que la ciencia, las matemáticas y el arte son creaciones transnacionales simétricas.' }
    ]
  },
  {
    id: 2,
    text: '¿Se analizan críticamente las asimetrías de poder (privilegios, estatus legal, racismo)?',
    options: [
      { text: 'No, preferimos centrar el foco en valores alegres y abstractos de tolerancia para evitar tensiones políticas.', score: 0, tip: 'La tolerancia abstracta perpetúa las desigualdades silenciadas.' },
      { text: 'Se reflexiona sobre la empatía general y el racismo, pero sin profundizar en las barreras sistémicas del día a día.', score: 1, tip: 'El alumnado debe aprender a visibilizar y cuestionar el racismo institucional.' },
      { text: 'Se examinan de frente, mediante dinámicas físicas o socioafectivas, los puntos de partida desiguales.', score: 2, tip: '¡Es la espina dorsal de la interculturalidad crítica! Capacitas al alumnado como agentes transformadores.' }
    ]
  },
  {
    id: 3,
    text: '¿Qué tipo de protagonismo asume el alumnado de diversas raíces étnicas en clase?',
    options: [
      { text: 'Papel pasivo o asimilado, donde se espera que actúen conforme a moldes o normas nacionales sin mayor relieve.', score: 0, tip: 'Esto promueve el "Asimilacionismo". Anula la autoestima identitaria.' },
      { text: 'Se les pide que hablen o actúen como "portavoces oficiales" de su supuesto país de origen.', score: 1, tip: 'Cuidado con encasillarlos. Obligar a un alumno a "exhibirse" por su origen genera estrés.' },
      { text: 'Son partícipes activos y colíderes que codiseñan proyectos, cooperando en pie de igualdad sin ser encasillados.', score: 2, tip: '¡Espléndido! Se crea un "tercer espacio" común donde las identidades fluyen.' }
    ]
  },
  {
    id: 4,
    text: '¿Cómo involucras a las familias provenientes de entornos vulnerables o minorizados?',
    options: [
      { text: 'Apenas asisten ni se involucran por barreras horarias, lingüísticas o falta de comunicación.', score: 0, tip: 'La escuela debe dar el primer paso y flexibilizar sus formatos.' },
      { text: 'Se les invita a asistir de manera puntual a eventos lúdicos escolares, festivales del centro o ferias gastronómicas.', score: 1, tip: 'Tienen presencia pero sin protagonismo escolar efectivo.' },
      { text: 'Se articulan desayunos pedagógicos y saberes compartidos integrados en el currículo.', score: 2, tip: '¡Perfecto! Cuando la herencia familiar recibe reconocimiento formal, mejora la vinculación.' }
    ]
  },
  {
    id: 5,
    text: '¿Existe una evaluación holística de las actitudes y asunción del conflicto en el centro?',
    options: [
      { text: 'No, solo se evalúan contenidos teóricos tradicionales y se sanciona disciplinariamente la mala conducta.', score: 0, tip: 'El examen de contenidos fomenta el aprendizaje memorístico, ignorando el factor relacional.' },
      { text: 'Se valoran las dinámicas de grupo, pero no hay espacios fijos de descompresión y debates simétricos.', score: 1, tip: 'Es conveniente contar con protocolos fijos estructurados para la resolución de conflictos.' },
      { text: 'Contamos con asambleas ordinarias de debate reflexivo y dinámicas activas donde el conflicto se aborda pedagógicamente.', score: 2, tip: '¡Brillante! El conflicto se canaliza como material de crecimiento ético mutuo.' }
    ]
  },
  {
    id: 6,
    text: 'Cuando surge un incidente discriminatorio o un comentario sesgado en el aula, ¿cuál es tu reacción habitual?',
    options: [
      { text: 'Lo ignoro si es sutil o aplico un castigo rápido si es grave, para no perder tiempo de clase.', score: 0, tip: 'Silenciar el problema valida la agresión ante el resto del grupo.' },
      { text: 'Detengo la clase un momento para decir que "eso no está bien" y pido disculpas formales.', score: 1, tip: 'Las disculpas forzadas no generan reflexión profunda ni cambio de actitud.' },
      { text: 'Pauso la clase y utilizo el incidente como momento pedagógico (micro-debate) para analizar el peso de las palabras.', score: 2, tip: '¡Magistral! Convertir la crisis en currículo es la esencia de la docencia crítica.' }
    ]
  },
  {
    id: 7,
    text: '¿Qué referentes literarios, audiovisuales o históricos sueles emplear en tus explicaciones?',
    options: [
      { text: 'Principalmente el canon occidental tradicional; es lo que marcan los libros de texto.', score: 0, tip: 'El currículo eurocéntrico deja sin espejos donde mirarse a gran parte del alumnado.' },
      { text: 'El canon tradicional, pero dedico algún apartado o lectura optativa a autores/as de otras culturas.', score: 1, tip: 'Es un avance, pero sigue transmitiendo que esa diversidad es "alternativa" u opcional.' },
      { text: 'He reconstruido mis materiales para que la pluralidad de voces sea estructural, no un anexo.', score: 2, tip: 'La pluralidad estructural enseña que el conocimiento universal tiene muchos acentos.' }
    ]
  },
  {
    id: 8,
    text: '¿Cómo gestionas las diferencias lingüísticas (alumnado que no domina el idioma vehicular)?',
    options: [
      { text: 'Se les deriva a aulas de enlace o apoyo y se espera que se integren cuando aprendan el idioma.', score: 0, tip: 'La segregación lingüística prolongada genera aislamiento social severo.' },
      { text: 'Están en el aula ordinaria, intento simplificar mis explicaciones y uso algo de apoyo visual.', score: 1, tip: 'Bien, pero sigues enfocándolo como un déficit a compensar.' },
      { text: 'Fomento la ayuda entre iguales, valoro sus lenguas maternas como riqueza y uso metodologías visuales cooperativas.', score: 2, tip: '¡Excelente! Validar su lengua materna acelera el aprendizaje del idioma vehicular.' }
    ]
  },
  {
    id: 9,
    text: '¿Cómo abordas el tema de las religiones o creencias en el entorno escolar?',
    options: [
      { text: 'No se habla de ello; asumimos un calendario y rutinas hegemónicas (Navidad, etc.) sin adaptaciones.', score: 0, tip: 'La "neutralidad" aparente a menudo impone la cultura mayoritaria por defecto.' },
      { text: 'Permitimos ausencias justificadas por festividades de otras religiones, pero no se integran en la vida del aula.', score: 1, tip: 'La tolerancia pasiva respeta el derecho, pero pierde la oportunidad de conocimiento mutuo.' },
      { text: 'Invisibilizamos la jerarquía: felicitamos y aprendemos de las diversas festividades y adaptamos ritmos (ej. Ramadán).', score: 2, tip: '¡Fantástico! Flexibilizar el ritmo escolar ante realidades diversas es equidad real.' }
    ]
  },
  {
    id: 10,
    text: 'Frente a la formación de "guetos" o grupos cerrados en el patio, ¿qué papel juegas?',
    options: [
      { text: 'Ninguno. El patio es tiempo libre y los estudiantes tienen derecho a juntarse con quien quieran.', score: 0, tip: 'La segregación espacial suele reflejar miedos y prejuicios que la escuela debe mediar.' },
      { text: 'Les sugiero de vez en cuando que se mezclen, pero rara vez intervengo de forma directiva.', score: 1, tip: 'Las sugerencias verbales no suelen superar la comodidad de los grupos afines.' },
      { text: 'Diseño agrupaciones cooperativas rotativas en clase que acaban rompiendo barreras afectivas también en el patio.', score: 2, tip: '¡Exacto! El roce estructurado y positivo en el aula destruye muros fuera de ella.' }
    ]
  }
];

export default function InclusiveAudit() {
  const [activeQuestions, setActiveQuestions] = useState<AuditQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Helper to shuffle an array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const startNewAudit = () => {
    // Pick 5 random questions
    const shuffledQuestions = shuffleArray(ALL_QUESTIONS).slice(0, 5);
    
    // Shuffle options for each picked question so correct isn't always C
    const questionsWithOptionsShuffled = shuffledQuestions.map((q, idx) => ({
      ...q,
      id: idx + 1, // Re-number them 1 to 5 for UI display
      options: shuffleArray(q.options)
    }));

    setActiveQuestions(questionsWithOptionsShuffled);
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  useEffect(() => {
    startNewAudit();
  }, []);

  const handleSelectOption = (score: number) => {
    setAnswers({ ...answers, [currentStep]: score });
    if (currentStep < activeQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  if (activeQuestions.length === 0) return null; // loading state

  let totalScore = 0;
  for (const key in answers) {
    if (Object.prototype.hasOwnProperty.call(answers, key)) {
      totalScore += answers[Number(key)];
    }
  }

  const getEvaluationRange = () => {
    if (totalScore <= 3) {
      return {
        title: 'Asimilacionismo Inconsciente',
        desc: 'Tu enfoque aún promueve que el alumnado se amolde forzadamente a la cultura dominante. Es común reducir la diversidad a folclore, silenciando desequilibrios reales de privilegios.',
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        barColor: 'bg-rose-500',
        radarDetail: 'Recomendación crucial: Empieza por decolonizar el temario. No esperes a un "día puntual" e introduce dinámicas para detonar debates.'
      };
    } else if (totalScore <= 7) {
      return {
        title: 'Multiculturalismo Activo',
        desc: '¡Buen punto de partida! Tu programación da la bienvenida a la diversidad, abriendo puertas a la empatía. Falta analizar con valentía las asimetrías y crear debates fijos.',
        color: 'text-slate-600 bg-amber-50 border-amber-200',
        barColor: 'bg-slate-500',
        radarDetail: 'Recomendación: Atraviesa la marea del iceberg. Reta a tus alumnos a desenmascarar prejuicios con dinámicas sobre la brecha de oportunidades.'
      };
    } else {
      return {
        title: 'Interculturalidad Crítica Avanzada',
        desc: '¡Espectacular! Tu programación es un modelo de justicia social y empoderamiento mutuo de identidades. Tratas el conflicto como combustible pedagógico inestimable.',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        barColor: 'bg-emerald-600',
        radarDetail: 'Recomendación: Tu aula ya teje puentes reales. ¡Comparte tus propuestas en la pestaña "Contacto" para inspirar a otros docentes!'
      };
    }
  };

  const currentResult = getEvaluationRange();

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all" id="inclusive-audit-box">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-orange-600 text-white rounded-xl shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-sans font-extrabold text-[#111827] text-lg leading-tight md:text-xl">
              Autoevaluación Intercultural
            </h3>
            <p className="font-sans text-xs text-slate-500">
              Diagnostica tu enfoque docente.
            </p>
          </div>
        </div>
        {!showResults && (
          <button 
            onClick={startNewAudit}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-lg shrink-0"
            title="Cargar otras preguntas distintas"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Cambiar test
          </button>
        )}
      </div>

      {!showResults ? (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider font-sans text-slate-400">
              <span>Pregunta aleatoria</span>
              <span>{currentStep + 1} de {activeQuestions.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs space-y-3">
            <h4 className="font-sans font-extrabold text-slate-800 text-base flex gap-2">
              <span className="text-orange-600 font-mono">Q{activeQuestions[currentStep].id}.</span>
              {activeQuestions[currentStep].text}
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {activeQuestions[currentStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt.score)}
                className="w-full text-left p-4 bg-white hover:bg-orange-50/20 border border-slate-200 hover:border-orange-500 rounded-2xl transition-all font-sans text-xs sm:text-sm text-slate-700 leading-relaxed group outline-none focus:ring-2 focus:ring-orange-500/30 flex justify-between items-center gap-3"
                id={`audit-opt-${currentStep}-${i}`}
              >
                <span>{opt.text}</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] font-mono text-slate-400 italic">Respuestas anónimas recopiladas localmente</span>
            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-sans font-bold text-orange-600 hover:underline"
              >
                ← Volver atrás
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className={`p-6 rounded-2xl border ${currentResult.color} space-y-4`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-wider uppercase font-sans text-slate-500">Rango de Enfoque</span>
                <h4 className="font-sans font-extrabold text-lg leading-tight sm:text-xl">
                  {currentResult.title}
                </h4>
              </div>
              <div className="text-center shrink-0">
                <span className="block font-mono text-3xl font-black text-black leading-none">{totalScore * 10}%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Puntaje</span>
              </div>
            </div>

            <div className="w-full h-3 bg-slate-200/50 rounded-full overflow-hidden">
              <div 
                className={`h-full ${currentResult.barColor} transition-all duration-1000`}
                style={{ width: `${(totalScore / 10) * 100}%` }}
              />
            </div>

            <p className="font-sans text-xs sm:text-sm leading-relaxed text-slate-700">
              {currentResult.desc}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-slate-500" />
              <h5 className="font-sans font-bold text-slate-800 text-sm">Dictamen Sugerido</h5>
            </div>
            <p className="font-sans text-xs text-slate-600 leading-relaxed">
              {currentResult.radarDetail}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={startNewAudit}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs focus:ring-4 focus:ring-slate-900/10"
              id="reset-audit-btn"
            >
              <RefreshCw className="w-4 h-4" />
              Vuelve a ponerte a prueba
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
