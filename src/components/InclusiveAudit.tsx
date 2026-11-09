
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
  },
  {
    id: 11,
    text: 'Un alumno tiene un nombre extranjero que te cuesta pronunciar al pasar lista los primeros días. ¿Qué haces?',
    options: [
      { text: 'Le busco un apodo corto o castellanizo su nombre para que sea más fácil para todos.', score: 0, tip: 'El nombre es parte central de la identidad de un niño. Cambiárselo sin su consentimiento puede hacerle sentir que su origen estorba.' },
      { text: 'Lo pronuncio como puedo rápidamente y paso al siguiente para no llamar la atención.', score: 1, tip: 'Aunque no quieras incomodar, pasar por alto la pronunciación correcta transmite cierto desinterés por quién es.' },
      { text: 'Le pregunto con naturalidad cómo se pronuncia correctamente y practico hasta decirlo bien.', score: 2, tip: '¡Detalle crucial! Esforzarse por pronunciar bien su nombre transmite respeto, bienvenida y cercanía desde el primer día.' }
    ]
  },
  {
    id: 12,
    text: 'Te enteras de que en el grupo de WhatsApp de la clase circulan memes o stickers burlándose de un compañero por su procedencia. ¿Cómo respondes?',
    options: [
      { text: 'No intervengo; lo que hagan fuera del horario escolar en sus teléfonos privados no es responsabilidad del centro.', score: 0, tip: 'El ciberacoso y las burlas en redes impactan directamente en el aula. Mirar a otro lado agrava la indefensión de la víctima.' },
      { text: 'Pongo una queja al equipo directivo para que sancionen a los administradores del grupo.', score: 1, tip: 'La vía punitiva frena el síntoma de inmediato, pero no educa sobre el daño psicológico del acoso digital.' },
      { text: 'Abro una sesión de tutoría sobre huella digital, ciberconvivencia y empatía, trabajando el impacto del humor dañino.', score: 2, tip: '¡Pedagogía preventiva excelente! Formar el pensamiento crítico ante los memes ayuda a que los propios compañeros frenen las faltas de respeto.' }
    ]
  },
  {
    id: 13,
    text: 'Un alumno de familia migrante en situación económica precaria tiene dificultades al inicio de curso. ¿Qué expectativas te planteas?',
    options: [
      { text: 'Asumo que bastante tiene con aprobar raspando y no le exijo demasiado para no frustrarle.', score: 0, tip: 'Bajar el listón por compasión limita su futuro. Las bajas expectativas del profesor se convierten en una profecía autocumplida.' },
      { text: 'Le aplico las mismas exigencias sin contemplaciones; el que quiera salir adelante tiene que esforzarse igual.', score: 1, tip: 'Exigir sin acompañar ni entender su punto de partida desigual genera frustración y abandono escolar.' },
      { text: 'Mantengo altas expectativas sobre su potencial, pero adapto los apoyos y refuerzos necesarios para que alcance su máximo.', score: 2, tip: '¡Confianza docente transformadora! Creer en su capacidad y darle herramientas personalizadas es la clave del éxito escolar.' }
    ]
  },
  {
    id: 14,
    text: 'Una alumna comienza a llevar prendas o símbolos tradicionales (como hiyab) y notas miradas y cuchicheos en los pasillos. ¿Qué haces?',
    options: [
      { text: 'Le sugiero discretamente que evite prendas llamativas para que no se busque problemas con los compañeros.', score: 0, tip: 'Responsabilizar a la alumna de los prejuicios ajenos vulnera su libertad y refuerza la intolerancia del grupo.' },
      { text: 'Ignoro los comentarios mientras no haya un insulto directo o una agresión física.', score: 1, tip: 'La hostilidad sutil también aísla y genera angustia en la alumna antes de que estalle un conflicto mayor.' },
      { text: 'Abordo con normalidad la diversidad de vestimentas y símbolos en tutoría, promoviendo el respeto a las decisiones personales.', score: 2, tip: '¡Convivencia informada! Cuando se normaliza la diversidad con información rigurosa, los cuchicheos pierden toda su fuerza.' }
    ]
  },
  {
    id: 15,
    text: 'Echas un vistazo a las paredes y pasillos de tu aula o centro educativo. ¿Qué mensajes e imágenes predominan?',
    options: [
      { text: 'Solo carteles con normas de disciplina, horarios oficiales y decoración genérica de papelería escolar.', score: 0, tip: 'Un entorno neutro o frío desaprovecha el poder del espacio visual para hacer que todos los alumnos se sientan representados y acogidos.' },
      { text: 'Tenemos banderas del mundo o fotos de trajes típicos que pusimos para el Día de la Paz o alguna fiesta escolar.', score: 1, tip: 'Es un detalle colorido, pero sigue transmitiendo que la diversidad es una postal turística de días festivos.' },
      { text: 'Carteles de bienvenida en varios idiomas, trabajos del alumnado sobre sus biografías y frases de autores universales diversos.', score: 2, tip: '¡Espacio educativo vivo! Un aula que refleja la pluralidad en sus paredes genera un sentido inmediato de pertenencia comunitaria.' }
    ]
  },
  {
    id: 16,
    text: 'Dos alumnos conversan en su idioma materno durante el recreo o en voz baja en clase. ¿Cómo reaccionas?',
    options: [
      { text: 'Les prohíbo tajantemente hablar en otro idioma: "¡Aquí en el colegio solo se habla español!".', score: 0, tip: 'Prohibir su lengua materna genera humillación innecesaria. La lengua de origen no compite con el castellano; es parte de su afecto y cognición.' },
      { text: 'Les pido que no lo hagan porque los demás pueden pensar que están hablando mal de ellos o criticando a alguien.', score: 1, tip: 'Proyectar sospechas sobre otro idioma alimenta la desconfianza infundada entre compañeros.' },
      { text: 'Lo respeto con total naturalidad fuera de las explicaciones lectivas y muestro curiosidad por cómo se dicen palabras en su lengua.', score: 2, tip: '¡Hospitalidad lingüística ejemplar! Sentir que su lengua materna es valorada y no motivo de sospecha afianza su integración escolar.' }
    ]
  },
  {
    id: 17,
    text: 'Un alumno no trae el material escolar básico, la ropa de deporte o el dinero para una excursión. ¿Cuál es tu enfoque?',
    options: [
      { text: 'Le pongo una falta o un punto negativo en su agenda cada día que viene sin el material pedido.', score: 0, tip: 'Castigar al menor por la precariedad económica de su familia genera vergüenza y no soluciona la falta de recursos.' },
      { text: 'Le dejo material de mi propio estuche con cara de resignación y le digo que avise a sus padres una vez más.', score: 1, tip: 'Ayuda en lo inmediato, pero el tono de reproche puede hacerle sentir culpable de la situación de su hogar.' },
      { text: 'Hablo discretamente con orientación o dirección para buscar vías de ayuda del centro (banco de libros, becas) sin señalarle.', score: 2, tip: '¡Equidad efectiva! Proteger la dignidad del alumno mientras se gestionan recursos del centro es pura justicia educativa.' }
    ]
  },
  {
    id: 18,
    text: 'Al seleccionar un vídeo o cortometraje para reflexionar en tutoría, ¿qué tipo de historias y personajes eliges?',
    options: [
      { text: 'Los vídeos clásicos de valores genéricos donde todos los protagonistas son del mismo entorno cultural mayoritario.', score: 0, tip: 'Si los protagonistas siempre tienen el mismo perfil, el alumnado diverso nunca se ve reflejado en historias valiosas.' },
      { text: 'Vídeos donde las personas migrantes siempre aparecen como víctimas desvalidas que necesitan caridad.', score: 1, tip: 'La mirada paternalista o compasiva reduce a colectivos enteros a personas indefensas, restándoles dignidad y capacidad de iniciativa.' },
      { text: 'Historias donde personas diversas tienen iniciativa, resuelven problemas y aportan a su comunidad en pie de igualdad.', score: 2, tip: '¡Impecable! Mostrar referentes diversos como personas activas y capaces fortalece la autoestima y derriba la mirada compasiva.' }
    ]
  },
  {
    id: 19,
    text: 'Un estudiante de otra cultura casi nunca levanta la mano ni opina en las asambleas o puestas en común. ¿Cómo lo interpretas?',
    options: [
      { text: 'Pienso que es desinteresado, tímido sin remedio o que no tiene nada que aportar al grupo.', score: 0, tip: 'El silencio a menudo no es desinterés, sino prudencia aprendida, respeto jerárquico a la autoridad del profesor o miedo al juicio lingüístico.' },
      { text: 'Le obligo a hablar de improviso señalándole con el dedo para que "se suelte" ante toda la clase.', score: 1, tip: 'Forzar la exposición en frío ante todo el grupo suele disparar la ansiedad y bloquear aún más al alumno.' },
      { text: 'Le ofrezco canales más cómodos: reflexionar primero en parejas, participar por escrito o hacerle preguntas cerradas y amables.', score: 2, tip: '¡Pedagogía respetuosa! Diseñar puentes graduales de participación permite que las voces más prudentes ganen confianza a su ritmo.' }
    ]
  },
  {
    id: 20,
    text: 'Llega el momento de repartir cargos en clase (delegado, encargado de material, mediador de patio). ¿Cómo se asignan?',
    options: [
      { text: 'Suelen ser siempre los alumnos con mejor expediente y mayor facilidad de palabra los que asumen los cargos.', score: 0, tip: 'Concentrar los liderazgos en el alumnado más extrovertido refuerza jerarquías de prestigio y excluye a perfiles más discretos o minorizados.' },
      { text: 'Por votación popular directa, aunque casi siempre ganan los mismos de la pandilla más numerosa.', score: 1, tip: 'La votación sin reflexión previa suele convertirse en un concurso de popularidad que margina a minorías.' },
      { text: 'Establezco cargos rotativos obligatorios para que todos los alumnos asuman responsabilidades de liderazgo y servicio al grupo.', score: 2, tip: '¡Liderazgo democrático real! Dar a cada alumno la oportunidad de ser referente y cuidar del aula potencia su autonomía y sentido de comunidad.' }
    ]
  },
  {
    id: 21,
    text: 'En una reunión de claustro un compañero dice: "Yo en clase trato a todos exactamente igual, no miro colores ni orígenes". ¿Qué opinas?',
    options: [
      { text: 'Estoy de acuerdo; diferenciar a los alumnos por su origen es la verdadera discriminación.', score: 0, tip: 'La falsa "ceguera al color" invisibiliza que no todos parten de las mismas oportunidades ni viven las mismas realidades fuera del colegio.' },
      { text: 'Es una buena intención para evitar favoritismos, aunque a veces haya que tener paciencia con los que no saben el idioma.', score: 1, tip: 'Tratar a todos por igual es igualdad formal; dar a cada uno el apoyo que necesita para prosperar es verdadera justicia.' },
      { text: 'Tratar con justicia exige reconocer la diversidad de puntos de partida y ofrecer apoyos diferentes para alcanzar metas comunes.', score: 2, tip: '¡Brillante claridad conceptual! La equidad no consiste en dar lo mismo a todos, sino en dar a cada uno lo que necesita para triunfar.' }
    ]
  },
  {
    id: 22,
    text: 'Un libro de texto describe a ciertas regiones del mundo únicamente asociadas a pobreza, catástrofes o animales salvajes. ¿Qué haces?',
    options: [
      { text: 'Sigo el libro al pie de la letra; el currículo oficial es lo que entra en los exámenes y no tengo tiempo de corregirlo.', score: 0, tip: 'Transmitir visiones reduccionistas del mundo refuerza la idea errónea de que ciertos países solo son miseria y atraso.' },
      { text: 'Menciono de pasada que "también hay ciudades modernas", pero sin profundizar en el tema.', score: 1, tip: 'Un comentario al vuelo se olvida rápido si no se confronta con datos y ejemplos visuales reales.' },
      { text: 'Muestro imágenes de universidades, centros tecnológicos y arte contemporáneo de esas regiones para desmontar la mirada única.', score: 2, tip: '¡Mirada crítica universal! Desmontar el relato de la miseria crónica enseña a tu alumnado a mirar el mundo sin complejos de superioridad.' }
    ]
  },
  {
    id: 23,
    text: 'Un alumno se ausenta de clase durante tres días porque su familia debe renovar documentación de residencia en otra ciudad. ¿Cómo reaccionas?',
    options: [
      { text: 'Le computo las faltas como injustificadas y le advierto que acumular ausencias bajará su nota de actitud.', score: 0, tip: 'La carrera de obstáculos burocrática de la Ley de Extranjería no es culpa del menor; penalizarle añade angustia a un proceso ya duro.' },
      { text: 'Acepto el justificante sin más, pero no le doy facilidades para recuperar lo que se explicó en su ausencia.', score: 1, tip: 'El alumno se queda descolgado del ritmo de clase y acumula retraso académico por una causa ajena a su voluntad.' },
      { text: 'Justifico la ausencia con comprensión, le preparo un resumen de tareas y le asigno un compañero de apoyo a su vuelta.', score: 2, tip: '¡Acompañamiento empático de diez! Ayudarle a reengancharse sin reproches amortigua el impacto del estrés administrativo en su aprendizaje.' }
    ]
  },
  {
    id: 24,
    text: 'Escuchas a varios alumnos repetir frases oídas en redes o en casa: "Es que a ellos les dan todas las becas de comedor y a nosotros nada". ¿Qué haces?',
    options: [
      { text: 'Les mando callar de inmediato diciendo que "de política no se habla en el colegio".', score: 0, tip: 'Censurar el rumor sin rebatirlo con datos hace que los estudiantes crean que es una verdad incómoda que se les oculta.' },
      { text: 'Digo que no es verdad de forma vaga, pero sin entrar en detalles numéricos.', score: 1, tip: 'Desmentir sin datos objetivos deja viva la sospecha del bulo entre el alumnado y en sus familias.' },
      { text: 'Aprovecho la tutoría o la clase de matemáticas para explicar con transparencia cómo funcionan los baremos de renta pública para becas.', score: 2, tip: '¡Educación contra bulos magistral! Usar datos oficiales y criterios de renta desarma los prejuicios con pedagogía rigurosa y calma.' }
    ]
  },
  {
    id: 25,
    text: 'Un grupo de alumnos justifica un mote despectivo diciendo: "¡Si a él no le importa, se ríe con nosotros y nos llevamos bien!". ¿Cómo intervienes?',
    options: [
      { text: 'Si el afectado sonríe y no se queja formalmente, doy por bueno que es una broma inocente entre amigos.', score: 0, tip: 'Muchas veces la víctima se ríe por pura autodefensa o miedo a ser excluida del grupo si protesta.' },
      { text: 'Prohíbo decir ese mote en mi presencia, pero sin explicar las razones de fondo.', score: 1, tip: 'La prohibición formal solo desplaza el mote a los pasillos o a los chats donde el profesor no mira.' },
      { text: 'Hablo a solas con el alumno aludido para saber cómo se siente de verdad y abordo con el grupo la diferencia entre reírse juntos y reírse de alguien.', score: 2, tip: '¡Cuidado emocional profundo! Crear un espacio seguro para expresar el malestar real y educar la empatía grupal erradica el acoso invisible.' }
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
