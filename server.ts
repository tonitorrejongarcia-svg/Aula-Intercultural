import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Helper function to retry API calls on 503 or 429 errors
async function generateWithFallback(ai: GoogleGenAI, options: any, maxRetries = 5) {
  let attempt = 0;
  let currentModel = options.model;
  const fallbackModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-3.1-pro-preview"];
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
        const delay = 1500; 
        
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
  const PORT = 3000;
  app.use(express.json());

  // API Routes
  app.post("/api/generate-question", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
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
        model: "gemini-3.1-flash-lite", // Upgrade model here as well
        contents: prompt,
        config: { maxOutputTokens: 100, temperature: 0.9 },
      });
      
      let text = response?.text || "";
      if (!text.trim()) {
        const fallbacks = [
          "¿En qué medida nuestras expectativas de éxito sobre un estudiante cambian al escuchar su acento por primera vez?",
          "Si el currículum fuera verdaderamente universal, ¿qué autor o autora que ahora no se estudia sería imprescindible en tu asignatura?",
          "¿Cómo diferenciamos en el aula entre la 'falta de interés' y el agotamiento por tener que adaptarse constantemente a una cultura escolar ajena?"
        ];
        text = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }
      res.json({ question: text.trim() });
    } catch (error: any) {
      console.error("Error generating question:", error);
      res.status(500).json({ error: "No se pudo generar la pregunta. Los servidores de IA están saturados ahora mismo, por favor inténtalo de nuevo en unos segundos.", details: error.message || String(error) });
    }
  });

    app.post("/api/generate-pill", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
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
        model: "gemini-3.1-flash-lite",
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
      
      // Intentar limpiar bloques markdown
      text = text.replace(/^[sS]*?```(?:json)?\n/, "").replace(/\n```[sS]*$/, "");
      
      let pill;
      try {
        pill = JSON.parse(text);
        if (!pill.title || !pill.text) throw new Error("Campos faltantes en el JSON");
      } catch (parseError) {
        console.error("Fallo al parsear JSON. Texto original recibido:", JSON.stringify(text), parseError.message);
        // Fallback seguro en caso de que la IA devuelva texto cortado o inválido
        const fallbacks = [
          { title: "El efecto Pigmalión", text: "Las expectativas del docente alteran el rendimiento real del estudiante. Si esperas menos de un alumno por su origen, sabotearás su éxito de forma inconsciente." },
          { title: "El currículum oculto", text: "No solo enseñamos con el temario. Las normas implícitas, los silencios y las ausencias de ciertos autores en los libros de texto también educan (o excluyen)." },
          { title: "Injusticia epistémica", text: "Ocurre cuando desacreditamos la capacidad de saber de un alumno simplemente por su acento, origen o forma de expresarse, perdiendo aportaciones muy valiosas en el aula." }
        ];
        pill = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }
      
      res.json(pill);
    } catch (error: any) {
      console.error("Error generating pill:", error);
      res.status(500).json({ error: "Error al generar el contenido. Por favor, inténtalo de nuevo en unos segundos.", details: error.message || String(error) });
    }
  });

  
  app.post("/api/generate-myths", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
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
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
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
      console.error("Error generating microviolences:", error);
      
      const fallbacks = [
        {
          phrase: "«¿Pero de dónde eres de verdad? Porque español no pareces con esa cara.»",
          source: "Físico",
          category: "Exclusión de identidad (Perpetuo extranjero)",
          mechanism: "Se invalida la nacionalidad del estudiante asumiendo que la identidad nacional está exclusivamente ligada a rasgos fenotípicos caucásicos.",
          impact: "Alienación, pérdida de pertenencia e invalidación de su identidad real.",
          teacherResponse: "Cortar el interrogatorio: «Es español y es de aquí. La diversidad física es parte de nuestra sociedad; asimilar que solo hay un 'tipo' de español es un sesgo que debemos corregir.»"
        },
        {
          phrase: "«Jaja, me voy a disfrazar de [cultura minoritaria] para carnaval, será súper gracioso.»",
          source: "Físico",
          category: "Apropiación y burla cultural",
          mechanism: "Se reduce una identidad cultural o religiosa compleja a una caricatura cómica temporal para el entretenimiento del grupo dominante.",
          impact: "Banaliza y ridiculiza la herencia cultural del alumno, generando humillación pública.",
          teacherResponse: "Parar la banalización: «La cultura y la identidad de tus compañeros no son un disfraz de comedia. Burlarse de las raíces de otros es una falta de respeto inaceptable en este centro.»"
        },
        {
          phrase: "«Se lo ha tomado muy a pecho, los de su país es que son muy temperamentales.»",
          source: "Redes Sociales",
          category: "Invalidación por estereotipo cultural",
          mechanism: "Gaslighting. Se desactiva la queja legítima del estudiante frente a un abuso, atribuyéndosela a un defecto genético o cultural.",
          impact: "Aísla a la víctima, le quita credibilidad y protege al agresor o provocador.",
          teacherResponse: "Focalizar en el hecho: «No tiene nada que ver con su país. Se ha enfadado porque se le ha faltado al respeto. Exijo que dejemos de usar estereotipos para justificar agresiones.»"
        },
        {
          phrase: "«Madre mía, a la mínima os ofendéis, ahora ya no se puede decir nada.»",
          source: "Redes Sociales",
          category: "Victimismo del grupo dominante",
          mechanism: "El agresor se posiciona como víctima de la 'censura', invisibilizando el daño real causado y negándose a asumir responsabilidad.",
          impact: "Silencia futuras denuncias por miedo a ser tachados de exagerados.",
          teacherResponse: "Reenfoque de responsabilidad: «Se puede decir de todo, menos insultar o discriminar. Que ahora los límites del respeto estén más claros es un avance, no un ataque hacia ti.»"
        }
      ];
      const shuffled = fallbacks.sort(() => 0.5 - Math.random());
      res.json(shuffled.slice(0, 4));
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
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
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
