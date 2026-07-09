/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShieldCheck, HelpCircle, AlertCircle, RefreshCw, Award, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';

interface AuditQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
    tip: string;
  }[];
}

export default function InclusiveAudit() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const questions: AuditQuestion[] = [
    {
      id: 1,
      text: '¿Cómo se aborda la presencia de colectivos diversos en tu programación docente?',
      options: [
        {
          text: 'Se reduce a celebrar fechas señaladas, trajes típicos o gastronomía de otros países de forma esporádica.',
          score: 0,
          tip: 'Cuidado con el "Multiculturalismo Folclórico". Reducir la cultura a platos típicos petrifica los estereotipos. Integra estos aportes en el currículo troncal común de forma continuada.'
        },
        {
          text: 'Se mencionan como ejemplos puntuales cuando encaja en alguna asignatura específica de geografía o tutoría.',
          score: 1,
          tip: 'Es un avance, pero sigue considerándose un "anexo" prescindible. El alumnado percibe que sigue habiendo una voz hegemónica y una minoritaria "invitada".'
        },
        {
          text: 'Se integran sus aportes científicos, literarios e históricos de forma sistémica y natural, decolonizando el saber ordinario de clase.',
          score: 2,
          tip: '¡Excelente! Así se enseña que la ciencia, las matemáticas y el arte son creaciones transnacionales simétricas.'
        }
      ]
    },
    {
      id: 2,
      text: '¿Se analizan críticamente las asimetrías de poder (privilegios, estatus legal, racismo)?',
      options: [
        {
          text: 'No, preferimos centrar el foco en valores alegres y abstractos de tolerancia para evitar tensiones políticas o debates incómodos.',
          score: 0,
          tip: 'La tolerancia abstracta perpetúa las desigualdades silenciadas. Hablar sobre justicia exige destapar el desequilibrio de privilegios para dar soluciones activas.'
        },
        {
          text: 'Se reflexiona sobre la empatía general y el racismo, pero sin profundizar en las barreras burocráticas o sistémicas del día a día.',
          score: 1,
          tip: 'La empatía interpersonal es un buen puente, pero el alumnado debe aprender a visibilizar y cuestionar el racismo institucional o estructural de la sociedad.'
        },
        {
          text: 'Se examinan de frente, mediante dinámicas físicas o socioafectivas (ej: "Paso al Frente"), los puntos de partida desiguales y la injusticia social activa.',
          score: 2,
          tip: '¡Es la espina dorsal de la interculturalidad crítica! Capacitas al alumnado como agentes de equidad transformadores.'
        }
      ]
    },
    {
      id: 3,
      text: '¿Qué tipo de protagonismo y voz asume el alumnado de diversas raíces étnicas en clase?',
      options: [
        {
          text: 'Papel pasivo o asimilado, donde se espera que actúen conforme a moldes o normas tradicionales nacionales sin mayor relieve.',
          score: 0,
          tip: 'Esto promueve el "Asimilacionismo". El silencio o la adaptación forzosa anula la autoestima identitaria y priva al aula de un diálogo fértil.'
        },
        {
          text: 'Se les pide que hablen o actúen como "portavoces oficiales" de su supuesto país de origen cuando se habla de inmigración.',
          score: 1,
          tip: 'Cuidado con encasillarlos. Obligar a un alumno a "exhibirse" por su origen genera estrés, exclusión y los reduce a una etiqueta monolítica.'
        },
        {
          text: 'Son partícipes activos y colíderes que codiseñan proyectos, donde todo el grupo coopera en pie de igualdad sin ser encasillados en estereotipos.',
          score: 2,
          tip: '¡Espléndido! Se crea un "tercer espacio" común donde las identidades fluyen y se transforman recíprocamente por el contacto libre.'
        }
      ]
    },
    {
      id: 4,
      text: '¿Cómo involucras a las familias provenientes de entornos vulnerables o minorizados?',
      options: [
        {
          text: 'Apenas asisten ni se involucran por barreras horarias, lingüísticas o falta de comunicación bilateral efectiva.',
          score: 0,
          tip: 'La escuela debe dar el primer paso. Cambiar tutorías rígidas por boletín por invitaciones amables o café pedagógico relaja las distancias.'
        },
        {
          text: 'Se les invita a asistir de manera puntual a eventos lúdicos escolares, festivales del centro o ferias gastronómicas.',
          score: 1,
          tip: 'Gozan de presencia pero sin protagonismo escolar efectivo. Intenta involucrar sus saberes familiares directos dentro de los contenidos evaluables.'
        },
        {
          text: 'Se articulan desayunos pedagógicos, saberes compartidos (ej: cuentos en lengua materna, oficios tradicionales) integrados en el currículo.',
          score: 2,
          tip: '¡Perfecto! Cuando la herencia familiar recibe reconocimiento formal, el alumnado mejora notoriamente su vinculación afectiva con la escuela.'
        }
      ]
    },
    {
      id: 5,
      text: '¿Existe una evaluación holística de las actitudes y asunción del conflicto en el centro?',
      options: [
        {
          text: 'No, solo se evalúan contenidos teóricos conceptuales tradicionales y se sanciona disciplinariamente la mala conducta.',
          score: 0,
          tip: 'El examen de contenidos fomenta el aprendizaje memorístico. La educación intercultural es, ante todo, actitudinal, cívica y orientada al bien común.'
        },
        {
          text: 'Se valoran las dinámicas de grupo, pero el aula no dispone de espacios fijos o cronometrados de descompresión y debates simétricos.',
          score: 1,
          tip: 'Dolerá al resolver roces rápidos. Es conveniente contar con protocolos fijos (asambleas, tutoría entre iguales) estructurados bajo el agua.'
        },
        {
          text: 'Contamos con asambleas ordinarias de debate reflexivo y dinámicas activas con fases estructuradas donde el conflicto se aborda pedagógicamente.',
          score: 2,
          tip: '¡Brillante! El conflicto no se reprime de manera autoritaria; se canaliza como material pedagógico de crecimiento ético mutuo.'
        }
      ]
    }
  ];

  const handleSelectOption = (score: number) => {
    setAnswers({ ...answers, [currentStep]: score });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetAudit = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  let totalScore = 0;
  for (const key in answers) {
    if (Object.prototype.hasOwnProperty.call(answers, key)) {
      totalScore += answers[Number(key)];
    }
  }

  const getEvaluationRange = () => {
    if (totalScore <= 3) {
      return {
        title: 'Asimilacionismo Inconsciente / Coexistencia Cruda',
        desc: 'Tu enfoque aún se halla atrapado en la superficie de la marea o promueve que el alumnado se amolde de forma forzada a la cultura dominante. Es común reducir la diversidad a un folclore festivo, silenciando los desequilibrios reales de privilegios.',
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        barColor: 'bg-rose-500',
        radarDetail: 'Recomendación crucial: Empieza por decolonizar el temario. No esperes a un "día puntual" para hablar de diversidad e introduce dinámicas físicas de aula (como "La Maleta Invisible" o "El Teléfono del Prejuicio") para detonar debates profundos.'
      };
    } else if (totalScore <= 7) {
      return {
        title: 'Multiculturalismo de Integración Activa',
        desc: '¡Buen punto de partida! Tu programación reconoce y da la bienvenida a la diversidad, abriendo puertas a la empatía bilateral. Sin embargo, aún faltaría analizar con más valentía las asimetrías administrativas (estatus legar, racismo estructural) y dotar al aula de espacios estructurados fijos de debate.',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        barColor: 'bg-amber-500',
        radarDetail: 'Recomendación estratégica: Atraviesa la marea del iceberg. Reta a tus alumnos a desenmascarar los prejuicios sumergidos. Puedes usar la dinámica del cronómetro "Paso al Frente" para visibilizar físicamente la brecha de oportunidades iniciales.'
      };
    } else {
      return {
        title: 'Interculturalidad Crítica y Decolonial Avanzada',
        desc: '¡Espectacular! Tu programación docente es un modelo asombroso de justicia social, decolonialidad del saber ordinario y empoderamiento mutuo de identidades. Tratas el conflicto como combustible pedagógico de valor inestimable y las familias son sabias copartícipes.',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        barColor: 'bg-emerald-600',
        radarDetail: 'Recomendación inspiradora: Tu aula ya teje puentes reales. Comparte tus propuestas de dinámicas personalizadas incluyéndolas en la pestaña "Contacto y Comunidad" de este portal para inspirar de inmediato a otros docentes de secundaria!'
      };
    }
  };

  const currentResult = getEvaluationRange();

  return (
    <div className="bg-gradient-to-br from-indigo-50/50 via-teal-50/25 to-rose-50/30 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all" id="inclusive-audit-box">
      <div className="flex items-center gap-3.5 mb-6">
        <div className="p-2.5 bg-gradient-to-tr from-teal-600 to-indigo-600 text-white rounded-xl shadow-xs">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-sans font-extrabold text-[#111827] text-lg leading-tight md:text-xl">
            El Intercultural-ó-metro: Auditor Docente
          </h3>
          <p className="font-sans text-xs text-slate-500">
            Diagnostica de forma interactiva el nivel de inclusión crítica de tu programación curricular.
          </p>
        </div>
      </div>

      {!showResults ? (
        <div className="space-y-6">
          {/* Progress gauge bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider font-sans text-slate-400">
              <span>Dimensión Evaluadora</span>
              <span>{currentStep + 1} de {questions.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs space-y-3">
            <h4 className="font-sans font-extrabold text-slate-800 text-base flex gap-2">
              <span className="text-teal-600 font-mono">Q{questions[currentStep].id}.</span>
              {questions[currentStep].text}
            </h4>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {questions[currentStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt.score)}
                className="w-full text-left p-4 bg-white hover:bg-teal-50/20 border border-slate-200 hover:border-teal-500 rounded-2xl transition-all font-sans text-xs sm:text-sm text-slate-700 leading-relaxed group outline-none focus:ring-2 focus:ring-teal-500/30 flex justify-between items-center gap-3"
                id={`audit-opt-${currentStep}-${i}`}
              >
                <span>{opt.text}</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] font-mono text-slate-400 italic">Respuestas anónimas recopiladas localmente</span>
            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-sans font-bold text-teal-600 hover:underline"
              >
                ← Volver atrás
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {/* Score display radial-like */}
          <div className={`p-6 rounded-2xl border ${currentResult.color} space-y-4`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-wider uppercase font-sans text-slate-500">Rango de Enfoque Curricular</span>
                <h4 className="font-sans font-extrabold text-lg leading-tight sm:text-xl">
                  {currentResult.title}
                </h4>
              </div>
              <div className="text-center shrink-0">
                <span className="block font-mono text-3xl font-black text-black leading-none">{totalScore * 10}%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Puntaje Inclusivo</span>
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

          {/* Core Tip Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h5 className="font-sans font-bold text-slate-800 text-sm">Dictamen Metodológico Sugerido</h5>
            </div>
            <p className="font-sans text-xs text-slate-600 leading-relaxed">
              {currentResult.radarDetail}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={resetAudit}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs focus:ring-4 focus:ring-slate-900/10"
              id="reset-audit-btn"
            >
              <RefreshCw className="w-4 h-4" />
              Volver a auditar programación
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
