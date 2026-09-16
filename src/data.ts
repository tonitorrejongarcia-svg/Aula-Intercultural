/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity, GlossaryTerm, FAQItem } from './types';

export const INITIAL_ACTIVITIES: Activity[] = [

  {
    id: 'el-ovillo-de-lana',
    situations: [
      'Situación 1: Los estudiantes no se conocen bien a principio de curso o hay grupos cerrados.',
      'Situación 2: Falta conciencia de cómo las acciones individuales afectan a todo el grupo (falta de cohesión).'
    ],
    title: 'El Ovillo de Lana (La Red que nos Une)',
    objective: 'Visualizar de forma tangible las conexiones entre todos los miembros del aula y fomentar el sentido de pertenencia y comunidad.',
    targetGrade: 'Primaria',
    duration: 30,
    category: 'cohesion',
    materials: [
      'Un ovillo de lana gruesa de un color llamativo (rojo, amarillo, etc.).'
    ],
    steps: [
      {
        title: 'Formando el círculo',
        description: 'Todo el grupo se sienta en un círculo amplio en el suelo o en sillas, sin mesas de por medio. El docente explica que vamos a crear algo juntos.',
        duration: 5
      },
      {
        title: 'Tejiendo la red',
        description: 'El docente toma la punta del ovillo, dice su nombre y una cosa que le gusta hacer, o un saludo en un idioma que conozca. Luego lanza el ovillo a otro compañero, sin soltar su extremo. Quien lo recibe hace lo mismo y lo lanza a otro. Así hasta que todos sostienen un tramo del hilo.',
        duration: 15
      },
      {
        title: 'Tensión y conexión',
        description: 'Una vez formada la telaraña gigante, el docente pide a uno de los alumnos que tire suavemente del hilo o lo suelte. Se reflexiona sobre cómo los movimientos de uno repercuten en los demás, simbolizando el apoyo mutuo.',
        duration: 10
      }
    ],
    keyReflectionQuestions: [
      '¿Qué ha pasado cuando [Nombre] soltó el hilo? ¿Cómo nos afectó al resto?',
      '¿De qué manera nuestra clase se parece a esta red de lana?',
      '¿Cómo podemos asegurarnos de que la "red" de nuestra clase no se rompa durante el curso?'
    ],
    author: 'Equipo Aula Intercultural'
  },
  {
    id: 'las-gafas-magicas',
    situations: [
      'Situación 1: Los niños juzgan rápido a otros compañeros por su apariencia, su ropa o su comida.',
      'Situación 2: Dificultad para adoptar diferentes puntos de vista en conflictos de patio.'
    ],
    title: 'Las Gafas Mágicas de la Empatía',
    objective: 'Ayudar a los niños a entender que cada persona ve el mundo de forma diferente según su cultura y experiencia, y que todas las visiones son válidas.',
    targetGrade: 'Infantil',
    duration: 25,
    category: 'empatia',
    materials: [
      'Monturas de gafas sin cristales (pueden ser de cartón decoradas de colores distintos: rojas, azules, verdes).',
      'Láminas con imágenes ambiguas (ej. una mancha que puede parecer un animal o un árbol).'
    ],
    steps: [
      {
        title: 'Probando las gafas',
        description: 'Se reparten diferentes "gafas" de cartón a los niños. Se les explica que cuando se ponen las gafas rojas, se convierten en exploradores del espacio; si se ponen las verdes, son animales del bosque, etc.',
        duration: 10
      },
      {
        title: 'El mundo cambia de color',
        description: 'Se les muestra una imagen neutra o ambigua en la pizarra. Se pide a los niños que digan qué ven, recordando el personaje de sus "gafas". Se demuestra que una misma imagen puede significar cosas distintas dependiendo de quién la mire.',
        duration: 10
      },
      {
        title: 'Quitándonos las gafas',
        description: 'Se reflexiona (adaptado a su edad) sobre cómo en la vida real también llevamos "gafas invisibles" puestas por nuestra familia, nuestras costumbres y que por eso a veces nos gustan cosas diferentes.',
        duration: 5
      }
    ],
    keyReflectionQuestions: [
      '¿Todos hemos visto el mismo dibujo cuando teníamos puestas distintas gafas?',
      '¿Alguien se ha equivocado o todas las respuestas estaban bien?',
      '¿Qué podemos hacer si un amigo ve las cosas distintas a nosotros?'
    ],
    author: 'Equipo Aula Intercultural'
  },


  {
    id: 'el-pueblo-de-los-abrazos',
    situations: [
      'Situación 1: Niños de infantil se niegan a jugar con un compañero porque "habla raro" o usa palabras de otro idioma.',
      'Situación 2: Falta de integración de alumnos recién incorporados durante la asamblea.'
    ],
    title: 'El Pueblo de los Abrazos',
    objective: 'Fomentar la acogida, el contacto positivo y la integración de todos los miembros del aula sin importar sus diferencias.',
    targetGrade: 'Infantil',
    duration: 20,
    category: 'cohesion',
    materials: [
      'Música alegre y suave.',
      'Un títere o peluche que hace de "viajero".'
    ],
    steps: [
      {
        title: 'El viajero cansado',
        description: 'El docente presenta al títere "Viajero", que viene de muy lejos y está triste porque no conoce a nadie. Se pregunta a la asamblea: ¿Qué podemos hacer para que se sienta feliz aquí?',
        duration: 5
      },
      {
        title: 'El baile de los abrazos',
        description: 'Suena la música. Los niños bailan libremente por el aula. Cuando la música se detiene, el docente grita "¡Abrazo de 2!", "¡Abrazo de 3!", y los niños deben agruparse y abrazarse suavemente. El "Viajero" también recibe abrazos.',
        duration: 10
      },
      {
        title: 'El círculo gigante',
        description: 'En la última pausa musical, se grita "¡Abrazo de clase entera!". Todos forman un gran círculo cogidos de la cintura o los hombros. El Viajero dice que ya se siente en casa.',
        duration: 5
      }
    ],
    keyReflectionQuestions: [
      '¿Cómo se sentía el Viajero al principio? ¿Y al final?',
      '¿Nos gusta que nos den abrazos cuando llegamos a un sitio nuevo?',
      '¿Qué podemos decirle a un niño nuevo para que juegue con nosotros?'
    ],
    author: 'Equipo Aula Intercultural'
  },
  {
    id: 'el-diccionario-divertido',
    situations: [
      'Situación 1: Alumnos de primaria se ríen del acento o de las palabras que usan otros niños que vienen de distintos países hispanohablantes o que hablan otras lenguas en casa.',
      'Situación 2: Se percibe la diversidad lingüística como una barrera en lugar de como una riqueza.'
    ],
    title: 'El Diccionario Divertido de Nuestra Clase',
    objective: 'Valorar la diversidad lingüística y dialectal del aula, convirtiéndola en un juego de descubrimiento y aprendizaje cooperativo.',
    targetGrade: 'Primaria',
    duration: 40,
    category: 'artistico',
    materials: [
      'Una libreta grande o cuaderno de anillas (que será el diccionario físico).',
      'Fichas de cartulina pequeñas.',
      'Rotuladores y lápices de colores.'
    ],
    steps: [
      {
        title: 'Lluvia de palabras',
        description: 'El docente pregunta cómo se dicen cosas cotidianas en las casas de los niños (ej. "autobús" -> "guagua", "colectivo", "bus"; "niño" -> "chaval", "pibe", "chamo"). Se anotan en la pizarra.',
        duration: 10
      },
      {
        title: 'Ilustrando el significado',
        description: 'Se reparten cartulinas. En parejas o grupos pequeños, los niños escogen una de las palabras "nuevas" que han aprendido hoy. Escriben la palabra en grande, dibujan su significado y abajo ponen cómo se dice en la variante mayoritaria y quién se la ha enseñado.',
        duration: 20
      },
      {
        title: 'Encuadernando la riqueza',
        description: 'Las fichas se juntan y se meten en el gran "Diccionario Divertido". Este libro se quedará en la biblioteca del aula para consultarlo durante el curso. Se anima a ir añadiendo más palabras todo el año.',
        duration: 10
      }
    ],
    keyReflectionQuestions: [
      '¿Sabíamos que un mismo objeto puede tener tantos nombres diferentes y correctos?',
      '¿Qué sentimos cuando los demás aprenden y usan una palabra que es típica de nuestra familia?',
      '¿Por qué saber muchas palabras para una misma cosa nos hace más listos y comunicativos?'
    ],
    author: 'Equipo Aula Intercultural'
  },
  {
    id: 'el-baul-de-los-colores',
    situations: [
      'Situación 1: Niños y niñas en clase empiezan a usar la expresión "color carne" para referirse a un único tono de piel claro.',
      'Situación 2: Llega un alumno de un contexto cultural distinto y los demás muestran curiosidad o desconcierto por sus rasgos.'
    ],
    title: 'El Baúl de los Colores del Mundo',
    objective: 'Normalizar y celebrar la diversidad fenotípica (diferentes tonos de piel, cabello, etc.) desde la etapa de educación infantil, fomentando el respeto mutuo.',
    targetGrade: 'Infantil',
    duration: 30,
    category: 'empatia',
    materials: [
      'Cajas de ceras, lápices o témperas con una amplia gama de tonos piel (multiculturales).',
      'Papel continuo o cartulinas.',
      'Un espejo grande.'
    ],
    steps: [
      {
        title: 'Mirándonos al espejo',
        description: 'La actividad comienza sentando a los niños y niñas en círculo. El docente pasa un espejo grande para que cada niño se mire y describa qué ve: su color de ojos, la forma de su pelo, y el tono de su piel. Se enfatiza que todos somos diferentes y hermosos.',
        duration: 10
      },
      {
        title: 'Buscando nuestro tono',
        description: 'Se presenta "El Baúl de los Colores". El docente muestra la gama de ceras o pinturas con diferentes tonos de piel. Cada niño debe explorar y mezclar colores hasta encontrar el que más se parezca al de su propia mano o brazo.',
        duration: 10
      },
      {
        title: 'El mural de nuestras manos',
        description: 'Una vez que cada niño ha encontrado o mezclado su tono, pintan su mano y la plasman en el papel continuo (o la siluetean y colorean). Al final, se forma un mural colaborativo titulado "Las manos de nuestra clase".',
        duration: 10
      }
    ],
    keyReflectionQuestions: [
      '¿De qué color es tu piel? ¿Y la de tu compañero?',
      '¿Te imaginas si todas las flores o todos los animales fueran exactamente del mismo color? ¿Sería aburrido?',
      '¿Qué ocurre cuando juntamos todos nuestros colores en el mural?'
    ],
    author: 'Equipo Aula Intercultural'
  },
  {
    id: 'el-arbol-de-nuestras-raices',
    situations: [
      'Situación 1: En un grupo de primaria, los alumnos desconocen los orígenes de las familias de sus compañeros.',
      'Situación 2: Hay estudiantes que ocultan sus tradiciones familiares por miedo a no encajar o sufrir burlas.'
    ],
    title: 'El Árbol de Nuestras Raíces',
    objective: 'Reconocer y poner en valor la diversidad de orígenes familiares y culturales que componen el aula, promoviendo el orgullo por las propias raíces.',
    targetGrade: 'Primaria',
    duration: 45,
    category: 'cohesion',
    materials: [
      'Un mural grande con el tronco y ramas de un árbol vacío dibujado.',
      'Hojas de papel en forma de hoja de árbol (una por alumno).',
      'Colores, rotuladores y pegamento.'
    ],
    steps: [
      {
        title: 'La historia de los orígenes',
        description: 'El docente introduce la idea de que, al igual que los árboles, las personas tienen raíces que las sostienen (sus familias, sus lugares de procedencia, sus tradiciones). Cuenta una breve historia sobre sus propias "raíces".',
        duration: 10
      },
      {
        title: 'Decorando nuestra hoja',
        description: 'Cada alumno recibe una hoja de papel en blanco con forma de hoja de árbol. En ella, deben escribir o dibujar algo que represente sus raíces familiares: una palabra en su idioma o dialecto, la bandera de su región/país, una comida típica familiar o un juego tradicional.',
        duration: 20
      },
      {
        title: 'Nutriendo el árbol de la clase',
        description: 'Uno por uno, los estudiantes se acercan a pegar su hoja en las ramas del gran mural, explicando brevemente qué han dibujado. Se observa cómo el árbol se llena de hojas diversas.',
        duration: 15
      }
    ],
    keyReflectionQuestions: [
      '¿Cuántos lugares, idiomas o comidas diferentes hemos descubierto hoy en nuestra propia clase?',
      '¿Cómo hacen nuestras raíces familiares que este "árbol" (la clase) sea más fuerte y bonito?',
      '¿Por qué es importante respetar las raíces de los demás?'
    ],
    author: 'Equipo Aula Intercultural'
  },
  {
    id: 'la-maleta-intercultural',
    situations: [
      'Situación 1: Una alumna recién llegada de otro país no se comunica apenas. Usamos la maleta para que, sin requerir mucha fluidez oral, conecte visual y emocionalmente a través de sus objetos.',
      'Situación 2: El grupo está fuertemente fragmentado en "camarillas". Hacemos la maleta de forma cruzada (un alumno presenta los objetos vitales de otro) para forzar la escucha y la empatía mutua.'
    ],
    title: 'La Maleta Intercultural (Mi equipaje invisible)',
    objective: 'Fomentar el autoconocimiento cultural y empatizar con los procesos de migración o desapego material mediante objetos simbólicos que representan la identidad personal.',
    targetGrade: 'ESO',
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
    situations: [
      'Situación de choque 1: Un alumno desvía la mirada al suelo de forma sistemática cuando el profesor le riñe. El docente lo toma como actitud de pasotismo o desafío, pero en su cultura familiar es la mayor señal de respeto a la autoridad.',
      'Situación de choque 2: Las familias no asisten a la reunión escolar de las 17:00 porque en su concepción del tiempo (y por urgencias de pluriempleo precario) es ineludible, lo cual desde el colegio se juzga erróneamente como "falta de interés educativo".',
      'Situación de choque 3: Un grupo de alumnos parece estar discutiendo a gritos y de forma agresiva en el pasillo, pero en realidad están bromeando efusivamente en su idioma natal con un tono de voz culturalmente más alto.'
    ],
    title: 'El Iceberg de la Cultura',
    objective: 'Visibilizar que los aspectos más profundos y transformadores de la cultura (valores, roles relacionales, cosmovisión) no son apreciables a simple vista, combatiendo prejuicios basados únicamente en expresiones folclóricas o externas.',
    targetGrade: 'ESO',
    duration: 30,
    category: 'debate',
        practicalExamples: [
      'Cultura Visible (Punta): La gastronomía (ej. comer cuscús o arepas), la vestimenta tradicional, la música y los bailes, el idioma natal hablado en casa.',
      'Cultura Invisible (Sumergida): El concepto de familia (familia extensa vs. nuclear), la relación con el tiempo (puntualidad rígida vs. tiempo fluido), la forma de expresar emociones (contención vs. expresividad), los roles de género esperados.'
    ],
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
    situations: [
      'Escenario de orientación académica: Visibilizar por qué unos alumnos consideran ir a la universidad como algo "obvio" y otros lo ven como "imposible", ayudando a los primeros a entender su privilegio estructural.',
      'Escenario de integración social: Demostrar gráficamente al grupo por qué los compañeros que llegan con la etiqueta de "inmigrante" tienen barreras invisibles para acceder a los mismos grupos de amigos y al éxito social dentro del instituto.'
    ],
    title: 'Paso al Frente (Constelación de Oportunidades)',
    objective: 'Experimentar corporalmente las enormes diferencias de punto de partida social y administrativa existentes entre diversas identidades, propiciando la autorreflexión sobre la justicia distributiva y los privilegios ocultos.',
    targetGrade: 'ESO y Bachillerato',
    duration: 50,
    category: 'reflexion',
    practicalExamples: [
      'Privilegio económico: "Da un paso al frente si en tu casa nunca ha faltado calefacción en invierno o comida en la mesa."',
      'Privilegio social: "Da un paso al frente si tus padres tienen estudios universitarios y pudieron ayudarte con las tareas de pequeño."',
      'Privilegio racial/cultural: "Da un paso al frente si nunca has tenido que justificar tu nivel de idioma por tu aspecto físico."',
      'Privilegio de seguridad: "Da un paso al frente si nunca te han mirado con sospecha los dependientes o guardias al entrar a una tienda."'
    ],
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
        description: 'El educador lee en voz alta, de forma solemne, una serie de condiciones cotidianas de vida. Tras escuchar cada frase, el alumno dará un paso adelante generoso SÓLO si siente que su personaje goza de esa facilidad de manera incuestionable. En caso de duda o si el personaje enfrenta problemas significativos con esa frase, debe permanecer clavado en el sitio. Ejemplos de frases:\n1. "Puedo alquilar un piso para vivir o abrir una cuenta bancaria sin que sospechen de mí por mis apellidos o mi cara".\n2. "En los libros de historia que estudio en mi colegio/instituto, la historia y aportaciones de mi grupo social se retratan con asiduo respeto y rigor".\n3. "Nunca temo que las fuerzas del orden me soliciten la identificación de forma aleatoria por la calle debido a mi fenotipo".\n4. "Si enfermo de gravedad de un día para otro, tengo garantizado un acceso rápido y gratuito al sistema de salud estatal".\n5. "Sé que mi orientación afectiva o creencia espiritual no pondrá en peligro mi integridad física en público".',
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
    situations: [
      'Contexto 1: Se ha corrido un fuerte rumor por el instituto de que los alumnos de cierta nacionalidad "reciben becas y ayudas de comedor gratis sin cumplir requisitos mientras los de aquí pagan". Usar esta dinámica para desmontar mecánicamente cómo nacen y engordan esos bulos de pasillo.',
      'Contexto 2: Hay tensión barrial tras un incidente menor magnificado por la prensa local. Reproducir el mecanismo de magnificación en el aula con la actividad.'
    ],
    title: 'El Teléfono Estropeado del Prejuicio',
    objective: 'Demostrar mediante una dinámica empírica en tiempo real cómo las noticias cotidianas, comentarios de pasillo y opiniones sociales se tergiversan por la acción de estereotipos inconscientes que rellenan huecos de información.',
    targetGrade: 'Todos los Niveles',
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
  },

  {
    id: 'res-conflictos-1',
    situations: [
      'Conflicto A (Ciberacoso velado): Un grupo de WhatsApp de la clase donde se envían recurrentemente stickers y burlas sobre los rasgos físicos, el acento o la religión de un estudiante en particular.',
      'Conflicto B (Violencia física): Pelea en el patio desencadenada por un insulto racista (ej: "vete a tu país") durante una disputa arbitral en un partido de fútbol.',
      'Conflicto C (Aislamiento): Una alumna que, tras un viaje a su país de origen en verano, empieza a usar el hiyab o ropa tradicional y repentinamente es ignorada por su grupo de amigas habitual.'
    ],
    title: 'El Círculo Restaurativo',
    objective: 'Abordar conflictos latentes en el aula mediante la escucha activa, fomentando la empatía y la reparación del daño sin un enfoque puramente punitivo.',
    targetGrade: 'Todos los Niveles',
    duration: 45,
    category: 'resolucion-conflictos',
    materials: [
      'Espacio diáfano',
      'Objeto de la palabra (pelota suave, figura de madera)'
    ],
    practicalExamples: [
      'Situación conflictiva 1: Se ha descubierto un grupo de WhatsApp donde varios alumnos se burlan reiteradamente del acento o las costumbres alimenticias de un compañero recién llegado.',
      'Situación conflictiva 2: Exclusión sistemática durante los recreos o los trabajos en grupo hacia un perfil específico del aula, justificándolo en que "son diferentes" o "no saben cómo trabajamos aquí".',
      'Formulación restaurativa: "Yo me sentí muy vulnerable cuando vi esos mensajes porque creía que este instituto era un lugar seguro" (en lugar de "Vosotros sois unos racistas por hacer eso").'
    ],
    steps: [
      {
        title: 'Sentarse en Círculo',
        duration: 5,
        description: 'Despejar las mesas y sentarse en círculo. El círculo simboliza igualdad, nadie está por encima de nadie y todos se ven a los ojos.'
      },
      {
        title: 'Ronda de Apertura',
        duration: 10,
        description: 'El facilitador introduce la situación conflictiva de forma neutral (sin culpabilizar). Se pasa el objeto de la palabra: solo puede hablar quien lo sostiene.'
      },
      {
        title: 'Ronda de Impacto',
        duration: 15,
        description: 'Quien tiene el objeto expresa exclusivamente cómo se ha sentido con el conflicto, usando frases que empiecen por "Yo sentí..." en lugar de "Tú hiciste...".'
      },
      {
        title: 'Búsqueda de Soluciones',
        duration: 10,
        description: 'Nueva ronda donde se proponen ideas viables para reparar el daño causado y evitar que vuelva a suceder.'
      },
      {
        title: 'Cierre y Compromisos',
        duration: 5,
        description: 'Se resumen los acuerdos alcanzados y cada participante expresa una palabra sobre cómo se va del círculo.'
      }
    ],
    keyReflectionQuestions: [
      '¿Qué diferencias has notado entre hablar con el objeto y hablar en un debate normal?',
      '¿De qué manera el enfoque restaurativo es mejor que un castigo tradicional?',
      '¿Qué ha sido lo más difícil de expresar hoy?'
    ]
  },
  {
    id: 'analisis-medios-1',
    situations: [
      'Situación de análisis 1: Cobertura mediática asimétrica sobre la llegada de refugiados. Analizar cómo se cubre el perfil de refugiados europeos frente a los refugiados procedentes del África subsahariana.',
      'Situación de análisis 2: El uso indiscriminado del acrónimo "MENA" (Menores Extranjeros No Acompañados) en discursos políticos deshumanizantes y cómo cala en los insultos entre alumnos en el centro.',
      'Situación de análisis 3: Titulares sobre sucesos locales (peleas de fin de semana) donde la prensa subraya en negrita la nacionalidad del implicado SOLO si no es de origen nacional.'
    ],
    title: 'Cazadores de Sesgos en Titulares',
    objective: 'Desarrollar el pensamiento crítico analizando cómo el lenguaje mediático y las redes sociales construyen narrativas sobre la migración.',
    targetGrade: 'ESO y Bachillerato',
    duration: 55,
    category: 'analisis-medios',
    materials: [
      'Recortes de noticias o capturas de tuits reales (mezclando enfoques éticos y sensacionalistas)',
      'Rotuladores de colores',
      'Pizarra o papelógrafo'
    ],
    practicalExamples: [
      'Titular real (Sensacionalista): "Avalancha de menas ilegales colapsa los servicios de la ciudad desatando el pánico vecinal."',
      'Reescritura ética propuesta: "Llegada numerosa de menores extranjeros no acompañados evidencia la necesidad de reforzar los recursos de acogida municipal."',
      'Tuit desinformativo: "Nos quitan todas las ayudas, mientras las familias de aquí no llegan a fin de mes. #Invasión"',
      'Metodología: Se pedirá a los alumnos que detecten las "palabras alarma" (avalancha, invasión, colapso) que buscan activar el miedo visceral en el cerebro.'
    ],
    steps: [
      {
        title: 'Distribución',
        duration: 10,
        description: 'Formar grupos de 4 personas. Repartir 3 o 4 titulares/tuits impresos a cada grupo que traten el mismo evento migratorio.'
      },
      {
        title: 'Disección del Lenguaje',
        duration: 15,
        description: 'Los grupos subrayan con colores diferentes: palabras alarma (avalancha, plaga, ilegal), sujetos omitidos, e informaciones objetivas vs. emocionales.'
      },
      {
        title: 'Reescritura Ética',
        duration: 15,
        description: 'Se pide a cada grupo que tome el titular más sensacionalista y lo reescriba basándose en la ética periodística y los derechos humanos.'
      },
      {
        title: 'Exposición',
        duration: 15,
        description: 'Cada grupo lee el titular original y su propuesta reescrita. Se debate brevemente el impacto social de cada uno.'
      }
    ],
    keyReflectionQuestions: [
      '¿Por qué crees que algunos medios usan palabras relacionadas con desastres naturales (ej. oleada, avalancha) para hablar de personas?',
      '¿Qué emociones busca despertar el sensacionalismo?',
      '¿Cómo podemos protegernos de la desinformación en redes sociales?'
    ]
  },
  {
    id: 'artistico-1',
    situations: [
      'Día de la Paz o Día de la Diversidad Cultural: Hacer la dinámica en un formato gigante en el pasillo central, involucrando a todos los cursos para hacer una composición kilométrica.',
      'Primeros días de curso (Tutoría): Muy útil en un grupo de 1º de ESO (donde los alumnos proceden de distintos colegios y países y hay ansiedad por encajar) para construir una identidad de aula de forma rápida y poco intimidatoria.'
    ],
    title: 'Mural Colectivo: Nuestras Raíces',
    objective: 'Reconocer y valorar la diversidad cultural del aula a través de la expresión plástica, creando una obra conjunta que represente la identidad del grupo.',
    targetGrade: 'ESO',
    duration: 60,
    category: 'artistico',
    materials: [
      'Papel continuo o lienzo grande',
      'Pinturas, rotuladores, revistas para collage',
      'Tijeras y pegamento'
    ],
    practicalExamples: [
      'Fragmento 1: Un alumno dibuja la receta favorita de su abuela marroquí con caligrafía árabe.',
      'Fragmento 2: Una alumna recorta de una revista un plato típico andaluz y lo rodea con acordes de guitarra.',
      'Fragmento 3: Un alumno dibuja el monte de su región natal en Europa del Este, mezclado con el skyline de la ciudad actual.',
      'Metáfora final: El mural demostrará que aunque ningún trozo de papel se parece al otro, al pegarlos juntos forman una composición vibrante donde todos encajan.'
    ],
    steps: [
      {
        title: 'Reflexión Individual',
        duration: 10,
        description: 'Cada alumno piensa en un símbolo, color o imagen que represente su origen, sus gustos o la cultura de su familia.'
      },
      {
        title: 'Creación del Fragmento',
        duration: 20,
        description: 'Los alumnos dibujan o crean mediante collage su elemento representativo en un trozo de papel individual.'
      },
      {
        title: 'Ensamblaje del Mural',
        duration: 20,
        description: 'En grupo, deciden cómo unir todos los fragmentos en el papel continuo para que formen una composición cohesionada y pegan sus obras.'
      },
      {
        title: 'Presentación',
        duration: 10,
        description: 'El mural se cuelga en el aula o pasillo. Cada estudiante explica brevemente qué aportó y por qué.'
      }
    ],
    keyReflectionQuestions: [
      '¿Fue difícil encontrar una forma de unir todas las piezas tan diferentes?',
      '¿Qué nos dice este mural sobre nuestra clase?',
      '¿Cómo cambia la obra si quitáramos alguna de las piezas?'
    ]
  },
  {
    id: 'cooperativo-1',
    situations: [
      'Situación de clase pasiva/parásita: Grupos donde existe la costumbre tóxica de que solo uno o dos trabajen mientras los demás miran. Esta técnica fuerza a que todos tengan un rol crítico y deban ejercer de profesores del resto.',
      'Revisión del temario oficial: En lugar de que el profesor imparta una clase magistral unidireccional sobre las aportaciones científicas o literarias de otras culturas (árabes, chinas, africanas precoloniales), la clase misma debe desentrañarlas.'
    ],
    title: 'El Rompecabezas (Técnica Jigsaw)',
    objective: 'Fomentar la interdependencia positiva y la cooperación, demostrando que todos los miembros del grupo son indispensables para el éxito.',
    targetGrade: 'Todos los Niveles',
    duration: 50,
    category: 'cooperativo',
    materials: [
      'Textos sobre diferentes culturas del mundo divididos en fragmentos',
      'Fichas de trabajo'
    ],
    practicalExamples: [
      'Tema global: Aportaciones históricas ocultadas por el eurocentrismo.',
      'Fragmento para el Experto A: Las matemáticas y la medicina avanzadas en la Edad de Oro del Islam.',
      'Fragmento para el Experto B: Los sistemas democráticos complejos de asamblea y consenso en las tribus indígenas norteamericanas antes de la colonización.',
      'Fragmento para el Experto C: Las redes comerciales matriarcales africanas y su papel estabilizador.',
      'Dinámica: Si el Experto A no explica bien su parte al grupo base, nadie del grupo podrá responder la pregunta final sobre el impacto matemático del Islam, forzando la ayuda mutua.'
    ],
    steps: [
      {
        title: 'Grupos Base',
        duration: 5,
        description: 'Se divide a la clase en grupos de 4-5 personas (Grupos Base). A cada miembro se le asigna un fragmento de un texto distinto.'
      },
      {
        title: 'Grupos de Expertos',
        duration: 15,
        description: 'Los alumnos de diferentes grupos que tienen el mismo fragmento se reúnen para leerlo, entenderlo y preparar cómo explicarlo a sus compañeros.'
      },
      {
        title: 'Retorno al Grupo Base',
        duration: 20,
        description: 'Los alumnos regresan a su Grupo Base. Cada uno explica su parte al resto. Tienen que tomar notas porque al final hay una tarea sobre el texto completo.'
      },
      {
        title: 'Tarea Conjunta',
        duration: 10,
        description: 'El grupo resuelve un cuestionario o debate sobre el texto completo basándose en las explicaciones de sus "expertos".'
      }
    ],
    keyReflectionQuestions: [
      '¿Qué ocurre si un experto no explica bien su parte?',
      '¿Cómo te sentiste al ser responsable de que los demás aprendieran algo?',
      '¿Cómo se aplica esta dependencia mutua a la convivencia en la sociedad real?'
    ]
  },
  {
    id: 'juego-de-roles-1',
    situations: [
      'Escena 1 (Comedor/Cafetería): Un alumno lleva un almuerzo tradicional muy especiado o visualmente distinto. Dos compañeros empiezan a hacer gestos ostensibles de asco y a decir en alto que "eso huele mal".',
      'Escena 2 (Trabajo en grupo): Un alumno de origen extranjero con un nivel de idioma en desarrollo se queda sin pareja. Cuando el profesor pide a un grupo que lo integren, un líder contesta: "Es que nos va a retrasar y bajará la nota".',
      'Escena 3 (Educación Física): Durante la elección libre de equipos para baloncesto, un estudiante asiático es sistemáticamente el último elegido o ignorado por prejuicios absurdos sobre su complexión y capacidad deportiva.'
    ],
    title: 'Teatro Fórum: El Nuevo del Instituto',
    objective: 'Desarrollar empatía y entrenar habilidades de intervención activa (bystander intervention) frente a situaciones de exclusión.',
    targetGrade: 'ESO',
    duration: 50,
    category: 'juego-de-roles',
    materials: [
      'Tarjetas con los roles (Agresor, Víctima, Espectador Pasivo, Defensor)',
      'Espacio despejado simulando el patio o la cafetería'
    ],
    practicalExamples: [
      'El Agresor Principal: Basa su humor en ridiculizar el almuerzo tradicional (tupper) que ha traído la víctima.',
      'Los Secuaces: No inician la burla, pero ríen sonoramente las gracias del agresor para encajar.',
      'La Víctima: Un alumno con distinto origen cultural que intenta encogerse y pasar desapercibido.',
      'El Espectador Pasivo: Está sentado en el mismo banco, le resulta incómodo, pero mira el móvil fingiendo no enterarse.',
      'Estrategia Defensora (a ensayar por el público): Acercarse a la víctima e invitarle a jugar a otro lado, ignorando activamente al agresor en lugar de iniciar una pelea frontal con él.'
    ],
    steps: [
      {
        title: 'Planteamiento de la Escena',
        duration: 10,
        description: 'Se asignan los roles a voluntarios. Se describe la situación: Un alumno nuevo (con acento distinto o aspecto diferente) es excluido de un grupo en el recreo.'
      },
      {
        title: 'Primera Actuación',
        duration: 10,
        description: 'Los actores representan la escena hasta el punto de conflicto máximo y luego se congelan. El Espectador Pasivo no hace nada.'
      },
      {
        title: 'Intervención del Público',
        duration: 20,
        description: 'Los alumnos del público pueden decir "¡Stop!", entrar en la escena y sustituir al Espectador o al Defensor para probar una estrategia diferente para solucionar el problema.'
      },
      {
        title: 'Debate Final',
        duration: 10,
        description: 'Se evalúan las estrategias que funcionaron mejor y las que empeoraron la situación.'
      }
    ],
    keyReflectionQuestions: [
      '¿Qué sentiste al estar en el papel de la víctima frente a la inacción de los demás?',
      '¿Por qué a veces es tan difícil intervenir cuando vemos una injusticia?',
      '¿Cuál fue la estrategia de defensa más efectiva y menos violenta?'
    ]
  },
  {
    id: 'literatura-cine-1',
    situations: [
      'Situación A: En el aula se detectan discursos xenófobos que los alumnos repiten como loros calcados de su hogar ("nos quitan el trabajo", "colapsan los hospitales"). Se usa un cortometraje empático y realista para contrarrestar los fríos datos estadísticos.',
      'Situación B: Choques intergeneracionales. Se visiona material sobre el desgarro de los hijos de migrantes (segunda generación) que sufren la presión de la cultura estricta del hogar frente a la cultura normativa de los pares en la calle.'
    ],
    title: 'Cinefórum: Identidades Cruzadas',
    objective: 'Utilizar narrativas audiovisuales para generar un espacio seguro de debate sobre identidad, pertenencia y choques culturales.',
    targetGrade: 'ESO y Bachillerato',
    duration: 60,
    category: 'literatura-cine',
    materials: [
      'Proyector y equipo de sonido',
      'Selección de un cortometraje o escena de película (ej. "Binta y la gran idea", "El Bola", o escenas de choque cultural)',
      'Guión de preguntas'
    ],
    practicalExamples: [
      'Cortometraje 1: "Binta y la gran idea" (Javier Fesser). Ideal para contrastar los valores de progreso, ecología y desarrollo entre Europa y una aldea de Senegal, rompiendo el paternalismo.',
      'Escena fílmica: Fragmento de la película "Crash" (colisión) donde el policía cachea injustamente a un ciudadano negro frente a su esposa, generando tensión por los estereotipos.',
      'Documental: "Astral" (Salvados). Visualización del rescate de migrantes en el Mediterráneo, ideal para trabajar el contraste de las barreras marítimas invisibles.'
    ],
    steps: [
      {
        title: 'Introducción',
        duration: 5,
        description: 'El docente presenta brevemente la obra audiovisual y pide a los alumnos que presten especial atención a los conflictos internos de los personajes.'
      },
      {
        title: 'Proyección',
        duration: 25,
        description: 'Visionado ininterrumpido del cortometraje o fragmento seleccionado.'
      },
      {
        title: 'Reacciones Iniciales',
        duration: 10,
        description: 'Ronda rápida de una palabra: cada estudiante dice una emoción o idea que le ha provocado el vídeo.'
      },
      {
        title: 'Debate Dirigido',
        duration: 20,
        description: 'El docente guía el diálogo enfocándose en la perspectiva del otro, los malentendidos culturales y las barreras invisibles mostradas en pantalla.'
      }
    ],
    keyReflectionQuestions: [
      '¿Con qué personaje te has sentido más identificado y por qué?',
      '¿Qué barreras invisibles (no físicas) impedían la comunicación en la historia?',
      '¿Qué final alternativo propondrías para resolver el conflicto de forma pacífica y justa?'
    ]
  }

,
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
,
  {
    word: 'Alteridad',
    definition: 'Principio filosófico y antropológico de alternancia, es decir, el descubrimiento, reconocimiento y respeto pleno del "otro" como un individuo distinto con sus propias características, derechos, dignidad y capacidad discursiva.',
    etymology: 'Del latín "alteritas", derivado de "alter" (el otro de dos).',
    pedagogicalTip: 'Para trabajarla en el aula, pide a los alumnos que adopten un punto de vista diametralmente opuesto al suyo en un debate, fomentando así la empatía profunda y la comprensión de visiones alternativas.'
  },
  {
    word: 'Apropiación Cultural',
    definition: 'Uso, adopción o mercantilización de elementos distintivos (vestimenta, símbolos sagrados, expresiones artísticas) de una cultura minoritaria por parte de miembros de la cultura dominante, frecuentemente vaciándolos de su significado original y sin dar crédito ni beneficio a sus creadores.',
    pedagogicalTip: 'Genera un debate sobre dónde está el límite entre la apreciación cultural genuina (respetuosa y con contexto) y la apropiación comercial o caricaturesca.'
  },
  {
    word: 'Aporofobia',
    definition: 'Miedo, rechazo, aversión o discriminación manifiesta hacia las personas en situación de pobreza o extrema vulnerabilidad económica.',
    etymology: 'Término acuñado por Adela Cortina, del griego "áporos" (pobre, sin recursos) y "phóbos" (miedo o rechazo).',
    pedagogicalTip: 'Compara con la xenofobia en clase: ¿Se recibe igual a un extranjero que viene como turista o inversor que a uno que llega huyendo de la pobreza?'
  },
  {
    word: 'Decolonialidad',
    definition: 'Enfoque crítico que busca visibilizar y desmontar las jerarquías de poder, conocimiento y de ser que fueron impuestas durante el colonialismo histórico y que continúan vigentes en la actualidad, condicionando cómo valoramos unos saberes por encima de otros.',
    pedagogicalTip: 'Revisa con los alumnos los mapas del mundo habituales o los libros de historia para buscar cómo ciertos eventos solo se narran desde una perspectiva europea.'
  },
  {
    word: 'Estereotipo',
    definition: 'Imagen, creencia o representación mental simplificada y exagerada que se aplica a todos los miembros de un determinado grupo social, asumiendo que todos comparten características idénticas (ya sean positivas o negativas).',
    etymology: 'Del griego "stereós" (sólido) y "typos" (molde, marca).',
    pedagogicalTip: 'Haz que los alumnos analicen cómo las películas, series o videojuegos perpetúan los estereotipos de distintas nacionalidades o etnias.'
  },
  {
    word: 'Interseccionalidad',
    definition: 'Marco de análisis que examina cómo las diferentes categorías de identidad social (raza, género, clase social, orientación sexual, diversidad funcional) se superponen y entrelazan, creando sistemas únicos y complejos de discriminación o privilegio.',
    pedagogicalTip: 'Muestra que no es lo mismo sufrir discriminación por ser mujer, que por ser mujer, migrante y de bajos recursos económicos (opresión multiplicada).'
  },
  {
    word: 'Micromachismos / Microagresiones',
    definition: 'Comentarios, gestos, actitudes o preguntas sutiles del día a día (muchas veces inconscientes o en tono de broma) que comunican prejuicios o menosprecios hacia grupos históricamente marginados.',
    pedagogicalTip: 'Analiza frases comunes como "¿Y de dónde eres de verdad?" (a personas racializadas nacidas en el país), para entender cómo invalidan la identidad ajena.'
  },
  {
    word: 'Privilegio',
    definition: 'Ventaja sistémica, inmunidad o derecho especial que disfruta un individuo o grupo debido a su pertenencia a una categoría social dominante (por ejemplo, el privilegio blanco o el privilegio de clase), a menudo sin ser consciente de ello.',
    etymology: 'Del latín "privilegium" (ley privada).',
    pedagogicalTip: 'Haz la dinámica del "paso adelante" (privilege walk) donde los alumnos dan pasos según ventajas de cuna que no eligieron.'
  },
  {
    word: 'Tolerancia',
    definition: 'Capacidad de permitir y respetar las ideas, creencias o prácticas de los demás cuando son diferentes o contrarias a las propias. En el marco de la interculturalidad, se considera a menudo un término insuficiente (aguantar al diferente) frente al "respeto" y la "convivencia activa".',
    etymology: 'Del latín "tolerare" (soportar, aguantar).',
    pedagogicalTip: 'Pregunta en clase: ¿Te gusta que te toleren o prefieres que te respeten y valoren?'
  }
,
  {
    word: 'Biculturalismo',
    definition: 'Capacidad de un individuo o grupo para interactuar de forma competente y fluida en dos culturas diferentes, integrando valores y prácticas de ambas sin perder la identidad de ninguna.',
    pedagogicalTip: 'Pide a los estudiantes bilingües o con familias de otros países que compartan cómo adaptan su comportamiento o lenguaje dependiendo de si están en casa o en el instituto.'
  },
  {
    word: 'Choque Cultural',
    definition: 'Sentimiento de desorientación, ansiedad o confusión que experimenta una persona al enfrentarse a un entorno cultural, normas y expectativas totalmente distintas a las suyas.',
    pedagogicalTip: 'Plantea juegos de rol donde los alumnos visiten un "país inventado" con normas sociales invertidas (ej. saludar dando la espalda) para que experimenten ese desconcierto.'
  },
  {
    word: 'Diversidad',
    definition: 'Multiplicidad de formas en que se expresan las culturas, grupos y sociedades, abarcando no solo la etnia, sino también el género, la neurodiversidad, la orientación sexual y el origen socioeconómico.',
    etymology: 'Del latín "diversitas" (abundancia, variedad).',
    pedagogicalTip: 'Haz hincapié en que la diversidad no es "lo diferente a lo normal", sino que la norma misma es diversa.'
  },
  {
    word: 'Fenotipo',
    definition: 'Conjunto de rasgos físicos o características observables de un individuo (color de piel, forma del cabello, estatura). En ciencias sociales, es clave para entender que la "raza" biológica no existe en humanos, aunque la lectura social de los fenotipos sí genera racismo.',
    etymology: 'Del griego "phainein" (mostrar) y "typos" (marca).',
    pedagogicalTip: 'Cruza este concepto con Biología: explícales que hay más diferencia genética entre dos grupos de chimpancés vecinos que entre un humano noruego y uno senegalés.'
  },
  {
    word: 'Globalización Hegemónica',
    definition: 'Proceso de interconexión mundial que, en lugar de fomentar un intercambio equitativo, impone un modelo cultural, económico y lingüístico (generalmente anglocéntrico u occidental) como el único válido, desplazando saberes locales.',
    pedagogicalTip: 'Pídeles que revisen la ropa que llevan puesta, la música que escuchan y las series que ven, y mapeen de qué países provienen para visualizar esta hegemonía.'
  },
  {
    word: 'Hegemonía Cultural',
    definition: 'Concepto desarrollado por Antonio Gramsci que describe cómo el grupo dominante en una sociedad logra que sus propios valores, creencias y cosmovisión sean aceptados por los demás como el "sentido común" o la norma natural.',
    etymology: 'Del griego "hegemonía" (dirección, jefatura).',
    pedagogicalTip: 'Pregunta: ¿Por qué el color "carne" de los lápices tradicionales era siempre rosa pálido? Ese es un microejemplo de hegemonía.'
  },
  {
    word: 'Identidad Cultural',
    definition: 'Sentido de pertenencia a un grupo social con el que se comparten rasgos culturales, costumbres, valores y creencias. Es dinámica, mutable y puede ser múltiple.',
    pedagogicalTip: 'Propón que dibujen un "árbol de identidad" donde las raíces sean su origen, el tronco su situación actual, y las ramas los distintos grupos a los que pertenecen (gamers, deportistas, su barrio).'
  },
  {
    word: 'Justicia Epistémica',
    definition: 'Reconocimiento y valoración de los conocimientos, narrativas y formas de entender el mundo de grupos históricamente marginados, tratándolos con el mismo rigor y respeto que al conocimiento académico occidental.',
    pedagogicalTip: 'Cuestiona las fuentes en los trabajos de investigación: ¿Siempre citamos a autores europeos y masculinos? Intenta incluir pensadoras del Sur Global.'
  },
  {
    word: 'Lenguaje Inclusivo',
    definition: 'Uso consciente del lenguaje y del vocabulario para evitar sesgos, invisibilización o expresiones denigratorias hacia cualquier grupo social, promoviendo una comunicación equitativa y respetuosa.',
    pedagogicalTip: 'Analiza con ellos artículos de prensa deportiva para ver cómo se narra el éxito masculino (como proeza técnica) vs. el éxito femenino (a menudo centrado en aspectos emocionales o físicos).'
  },
  {
    word: 'Minoría Social',
    definition: 'Grupo de personas que, debido a sus características físicas, culturales o de origen, se encuentran en una posición de subordinación, desventaja o vulnerabilidad frente al grupo dominante. (No tiene por qué ser una minoría numérica; las mujeres son la mitad de la población pero pueden sufrir dinámicas de minoría social).',
    pedagogicalTip: 'Analiza el caso de Sudáfrica durante el Apartheid: la población negra era la abrumadora mayoría demográfica, pero operaba como "minoría social" sin poder.'
  },
  {
    word: 'Neocolonialismo',
    definition: 'Forma moderna de control indirecto que ejercen las potencias económicas sobre otros países (frecuentemente antiguas colonias) a través del mercado, la deuda externa o el imperialismo cultural, sin necesidad de ocupación militar directa.',
    pedagogicalTip: 'Debate sobre cómo el modelo de "ayuda al desarrollo" o la extracción de materias primas para tecnología (coltán) perpetúa estas dinámicas de poder.'
  },
  {
    word: 'Orientalismo',
    definition: 'Conjunto de representaciones estereotipadas, prejuicios y exotizaciones construidas desde Occidente sobre las culturas de Oriente (especialmente el mundo árabe y asiático), retratándolas frecuentemente como irracionales, atrasadas o misteriosas frente a un Occidente "civilizado".',
    etymology: 'Término popularizado por el académico palestino-estadounidense Edward Said.',
    pedagogicalTip: 'Analiza con los alumnos cómo se representa a los villanos o a los "pueblos salvajes" en películas de Hollywood o videojuegos populares.'
  },
  {
    word: 'Plurilingüismo',
    definition: 'Capacidad de una persona o de una comunidad de convivir y utilizar múltiples idiomas de forma cotidiana, reconociéndolos como un activo intelectual y social fundamental, no como una barrera.',
    pedagogicalTip: 'Haz un mapa de idiomas en tu aula: descubrirás lenguas que los alumnos hablan en casa (árabe, rumano, wólof, quechua) y que a menudo ocultan por miedo al estigma.'
  },
  {
    word: 'Racialización',
    definition: 'Proceso sociológico mediante el cual a un grupo humano específico se le atribuyen características "raciales" inventadas por la sociedad dominante para justificar su explotación, exclusión o discriminación.',
    pedagogicalTip: 'Aclara que "nadie nace siendo una raza", sino que la sociedad te "racializa" según la época y el lugar. (Ej. los irlandeses no eran considerados "blancos" en EE.UU. en el siglo XIX).'
  },
  {
    word: 'Segregación',
    definition: 'Separación física, espacial, institucional o social de un grupo humano por motivos étnicos, económicos o religiosos. Puede ser impuesta por ley (como el Apartheid) o darse de facto (como barrios gueto).',
    etymology: 'Del latín "segregare" (separar del rebaño).',
    pedagogicalTip: 'Muestra a tus estudiantes un mapa de vuestra propia ciudad marcando la renta media y el origen del alumnado en cada centro escolar; a menudo descubrirán la segregación "invisible".'
  },
  {
    word: 'Universalismo',
    definition: 'Doctrina o tendencia que defiende que ciertos valores, derechos y conceptos son aplicables a todos los seres humanos por igual. Desde una perspectiva crítica intercultural, a menudo denuncia que lo que llamamos "universal" es solo la cultura occidental impuesta a los demás.',
    pedagogicalTip: 'Debate la Declaración de Derechos Humanos: ¿Están todas las culturas representadas en su redacción original, o prioriza la visión individualista europea sobre la visión comunitaria indígena?'
  },
  {
    word: 'Visibilización',
    definition: 'Acción consciente y deliberada de sacar a la luz, dar voz y espacio público a individuos, realidades, culturas o contribuciones que han sido sistemáticamente ocultadas, ignoradas o borradas por los relatos oficiales.',
    pedagogicalTip: 'Celebra efemérides "ocultas", como el Año Nuevo Chino, el Ramadán o el Día del Pueblo Gitano, integrándolas en las actividades normales y no como meras anécdotas.'
  },
  {
    word: 'Zonas de Contacto',
    definition: 'Espacios sociales, aulas, plazas o instituciones donde culturas dispares se encuentran, chocan y se entrelazan. A menudo son espacios caracterizados por relaciones de poder asimétricas y tensiones, pero también de gran creatividad cultural.',
    etymology: 'Concepto clave acuñado por la lingüista Marie Louise Pratt.',
    pedagogicalTip: 'Plantea el propio instituto como una "zona de contacto". ¿Qué tensiones existen en el patio? ¿Cómo se resuelven o ignoran esas fricciones?'
  }
,
  {
    word: 'Aula Inclusiva',
    definition: 'Espacio educativo estructurado y gestionado de manera que todo el alumnado, independientemente de su origen, capacidad, género o situación socioeconómica, se sienta valorado, participe activamente y alcance su máximo potencial. Implica la eliminación de barreras al aprendizaje y a la participación.',
    pedagogicalTip: 'Evalúa tu aula: ¿están representadas diversas culturas en los materiales visuales y las lecturas? ¿Se fomentan dinámicas de colaboración donde todos puedan aportar desde sus fortalezas?'
  },
  {
    word: 'Convivencia',
    definition: 'Capacidad de coexistir de manera pacífica, respetuosa y solidaria con otras personas y grupos en un mismo espacio social. En el contexto intercultural, exige un esfuerzo activo por conocer, comprender y negociar los conflictos de forma constructiva, superando la mera tolerancia.',
    etymology: 'Del latín "convivere" (vivir en compañía de otros).',
    pedagogicalTip: 'Fomenta la creación de normas de aula de forma participativa, donde los alumnos acuerden cómo quieren relacionarse y resolver sus desacuerdos.'
  },
  {
    word: 'Costumbres',
    definition: 'Conjunto de prácticas, hábitos y tradiciones compartidas por una comunidad que regulan su comportamiento y le otorgan identidad. Las costumbres no son estáticas; evolucionan con el tiempo y el contacto con otras culturas.',
    etymology: 'Del latín "consuetudo" (hábito, uso).',
    pedagogicalTip: 'Anima a los estudiantes a compartir una costumbre familiar (culinaria, festiva, de saludo) y debatir cómo cambian estas prácticas entre distintas generaciones.'
  },
  {
    word: 'Derechos Humanos',
    definition: 'Principios universales, inalienables e indivisibles que garantizan la dignidad, libertad e igualdad de todas las personas, sin distinción de nacionalidad, origen étnico, género, religión o cualquier otra condición. Constituyen el marco ético fundamental de la educación intercultural.',
    pedagogicalTip: 'Analiza casos actuales donde los derechos humanos entren en aparente conflicto con prácticas culturales específicas, debatiendo los límites del relativismo cultural.'
  },
  {
    word: 'Inclusión',
    definition: 'Proceso y enfoque social que busca garantizar que todas las personas, especialmente aquellas en riesgo de marginación o segregación, tengan las mismas oportunidades de participar plenamente en todos los aspectos de la vida (educativa, laboral, cívica). A diferencia de la integración, la inclusión exige que sea el sistema el que se adapte a la diversidad, no el individuo al sistema.',
    etymology: 'Del latín "inclusio" (acción de encerrar o insertar).',
    pedagogicalTip: 'Usa la metáfora de una fiesta: la diversidad es que te inviten; la integración es poder entrar; la inclusión es que pongan la música que te gusta y te saquen a bailar.'
  },
  {
    word: 'Integración',
    definition: 'Proceso de incorporación de individuos o grupos minoritarios a la estructura de la sociedad receptora. Históricamente, a menudo se ha entendido como un esfuerzo unidireccional donde el recién llegado debe adaptarse, diferenciándose del modelo inclusivo o intercultural que exige una adaptación mutua.',
    etymology: 'Del latín "integratio" (renovación, restauración).',
    pedagogicalTip: 'Diferencia en clase entre asimilación (perder tu cultura para encajar), integración (encajar manteniendo parte de tu cultura pero asumiendo la mayor carga de adaptación) e inclusión (el sistema cambia para acogerte).'
  },
  {
    word: 'Síndrome de Ulises',
    definition: 'También conocido como "Síndrome del Emigrante con Estrés Crónico y Múltiple". Es un cuadro psicológico caracterizado por estrés agudo y duelo extremo que sufren muchas personas migrantes, provocado por la separación de la familia, el choque cultural, la falta de oportunidades, la soledad y la invisibilidad social.',
    etymology: 'Hace referencia al héroe griego Ulises (Odiseo), quien sufrió innumerables adversidades y la nostalgia de su patria (Ítaca) durante su largo viaje.',
    pedagogicalTip: 'Aborda la historia de la migración no solo como datos económicos o demográficos, sino centrándote en la experiencia humana, emocional y psicológica del proceso.'
  },
  {
    word: 'Transculturalidad',
    definition: 'Fenómeno que ocurre cuando diferentes grupos culturales interactúan de manera tan intensa y prolongada que se generan nuevas realidades y expresiones culturales híbridas, que no pertenecen exclusivamente a ninguno de los grupos originarios. Es el resultado más profundo de la interculturalidad.',
    pedagogicalTip: 'Investiga con la clase ejemplos de música (como el flamenco, el jazz o el reguetón) o gastronomía que sean producto de la fusión histórica de múltiples culturas.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: '¿Cómo puedo abordar un microconcierto de racismo o prejuicio en mi aula de forma inmediata?',
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
  ,{
    question: 'Los alumnos se quejan de que "ya no se puede decir nada" y que esto es excesiva corrección política. ¿Cómo lo manejo?',
    answer: 'Es una reacción defensiva muy común. Evita enfadarte. Dale la vuelta al argumento: no se trata de "censura" ni de "no poder hablar", sino de ampliar el vocabulario y la precisión para no herir o excluir a otros de forma innecesaria. Plantéales que la empatía y la responsabilidad afectiva requieren esfuerzo, igual que aprender nuevas normas de cortesía. Pregúntales: "¿Por qué crees que a la persona X le molesta ese término?" y guíalos hacia la raíz del conflicto.',
    category: 'Resolución de Conflictos'
  },
  {
    question: '¿Cómo puedo evaluar o calificar la competencia intercultural de mis alumnos de forma objetiva?',
    answer: 'La competencia intercultural no se evalúa con un examen tipo test, sino a través de rúbricas de observación y autoevaluación. Valora la participación en los debates, la capacidad de argumentar desde el punto de vista del otro (empatía cognitiva), el uso de lenguaje inclusivo en sus redacciones, y cómo gestionan la resolución de conflictos en los trabajos de grupo. Un portfolio o diario de aprendizaje donde reflexionen sobre sus propios sesgos es una herramienta de evaluación excelente.',
    category: 'Evaluación'
  },
  {
    question: '¿Qué hacer si son las propias familias de mi alumnado quienes transmiten mensajes xenófobos o racistas en casa?',
    answer: 'Es uno de los retos más duros. Como docente, no puedes cambiar lo que ocurre de puertas para adentro, pero sí puedes garantizar que el aula sea un espacio seguro regido por los Derechos Humanos, innegociables en cualquier currículo oficial. No ataques directamente a las familias (el alumno se cerrará en banda para defender a sus padres); en su lugar, céntrate en desmontar los bulos con datos objetivos en clase y fomenta el pensamiento crítico para que el alumno saque sus propias conclusiones.',
    category: 'Relación con Familias'
  },
  {
    question: '¿Cómo puedo adaptar estas dinámicas para alumnos con Necesidades Educativas Especiales (NEE)?',
    answer: 'La interculturalidad y la inclusión educativa van de la mano. Para alumnos con NEE, utiliza recursos altamente visuales (pictogramas, mapas cromáticos), role-playing con guiones estructurados, y asocia conceptos abstractos (como la "diversidad") a experiencias sensoriales directas (comida, música, texturas). El aprendizaje cooperativo con roles muy bien definidos es clave para asegurar que todos los alumnos tengan un papel fundamental en la dinámica.',
    category: 'Pedagogía Aplicada'
  }
];
