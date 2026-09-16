/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useEffect } from 'react';
import { 
  ShieldAlert, RefreshCw, AlertTriangle, HeartHandshake, Sparkles, 
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
    teacherResponse: "Utiliza datos verificados e interactivos: «Analicemos juntos los informes del INE y de la Seguridad Social en la pantalla. Las personas migrantes aportan más en cotizaciones e impuestos de lo que reciben en prestaciones. Cuestionar de dónde viene un bulo antes de compartirlo es de ser un ciudadano inteligente.»"
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
  const [errorAI, setErrorAI] = useState<string | null>(null);

  const shuffleAndPick = (array: HateSpeechPhrase[], n: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  useEffect(() => {
    setDisplayPhrases(shuffleAndPick(ALL_PHRASES, 4));
  }, []);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setErrorAI(null);
    setSelectedPhrase(null);
    try {
      const response = await fetch('/api/generate-microviolences', { method: 'POST' });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      const newPhrases = data.map((m: any, i: number) => ({
        id: Date.now() + i,
        phrase: m.phrase,
        source: m.source,
        category: m.category,
        mechanism: m.mechanism,
        impact: m.impact,
        teacherResponse: m.teacherResponse
      }));
      setDisplayPhrases(newPhrases);
    } catch (err: any) {
      console.error(err);
      setErrorAI("Hubo un fallo temporal al conectar con la IA. Se han cargado otras frases de reserva.");
      setDisplayPhrases(shuffleAndPick(ALL_PHRASES, 4));
    } finally {
      setIsGenerating(false);
    }
  };

  const pyramidLevels = [
    {
      level: 4,
      title: "Nivel 4: Ciberacoso y Agresión Física",
      subtitle: "Acoso digital sistemático, linchamientos virtuales, agresiones motivadas por odio.",
      description: "El umbral donde el odio online u offline desemboca en daño físico, psicológico grave o acoso coordinado que inhabilita la vida académica y social del estudiante afectado.",
      prevention: "Activación del protocolo oficial de acoso escolar y ciberacoso, preservación pericial de evidencias digitales, denuncia formal ante Fiscalía de Menores y acompañamiento psicológico integral."
    },
    {
      level: 3,
      title: "Nivel 3: Discriminación de Facto y Exclusión",
      subtitle: "Bloqueo selectivo de grupos de chat, aislamiento en el patio, rechazo en dinámicas.",
      description: "Las opiniones hostiles se traducen en comportamientos de aislamiento activo. Se priva al estudiante de su participación e inclusión legítima en la comunidad del centro.",
      prevention: "Reestructuración docente de los grupos de trabajo mediante aprendizaje cooperativo, mediación intercultural obligatoria y asunción de responsabilidades colectivas de cuidado."
    },
    {
      level: 2,
      title: "Nivel 2: Actos de Sesgo Tolerados",
      subtitle: "Uso de apodos ofensivos en redes, burlas racistas bajo pretexto de humor negro.",
      description: "Se normaliza la violencia verbal sutil. El alumnado que denuncia el malestar es tildado de excesivamente sensible, instalando la indefensión en las víctimas.",
      prevention: "Límites explícitos inmediatos. Análisis lingüístico y ético de la 'broma' en tutoría para revelar el sesgo de superioridad cultural que oculta."
    },
    {
      level: 1,
      title: "Nivel 1: Estereotipos y Rumores Sesgados",
      subtitle: "Creencia en bulos de redes sociales, asunciones prejuiciosas sobre higiene o intelecto.",
      description: "La base invisible. Ideas preconcebidas que el alumnado consume pasivamente de discursos mediáticos y familiares, que determinan su forma de mirar al compañero diverso.",
      prevention: "Alfabetización mediática y digital en el aula. Análisis de 'fake news' xenófobas y talleres de contraste empírico de la información."
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'all' ? 'bg-orange-600 text-slate-900' : 'text-slate-400 hover:text-white'}`}
              >
                Ver Ambos
              </button>
              <button
                onClick={() => setActiveTab('speech')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'speech' ? 'bg-orange-600 text-slate-900' : 'text-slate-400 hover:text-white'}`}
              >
                Discurso de Odio
              </button>
              <button
                onClick={() => setActiveTab('crime')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'crime' ? 'bg-orange-600 text-slate-900' : 'text-slate-400 hover:text-white'}`}
              >
                Delito de Odio
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Box 1: Discurso de Odio (Hate Speech) */}
            {(activeTab === 'all' || activeTab === 'speech') && (
              <div className="space-y-6 flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-150 animate-fadeIn">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <h4 className="font-sans font-black text-lg text-slate-900 uppercase tracking-tight text-[15px]">
                      Discurso de Odio (Hate Speech)
                    </h4>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Expresión de carácter discriminatorio, propagación de estereotipos hostiles, burlas denigrantes o deshumanización sutil dirigidas a minorías protegidas. Aunque daña gravemente la dignidad humana y la convivencia pacífica, <strong className="text-slate-900">no siempre reúne las características penales para ser sancionado en un juzgado criminal</strong> debido a la colisión con el derecho a la libertad de expresión.
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
                      Utiliza los canales internos de reporte (TikTok, Instagram, WhatsApp) bajo el motivo 'Hate speech' o 'Acoso'.
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

            {/* Box 2: Delito de Odio (Hate Crime) */}
            {(activeTab === 'all' || activeTab === 'crime') && (
              <div className="space-y-6 flex flex-col justify-between p-6 rounded-2xl bg-rose-50/40 border border-rose-150 animate-fadeIn">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-rose-650">
                    <Scale className="w-5 h-5 shrink-0" />
                    <h4 className="font-sans font-black text-lg text-slate-900 uppercase tracking-tight text-[15px]">
                      Delito de Odio (Hate Crime)
                    </h4>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Acción delictiva tipificada en el <strong className="text-slate-950">Código Penal (ej: Art. 510, 511 o 512 en España)</strong> donde el autor selecciona intencionadamente a la víctima por su pertenencia (real o atribuida) a un grupo específico: etnia, origen nacional, religión, orientación sexual, género, enfermedad o discapacidad. Supone una vulneración directa de bienes jurídicos protegidos.
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
                El Ciberodio en Redes Sociales
              </h3>
            </div>
          </div>
          
          <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-4xl leading-relaxed">
            Las redes sociales no solo transportan el discurso de odio; actúan como catalizadores mecánicos. El anonimato percibido, el distanciamiento físico de la pantalla y los algoritmos diseñados para premiar la indignación moral y retener la atención del usuario crean un entorno fértil para la radicalización rápida de menores.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-orange-400 flex items-center justify-center font-bold font-mono">
                01
              </div>
              <h4 className="font-sans font-extrabold text-sm text-slate-900 uppercase tracking-tight">Desinhibición Tóxica</h4>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                El efecto de pantalla disminuye la empatía inmediata. No ver la cara o el llanto de la víctima en tiempo real reduce el freno moral natural del agresor adolescente.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-orange-400 flex items-center justify-center font-bold font-mono">
                02
              </div>
              <h4 className="font-sans font-extrabold text-sm text-slate-900 uppercase tracking-tight">Mecanización del Algoritmo</h4>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                El contenido extremista e intolerante genera oleadas de comentarios de confrontación. Los algoritmos detectan esta interacción y priorizan su viralidad exponencial.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-orange-400 flex items-center justify-center font-bold font-mono">
                03
              </div>
              <h4 className="font-sans font-extrabold text-sm text-slate-900 uppercase tracking-tight">Humorización del Prejuicio</h4>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                El uso sistemático de memes de 'ironía oscura' o 'shittyposting' permite camuflar la discriminación de modo que quien protesta sea ridiculizado por 'no entender la broma'.
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
                ¿Qué hacer exactamente cuando detectamos un hilo, un vídeo o una publicación que atenta contra un colectivo o compañero de forma sistemática?
              </p>
              <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-xs">
                <span className="font-bold text-slate-400 block mb-1">📞 Teléfono de Asistencia Oficial (España)</span>
                <p className="text-slate-300 leading-relaxed">
                  Oficina Nacional de Lucha contra los Delitos de Odio (ONDOD): llama al <strong className="text-white">091 o 062</strong>, o contacta con el teléfono de atención a víctimas del racismo: <strong className="text-white">021</strong>.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {/* Step checklist */}
              {[
                {
                  step: "A",
                  title: "Bloquea y Reporta de inmediato a la Plataforma",
                  desc: "Usa las herramientas nativas de reporte. No comentes para insultar, eso le da más peso a la publicación ante los ojos de los motores de recomendación."
                },
                {
                  step: "B",
                  title: "Preserva URLs sólidas y perfiles directos",
                  desc: "Asegúrate de copiar el enlace directo del perfil de los implicados. Los nombres de usuario pueden cambiarse fácilmente, pero las IDs internas de la cuenta permanecen."
                },
                {
                  step: "C",
                  title: "Despliega contranarrativas con cautela",
                  desc: "Aporta facts verificados y asépticos. No participes en discusiones emocionales extremas. Tu objetivo es educar a los espectadores del debate, no convencer al troll radicalizado."
                },
                {
                  step: "D",
                  title: "Informa y coordina con el equipo docente del centro",
                  desc: "Si los implicados son miembros del centro, notifícalo. Gran parte del ciberodio nocturno repercute directamente en la convivencia diurna escolar del día siguiente."
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
            A menudo, el prejuicio no se presenta de manera explícita, sino camuflado en expresiones rápidas o de pantalla. Selecciona cada una para desgranar su engranaje desinformador y descubrir su respuesta deconstructiva.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            {/* Left list of phrases */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {displayPhrases.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedPhrase(item.id);
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
                  Decodificando nuevas frases...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  Descubrir 4 nuevas frases
                </>
              )}
            </button>
            {errorAI && <span className="text-[10px] text-rose-500 font-sans">{errorAI}</span>}
          </div>
            </div>

            {/* Right analysis detail panel */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
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
                    onClick={() => setActivePyramidLevel(lvl.level)}
                    className={`${widthClass} ${bgClass} text-white font-sans font-black text-xs sm:text-sm py-4 px-3 rounded-xl transition-all duration-300 shadow-sm cursor-pointer outline-none relative overflow-hidden flex flex-col items-center justify-center text-center`}
                    id={`pyramid-level-btn-${lvl.level}`}
                  >
                    <span className="uppercase tracking-widest text-[9px] opacity-75 font-bold mb-0.5">Nivel {lvl.level}</span>
                    <span className="font-extrabold leading-tight">{lvl.title.substring(9)}</span>
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
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs min-h-[340px] flex flex-col justify-between">
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
                    <p className="font-sans text-xs text-rose-500 font-semibold mt-1">
                      {pyramidLevels.find(l => l.level === activePyramidLevel)?.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3 font-sans text-xs sm:text-sm">
                    <p className="text-slate-600 leading-relaxed">
                      {pyramidLevels.find(l => l.level === activePyramidLevel)?.description}
                    </p>
                    
                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-1.5">
                      <span className="font-bold text-orange-700 text-[11px] uppercase tracking-wider block">
                        🛡 Acción de ruptura preventiva:
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
                    borderStyle = 'border-orange-500 bg-orange-50/30 text-orange-900';
                  } else if (isSelected) {
                    borderStyle = 'border-rose-500 bg-rose-50/30 text-rose-900';
                  }
                } else if (isSelected) {
                  borderStyle = 'border-emerald-600 bg-emerald-50/30 text-indigo-950';
                }

                return (
                  <button
                    key={opt.id}
                    disabled={showFeedback}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-4 rounded-xl border text-left font-sans text-xs sm:text-sm transition-all flex items-start gap-3 outline-none ${borderStyle} ${showFeedback ? '' : 'cursor-pointer'}`}
                    id={`exercise-opt-btn-${opt.id}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {showCheckSymbol && (
                        <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {showCrossSymbol && (
                        <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {!showCheckSymbol && !showCrossSymbol && (
                        <div className={`w-5 h-5 rounded-full border text-[10px] font-sans font-bold flex items-center justify-center ${isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 text-slate-500'}`}>
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
              <div className="animate-fadeIn p-4 rounded-xl border space-y-2 bg-white"
                style={{
                  borderColor: exercises[activeExercise].options.find(o => o.id === selectedOption)?.correct ? '#14b8a6' : '#f43f5e'
                }}
              >
                <div className="flex items-center gap-2">
                  {exercises[activeExercise].options.find(o => o.id === selectedOption)?.correct ? (
                    <span className="text-xs font-mono font-bold text-orange-700 uppercase tracking-widest bg-orange-100 px-2 py-0.5 rounded border border-orange-200">Enfoque Correcto</span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-rose-700 uppercase tracking-widest bg-rose-100 px-2 py-0.5 rounded border border-rose-200">Enfoque a mejorar</span>
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
