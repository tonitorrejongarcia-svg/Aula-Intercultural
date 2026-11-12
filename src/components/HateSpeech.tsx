/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useEffect } from 'react';
import { 
  ShieldAlert, RefreshCw, AlertTriangle, HeartHandshake, 
  Check, X, ArrowRight, MessageSquare, Info, ShieldCheck, 
  HelpCircle, Scale, Share2, FileText, Shield, Users, 
  ExternalLink, Phone, Smartphone, ChevronRight, Eye, Flag, Copy
} from 'lucide-react';

interface HateSpeechPhrase {
  id: number;
  phrase: string;
  source: string;
  category: string;
  mechanism: string;
  impact: string;
  teacherResponse: string;
}

const ALL_PHRASES = [
  {
    id: 1,
    phrase: "«Es solo un meme, eres de cristal, no aguantas nada de humor negro.»",
    source: "Redes Sociales",
    category: "Minimización y humor hostil online",
    mechanism: "Normalización de la violencia verbal mediante el formato meme. Se traslada la responsabilidad de la ofensa a la víctima tachándola de intolerante al humor.",
    impact: "Crea cámaras de eco de hostilidad en grupos de WhatsApp o TikTok, donde la empatía hacia colectivos vulnerabilizados se penaliza socialmente.",
    teacherResponse: "Desmonta el escudo humorístico: «El límite del humor es el daño. Si para reírnos necesitamos humillar o deshumanizar la identidad de un compañero, deja de ser un chiste y se convierte en acoso coordinado digital. En este grupo y en esta aula no participamos en viralizar la burla.»"
  },
  {
    id: 2,
    phrase: "«Vienen a quitarnos los recursos y a vivir de las ayudas que pagamos nosotros.»",
    source: "Redes Sociales",
    category: "Bulocracia económica / Chivo expiatorio",
    mechanism: "Falsa generalización y desinformación distributiva viralizada en redes mediante infografías sesgadas o vídeos descontextualizados.",
    impact: "Genera desconfianza y xenofobia estructural. El alumnado asume que sus dificultades socioeconómicas familiares están directamente causadas por la población migrante.",
    teacherResponse: "Utiliza datos verificados: «Analicemos juntos los informes oficiales de la Seguridad Social. Los datos demuestran que las personas migrantes aportan más en cotizaciones de lo que reciben en prestaciones. Desmontar bulos con datos es pensamiento crítico.»"
  },
  {
    id: 3,
    phrase: "«No soy racista, pero la cultura de esa gente es simplemente incompatible con los derechos humanos básicos.»",
    source: "Físico",
    category: "Xenofobia de apariencia respetable",
    mechanism: "Prejuicio cortés. Comienza con una exención moral ('No soy racista...') para introducir una descalificación total y esencialista de un colectivo cultural completo.",
    impact: "Legitima la exclusión sutil. Provoca que el alumnado perteneciente a minorías sienta que su aceptación está condicionada a la asimilación absoluta y la renuncia de sus raíces.",
    teacherResponse: "Introduce el matiz crítico: «Hablar de 'esa gente' de forma homogénea borra la diversidad real. En esta aula, el límite infranqueable es el respeto a los Derechos Humanos; dentro de ese marco, la pluralidad de costumbres no es incompatible, sino enriquecedora.»"
  },
  {
    id: 4,
    phrase: "«Ese perfil de TikTok solo sube vídeos diciendo que hay que limpiar el barrio de maleantes extranjeros.»",
    source: "Redes Sociales",
    category: "Incitación y ciberodio extremo",
    mechanism: "Uso de discursos conspirativos de invasión o inseguridad. Algoritmos de recomendación que premian la crispación y atraen al alumnado adolescente hacia narrativas de odio.",
    impact: "Genera pánico moral, polarización extrema y puede inducir a comportamientos de acoso grupal o agresiones físicas coordinadas a través de redes sociales.",
    teacherResponse: "Enseña higiene digital y reporte: «El algoritmo de TikTok premia el odio porque genera más interacciones y comentarios. No le des 'me gusta', no comentes para discutir (eso solo aumenta su alcance). Denuncia el vídeo en la plataforma y reportémoslo en el aula.»"
  },
  {
    id: 5,
    phrase: "«Yo no veo colores, para mí todos mis alumnos son exactamente iguales, los trato igual a todos.»",
    source: "Físico",
    category: "Daltonismo racial docente",
    mechanism: "Invisibilización de las desigualdades sistémicas. Al fingir que la raza o el origen no existen, el docente se exime de tratar las barreras estructurales.",
    impact: "Deja a los estudiantes vulnerabilizados sin apoyo real, ya que sus problemas específicos son ignorados bajo el manto de una falsa 'igualdad' que solo beneficia al grupo mayoritario.",
    teacherResponse: "Fomentar la equidad real: «Tratar por igual no siempre es justo. Ver el color y el origen es necesario para ver las desigualdades de partida y poder ofrecer a cada estudiante exactamente el tipo de apoyo que necesita para prosperar.»"
  },
  {
    id: 6,
    phrase: "«Para ser de fuera, habla sorprendentemente bien y es muy educado, no como los demás de su país.»",
    source: "Físico",
    category: "Microagresión de baja intensidad (Elogio condicionado)",
    mechanism: "El elogio se formula desde un prejuicio profundamente arraigado sobre la inferioridad de un grupo. El cumplido hacia el individuo confirma el estereotipo negativo hacia el resto de su cultura.",
    impact: "Genera el 'síndrome del impostor' y alienación. El estudiante siente que su pertenencia está condicionada a ser 'la excepción' perfecta a una regla racista inaceptable.",
    teacherResponse: "Interrumpir el sesgo sutil: «Ese comentario asume que lo normal en su país es no tener educación o no saber hablar. Valoremos el talento del alumno sin necesidad de menospreciar sus raíces o usar estereotipos dañinos.»"
  },
  {
    id: 7,
    phrase: "«En mi clase los grupos de trabajo los hacen ellos, es normal que los extranjeros se junten solos, es naturaleza.»",
    source: "Físico",
    category: "Segregación pasiva",
    mechanism: "Justificación biológica o 'natural' para no intervenir en un problema de exclusión social que se está produciendo dentro del aula por sesgos endogámicos.",
    impact: "Perpetúa guetos escolares, impidiendo la verdadera cohesión social. Los alumnos minorizados pierden oportunidades de capital social, integración lingüística y desarrollo de empatía.",
    teacherResponse: "Pedagogía de la mezcla: «La escuela es el último espacio donde podemos diseñar la convivencia. Como docentes, es nuestra responsabilidad forzar metodologías cooperativas heterogéneas para romper esas burbujas y construir puentes.»"
  },
  {
    id: 8,
    phrase: "«¿Pero de dónde eres de verdad? Porque español no pareces con esa cara.»",
    source: "Físico",
    category: "Exclusión de identidad (Perpetuo extranjero)",
    mechanism: "Se invalida la nacionalidad del estudiante asumiendo que la identidad nacional está exclusivamente ligada a rasgos fenotípicos caucásicos.",
    impact: "Alienación, pérdida de pertenencia e invalidación de su identidad real como ciudadano de pleno derecho.",
    teacherResponse: "Cortar el interrogatorio: «Es español y es de aquí. La diversidad física es parte de nuestra sociedad; asumir que solo hay un 'tipo' de español es un sesgo que debemos corregir.»"
  },
  {
    id: 9,
    phrase: "«Como eres asiático, pásame tu examen de matemáticas, seguro sacaste diez sin estudiar.»",
    source: "Físico",
    category: "La falacia de la minoría modelo",
    mechanism: "Atribución estereotipada de capacidades intelectuales innatas que deshumaniza al individuo, reduciéndolo a una herramienta utilitaria basada en su origen étnico.",
    impact: "Genera una presión académica insoportable, ansiedad por el rendimiento y sentimientos de alienación al no ser valorado por su esfuerzo personal.",
    teacherResponse: "Desmontar el prejuicio: «Ese comentario invalida el esfuerzo personal de tu compañero. Las notas son fruto del trabajo y estudio de cada persona, no de su país de origen.»"
  },
  {
    id: 10,
    phrase: "«Se lo ha tomado muy a pecho, los de su país es que son muy temperamentales.»",
    source: "Redes Sociales",
    category: "Invalidación por estereotipo cultural",
    mechanism: "Gaslighting. Se desactiva la queja legítima del estudiante frente a un abuso, atribuyéndosela a un defecto genético o cultural.",
    impact: "Aísla a la víctima, le quita credibilidad y protege al agresor o provocador.",
    teacherResponse: "Focalizar en el hecho: «No tiene nada que ver con su procedencia. Se ha enfadado porque se le ha faltado al respeto. Dejemos de recurrir a estereotipos para justificar agresiones.»"
  },
  {
    id: 11,
    phrase: "«Madre mía, a la mínima os ofendéis, ahora ya no se puede decir nada.»",
    source: "Redes Sociales",
    category: "Victimismo del grupo dominante",
    mechanism: "El emisor se posiciona como víctima de la 'censura', invisibilizando el daño real causado y negándose a asumir responsabilidad.",
    impact: "Silencia futuras quejas por miedo a ser tachados de exagerados o problemáticos.",
    teacherResponse: "Reenfoque de responsabilidad: «Se puede decir de todo, menos insultar o discriminar a otros. Que los límites del respeto estén más claros es una mejora para la convivencia de todos.»"
  },
  {
    id: 12,
    phrase: "«Si habláis en vuestro idioma en voz baja es porque estáis criticando a alguien en secreto.»",
    source: "Físico",
    category: "Sospecha y hostilidad lingüística",
    mechanism: "Proyección paranoide de desconfianza ante idiomas ajenos, criminalizando el uso de la lengua materna en momentos de ocio.",
    impact: "Genera inseguridad y vergüenza lingüística, haciendo que los estudiantes repriman su lengua materna para evitar el juicio ajeno.",
    teacherResponse: "Validación lingüística: «Hablar en tu idioma materno con un amigo es completamente natural y un derecho. No proyectemos sospechas infundadas sobre las lenguas de los demás.»"
  },
  {
    id: 13,
    phrase: "«Jaja, me voy a disfrazar de [cultura minoritaria] para carnaval, será súper gracioso.»",
    source: "Físico",
    category: "Apropiación y burla cultural",
    mechanism: "Se reduce una identidad cultural o religiosa compleja a una caricatura cómica temporal para el entretenimiento del grupo mayoritario.",
    impact: "Banaliza y ridiculiza la herencia cultural del alumno, provocando humillación pública involuntaria.",
    teacherResponse: "Parar la banalización: «La cultura y la fe de tus compañeros no son un disfraz de comedia. Burlarse de las raíces ajenas no tiene cabida en este centro escolar.»"
  },
  {
    id: 14,
    phrase: "«Qué pelo tan raro tienes, ¿puedo tocarlo? Parece lana de oveja.»",
    source: "Físico",
    category: "Exotización y transgresión corporal",
    mechanism: "Curiosidad deshumanizante. Se trata el cuerpo o el cabello del alumno racializado como una atracción exótica o animalizada.",
    impact: "Sensación de invasión física y vergüenza de los rasgos corporales propios.",
    teacherResponse: "Establecer límites de respeto: «El cuerpo y el cabello de una persona no son un objeto de exhibición. Cada uno tiene derecho a su espacio personal y a ser tratado con dignidad.»"
  },
  {
    id: 15,
    phrase: "«Ha desaparecido una sudadera en el vestuario; que revisen primero a los del fondo.»",
    source: "Físico",
    category: "Presunción de culpabilidad sistemática",
    mechanism: "Asociación automática del alumnado migrante o de barrios humildes con la delincuencia o el hurto.",
    impact: "Estigmatización profunda y desconfianza hacia la justicia del centro educativo.",
    teacherResponse: "Frenar el sesgo: «Las acusaciones sin pruebas basadas en prejuicios son inadmisibles. Si hay un objeto perdido, se busca con respeto y sin señalar a nadie por su origen.»"
  },
  {
    id: 16,
    phrase: "«Puaj, ¿qué llevas en el tupper? Huele rarísimo, qué asco de comida.»",
    source: "Físico",
    category: "Desprecio gastronómico y cultural",
    mechanism: "Uso de la comida como marcador de otredad y rechazo, asociando los ingredientes tradicionales ajenos a suciedad o extrañeza.",
    impact: "Vergüenza ante las costumbres familiares y renuncia a comer en público por miedo al señalamiento.",
    teacherResponse: "Curiosidad gastronómica: «En el mundo existen miles de formas de cocinar ricas y deliciosas. Burlarse de la comida de los demás demuestra falta de mundo, no superioridad.»"
  },
  {
    id: 17,
    phrase: "«A ellos les dan todas las becas de comedor y a nosotros nada, qué morro tienen.»",
    source: "Redes Sociales",
    category: "Bulo de privilegios públicos imaginarios",
    mechanism: "Difusión de falsedades sobre la adjudicación de ayudas públicas para alimentar el resentimiento social.",
    impact: "Fractura de la convivencia vecinal y hostilidad directa contra menores becados en el comedor escolar.",
    teacherResponse: "Pedagogía con baremos oficiales: «Las becas se conceden por nivel de renta demostrable de la familia, no por pasaporte o lugar de nacimiento. La precariedad no entiende de orígenes.»"
  },
  {
    id: 18,
    phrase: "«Si vives aquí tienes que adaptarte al 100% y olvidar tus costumbres de allá.»",
    source: "Redes Sociales",
    category: "Asimilación forzosa excluyente",
    mechanism: "Exigencia de renuncia identitaria total como condición previa para ser aceptado como conciudadano.",
    impact: "Conflicto identitario y desgarro emocional en jóvenes de familias migrantes nacidos o crecidos en el país.",
    teacherResponse: "Enfoque intercultural: «Integrarse no es clonarse ni borrar quién eres. Integrarse es respetar las leyes comunes conviviendo desde la riqueza de identidades diversas.»"
  },
  {
    id: 19,
    phrase: "«No le exijas tanto académicamente a ese estudiante, en su casa los estudios no son prioridad.»",
    source: "Físico",
    category: "Bajas expectativas docentes (Pigmalión negativo)",
    mechanism: "Proyección de prejuicios clasistas y culturales sobre el interés educativo de familias de origen migrante.",
    impact: "Abandono escolar prematuro y falta de orientación hacia estudios superiores o formación cualificada.",
    teacherResponse: "Compromiso docente transformador: «Las familias migrantes a menudo hacen sacrificios enormes por el futuro de sus hijos. Nuestro deber es elevar las expectativas y brindar el máximo apoyo.»"
  },
  {
    id: 20,
    phrase: "«Son cosas de críos en el patio, siempre ha habido burlas, no hay que darle tanta importancia.»",
    source: "Físico",
    category: "Invisibilización de la violencia estructural",
    mechanism: "Minimización institucional del acoso racista bajo la etiqueta genérica de 'juegos o riñas infantiles'.",
    impact: "Indefensión aprendida de la víctima y escalada de la agresividad del grupo agresor al no percibir límites.",
    teacherResponse: "Tolerancia cero: «Cuando la burla ataca la identidad o el origen de una persona, no es una riña casual: es acoso y discriminación. Actuemos con firmeza para proteger a la víctima.»"
  }
];

