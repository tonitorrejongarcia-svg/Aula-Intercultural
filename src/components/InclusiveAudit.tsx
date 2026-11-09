
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
    text: 'A la hora de hacer trabajos en grupo, ¿cómo se suelen organizar los equipos en tu clase?',
    options: [
      { text: 'Dejo que se junten libremente con sus amigos de siempre para evitar roces y quejas.', score: 0, tip: 'Dejar libertad absoluta suele reforzar que se formen grupos cerrados y que el alumnado nuevo o más tímido quede aislado.' },
      { text: 'A veces les sugiero que cambien de pareja, pero si insisten mucho les dejo elegir.', score: 1, tip: 'Es un buen intento, pero sin una pauta clara los grupos acaban siendo los mismos. Conviene fijar rotaciones naturales.' },
      { text: 'Diseño yo los grupos combinando diferentes habilidades y perfiles, rotándolos a lo largo del curso.', score: 2, tip: '¡Excelente! Trabajar en equipo con compañeros distintos es la forma más directa de romper prejuicios y hacer nuevas amistades.' }
    ]
  },
  {
    id: 2,
    text: 'Si escuchas en el aula una burla o comentario despectivo sobre el acento o el origen de alguien, ¿cómo actúas?',
    options: [
      { text: 'Si parece una broma entre amigos no le doy mayor importancia para no cortar la lección.', score: 0, tip: 'Dejar pasar esas "bromas" transmite la idea de que reírse del origen o forma de hablar de un compañero está normalizado.' },
      { text: 'Echo una reprimenda rápida en el momento, pido disculpas y continúo enseguida con la clase.', score: 1, tip: 'Cortar la falta es necesario, pero una disculpa forzada sin debate no evita que se repita en el recreo o en los pasillos.' },
      { text: 'Paro la clase unos minutos para hablar con naturalidad de lo ocurrido y reflexionar sobre el peso de esas palabras.', score: 2, tip: '¡Gran práctica docente! Aprovechar el momento para dialogar ayuda a que todo el grupo comprenda el impacto real de esos comentarios.' }
    ]
  },
  {
    id: 3,
    text: 'Llega al aula un estudiante nuevo que apenas domina el idioma del colegio. ¿Qué sueles hacer?',
    options: [
      { text: 'Le doy fichas sencillas individuales para que vaya haciendo lo que pueda mientras atiendo al resto.', score: 0, tip: 'Tenerle haciendo tareas aisladas al fondo de la clase frena su aprendizaje y aumenta su sensación de soledad.' },
      { text: 'Intento hablarle más despacio y le pido a algún compañero que le traduzca cuando no entiende algo.', score: 1, tip: 'Es una ayuda práctica, pero conviene apoyarse también en imágenes, apoyos visuales y tareas colaborativas guiadas.' },
      { text: 'Le asigno un compañero guía ("tutor entre iguales"), uso apoyos visuales y valoro también palabras de su lengua materna.', score: 2, tip: '¡Perfecto! El apoyo entre iguales y validar su idioma de origen acelera la adaptación y mejora enormemente su autoestima.' }
    ]
  },
  {
    id: 4,
    text: 'Cuando pones ejemplos, lecturas o personajes en tu asignatura, ¿qué referentes utilizas?',
    options: [
      { text: 'Únicamente los ejemplos y figuras que vienen por defecto en el libro de texto oficial.', score: 0, tip: 'Los libros tradicionales a menudo olvidan aportaciones valiosas de muchas culturas. Buscar otros ejemplos amplía la mirada de todos.' },
      { text: 'Alguna vez comento algo de otros países si coincide con algún día especial o festivo del calendario.', score: 1, tip: 'Está bien como detalle puntual, pero resulta mucho más enriquecedor si se nota de forma natural durante todo el curso.' },
      { text: 'Procuro incluir a científicos, escritoras o figuras históricas de diferentes culturas en el temario ordinario.', score: 2, tip: '¡Genial! Mostrar que personas de todos los orígenes han contribuido a la ciencia, la historia o el arte inspira a toda la clase.' }
    ]
  },
  {
    id: 5,
    text: 'Una familia de origen extranjero no acude a las tutorías ni responde notas escritas. ¿Qué haces?',
    options: [
      { text: 'Asumo que no tienen interés en el colegio y me centro en las familias que sí participan.', score: 0, tip: 'Cuidado con prejuzgar: a menudo hay turnos laborales muy duros, miedo a la burocracia o dificultad con el idioma escrito.' },
      { text: 'Insisto enviando más avisos por escrito o por la app del centro esperando que alguien conteste.', score: 1, tip: 'Si el canal escrito no funciona por barreras de idioma o tiempo, repetir el mismo método rara vez da resultado.' },
      { text: 'Busco alternativas: una llamada breve, notas con lenguaje sencillo o apoyarme en mediadores y traductores del centro.', score: 2, tip: '¡Exacto! Acercar posturas con canales accesibles y empatía suele cambiar radicalmente la relación y confianza con las familias.' }
    ]
  },
  {
    id: 6,
    text: 'En el aula conviven alumnos con diferentes tradiciones o religiones (Navidad, Ramadán, etc.). ¿Cómo lo tratas?',
    options: [
      { text: 'Hacemos lo de siempre de la cultura mayoritaria; si alguien tiene otra costumbre, que la celebre en su casa.', score: 0, tip: 'Hacer como si todos fueran iguales deja fuera a una parte de la clase y pierde la oportunidad de educar en convivencia real.' },
      { text: 'Les felicitamos el día de su fiesta si nos acordamos, pero sin cambiar ninguna actividad del aula.', score: 1, tip: 'Es un detalle respetuoso, aunque podemos dar un paso más y aprovecharlo como curiosidad cultural para toda la clase.' },
      { text: 'Aprovechamos para que compartan cómo lo celebran en familia y adaptamos ritmos si alguien está en ayuno o fiesta.', score: 2, tip: '¡Fantástico! Conocer las costumbres de los compañeros desmonta mitos y crea un clima de empatía y respeto mutuo.' }
    ]
  },
  {
    id: 7,
    text: 'En excursiones, meriendas o talleres surgen restricciones alimentarias (halal, vegetarianas, alergias). ¿Cómo reaccionas?',
    options: [
      { text: 'Me parece una complicación innecesaria; quien no pueda comer el menú estándar que se traiga su comida.', score: 0, tip: 'Apartar al que come diferente en los momentos de ocio o comida genera rechazo y sensación de no pertenecer al grupo.' },
      { text: 'Aviso a cocina o secretaría para que preparen una bandeja aparte, sin darle más vueltas.', score: 1, tip: 'Resuelve el tema práctico, pero es una buena ocasión para explicar con normalidad la diversidad gastronómica y cultural.' },
      { text: 'Aseguro que todos tengan opciones apetecibles e iguales y explico a la clase con normalidad por qué cada uno come distinto.', score: 2, tip: '¡Muy bien! Compartir la mesa respetando a cada uno es una de las lecciones de convivencia más potentes en la escuela.' }
    ]
  },
  {
    id: 8,
    text: 'Cuando se habla de un país o cultura concreta, ¿cómo interactúas con un alumno que tiene raíces en ese lugar?',
    options: [
      { text: 'Le pongo de pie delante de todos para que nos explique cómo se vive en "su país".', score: 0, tip: 'Forzar a un niño a ser el "portavoz" de toda una cultura puede hacerle sentir expuesto, incómodo o señalado ante el grupo.' },
      { text: 'No le pregunto nada en absoluto para no hacerle pasar vergüenza.', score: 1, tip: 'Es prudente, pero a veces el alumno querría aportar si se le da la oportunidad de forma cercana y voluntaria.' },
      { text: 'Le pregunto primero en privado o le invito a participar de forma voluntaria, sin presiones ni dar nada por hecho.', score: 2, tip: '¡Sensibilidad docente impecable! Dar la opción sin presionar respeta su ritmo personal y valida sus experiencias si desea compartirlas.' }
    ]
  },
  {
    id: 9,
    text: 'Dos estudiantes de diferentes orígenes discuten acaloradamente tras un juego en el recreo. ¿Cómo intervienes?',
    options: [
      { text: 'Les pongo un castigo o parte a los dos por igual y les mando a su sitio para zanjar la discusión.', score: 0, tip: 'Castigar sin escuchar qué ha pasado deja la rabia guardada y el conflicto se repetirá en la siguiente esquina.' },
      { text: 'Les obligo a darse la mano y pedirse perdón en el momento para cerrar el problema rápidamente.', score: 1, tip: 'Las paces forzadas por orden del profesor no resuelven el malentendido ni enseñan a ponerse en el lugar del otro.' },
      { text: 'Me siento con los dos con calma, escucho ambas versiones y les guío para que entiendan qué ha ofendido al otro.', score: 2, tip: '¡Mediación de diez! Enseñar a resolver discusiones hablando y escuchando es una de las competencias más valiosas para la vida.' }
    ]
  },
  {
    id: 10,
    text: 'Observas que en los recreos los estudiantes tienden a formar pandillas cerradas por origen o idioma. ¿Qué haces?',
    options: [
      { text: 'Nada, el recreo es tiempo libre y cada cual tiene derecho a juntarse con quien le apetezca.', score: 0, tip: 'El recreo es libre, pero si siempre se aíslan los mismos suele haber miedos o falta de puentes que el centro puede apoyar.' },
      { text: 'Me acerco y les digo de palabra que deberían jugar todos juntos al fútbol o charlar más.', score: 1, tip: 'La intención es buena, pero las sugerencias verbales rara vez rompen la inercia de los grupos ya hechos.' },
      { text: 'Fomento en el centro juegos cooperativos en los recreos y dinámicas en clase que faciliten que jueguen juntos fuera.', score: 2, tip: '¡Estrategia brillante! Si en clase aprenden a colaborar y reírse juntos, las barreras del patio se caen solas.' }
    ]
  }
];

