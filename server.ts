import express from "express";
import http from "http";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Helper function to retry API calls on 503 or 429 errors quickly
async function generateWithFallback(ai: GoogleGenAI, options: any, maxRetries = 2) {
  let attempt = 0;
  let currentModel = options.model;
  const fallbackModels = ["gemini-2.5-flash", "gemini-3.1-flash-lite", "gemini-3.8-flash"];
  let modelIndex = fallbackModels.indexOf(currentModel);
  if (modelIndex === -1) {
    fallbackModels.unshift(currentModel);
    modelIndex = 0;
  }

  while (attempt < maxRetries) {
    try {
      return await ai.models.generateContent({ ...options, model: fallbackModels[modelIndex] });
    } catch (error: any) {
      const isRateLimitOrOverloaded = error?.status === 503 || error?.status === 429 || error?.message?.includes("503") || error?.message?.includes("429") || error?.message?.includes("UNAVAILABLE");
      if (isRateLimitOrOverloaded && attempt < maxRetries - 1) {
        attempt++;
        const delay = 600; 
        
        const previousModel = fallbackModels[modelIndex];
        if (modelIndex < fallbackModels.length - 1) {
          modelIndex++;
        }
        
        console.log(`Model ${previousModel} overloaded. Retrying attempt ${attempt} with model ${fallbackModels[modelIndex]} in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = 3000;
  app.use(express.json());

  // API Routes
  app.post("/api/generate-question", async (req, res) => {
    const questionFallbacks = [
      "¿En qué medida nuestras expectativas de éxito sobre un estudiante cambian al escuchar su acento por primera vez?",
      "Si el currículum fuera verdaderamente universal, ¿qué autor o autora que ahora no se estudia sería imprescindible en tu asignatura?",
      "¿Cómo diferenciamos en el aula entre la 'falta de interés' y el agotamiento por tener que adaptarse constantemente a una cultura escolar ajena?",
      "¿Qué dinámicas en el patio escolar revelan barreras invisibles de inclusión entre grupos de estudiantes?",
      "¿Cuándo fue la última vez que aprendiste algo transformador sobre pedagogía a partir de la perspectiva de una familia migrante?"
    ];

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({ question: questionFallbacks[Math.floor(Math.random() * questionFallbacks.length)] });
      }
      const ai = new GoogleGenAI({ apiKey });
      const subtopics = ["racismo sutil", "identidad bicultural", "el peso de la asimilación", "las expectativas del profesorado", "injusticia epistémica", "el mito de la meritocracia en aulas diversas", "diversidad neurodivergente y cultural", "los roles de género cruzados con cultura", "la presión del grupo de iguales"];
      const randomTopic = subtopics[Math.floor(Math.random() * subtopics.length)];
      const seed = Math.random().toString(36).substring(7);

      const prompt = `Genera UNA pregunta breve, profunda y reflexiva sobre educación intercultural, diversidad o inclusión.
Enfócate en esta temática concreta: ${randomTopic}.
Debe ser ideal para debatir en círculo con estudiantes adolescentes o profesores. Busca ángulos creativos y dilemas incómodos o contraintuitivos.
Devuelve ÚNICAMENTE el texto de la pregunta (sin comillas, sin introducciones).
[Variante única: ${seed}]`;
      
      const response = await generateWithFallback(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { maxOutputTokens: 100, temperature: 0.9 },
      });
      
      let text = response?.text || "";
      if (!text.trim()) {
        text = questionFallbacks[Math.floor(Math.random() * questionFallbacks.length)];
      }
      res.json({ question: text.trim() });
    } catch (error: any) {
      console.warn("Fallo o indisponibilidad en generate-question, usando fallback:", error?.message || error);
      res.json({ question: questionFallbacks[Math.floor(Math.random() * questionFallbacks.length)] });
    }
  });

  app.post("/api/generate-pill", async (req, res) => {
    const pillFallbacks = [
      { title: "El efecto Pigmalión", text: "Las expectativas del docente alteran el rendimiento real del estudiante. Si esperas menos de un alumno por su origen, sabotearás su éxito de forma inconsciente." },
      { title: "El currículum oculto", text: "No solo enseñamos con el temario. Las normas implícitas, los silencios y las ausencias de ciertos autores en los libros de texto también educan (o excluyen)." },
      { title: "Injusticia epistémica", text: "Ocurre cuando desacreditamos la capacidad de saber de un alumno simplemente por su acento, origen o forma de expresarse, perdiendo aportaciones muy valiosas en el aula." },
      { title: "La falacia del daltonismo", text: "Decir «no veo colores, veo personas» invisibiliza las desigualdades y discriminaciones reales que vive el alumnado minorizado a diario." },
      { title: "La minoría modelo", text: "Los estereotipos aparentemente positivos deshumanizan, generan enorme ansiedad académica y borran la individualidad real de cada estudiante." },
      { title: "Bilingüismo como fortaleza", text: "Cambiar de código lingüístico enriquece la flexibilidad mental. El retraso aparente inicial en la lengua vehicular se compensa con creces a medio plazo." },
      { title: "Asimilación vs. Diálogo", text: "Asimilar exige renunciar a la identidad propia para encajar; la interculturalidad propone un diálogo simétrico donde todas las identidades se enriquecen mutuamente." },
      { title: "El mito del esfuerzo", text: "La meritocracia sin equidad previa es una trampa. No todos parten de la misma línea de salida en capital social, cultural y administrativo." }
    ];

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json(pillFallbacks[Math.floor(Math.random() * pillFallbacks.length)]);
      }
      const ai = new GoogleGenAI({ apiKey });
      const subtopics = ["privilegios invisibles", "sesgos cognitivos en evaluación", "el mito del daltonismo racial", "barreras lingüísticas vs barreras culturales", "la carga mental de los estudiantes minorizados", "currículum oculto", "microagresiones en el aula", "acento y prejuicio", "interseccionalidad", "efecto Pigmalión", "riqueza del bilingüismo", "estereotipos en libros de texto"];
      const randomTopic = subtopics[Math.floor(Math.random() * subtopics.length)];
      const seed = Math.random().toString(36).substring(7);

      const prompt = `Genera UNA "Píldora Pedagógica" INÉDITA y breve sobre educación intercultural.
Enfócate específicamente en esta temática: ${randomTopic}.
La píldora debe tener dos partes:
1. Un título breve y llamativo (máximo 6 palabras).
2. Un texto explicativo o curiosidad profunda, contraintuitiva y muy específica (máximo 30 palabras).
IMPORTANTE: Evita topicazos como "la diversidad es riqueza". Busca un dato, concepto o reflexión concreta y profesional.
[Variante única: ${seed}]`;
      
      const response = await generateWithFallback(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { 
          maxOutputTokens: 300, 
          temperature: 0.9,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Un título breve y llamativo (máximo 6 palabras)." },
              text: { type: Type.STRING, description: "Un texto explicativo o curiosidad profunda (máximo 30 palabras)." }
            },
            required: ["title", "text"]
          }
        },
      });
      
      let text = response?.text || "{}";
      text = text.replace(/^[sS]*?```(?:json)?\n/, "").replace(/\n```[sS]*$/, "");
      
      let pill;
      try {
        pill = JSON.parse(text);
        if (!pill.title || !pill.text) throw new Error("Campos faltantes en el JSON");
      } catch (parseError) {
        pill = pillFallbacks[Math.floor(Math.random() * pillFallbacks.length)];
      }
      
      res.json(pill);
    } catch (error: any) {
      console.warn("Fallo o indisponibilidad en generate-pill, usando fallback:", error?.message || error);
      res.json(pillFallbacks[Math.floor(Math.random() * pillFallbacks.length)]);
    }
  });

  
  app.post("/api/generate-myths", async (req, res) => {
    const fallbackMyths = [
      {
        conceptName: "Falsa Ceguera al Color",
        myth: "Tratar a todos por igual requiere 'no ver colores' ni diferencias culturales en clase.",
        reality: "Ignorar las diferencias reales silencia las desigualdades sistémicas. Tratar con verdadera equidad exige reconocer y validar las identidades."
      },
      {
        conceptName: "La Minoría Modelo",
        myth: "Decir que los alumnos asiáticos son muy buenos en matemáticas es un elogio, no racismo.",
        reality: "Los prejuicios 'buenos' deshumanizan, generan ansiedad académica y borran la individualidad del estudiante, encasillándolo en expectativas irreales."
      },
      {
        conceptName: "Relegación al Anexo",
        myth: "La inclusión y diversidad son temas transversales ideales para tratar el viernes a última hora en tutoría.",
        reality: "Si solo está en tutoría, es un mero accesorio. La educación intercultural debe empapar transversalmente matemáticas, literatura e historia."
      },
      {
        conceptName: "El mito del esfuerzo",
        myth: "Si te esfuerzas, triunfas en los estudios, sin importar de dónde vengas ni qué acento tengas.",
        reality: "El mito del esfuerzo aislado ignora que el racismo sistémico, la pobreza y las expectativas actúan como frenos estructurales."
      }
    ];

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        const shuffled = fallbackMyths.sort(() => 0.5 - Math.random());
        return res.json(shuffled.slice(0, 3));
      }
      const ai = new GoogleGenAI({ apiKey });
      const subtopics = ["currículum eurocéntrico", "esfuerzo y meritocracia", "estereotipos positivos", "el peso de la integración", "neutralidad docente", "la diversidad como problema", "racismo inverso (mito)", "falacia de la minoría modelo"];
      const randomTopic = subtopics[Math.floor(Math.random() * subtopics.length)];
      const seed = Math.random().toString(36).substring(7);

      const prompt = `Genera 3 falacias o mitos MUY ESPECÍFICOS y contraintuitivos sobre educación intercultural, diversidad o inclusión en las escuelas.
      Enfócate sutilmente en temáticas como: ${randomTopic}.
      Devuelve un array JSON con 3 objetos. Cada objeto debe tener:
      - "conceptName": Un título corto (ej. "El mito del esfuerzo").
      - "myth": La creencia falsa (máx 20 palabras).
      - "reality": La realidad que la desmonta de forma profesional y directa (máx 35 palabras).
      Evita los topicazos típicos. Sé muy analítico.
      [Variante única: ${seed}]`;
            
      const response = await generateWithFallback(ai, {
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: { 
          maxOutputTokens: 600, 
          temperature: 0.9,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                myth: { type: Type.STRING },
                reality: { type: Type.STRING }
              },
              required: ["conceptName", "myth", "reality"]
            }
          }
        },
      });
      
            let text = response?.text || "[]";
      
      // Limpieza de seguridad
      text = text.replace(/^[\s\S]*?\\?\\?```(?:json)?\n/, "").replace(/\n```[\s\S]*$/, "");
      
      let myths;
      try {
        myths = JSON.parse(text);
        if (!Array.isArray(myths) || myths.length === 0) throw new Error("JSON no es un array válido");
      } catch (e) {
        console.error("Fallo al parsear JSON, usando fallback:", e);
        throw e; // goes to outer catch
      }
      
      res.json(myths);
    } catch (error: any) {
      console.error("Error generating myths:", error);
      // Fallback myths if AI fails
      const fallbackMyths = [
        {
          conceptName: "Falsa Ceguera al Color",
          myth: "Tratar a todos por igual requiere 'no ver colores' ni diferencias culturales en clase.",
          reality: "Ignorar las diferencias reales silencia las desigualdades sistémicas. Tratar con verdadera equidad exige reconocer y validar las identidades."
        },
        {
          conceptName: "La Minoría Modelo",
          myth: "Decir que los alumnos asiáticos son muy buenos en matemáticas es un elogio, no racismo.",
          reality: "Los prejuicios 'buenos' deshumanizan, generan ansiedad académica y borran la individualidad del estudiante, encasillándolo en expectativas irreales."
        },
        {
          conceptName: "Relegación al Anexo",
          myth: "La inclusión y diversidad son temas transversales ideales para tratar el viernes a última hora en tutoría.",
          reality: "Si solo está en tutoría, es un mero accesorio. La educación intercultural debe empapar transversalmente matemáticas, literatura e historia."
        },
        {
          conceptName: "El mito del esfuerzo",
          myth: "Si te esfuerzas, triunfas en los estudios, sin importar de dónde vengas ni qué acento tengas.",
          reality: "El mito del esfuerzo aislado ignora que el racismo sistémico, la pobreza y las expectativas actúan como frenos estructurales."
        }
      ];
      
      // select 3 random fallbacks
      const shuffled = fallbackMyths.sort(() => 0.5 - Math.random());
      res.json(shuffled.slice(0, 3));
    }
  });

  
  app.post("/api/generate-microviolences", async (req, res) => {
    const fallbacks = [
      {
        phrase: "«¿Pero de dónde eres de verdad? Porque español no pareces con esa cara.»",
        source: "Físico",
        category: "Exclusión de identidad (Perpetuo extranjero)",
        mechanism: "Se invalida la nacionalidad del estudiante asumiendo que la identidad nacional está exclusivamente ligada a rasgos fenotípicos caucásicos.",
        impact: "Alienación, pérdida de pertenencia e invalidación de su identidad real como ciudadano de pleno derecho.",
        teacherResponse: "Cortar el interrogatorio: «Es español y es de aquí. La diversidad física es parte de nuestra sociedad; asumir que solo hay un 'tipo' de español es un sesgo que debemos corregir.»"
      },
      {
        phrase: "«Jaja, me voy a disfrazar de [cultura minoritaria] para carnaval, será súper gracioso.»",
        source: "Físico",
        category: "Apropiación y burla cultural",
        mechanism: "Se reduce una identidad cultural o religiosa compleja a una caricatura cómica temporal para el entretenimiento del grupo dominante.",
        impact: "Banaliza y ridiculiza la herencia cultural del alumno, generando humillación pública.",
        teacherResponse: "Parar la banalización: «La cultura y la fe de tus compañeros no son un disfraz de comedia. Burlarse de las raíces de otros es una falta de respeto inaceptable en este centro.»"
      },
      {
        phrase: "«Se lo ha tomado muy a pecho, los de su país es que son muy temperamentales.»",
        source: "Redes Sociales",
        category: "Invalidación por estereotipo cultural",
        mechanism: "Gaslighting. Se desactiva la queja legítima del estudiante frente a un abuso, atribuyéndosela a un defecto genético o cultural.",
        impact: "Aísla a la víctima, le quita credibilidad y protege al agresor o provocador.",
        teacherResponse: "Focalizar en el hecho: «No tiene nada que ver con su país. Se ha enfadado porque se le ha faltado al respeto. Dejemos de usar estereotipos para justificar agresiones.»"
      },
      {
        phrase: "«Madre mía, a la mínima os ofendéis, ahora ya no se puede decir nada.»",
        source: "Redes Sociales",
        category: "Victimismo del grupo dominante",
        mechanism: "El agresor se posiciona como víctima de la 'censura', invisibilizando el daño real causado y negándose a asumir responsabilidad.",
        impact: "Silencia futuras denuncias por miedo a ser tachados de exagerados.",
        teacherResponse: "Reenfoque de responsabilidad: «Se puede decir de todo, menos insultar o discriminar. Que ahora los límites del respeto estén más claros es un avance, no un ataque hacia ti.»"
      },
      {
        phrase: "«Como eres asiático, pásame tu examen de matemáticas, seguro sacas diez sin estudiar.»",
        source: "Físico",
        category: "La falacia de la minoría modelo",
        mechanism: "Atribución estereotipada de capacidades intelectuales innatas que deshumaniza al individuo, reduciéndolo a una herramienta utilitaria basada en su origen étnico.",
        impact: "Genera una presión académica insoportable, ansiedad por el rendimiento y sentimientos de alienación al no ser valorado por su esfuerzo personal.",
        teacherResponse: "Desmontar el prejuicio: «Ese comentario invalida el esfuerzo personal de tu compañero. Las notas son fruto del trabajo y estudio de cada persona, no de su país de origen.»"
      },
      {
        phrase: "«Si habláis en vuestro idioma en voz baja es porque estáis criticando a alguien en secreto.»",
        source: "Físico",
        category: "Sospecha y hostilidad lingüística",
        mechanism: "Proyección paranoide de desconfianza ante idiomas ajenos, criminalizando el uso de la lengua materna en momentos de ocio.",
        impact: "Genera inseguridad y vergüenza lingüística, haciendo que los estudiantes repriman su lengua materna para evitar el juicio ajeno.",
        teacherResponse: "Validación lingüística: «Hablar en tu idioma materno con un amigo es completamente natural y un derecho. No proyectemos sospechas infundadas sobre las lenguas de los demás.»"
      },
      {
        phrase: "«Qué pelo tan raro tienes, ¿puedo tocarlo? Parece lana de oveja.»",
        source: "Físico",
        category: "Exotización y transgresión corporal",
        mechanism: "Curiosidad deshumanizante. Se trata el cuerpo o el cabello del alumno racializado como una atracción exótica o animalizada.",
        impact: "Sensación de invasión física y vergüenza de los rasgos corporales propios.",
        teacherResponse: "Establecer límites de respeto: «El cuerpo y el cabello de una persona no son un objeto de exhibición. Cada uno tiene derecho a su espacio personal y a ser tratado con dignidad.»"
      },
      {
        phrase: "«Ha desaparecido una sudadera en el vestuario; que revisen primero a los del fondo.»",
        source: "Físico",
        category: "Presunción de culpabilidad sistemática",
        mechanism: "Asociación automática del alumnado migrante o de barrios humildes con la delincuencia o el hurto.",
        impact: "Estigmatización profunda y desconfianza hacia la justicia del centro educativo.",
        teacherResponse: "Frenar el sesgo: «Las acusaciones sin pruebas basadas en prejuicios son inadmisibles. Si hay un objeto perdido, se busca con respeto y sin señalar a nadie por su origen.»"
      },
      {
        phrase: "«Puaj, ¿qué llevas en el tupper? Huele rarísimo, qué asco de comida.»",
        source: "Físico",
        category: "Desprecio gastronómico y cultural",
        mechanism: "Uso de la comida como marcador de otredad y rechazo, asociando los ingredientes tradicionales ajenos a suciedad o extrañeza.",
        impact: "Vergüenza ante las costumbres familiares y renuncia a comer en público por miedo al señalamiento.",
        teacherResponse: "Curiosidad gastronómica: «En el mundo existen miles de formas de cocinar ricas y deliciosas. Burlarse de la comida de los demás demuestra falta de mundo, no superioridad.»"
      },
      {
        phrase: "«A ellos les dan todas las becas de comedor y a nosotros nada, qué morro tienen.»",
        source: "Redes Sociales",
        category: "Bulo de privilegios públicos imaginarios",
        mechanism: "Difusión de falsedades sobre la adjudicación de ayudas públicas para alimentar el resentimiento social.",
        impact: "Fractura de la convivencia vecinal y hostilidad directa contra menores becados en el comedor escolar.",
        teacherResponse: "Pedagogía con baremos oficiales: «Las becas se conceden por nivel de renta demostrable de la familia, no por pasaporte o lugar de nacimiento. La precariedad no entiende de orígenes.»"
      },
      {
        phrase: "«No le exijas tanto académicamente a ese estudiante, en su casa los estudios no son prioridad.»",
        source: "Físico",
        category: "Bajas expectativas docentes (Pigmalión negativo)",
        mechanism: "Proyección de prejuicios clasistas y culturales sobre el interés educativo de familias de origen migrante.",
        impact: "Abandono escolar prematuro y falta de orientación hacia estudios superiores o formación cualificada.",
        teacherResponse: "Compromiso docente transformador: «Las familias migrantes a menudo hacen sacrificios enormes por el futuro de sus hijos. Nuestro deber es elevar las expectativas y brindar el máximo apoyo.»"
      },
      {
        phrase: "«Son cosas de críos en el patio, siempre ha habido burlas, no hay que darle tanta importancia.»",
        source: "Físico",
        category: "Invisibilización de la violencia estructural",
        mechanism: "Minimización institucional del acoso racista bajo la etiqueta genérica de 'juegos o riñas infantiles'.",
        impact: "Indefensión aprendida de la víctima y escalada de la agresividad del grupo agresor al no percibir límites.",
        teacherResponse: "Tolerancia cero: «Cuando la burla ataca la identidad o el origen de una persona, no es una riña casual: es acoso y discriminación. Actuemos con firmeza para proteger a la víctima.»"
      }
    ];

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        const shuffled = fallbacks.sort(() => 0.5 - Math.random());
        return res.json(shuffled.slice(0, 4));
      }
      const ai = new GoogleGenAI({ apiKey });
      const subtopics = ["microagresiones sutiles", "humor negro en whatsapp", "estereotipos positivos de asiaticos", "exclusión en trabajos de grupo", "presunción de culpabilidad en el patio", "burlas por acento", "falsa ceguera al color", "apropiación cultural"];
      const randomTopic = subtopics[Math.floor(Math.random() * subtopics.length)];
      const seed = Math.random().toString(36).substring(7);

      const prompt = `Genera 4 frases hostiles o microviolencias MUY REALISTAS y comunes en contextos escolares o adolescentes.
      Enfócate en la temática: ${randomTopic}.
      Devuelve un array JSON con 4 objetos. Cada objeto DEBE tener esta estructura exacta:
      {
        "phrase": "La frase exacta entre comillas francesas « »",
        "source": "Físico" o "Redes Sociales",
        "category": "Categoría corta del prejuicio",
        "mechanism": "El mecanismo psicológico o sociológico detrás de la frase (máx 25 palabras)",
        "impact": "El impacto en el alumno o grupo (máx 20 palabras)",
        "teacherResponse": "Respuesta directa o protocolo del profesor para cortarlo (máx 35 palabras)"
      }
      Sé crudo, muy analítico y realista.
      [Variante única: ${seed}]`;
            
      const response = await generateWithFallback(ai, {
        model: "gemini-3.1-flash-lite", // Using fast model
        contents: prompt,
        config: { 
          maxOutputTokens: 800, 
          temperature: 0.9,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phrase: { type: Type.STRING },
                source: { type: Type.STRING },
                category: { type: Type.STRING },
                mechanism: { type: Type.STRING },
                impact: { type: Type.STRING },
                teacherResponse: { type: Type.STRING }
              },
              required: ["phrase", "source", "category", "mechanism", "impact", "teacherResponse"]
            }
          }
        },
      });
      
      let text = response?.text || "[]";
      text = text.replace(/^[\s\S]*?\\?\\?```(?:json)?\n/, "").replace(/\n```[\s\S]*$/, "");
      
      let items;
      try {
        items = JSON.parse(text);
        if (!Array.isArray(items) || items.length === 0) throw new Error("JSON inválido");
      } catch (e) {
        throw e; 
      }
      
      res.json(items);
    } catch (error: any) {
      console.warn("Error o indisponibilidad en generate-microviolences, usando fallback:", error?.message || error);
      const shuffled = fallbacks.sort(() => 0.5 - Math.random());
      res.json(shuffled.slice(0, 4));
    }
  });

  // Contact form receiver endpoint
  app.post("/api/send-contact", (req, res) => {
    try {
      const { name, email, role, message, targetEmail } = req.body;
      const destination = targetEmail || "ciudadaniahoruelo@horuelo.net";
      console.log(`[CONTACT LOG] Nueva consulta recibida para: ${destination}`);
      console.log(`De: ${name} <${email}> (${role})`);
      console.log(`Mensaje: ${message}`);
      
      res.json({
        success: true,
        destination,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error("Error al procesar consulta en /api/send-contact:", err);
      res.status(500).json({ success: false, error: err?.message || "Error al procesar el mensaje" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
  
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