export default function HateSpeech() {
  const [selectedPhrase, setSelectedPhrase] = useState<number | null>(null);
  const [activePyramidLevel, setActivePyramidLevel] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'speech' | 'crime'>('all');
  
  // Counter-narrative workshop state
  const [activeExercise, setActiveExercise] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

    const [displayPhrases, setDisplayPhrases] = useState<HateSpeechPhrase[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const shuffleAndPick = (array: HateSpeechPhrase[], n: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  useEffect(() => {
    setDisplayPhrases(shuffleAndPick(ALL_PHRASES, 4));
  }, []);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setSelectedPhrase(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const response = await fetch('/api/generate-microviolences', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const contentType = response.headers.get("content-type") || "";
      if (response.ok && contentType.includes("application/json")) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const newPhrases = data.map((m: any, i: number) => ({
            id: Date.now() + i,
            phrase: m.phrase || m.statement || "Frase no disponible",
            source: m.source || "Aula / Redes",
            category: m.category || "Prejuicio cotidiano",
            mechanism: m.mechanism || "Mecanismo de desinformación o sesgo.",
            impact: m.impact || "Impacto negativo en la convivencia.",
            teacherResponse: m.teacherResponse || "Intervención pedagógica recomendada."
          }));
          setDisplayPhrases(newPhrases);
          return;
        }
      }
      
      // If server returned non-array, seamlessly pick 4 fresh phrases from ALL_PHRASES bank
      setDisplayPhrases(shuffleAndPick(ALL_PHRASES, 4));
    } catch {
      // Smooth fallback to fresh pool without flashing error message
      setDisplayPhrases(shuffleAndPick(ALL_PHRASES, 4));
    } finally {
      setIsGenerating(false);
    }
  };

  const pyramidLevels = [
    {
      level: 4,
      title: "Nivel 4: Ciberacoso y Agresión Física",
      description: "Acoso digital constante, linchamientos públicos en redes o agresiones físicas directas. Es el punto crítico donde el odio provoca un daño psicológico o físico grave que rompe por completo la vida escolar y personal del alumno afectado.",
      prevention: "Activar de inmediato el protocolo oficial del centro contra el acoso y el ciberacoso, guardar todas las pruebas digitales posibles, dar parte formal si es necesario y ofrecer apoyo psicológico integral."
    },
    {
      level: 3,
      title: "Nivel 3: Discriminación y Exclusión",
      description: "Dejar a alguien fuera de los grupos de WhatsApp, hacer vacío en el patio o rechazarlo en los trabajos de grupo. Las ideas hostiles pasan a la acción y aíslan activamente al alumno, impidiendo que forme parte de la comunidad.",
      prevention: "Intervenir desde la docencia reorganizando los grupos de trabajo mediante aprendizaje cooperativo, fomentando la mediación y creando dinámicas donde todos se sientan responsables de cuidar a los demás."
    },
    {
      level: 2,
      title: "Nivel 2: Actos de Sesgo Tolerados",
      description: "Uso de motes ofensivos o chistes racistas camuflados de \"humor negro\". Se normaliza el insulto sutil y, si alguien se queja, se le acusa de \"exagerado\", dejando a la víctima sin apoyo.",
      prevention: "Poner límites claros y al momento. Analizar en las tutorías qué hay detrás de esas \"bromas\" para desmontar el complejo de superioridad que intentan disimular."
    },
    {
      level: 1,
      title: "Nivel 1: Estereotipos y Rumores Sesgados",
      description: "Creencia en bulos de internet y prejuicios sobre el origen, la cultura o la forma de ser de los demás. Es la base invisible: ideas que los menores absorben sin darse cuenta en casa, en la calle o en las redes, y que condicionan cómo miran al compañero.",
      prevention: "Alfabetización digital en clase. Analizar noticias falsas de carácter xenófobo y hacer talleres para comprobar si los datos que consumen son reales o inventados."
    }
  ];

  const exercises = [
    {
      statement: "Descubres un grupo de WhatsApp de la clase donde se comparten memes racistas y burlas humillantes hacia un compañero migrante del aula. ¿Cuál es el procedimiento integral más efectivo?",
      options: [
        {
          id: 1,
          text: "Borrar el grupo silenciosamente y prohibir el uso del teléfono en el centro escolar.",
          correct: false,
          feedback: "Inadecuado. Prohibir el dispositivo físico no soluciona la violencia simbólica subyacente. Además, borrar el grupo de forma impulsiva puede destruir pruebas digitales cruciales en caso de que la situación derive en un delito de acoso o discriminación grave."
        },
        {
          id: 2,
          text: "Identificar los administradores, aplicar una sanción punitiva sin debate para sentar ejemplo y dar por cerrado el conflicto.",
          correct: false,
          feedback: "Incompleto. El castigo mecánico sin un proceso reflexivo suele provocar resentimiento silencioso. Los estudiantes pueden trasladar su odio a canales más encriptados o inaccesibles, sin haber comprendido el daño real causado."
        },
        {
          id: 3,
          text: "Preservar las capturas, aplicar el protocolo de ciberacoso del centro, activar un taller de deconstrucción del ciberodio en tutoría y ofrecer soporte psicológico directo al estudiante afectado.",
          correct: true,
          feedback: "¡Excelente! Este enfoque combina la rigurosidad administrativa (protocolo oficial) con la autoprotección de pruebas, la reparación psicoemocional de la víctima y la intervención pedagógica colectiva imprescindible para sanar el tejido grupal."
        }
      ]
    },
    {
      statement: "Un estudiante publica un post público en Instagram etiquetando a un compañero con comentarios de odio explícitos, amenazando con 'esperarle fuera para darle su merecido por extranjero'. ¿Qué vía legal y educativa corresponde?",
      options: [
        {
          id: 1,
          text: "Tratarlo como un simple conflicto de aula. Hacer una reunión amistosa entre ambos para que se pidan perdón y borrar el post.",
          correct: false,
          feedback: "Peligroso e inadecuado. Las amenazas físicas explícitas motivadas por el origen nacional constituyen un presunto DELITO de odio bajo el Código Penal. Reducirlo a una simple disputa de aula deja desprotegida a la víctima ante un peligro real."
        },
        {
          id: 2,
          text: "Certificar digitalmente la publicación, activar de inmediato el protocolo de acoso y trasladar formalmente los hechos a la Fiscalía de Menores o Fuerzas de Seguridad, garantizando el apoyo psicosocial a la víctima.",
          correct: true,
          feedback: "¡Perfecto! Al existir una amenaza clara e indicios de delito de odio (discriminación + agresión/amenaza), es imperativo proteger las pruebas digitales de forma segura y derivar a las autoridades competentes, mientras el centro escolar despliega medidas cautelares de protección."
        },
        {
          id: 3,
          text: "Ignorar la publicación externa por haber ocurrido fuera del horario y del recinto escolar.",
          correct: false,
          feedback: "Inadmisible. El ciberodio y el ciberacoso escolar que se desarrollan fuera del centro escolar tienen un impacto directo y destructivo en la convivencia interna. El centro tiene el deber de intervenir si afecta a la comunidad educativa."
        }
      ]
    }
  ];

  const handleSelectOption = (optionId: number) => {
    setSelectedOption(optionId);
    setShowFeedback(true);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('workshop-feedback-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleSelectPyramidLevel = (level: number) => {
    setActivePyramidLevel(level);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('pyramid-detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleNextExercise = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setActiveExercise((prev) => (prev + 1) % exercises.length);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  

  const selected = displayPhrases.find(p => p.id === selectedPhrase);

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-slate-50" id="hate-speech-section">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold font-sans uppercase tracking-wide border border-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
            Prevención de la Violencia Digital y Física
          </span>
          <h2 className="font-sans font-black text-3xl md:text-5xl text-slate-900 tracking-tight leading-none">
            Desarmando el Discurso de Odio
          </h2>
          <p className="font-sans text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Identificación de sesgos, desinformación algorítmica y marcos jurídicos en la era digital. Herramientas formativas para diferenciar expresiones dañinas de delitos penales.
          </p>
        </div>

        {/* Section 1: Conceptual Distinction (Speech vs. Crime) */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-500/10 text-slate-400 text-[10px] font-mono uppercase tracking-wider border border-slate-500/20">
                <Scale className="w-3.5 h-3.5" /> Clave Jurídica y Social
              </span>
              <h3 className="font-sans font-black text-xl md:text-2xl text-white">
                Diferenciación: Discurso de Odio vs. Delito de Odio
              </h3>
            </div>
            {/* Tab switchers inside header */}
            <div className="flex bg-slate-800 p-1 rounded-xl self-start md:self-center">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'all' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
              >
                Ver Ambos
              </button>
              <button
                onClick={() => setActiveTab('speech')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'speech' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
              >
                Discurso de Odio
              </button>
              <button
                onClick={() => setActiveTab('crime')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'crime' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
              >
                Delito de Odio
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Box 1: Discurso de Odio */}
            {(activeTab === 'all' || activeTab === 'speech') && (
              <div className="space-y-6 flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-150 animate-fadeIn">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <h4 className="font-sans font-black text-lg text-slate-900 uppercase tracking-tight text-[15px]">
                      Discurso de Odio
                    </h4>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Son comentarios, burlas, insultos sutiles, difusiones de estereotipos o mensajes que desprecian a ciertos colectivos o minorías. Aunque hacen mucho daño a la convivencia y a las personas, muchas veces se quedan en el terreno de lo social o verbal y no siempre acaban en un juzgado, ya que a menudo se escudan (y chocan) bajo el derecho a la libertad de expresión.
                  </p>
                  
                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-700 font-extrabold block">
                      Ejemplos Comunes
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-normal">
                      <li>Chistes vejatorios recurrentes sobre inmigrantes en el aula o redes sociales.</li>
                      <li>Compartir memes estigmatizantes sobre prácticas religiosas o culturales.</li>
                      <li>Generalizar conductas delictivas o de suciedad a toda una nacionalidad.</li>
                      <li>Publicaciones descalificatorias que promueven el rechazo social de un colectivo.</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-orange-600 font-extrabold block">
                      Ámbito de Resolución
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sanciones administrativas, normativas internas de convivencia escolar (RRI), mediaciones de convivencia, talleres educativos obligatorios y moderación de contenido según las políticas y términos de servicio de las redes sociales.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-150 space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-orange-700 font-bold block">
                    ⚡ ¿Cómo proceder paso a paso?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-700">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">1. No alimentar al troll</strong>
                      Evita insultar o discutir de forma circular en redes. El algoritmo premia la crispación dándole más visibilidad.
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">2. Reportar en plataformas</strong>
                      Utiliza los canales internos de reporte (TikTok, Instagram, WhatsApp) bajo el motivo 'Discurso de odio' o 'Acoso'.
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">3. Contranarrativa asertiva</strong>
                      Publicar o rebatir empleando datos objetivos de fuentes oficiales e interpelando a los valores democráticos.
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">4. Medidas educativas</strong>
                      Enfrentar el discurso en el aula utilizando la deconstrucción analítica y el fomento de la empatía colectiva.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Box 2: Delito de Odio */}
            {(activeTab === 'all' || activeTab === 'crime') && (
              <div className="space-y-6 flex flex-col justify-between p-6 rounded-2xl bg-rose-50/40 border border-rose-150 animate-fadeIn">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-rose-650">
                    <Scale className="w-5 h-5 shrink-0" />
                    <h4 className="font-sans font-black text-lg text-slate-900 uppercase tracking-tight text-[15px]">
                      Delito de Odio
                    </h4>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Aquí ya se cruza la línea de la ley. Es una agresión, amenaza o acción ilegal castigada por el Código Penal en la que se ataca a alguien a propósito solo por lo que es: su origen, su raza, su religión, su orientación sexual, su discapacidad, etc. A diferencia del discurso, esto ya supone un delito grave contra la ley y los derechos fundamentales de la persona.
                  </p>
                  
                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-rose-700 font-extrabold block">
                      Ejemplos Graves (Vía Penal)
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-normal">
                      <li>Pintadas o pancartas con amenazas directas de muerte o expulsión del centro educativo.</li>
                      <li>Incitación pública y organizada a la violencia contra menores extranjeros tutelados.</li>
                      <li>Agresión física o palizas motivadas por la homofobia o la xenofobia.</li>
                      <li>Ciberacoso severo mediante la difusión sistemática de datos privados para hostigamiento (doxeo).</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-rose-600 font-extrabold block">
                      Ámbito de Resolución
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Vía policial y judicial penal (Policía Nacional, Guardia Civil, Juzgado de Guardia o Fiscalía de Odio), inhabilitación, multas graves, penas de prisión y responsabilidad civil por daños morales y psicológicos.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-rose-200 space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-rose-700 font-bold block">
                    🚨 ¿Cómo proceder legalmente de inmediato?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-700">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">1. Preservar evidencias digitales</strong>
                      Toma capturas de pantalla completas donde figuren la URL completa, el usuario del agresor, las fechas y los textos.
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">2. Certificar las pruebas</strong>
                      Si es severo, utiliza capturadores digitales certificados (e-witness, fe de fotos) o acude a un notario antes de borrarlo.
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">3. Denunciar formalmente</strong>
                      Presenta denuncia en Comisaría, Juzgado de Guardia o Fiscalía Especializada contra los Delitos de Odio.
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">4. Apoyar a la víctima</strong>
                      Activar derivaciones médicas o terapéuticas inmediatas. Garantizar que la víctima esté acompañada y segura.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Hate Speech on Social Media (Ciberodio) */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold font-sans uppercase tracking-wide border border-emerald-200">
                <Smartphone className="w-4 h-4 text-emerald-700" />
                La Cámara de Eco Algorítmica
              </span>
              <h3 className="font-sans font-black text-2xl md:text-3xl text-slate-900 tracking-tight">
                El ciberodio en redes: un caldo de cultivo perfecto
              </h3>
            </div>
          </div>
          
          <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-4xl leading-relaxed">
            Las redes sociales no son solo un altavoz para el odio, sino que actúan como un acelerador. El falso anonimato, la distancia de estar detrás de una pantalla y unos algoritmos diseñados para premiar el enfado crean el terreno perfecto para que los menores se radicalicen sin apenas darse cuenta.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-orange-400 flex items-center justify-center font-bold font-mono">
                01
              </div>
              <h4 className="font-sans font-extrabold text-sm text-slate-900 uppercase tracking-tight">Desinhibición Tóxica</h4>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                El escudo de la pantalla. Al no ver la cara ni la reacción de la otra persona en directo, se pierde la empatía. Es mucho más fácil decir barbaridades cuando no ves el daño real que provocas al otro lado.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-orange-400 flex items-center justify-center font-bold font-mono">
                02
              </div>
              <h4 className="font-sans font-extrabold text-sm text-slate-900 uppercase tracking-tight">Mecanización del Algoritmo</h4>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                El negocio de la polémica. Las publicaciones extremistas o intolerantes generan discusiones masivas. Las redes detectan ese salseo, ven que nos engancha y deciden mostrarlo a mucha más gente para que se viralice todavía más.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-orange-400 flex items-center justify-center font-bold font-mono">
                03
              </div>
              <h4 className="font-sans font-extrabold text-sm text-slate-900 uppercase tracking-tight">Humorización del Prejuicio</h4>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                "Si solo era una broma". Se abusa de memes con humor negro o comentarios absurdos para camuflar el racismo o la discriminación. Si alguien se queja, se le ridiculiza tachándole de aburrido o de "no pillar el chiste".
              </p>
            </div>
          </div>

          {/* Social Media Interactive Guide Checklist */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-wider text-orange-400 font-extrabold">
                Guía Práctica para Menores y Docentes
              </span>
              <h4 className="font-sans font-black text-2xl text-white leading-tight">
                Guía de Actuación ante Ciberodio en Redes Sociales
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                ¿Qué hacer exactamente cuando detectamos un hilo, un vídeo o una publicación que atenta contra un colectivo o un compañero de forma sistemática?
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {/* Step checklist */}
              {[
                {
                  step: "A",
                  title: "Bloquea y reporta de inmediato",
                  desc: "Utiliza las herramientas de denuncia de la propia red social. Muy importante: no entres a comentar para insultar o rebatir con enfado, ya que eso le dice al algoritmo que la publicación es popular y hace que se muestre a mucha más gente."
                },
                {
                  step: "B",
                  title: "Guarda pruebas (URLs y perfiles)",
                  desc: "Copia siempre el enlace directo de la publicación y de los perfiles implicados. Los nombres de usuario se cambian en un segundo, pero las direcciones internas de las cuentas y los enlaces de los posts se quedan fijos como prueba."
                },
                {
                  step: "C",
                  title: "Lanza contranarrativas con cabeza",
                  desc: "Si decides responder, hazlo aportando datos reales, contrastados y con calma. No entres en peleas emocionales. Ten en cuenta que tu objetivo no es cambiar la opinión del troll (que está radicalizado), sino desmontar el bulo para los cientos de personas que están leyendo en silencio."
                },
                {
                  step: "D",
                  title: "Coordínate con el equipo docente",
                  desc: "Si los implicados forman parte de tu centro educativo, avisa al equipo docente o de orientación. No olvides que todo lo que pasa en las redes por la noche acaba repercutiendo de lleno en la convivencia y el ambiente de las aulas al día siguiente."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 bg-slate-800/50 rounded-xl border border-slate-750">
                  <div className="w-6 h-6 rounded-md bg-orange-500/10 text-orange-400 font-mono text-xs font-black flex items-center justify-center shrink-0 border border-orange-500/20">
                    {item.step}
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="font-sans font-extrabold text-xs text-white">{item.title}</h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Interactive Phrase Dissector (Físico vs Online) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-slate-500" />
            <h3 className="font-sans font-extrabold text-xl md:text-2xl text-slate-900">
              Decodificador de Microviolencias (Aula y Redes)
            </h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
            El racismo y la discriminación cotidiana se camuflan a menudo en frases hechas o en bromas digitales. Pincha en cada una para analizar qué hay detrás y descubrir la mejor forma de desmontarlas.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            {/* Left list of phrases */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {displayPhrases.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedPhrase(item.id);
                    if (window.innerWidth < 1024) {
                      setTimeout(() => {
                        document.getElementById('analysis-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                  className={`w-full p-4 rounded-2xl font-sans text-left transition-all border outline-none cursor-pointer text-xs sm:text-sm ${
                    selectedPhrase === item.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md transform translate-x-1.5'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                  id={`btn-hate-phrase-${item.id}`}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[9px] uppercase tracking-wider font-extrabold ${selectedPhrase === item.id ? 'text-orange-400' : 'text-slate-400'}`}>
                        {item.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-sans font-extrabold uppercase ${
                        item.source === 'Redes Sociales' 
                          ? 'bg-emerald-600/10 text-emerald-600 border border-emerald-600/25' 
                          : 'bg-slate-500/10 text-slate-600 border border-slate-500/25'
                      }`}>
                        {item.source}
                      </span>
                    </div>
                    <p className="font-semibold italic leading-relaxed">
                      {item.phrase}
                    </p>
                  </div>
                </button>
              ))}
          <div className="flex flex-col items-center gap-3 pt-6 border-t border-slate-100">
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-sans font-bold rounded-xl transition-all shadow-md focus:ring-4 focus:ring-slate-900/10 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Decodificando nuevas frases...</span>
                </>
              ) : (
                <span>Descubrir 4 nuevas frases</span>
              )}
            </button>
          </div>
            </div>

            {/* Right analysis detail panel */}
            <div id="analysis-panel" className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden scroll-mt-24">
              {selectedPhrase === null ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 animate-pulse">
                    <Info className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-extrabold text-slate-900 text-base">¿Cómo desactivar los sesgos habituales?</h4>
                    <p className="font-sans text-xs text-slate-500 max-w-sm">
                      Selecciona cualquiera de las expresiones comunes de la izquierda para desplegar su análisis deconstructivo y la pauta de intervención del docente.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  {/* Category Header */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-rose-500 font-extrabold">
                        Análisis de Microagresión
                      </span>
                      <span className="px-2 py-0.5 rounded text-[8px] font-sans font-extrabold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                        {selected.source}
                      </span>
                    </div>
                    <h4 className="font-sans font-black text-lg md:text-xl text-slate-900 leading-tight mt-1">
                      {selected.phrase}
                    </h4>
                  </div>

                  <div className="space-y-4 font-sans text-xs sm:text-sm">
                    {/* Mechanism */}
                    <div className="space-y-1">
                      <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="text-rose-500">⚙</span> Mecanismo de Manipulación:
                      </h5>
                      <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-150">
                        {selected.mechanism}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className="space-y-1">
                      <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="text-slate-500">⚠️</span> Impacto en la Convivencia:
                      </h5>
                      <p className="text-slate-600 leading-relaxed">
                        {selected.impact}
                      </p>
                    </div>

                    {/* Response */}
                    <div className="space-y-1 pt-2 border-t border-slate-100">
                      <h5 className="font-bold text-orange-700 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <ShieldCheck className="w-4 h-4" /> Respuesta Pedagógica Recomendada:
                      </h5>
                      <p className="text-slate-800 leading-relaxed font-semibold bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                        {selected.teacherResponse}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          

          </div>
        </div>

        {/* Section 4: The Pyramid of Hate (Academic concept ADL adaptation) */}
        <div className="bg-slate-100/50 border border-slate-200/80 rounded-3xl p-6 md:p-10 space-y-8">
          <div className="space-y-2">
            <h3 className="font-sans font-extrabold text-xl md:text-2xl text-slate-900 flex items-center gap-2">
              <span className="text-rose-500">▲</span> La Escalada del Odio: Pirámide Interactiva
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
              El acoso, la violencia física u online no surgen de forma espontánea. Se alimentan de una base diaria de conductas menores normalizadas. Haz click en cada nivel de la pirámide para examinar su engranaje y cómo detener el avance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: The Visual Pyramid */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-2.5">
              {pyramidLevels.map((lvl) => {
                const isSelected = activePyramidLevel === lvl.level;
                // Sizing based on level (4 is top/narrow, 1 is bottom/wide)
                const widthClass = 
                  lvl.level === 4 ? 'w-4/12' : 
                  lvl.level === 3 ? 'w-6/12' : 
                  lvl.level === 2 ? 'w-8/12' : 'w-full';

                const bgClass =
                  lvl.level === 4 ? (isSelected ? 'bg-red-700' : 'bg-red-500 hover:bg-red-600') :
                  lvl.level === 3 ? (isSelected ? 'bg-orange-700' : 'bg-orange-500 hover:bg-orange-600') :
                  lvl.level === 2 ? (isSelected ? 'bg-slate-700' : 'bg-slate-500 hover:bg-slate-600') :
                  (isSelected ? 'bg-orange-700' : 'bg-orange-600 hover:bg-orange-700');

                return (
                  <button
                    key={lvl.level}
                    onClick={() => handleSelectPyramidLevel(lvl.level)}
                    className={`${widthClass} ${bgClass} text-white font-sans font-black text-xs sm:text-sm py-4 px-3 rounded-xl transition-all duration-300 shadow-sm cursor-pointer outline-none relative overflow-hidden flex flex-col items-center justify-center text-center`}
                    id={`pyramid-level-btn-${lvl.level}`}
                  >
                    <span className="uppercase tracking-widest text-[9px] opacity-75 font-bold mb-0.5">Nivel {lvl.level}</span>
                    <span className="font-extrabold leading-tight">{lvl.title.replace(/^Nivel \d+:\s*/, '')}</span>
                    {isSelected && (
                      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/40" />
                    )}
                  </button>
                );
              })}
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest text-center pt-2 font-bold">
                ▲ El silencio en la base justifica la violencia en la cima ▲
              </p>
            </div>

            {/* Right: The analysis block for selected level */}
            <div id="pyramid-detail-panel" className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs min-h-[340px] flex flex-col justify-between scroll-mt-24">
              {activePyramidLevel === null ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <Info className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-extrabold text-slate-900 text-sm">Explora las capas del prejuicio</h4>
                    <p className="font-sans text-xs text-slate-500 max-w-xs">
                      Selecciona cualquiera de los escalones de color de la pirámide izquierda para ver sus implicaciones y la intervención para romper la inercia social.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-rose-500 font-extrabold">
                      Análisis de Escalada • Nivel {activePyramidLevel}
                    </span>
                    <h4 className="font-sans font-black text-lg md:text-xl text-slate-900 mt-1">
                      {pyramidLevels.find(l => l.level === activePyramidLevel)?.title}
                    </h4>
                  </div>

                  <div className="space-y-4 font-sans text-xs sm:text-sm">
                    <div className="space-y-1.5">
                      <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                        Qué pasa:
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {pyramidLevels.find(l => l.level === activePyramidLevel)?.description}
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-1.5">
                      <span className="font-bold text-orange-700 text-[11px] uppercase tracking-wider block flex items-center gap-1.5">
                        🛡 Cómo frenarlo a tiempo:
                      </span>
                      <p className="text-slate-700 leading-relaxed italic">
                        {pyramidLevels.find(l => l.level === activePyramidLevel)?.prevention}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 5: Interactive Workshop (Counter-narrative Practice) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-xs space-y-8">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold font-sans uppercase tracking-wide border border-emerald-100">
              <HeartHandshake className="w-4 h-4 text-emerald-700 animate-pulse" />
              Taller de Contranarrativas
            </span>
            <h3 className="font-sans font-extrabold text-xl md:text-2xl text-slate-950">
              Ponte a Prueba: Laboratorio de Respuestas Críticas
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
              Enfréntate a situaciones reales en el centro educativo y decide cuál es el mejor enfoque pedagógico. Selecciona la opción que consideres idónea para deconstruir el discurso de odio de forma pacífica e inteligente.
            </p>
          </div>

          <div className="border border-slate-150 rounded-2xl p-6 bg-slate-50/50 space-y-6">
            {/* Exercise statement */}
            <div className="space-y-2.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                Caso Práctico
              </span>
              <p className="font-sans font-extrabold text-sm sm:text-base text-slate-900 leading-relaxed">
                {exercises[activeExercise].statement}
              </p>
            </div>

            {/* Options list */}
            <div className="flex flex-col gap-3">
              {exercises[activeExercise].options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const showCheckSymbol = showFeedback && opt.correct;
                const showCrossSymbol = showFeedback && isSelected && !opt.correct;

                let borderStyle = 'border-slate-200 bg-white hover:bg-slate-50';
                if (showFeedback) {
                  if (opt.correct) {
                    borderStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-500/20 font-medium shadow-sm';
                  } else if (isSelected) {
                    borderStyle = 'border-rose-500 bg-rose-50/80 text-rose-950 ring-2 ring-rose-500/20 shadow-sm';
                  } else {
                    borderStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  borderStyle = 'border-emerald-600 bg-emerald-50/30 text-emerald-950';
                }

                return (
                  <button
                    key={opt.id}
                    disabled={showFeedback}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-4 rounded-xl border text-left font-sans text-xs sm:text-sm transition-all flex items-start gap-3 outline-none ${borderStyle} ${showFeedback ? '' : 'cursor-pointer hover:border-slate-300'}`}
                    id={`exercise-opt-btn-${opt.id}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {showCheckSymbol && (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {showCrossSymbol && (
                        <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xs">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {!showCheckSymbol && !showCrossSymbol && (
                        <div className={`w-5 h-5 rounded-full border text-[10px] font-sans font-bold flex items-center justify-center ${isSelected ? 'border-slate-700 bg-slate-700 text-white' : 'border-slate-300 text-slate-500'}`}>
                          {opt.id}
                        </div>
                      )}
                    </div>
                    <span className="font-medium leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback Detail */}
            {showFeedback && selectedOption !== null && (
              <div id="workshop-feedback-panel" className={`animate-fadeIn p-4 rounded-xl border space-y-2 bg-white scroll-mt-24 ${exercises[activeExercise].options.find(o => o.id === selectedOption)?.correct ? 'border-emerald-300 bg-emerald-50/40' : 'border-rose-300 bg-rose-50/40'}`}
              >
                <div className="flex items-center gap-2">
                  {exercises[activeExercise].options.find(o => o.id === selectedOption)?.correct ? (
                    <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-300 inline-flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      Enfoque Correcto
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-rose-800 uppercase tracking-widest bg-rose-100 px-2.5 py-0.5 rounded-md border border-rose-300 inline-flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-700" />
                      Enfoque a mejorar
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {exercises[activeExercise].options.find(o => o.id === selectedOption)?.feedback}
                </p>
              </div>
            )}

            {/* Next buttons */}
            {showFeedback && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNextExercise}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md hover:-translate-y-0.5"
                >
                  Siguiente Caso <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Additional Resources Section */}
      <div className="max-w-4xl mx-auto mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-sans font-extrabold text-[#111827] text-xl md:text-2xl tracking-tight">
              Directorio de Ayuda y Recursos
            </h3>
            <p className="font-sans text-sm text-slate-500 mt-1">
              Información útil, contactos de emergencia y herramientas contra el odio y la discriminación.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Telefonos */}
          <div className="space-y-4 md:col-span-2 mb-4">
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Teléfonos de Asistencia Oficiales
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">021 - Discriminación Racial o Étnica</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Servicio estatal gratuito y confidencial de atención a víctimas (CEDRE).</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">017 - Ciberseguridad e INCIBE</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Línea de ayuda gratuita para casos de ciberacoso y odio en redes sociales.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enlaces Expandidos */}
          <div className="space-y-4 md:col-span-2 mt-4">
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Plataformas, Entidades y Recursos para el Aula
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <a href="https://www.inclusion.gob.es/oberaxe/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">OBERAXE</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Observatorio Español del Racismo. Estudios y guías oficiales.</span>
                </div>
              </a>

              <a href="https://www.educatolerancia.com/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">Educa Tolerancia</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Portal del Movimiento contra la Intolerancia. Materiales y campañas.</span>
                </div>
              </a>

              <a href="https://maldita.es/migracion/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">Maldita Migración</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Fact-checking periodístico para desmontar bulos de odio en el aula.</span>
                </div>
              </a>

              <a href="https://www.cear.es/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">CEAR</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Comisión Española de Ayuda al Refugiado. Campañas escolares.</span>
                </div>
              </a>

              <a href="https://www.fad.es/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">Fundación FAD</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Programas para la prevención del odio y machismo en adolescentes.</span>
                </div>
              </a>

              <a href="https://www.es.amnesty.org/en-que-estamos/temas/educacion-en-derechos-humanos/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">Amnistía Internacional</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Red de Escuelas y recursos globales en Derechos Humanos.</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