export default function InclusiveAudit() {
  const [activeQuestions, setActiveQuestions] = useState<AuditQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOptionIndices, setSelectedOptionIndices] = useState<Record<number, number>>({});
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
    setSelectedOptionIndices({});
    setCurrentStep(0);
    setShowResults(false);
  };

  useEffect(() => {
    startNewAudit();
  }, []);

  const handleSelectOption = (index: number, score: number) => {
    if (selectedOptionIndices[currentStep] !== undefined) return;
    setSelectedOptionIndices(prev => ({ ...prev, [currentStep]: index }));
    setAnswers(prev => ({ ...prev, [currentStep]: score }));
  };

  const handleNextStep = () => {
    if (currentStep < activeQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          document.getElementById('inclusive-audit-box')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      setShowResults(true);
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          document.getElementById('inclusive-audit-box')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
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
        title: 'Enfoque Tradicional (Con margen de mejora)',
        desc: 'Tus clases funcionan con las rutinas habituales, pero todavía hay muchas oportunidades cotidianas para que la diversidad sume y evitar que las diferencias pasen desapercibidas o generen roces silenciosos.',
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        barColor: 'bg-rose-500',
        radarDetail: 'Consejo práctico: Empieza por cosas sencillas del día a día: rota las parejas de trabajo en clase y aprovecha cualquier incidente espontáneo para charlar 5 minutos sobre respeto y convivencia.'
      };
    } else if (totalScore <= 7) {
      return {
        title: 'Enfoque Abierto y Sensible (En buen camino)',
        desc: '¡Buen punto de partida! Te preocupas por la convivencia y ya das pasos prácticos en clase. El siguiente reto es pasar de los gestos puntuales a dinámicas estructuradas que fomenten empatía y colaboración continua.',
        color: 'text-slate-700 bg-amber-50 border-amber-200',
        barColor: 'bg-amber-500',
        radarDetail: 'Consejo práctico: Prueba a acercarte a las familias con canales más directos y organiza actividades cooperativas en clase que rompan las pandillas cerradas del recreo.'
      };
    } else {
      return {
        title: 'Aula Inclusiva y Dialogante (Excelente práctica)',
        desc: '¡Enhorabuena! Gestionas el aula con empatía, cercanía y sentido pedagógico. Conviertes las diferencias en un motor de aprendizaje cooperativo y creas un espacio seguro donde nadie sobra.',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        barColor: 'bg-emerald-600',
        radarDetail: 'Consejo práctico: Tu forma de trabajar en el aula es un modelo inspirador. ¡Anímate a compartir tus dinámicas en la sección de Contacto para inspirar a otros docentes!'
      };
    }
  };

  const currentResult = getEvaluationRange();

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all scroll-mt-24" id="inclusive-audit-box">
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
            {activeQuestions[currentStep].options.map((opt, i) => {
              const isAnswered = selectedOptionIndices[currentStep] !== undefined;
              const isSelected = selectedOptionIndices[currentStep] === i;
              const isBestOption = opt.score === 2;

              let buttonStyles = "w-full text-left p-4 rounded-2xl transition-all font-sans text-xs sm:text-sm leading-relaxed border-2 flex flex-col gap-2.5 ";

              if (!isAnswered) {
                buttonStyles += "bg-white hover:bg-orange-50/25 border-slate-200 hover:border-orange-500 text-slate-700 cursor-pointer shadow-2xs hover:shadow-xs";
              } else {
                if (isSelected) {
                  if (opt.score === 2) {
                    buttonStyles += "bg-emerald-50/90 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-500/20";
                  } else if (opt.score === 1) {
                    buttonStyles += "bg-amber-50/90 border-amber-500 text-amber-950 shadow-md ring-2 ring-amber-500/20";
                  } else {
                    buttonStyles += "bg-rose-50/90 border-rose-500 text-rose-950 shadow-md ring-2 ring-rose-500/20";
                  }
                } else if (isBestOption) {
                  buttonStyles += "bg-emerald-50/40 border-emerald-400 text-emerald-900 border-dashed";
                } else {
                  buttonStyles += "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                }
              }

              return (
                <div key={i} className="flex flex-col">
                  <button
                    onClick={() => handleSelectOption(i, opt.score)}
                    disabled={isAnswered}
                    className={buttonStyles}
                    id={`audit-opt-${currentStep}-${i}`}
                  >
                    <div className="flex justify-between items-start gap-3 w-full">
                      <span className="font-medium text-left leading-relaxed">{opt.text}</span>
                      {isAnswered && isSelected && (
                        opt.score === 2 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ¡Correcta! (+2)
                          </span>
                        ) : opt.score === 1 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 shrink-0 shadow-2xs">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            Parcial (+1)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300 shrink-0 shadow-2xs">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            Incorrecta (0)
                          </span>
                        )
                      )}
                      {isAnswered && !isSelected && isBestOption && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Opción óptima
                        </span>
                      )}
                      {!isAnswered && (
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-600 shrink-0 mt-0.5" />
                      )}
                    </div>

                    {/* Feedback rationale tip */}
                    {isAnswered && isSelected && (
                      <div className={`mt-1.5 p-3 rounded-xl text-xs leading-relaxed flex items-start gap-2.5 border ${
                        opt.score === 2 
                          ? 'bg-emerald-100/80 text-emerald-950 border-emerald-300' 
                          : opt.score === 1 
                          ? 'bg-amber-100/80 text-amber-950 border-amber-300' 
                          : 'bg-rose-100/80 text-rose-950 border-rose-300'
                      }`}>
                        <Lightbulb className={`w-4 h-4 shrink-0 mt-0.5 ${
                          opt.score === 2 ? 'text-emerald-700' : opt.score === 1 ? 'text-amber-700' : 'text-rose-700'
                        }`} />
                        <div>
                          <strong className="block font-bold mb-0.5">
                            {opt.score === 2 ? 'Fundamento pedagógico:' : opt.score === 1 ? 'Matiz clave:' : 'Alerta pedagógica:'}
                          </strong>
                          <span>{opt.tip}</span>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Action button to advance once answered */}
          {selectedOptionIndices[currentStep] !== undefined && (
            <div className="pt-2 animate-fadeIn">
              <button
                onClick={handleNextStep}
                className="w-full py-3.5 px-6 bg-orange-600 hover:bg-orange-700 text-white font-sans font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 focus:ring-4 focus:ring-orange-500/20"
                id="audit-next-btn"
              >
                {currentStep < activeQuestions.length - 1 ? (
                  <>
                    <span>Siguiente pregunta ({currentStep + 2} de {activeQuestions.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Ver Dictamen y Resultados Finales</span>
                    <Award className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] font-mono text-slate-400 italic">Respuestas anónimas recopiladas localmente</span>
            {currentStep > 0 && (
              <button 
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                  if (window.innerWidth < 1024) {
                    setTimeout(() => {
                      document.getElementById('inclusive-audit-box')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }
                }}
                className="text-xs font-sans font-bold text-orange-600 hover:underline cursor-pointer"
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
