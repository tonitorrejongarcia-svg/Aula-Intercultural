const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const newActivities = `,
  {
    id: 'mapa-de-nombres',
    title: 'El Mapa de Nuestros Nombres',
    objective: 'Reconocer y valorar la diversidad cultural a través del origen, significado e historia de los nombres propios del alumnado.',
    targetGrade: 'Todos los Niveles',
    duration: 30,
    category: 'cohesion',
    materials: [
      'Pizarra o papelógrafo',
      'Post-its o tarjetas',
      'Rotuladores'
    ],
    steps: [
      {
        title: 'Reflexión Individual',
        duration: 5,
        description: 'Cada alumno escribe su nombre en una tarjeta y reflexiona sobre su origen, quién se lo puso y por qué, y si tiene algún significado especial en su familia o idioma materno.'
      },
      {
        title: 'Presentación',
        duration: 15,
        description: 'En círculo, cada persona comparte brevemente la historia de su nombre con el resto de la clase.'
      },
      {
        title: 'Creación del Mapa',
        duration: 10,
        description: 'Se pegan los nombres en un mapa del mundo (si los orígenes son diversos) o en un gran mural en la pared, conectando las tarjetas con hilos o flechas que muestren que todos forman parte del mismo grupo.'
      }
    ],
    keyReflectionQuestions: [
      '¿Descubriste algo nuevo o sorprendente sobre el nombre de algún compañero?',
      '¿Cómo te sientes cuando pronuncian tu nombre correctamente y con respeto?',
      '¿Por qué nuestros nombres son una parte tan importante de nuestra identidad?'
    ]
  },
  {
    id: 'semaforo-palabras',
    title: 'El Semáforo de las Palabras',
    objective: 'Fomentar la empatía lingüística y prevenir el acoso escolar mediante la clasificación de palabras y expresiones en un "semáforo" emocional.',
    targetGrade: 'Todos los Niveles',
    duration: 40,
    category: 'reflexion',
    materials: [
      'Cartulinas grande de colores: roja, amarilla y verde',
      'Post-its y rotuladores',
      'Cinta adhesiva'
    ],
    steps: [
      {
        title: 'Construcción del Semáforo',
        duration: 5,
        description: 'El docente coloca las tres cartulinas en la pizarra. Verde: palabras que alegran y acogen. Amarillo: palabras que confunden o dependen del tono (pueden ser bromas pesadas). Rojo: palabras que ofenden, dañan o excluyen.'
      },
      {
        title: 'Lluvia de Palabras',
        duration: 20,
        description: 'Los estudiantes escriben en post-its palabras o frases reales que escuchan en el aula o el patio y las van pegando en el color correspondiente. Cada vez que pegan una, deben justificar brevemente el porqué.'
      },
      {
        title: 'Acuerdo de Aula',
        duration: 15,
        description: 'Se debate sobre las palabras en la zona roja y amarilla, y se redacta un compromiso de aula para multiplicar las palabras verdes y eliminar el vocabulario tóxico y los estereotipos.'
      }
    ],
    keyReflectionQuestions: [
      '¿Una palabra amarilla (broma) puede volverse roja? ¿Por qué?',
      '¿Cómo nos afecta escuchar palabras "rojas" de manera repetida todos los días?',
      '¿Qué podemos hacer activamente si alguien usa palabras "rojas" con nosotros o con otros?'
    ]
  },
  {
    id: 'mercado-saberes',
    title: 'El Mercado de Saberes',
    objective: 'Descentralizar el conocimiento y empoderar a los estudiantes demostrando que todos poseen talentos, tradiciones o conocimientos valiosos procedentes de sus familias o culturas.',
    targetGrade: 'Todos los Niveles',
    duration: 50,
    category: 'cooperativo',
    materials: [
      'Folios y bolígrafos',
      'Mesas organizadas por el aula en forma de "puestos"'
    ],
    steps: [
      {
        title: 'Inventario de Saberes',
        duration: 10,
        description: 'Cada alumno anota algo que sabe hacer bien y que no se suele enseñar en el colegio (ej: doblar origami, una receta típica de su familia, contar hasta 10 en otro idioma, un paso de baile, un truco de magia).'
      },
      {
        title: 'Montaje de Puestos',
        duration: 10,
        description: 'La mitad de la clase se sienta en las mesas preparando su "puesto" de enseñanza. La otra mitad actuará como "compradores de saberes".'
      },
      {
        title: 'El Mercado',
        duration: 20,
        description: 'Los compradores pasean libremente por el aula y se detienen en los puestos para aprender de sus compañeros. A los 10 minutos, se intercambian los roles (los vendedores pasan a ser compradores).'
      },
      {
        title: 'Cierre',
        duration: 10,
        description: 'Puesta en común grupal. Cada alumno comparte cuál ha sido el aprendizaje más interesante que se lleva del mercado.'
      }
    ],
    keyReflectionQuestions: [
      '¿Te sorprendió alguna habilidad oculta de tus compañeros?',
      '¿Cómo te sentiste al ser el "experto" que enseñaba algo a los demás?',
      '¿Por qué es importante valorar los aprendizajes de la vida cotidiana además de los académicos?'
    ]
  },
  {
    id: 'pasaporte-sin-fronteras',
    title: 'Pasaporte Sin Fronteras',
    objective: 'Promover la idea de ciudadanía global y empatizar con los conceptos de migración, pertenencia, fronteras y acogida.',
    targetGrade: 'Todos los Niveles',
    duration: 45,
    category: 'empatia',
    materials: [
      'Folios doblados a modo de "pasaporte"',
      'Lápices de colores y rotuladores',
      'Pegatinas o sellos de goma'
    ],
    steps: [
      {
        title: 'Creación del Pasaporte',
        duration: 15,
        description: 'Cada alumno diseña su propio pasaporte, inventando un "país propio" que represente sus gustos, valores y tradiciones. Dibuja la bandera de su país y anota sus costumbres principales.'
      },
      {
        title: 'Aduana de la Amistad',
        duration: 20,
        description: 'Los alumnos viajan por la clase pidiendo "entrar" a los países de los demás. El anfitrión le hace una pregunta sobre sí mismo (ej. "¿Cuál es tu comida favorita?") para dejarle entrar, y entonces le pone una pegatina o firma en su pasaporte a modo de "visado".'
      },
      {
        title: 'Reflexión Grupal',
        duration: 10,
        description: 'Se detiene el juego y se forma un círculo para dialogar sobre la experiencia de recibir a los demás y de ser aceptado en un nuevo lugar.'
      }
    ],
    keyReflectionQuestions: [
      '¿Cómo te sentiste cuando alguien te dio la bienvenida a su "país" con los brazos abiertos?',
      '¿Qué tienen en común la mayoría de nuestros países inventados?',
      '¿Por qué crees que las fronteras reales a veces separan a las personas en lugar de unirlas?'
    ]
  }
];

export const GLOSSARY_TERMS`;

content = content.replace(/\];\s*export const GLOSSARY_TERMS/, newActivities);
fs.writeFileSync('src/data.ts', content);
console.log("Added 4 new activities.");
