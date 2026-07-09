/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity, GlossaryTerm, FAQItem } from './types';

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'la-maleta-intercultural',
    title: 'La Maleta Intercultural (Mi equipaje invisible)',
    objective: 'Fomentar el autoconocimiento cultural y empatizar con los procesos de migración o desapego material mediante objetos simbólicos que representan la identidad personal.',
    targetGrade: '1º y 2º ESO',
    duration: 45,
    category: 'reflexion',
    materials: [
      'Una caja decorada que simule ser una maleta antigua',
      'Post-its de colores brillantes y bolígrafos',
      'Ficha en papel titulada "Mi equipaje intangible" para cada estudiante'
    ],
    steps: [
      {
        title: 'Presentación del tutor',
        description: 'El docente abre la sesión mostrando su propia "maleta" física o un dibujo de ella y saca tres objetos reales o simulados que simbolicen su herencia o identidad (por ejemplo, una fotografía familiar entrañable, una especia de cocina tradicional que evoque su infancia, y un poema o letra de canción de su pueblo de origen). Explica brevemente por qué los escogió.',
        duration: 8
      },
      {
        title: 'El viaje imprevisto',
        description: 'Se pide a los alumnos que cierren los ojos e imaginen que deben abordar un viaje urgente hacia un destino desconocido, donde no dominan el idioma ni conocen a nadie. Tienen permitido rellenar una maleta pequeña de mano, pero con una restricción absoluta: no pueden incluir tecnología (móviles, tablets, ordenadores). Solo caben exactamente 3 objetos físicos o simbólicos que custodien su esencia cultural, afectiva o identitaria.',
        duration: 12
      },
      {
        title: 'La maleta comunitaria',
        description: 'Cada alumno plasma en sus tres post-its el nombre de sus objetos seleccionados con un breve dibujo. Uno a uno, o en pequeños grupos, acuden a la pizarra donde hay dibujada una gran silueta de equipaje titulada "La maleta del aula". Pegan allí sus aportes y leen en voz alta un par de ellos compartiendo las historias subyacentes.',
        duration: 15
      },
      {
        title: 'Cierre y descompresión',
        description: 'Reflexión guiada sobre el desprendimiento absoluto de lo conocido. Se debate qué ocurriría si al llegar a la aduana del nuevo país, las autoridades locales confiscaran o ridiculizaran esos tres objetos preciados por considerarlos "extraños" o "inútiles".',
        duration: 10
      }
    ],
    keyReflectionQuestions: [
      '¿Qué emociones surgieron al tener que filtrar y elegir únicamente tres objetos para preservar tu esencia?',
      '¿De qué manera los objetos cotidianos de vuestras familias actúan como transmisores de cultura y comunidad?',
      '¿Cómo podemos facilitar que los nuevos compañeros del instituto sientan que su maleta invisible es valorada en nuestra clase?'
    ]
  },
  {
    id: 'el-iceberg-de-la-cultura',
    title: 'El Iceberg de la Cultura',
    objective: 'Visibilizar que los aspectos más profundos y transformadores de la cultura (valores, roles relacionales, cosmovisión) no son apreciables a simple vista, combatiendo prejuicios basados únicamente en expresiones folclóricas o externas.',
    targetGrade: '3º y 4º ESO',
    duration: 30,
    category: 'debate',
    materials: [
      'Proyección de un gráfico gigante de un iceberg en el agua',
      'Tarjetas recortables con diversos rasgos socioculturales',
      'Masilla de pegado o cinta adhesiva de pintor'
    ],
    steps: [
      {
        title: 'La metáfora del iceberg',
        description: 'El docente detalla de manera conceptual por qué la cultura humana se asemeja a un iceberg: la superficie visible que sobresale del agua representa menos del 15% del total (lo folclórico, lo gastronómico, etc.), mientras que el 85% reside sumergido e invisible, albergando las normas relacionales, tabúes, visiones éticas y formas de comunicarnos.',
        duration: 5
      },
      {
        title: 'Clasificación guiada',
        description: 'Se divide la clase en grupos de 4. Se distribuyen tarjetas impresas con conceptos diversos: "Gastronomía festiva", "Concepto de justicia", "Música popular", "Tratamiento de la vejez", "Modo de vestir", "Estructuras familiares", "Concepción del tiempo y la puntualidad", "Lenguaje de gestos", "Roles de género", "Ritmo de conversación". Cada equipo discute acaloradamente qué rasgos y conductas van arriba de la marea (visibles de inmediato) y cuáles abajo (requieren convivencia profunda y empatía para ser entendidos).',
        duration: 15
      },
      {
        title: 'Contraste y resolución',
        description: 'El portavoz de cada grupo adhiere las tarjetas en la pizarra ordenándolas según sus conclusiones. Se genera una discusión coordinada al observar divergencias (por ejemplo, si "la vestimenta" es siempre visible o encierra nociones sumergidas de pudor y misticismo). Se resalta que los choques e intolerancias interculturales suelen suceder bajo el agua, en las colisiones de las zonas invisibles del iceberg.',
        duration: 10
      }
    ],
    keyReflectionQuestions: [
      '¿Por qué las celebraciones culturales en entornos escolares suelen limitarse únicamente a la punta del iceberg (gastronomía, baile, vestimentas de colores)?',
      '¿Qué prejuicios nacen cuando evaluamos la zona sumergida de otra persona usando únicamente las gafas de nuestra propia punta del iceberg?',
      '¿Cómo podemos entrenar nuestra visión diaria para percibir las dinámicas que ocurren "bajo el agua" con nuestros compañeros?'
    ]
  },
  {
    id: 'paso-al-frente-privilegios',
    title: 'Paso al Frente (Constelación de Oportunidades)',
    objective: 'Experimentar corporalmente las enormes diferencias de punto de partida social y administrativa existentes entre diversas identidades, propiciando la autorreflexión sobre la justicia distributiva y los privilegios ocultos.',
    targetGrade: '4º ESO y Bachillerato',
    duration: 50,
    category: 'reflexion',
    materials: [
      'Aula despejada de mesas y sillas para que quepa una fila horizontal holgada de estudiantes',
      'Tarjetas de roles individuales preparadas y dobladas'
    ],
    steps: [
      {
        title: 'Asignación silenciosa',
        description: 'Cada participante extrae un papel con un perfil ficticio escrito detalladamente. Es vital instruirlos para que guarden absoluto secreto de su identidad asignada y se concentren en habitarla con realismo y seriedad emocional durante toda la experiencia. Ejemplos de perfiles: "Hijo de diplomáticos europeos", "Joven extranjera sin estatus de residencia legal", "Estudiante de barrio vulnerable", "Persona con diversidad funcional motora".',
        duration: 5
      },
      {
        title: 'La alineación inicial',
        description: 'La clase entera se sitúa hombro con hombro, formando una hilera recta mirando hacia una pared lejana. No hay jerarquías iniciales visibles; todos comparten la misma línea de salida física.',
        duration: 5
      },
      {
        title: 'El avance y sus barreras',
        description: 'El educador lee en voz alta, de forma solemne, una serie de condiciones cotidianas de vida. Tras escuchar cada frase, el alumno dará un paso adelante generoso SÓLO si siente que su personaje goza de esa facilidad de manera incuestionable. En caso de duda o si el personaje enfrenta problemas significativos con esa frase, debe permanecer clavado en el sitio. Ejemplos de frases:\n1. "Puedo alquilar un piso para vivir o abrir una cuenta bancaria sin que sospechen de mí por mis apellidos o mi cara".\n2. "En los libros de historia que estudio en clase de secundaria, la historia y aportaciones de mi grupo social se retratan con asiduo respeto y rigor".\n3. "Nunca temo que las fuerzas del orden me soliciten la identificación de forma aleatoria por la calle debido a mi fenotipo".\n4. "Si enfermo de gravedad de un día para otro, tengo garantizado un acceso rápido y gratuito al sistema de salud estatal".\n5. "Sé que mi orientación afectiva o creencia espiritual no pondrá en peligro mi integridad física en público".',
        duration: 25
      },
      {
        title: 'Lectura visual de la brecha',
        description: 'Al enunciar la última frase, se exige a los alumnos que congelen sus posiciones físicas. El profesor pide que miren a su alrededor: unos pocos han alcanzado la línea más lejana de la clase, otros han quedado esparcidos por la mitad, y un grupo con rostros consternados apenas se ha podido distanciar de la línea inicial. Se procede a la lectura en voz alta de los roles de las personas de los extremos y se debate el abismo de partida.',
        duration: 15
      }
    ],
    keyReflectionQuestions: [
      'Para los que quedaron atrás: ¿Qué se sentía ver a otros progresar de forma ágil y vertiginosa mientras tú no podías mover los pies?',
      'Para los que llegaron adelante: ¿Eras plenamente consciente de la ventaja que tu rol cargaba para dar esos pasos?',
      '¿Qué diferencia existe entre garantizar "Igualdad ante la ley" y construir un entorno verdaderamente equitativo de aprendizaje e inclusión social?'
    ]
  },
  {
    id: 'el-telefono-del-prejuicio',
    title: 'El Teléfono Estropeado del Prejuicio',
    objective: 'Demostrar mediante una dinámica empírica en tiempo real cómo las noticias cotidianas, comentarios de pasillo y opiniones sociales se tergiversan por la acción de estereotipos inconscientes que rellenan huecos de información.',
    targetGrade: 'Todos los cursos (Secundaria)',
    duration: 20,
    category: 'rompehielos',
    materials: [
      'Un pasillo exterior o aula libre contigua para ubicar a los jugadores que esperan su turno',
      'Un texto minuciosamente elaborado por el profesor con detalles realistas y cargados de puntos susceptibles de sesgo'
    ],
    steps: [
      {
        title: 'Selección e instrucción',
        description: 'Se piden 5 voluntarios. Del 2º al 5º salen fuera de la clase al pasillo para no oír nada. El voluntario 1 permanece en clase frente al resto de compañeros, quienes actuarán como observadores silenciosos anotando cada detalle transformado o inventado.',
        duration: 3
      },
      {
        title: 'Lectura primaria',
        description: 'El docente procede a leer pausadamente el texto al participante 1. Ejemplo de texto: "El pasado martes, a las 18:30 h, en el autobús de la línea C1, viajaba un anciano de bastón. Detrás iba un muchacho joven con capucha oscura que hablaba en voz alta con acento extranjero. En la siguiente parada, el chófer frenó seco por culpa de una moto. El joven tambaleó, chocando con el anciano. Al anciano se le cayó el bastón de madera y a continuación empezó a increpar al joven culpándole de empujarlo deliberadamente para robarle la cartera. El muchacho, asustado y sin entender del todo el idioma por su gesticulación nerviosa, recogió el bastón del suelo para devolvérselo con rapidez, pero la gente del autobús empezó a gritarle diciendo que lo dejara en paz."',
        duration: 4
      },
      {
        title: 'Eslabones del mensaje',
        description: 'Se hace entrar al voluntario 2. El voluntario 1 le susurra al oído el relato tal y como lo recuerde de memoria (sin leer nada). Luego entra el voluntario 3, a quien el 2 le narra la historia heredada, y así de eslabón en eslabón hasta que el participante 5 recibe el mensaje transmitido por el 4.',
        duration: 8
      },
      {
        title: 'El contraste crudo',
        description: 'El último participante relata en voz alta a toda la clase su versión reconstruida. Inevitablemente, se habrá modificado de forma drástica (el muchacho de capucha probablemente termine siendo descrito como agresor, delincuente que empujó al abuelo o intentó asaltarlo). El docente relee el texto inicial para confrontar las desviaciones generadas por la rumorología sistemática y los prejuicios cognitivos.',
        duration: 5
      }
    ],
    keyReflectionQuestions: [
      '¿Qué detalles específicos desaparecieron en la primera retransmisión y qué prejuicios de los transmisores "rellenaron" la trama?',
      '¿Cómo condiciona este sesgo en cascada las noticias que leemos en redes sociales sobre personas pertenecientes a minorías?',
      '¿Qué medidas de verificación mental debemos implantar para no propagar "falsas verdades" xenófobas en el instituto?'
    ]
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    word: 'Aculturación',
    definition: 'Proceso de adaptación sociocultural que se produce cuando dos o más grupos de diferentes orígenes e identidades entran en contacto directo, continuo y prolongado, derivando en transformaciones profundas en las pautas culturales de uno o ambos colectivos.',
    etymology: 'Del latín "ad" (hacia) y "cultura". Término consolidado por la antropología a finales del siglo XIX.',
    pedagogicalTip: 'Para trabajar en clase, aclara que la aculturación no es necesariamente una asimilación forzada. Se puede analizar con los alumnos qué elementos culturales han adoptado de forma recíproca (música, cocina, argot).'
  },
  {
    word: 'Asimilacionismo',
    definition: 'Enfoque político o ideológico que exige la absorción homogeneizadora de los grupos étnicos o culturales minoritarios por parte de la sociedad dominante. Supone que el grupo minoritario debe abandonar por completo su identidad de origen (idioma, vestimenta, deidades, ritos) para fundirse plenamente en la cultura hegemónica.',
    etymology: 'Del latín "assimilare" (hacer semejante, igualar).',
    pedagogicalTip: 'Invita a los alumnos a plantear el dilema de la homogeneización obligada frente a la riqueza que aporta mantener la herencia familiar en armonía con las leyes cívicas comunes.'
  },
  {
    word: 'Etnocentrismo',
    definition: 'Actitud cognitiva y social que consiste en juzgar, evaluar o desvalorizar las costumbres, creencias, comportamientos e instituciones de otras comunidades culturales tomando como medida de perfección y normalidad los parámetros morales y estéticos de la propia sociedad.',
    etymology: 'Del griego "éthnos" (pueblo, nación) y el latín "centrum" (centro).',
    pedagogicalTip: 'Propón a tus alumnos buscar ejemplos de etnocentrismo en el planisferio tradicional de Mercator (donde Europa aparece en el centro y artificialmente agrandada en comparación con el cono sur y África).'
  },
  {
    word: 'Interculturalidad',
    definition: 'Modelo sociopolítico y ético que promueve la interacción simétrica, el diálogo horizontal y la convivencia respetuosa entre múltiples tradiciones étnicas y culturales que cohabitan un mismo territorio. A diferencia de la mera coexistencia (multiculturalidad), busca activamente el enriquecimiento mutuo, la resolución pacífica de conflictos y la justicia equitativa de oportunidades.',
    etymology: 'Compuesto por el prefijo latino "inter" (entre) y "cultura".',
    pedagogicalTip: 'Usa la analogía culinaria para diferenciar modelos en clase: la multiculturalidad es como una bandeja de ensalada donde cada ingrediente está al lado de los otros pero intacto; la interculturalidad es un guiso sazonado, donde los sabores se mezclan enriqueciéndose, pero conservando su textura propia.'
  },
  {
    word: 'Multiculturalidad',
    definition: 'Situación fáctica que describe la coincidencia geográfica y temporal de personas provenientes de horizontes identitarios y nacionales diversos dentro de una misma comunidad, sin que ello implique necesariamente que exista diálogo profundo, permeabilidad mutua o igualdad de trato e inserción civil coordinada.',
    etymology: 'Del latín "multus" (mucho, numeroso) y "cultura".',
    pedagogicalTip: 'Subraya que es un término descriptivo (un dato demográfico), mientras que la interculturalidad es un proyecto activo y normativo (un objetivo educativo indispensable).'
  },
  {
    word: 'Prejuicio',
    definition: 'Juicio u opinión cognitiva preconcebida, generalmente de carácter desfavorable, que se formula sobre una persona o grupo social determinado con anterioridad a poseer un conocimiento empírico directo o contrastado.',
    etymology: 'Del latín "praeiudicium" (opinión o sentencia dictada de antemano).',
    pedagogicalTip: 'Es de utilidad diferenciarlo de "estereotipo" en clase: el estereotipo es la creencia generalizada (ej: "todos los de x país son callados"); el prejuicio es la emoción/actitud negativa derivada (ej: "no quiero sentarme junto a él porque será aburrido").'
  },
  {
    word: 'Racismo Sistémico',
    definition: 'Complejo entramado histórico, institucional y sociocultural que perpetúa de forma inconsciente barreras y privilegios asimétricos sustentados en categorías raciales socialmente construidas. Se manifiesta en el acceso desigual a empleos, vivienda, estatus legal o representatividad en los medios de comunicación.',
    etymology: 'De la palabra "raza" combinada con "sistémico" (perteneciente a la totalidad de un sistema social).',
    pedagogicalTip: 'Anímales a analizar los personajes históricos estudiados: ¿Por qué la gran mayoría son de origen eurocéntrico? ¿Qué inventores o filósofos de otras culturas han sido omitidos del temario tradicional?'
  },
  {
    word: 'Xenofobia',
    definition: 'Sentimiento irracional de aversión, hostilidad, rechazo o animadversión manifiesta hacia las personas de procedencia extranjera o hacia cualquier manifestación cultural ajena a las fronteras patrias del observador.',
    etymology: 'Del griego "xénos" (extranjero, extraño, huésped ajeno) y "phóbos" (miedo, terror, huida).',
    pedagogicalTip: 'Discute con tu clase la diferencia contemporánea entre xenofobia y aporofobia (el rechazo selectivo al extranjero de escasos recursos económicos frente al turista o inversor rico).'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: '¿Cómo puedo abordar un microconcierto de racismo o prejuicio en mi aula de secundaria de forma inmediata?',
    answer: 'La clave radica en evitar el sermoneo moralizante, que suele generar actitudes defensivas corporales. En su lugar, utiliza la mayéutica activa: formula preguntas abiertas que obliguen al estudiante emisor a desmenuzar su propio prejuicio. Emplea técnicas como detener la clase un momento, escribir las palabras ofensivas en la pizarra despojándolas del contexto personal y pedir al grupo entero que analice las raíces de ese concepto. La dinámica interactiva de "El Teléfono Estropeado" es maravillosa para demostrar cómo los rumores sesgados se retroalimentan rápidamente.',
    category: 'Pedagogía Aplicada'
  },
  {
    question: 'Mi instituto cuenta con un alumnado mayoritariamente autóctono y homogéneo. ¿Tiene sentido aplicar educación intercultural aquí?',
    answer: '¡Por supuesto! Es de hecho de vital importancia. La educación intercultural no busca sanar parches cuando surgen conflictos vecinales en aulas diversas, sino equipar a TODOS los futuros ciudadanos con competencias globales, pensamiento crítico y decolonialidad. Un aula supuestamente homogénea corre el gran riesgo de normalizar prejuicios etnocentristas sutiles que saldrán a flote drásticamente cuando los alumnos accedan a la universidad o al mercado laboral globalizado.',
    category: 'Estrategia de Centro'
  },
  {
    question: 'Soy docente de Física, Química o Matemáticas. ¿Dónde se inserta la interculturalidad en mis materias científicas?',
    answer: 'La ciencia es una construcción colectiva transnacional que a menudo se enseña obviando su origen diverso. Interculturalizar las ciencias consiste en deconstruir el monopolio epistémico occidental: explica que la numeración matemática procede de sabios árabes e indios; reivindica el papel médico de la botánica indígena mesoamericana frente a la química del siglo XIX; o analiza las asimetrías de impacto del cambio climático actual sobre las naciones del Sur Global que apenas emiten gases contaminantes.',
    category: 'Currículo Transversal'
  },
  {
    question: '¿De qué forma concreta podemos involucrar a las familias migrantes que apenas asisten a tutorías por barreras lingüísticas u horarios laborales extensos?',
    answer: 'Para sembrar un canal de confianza, reduce las citas formales de boletín que imponen distancias y apuesta por convocatorias distendidas o lúdicas. Genera folletos ilustrados y multilingües con apoyo del alumnado mediador. Organiza desayunos pedagógicos sabatinos o tardes creativas de arte y cocina colaborativa de baja exigencia administrativa. Acoge sus saberes locales como parte crucial de proyectos transversales evaluables (por ejemplo, invitando a abuelos a narrar cuentos populares en su idioma natal con traducción interactiva por parte de sus nietos).',
    category: 'Relación con Familias'
  }
];
