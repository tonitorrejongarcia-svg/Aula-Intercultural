/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, FormEvent } from 'react';
import { Sparkles, MessageSquare, Plus, Trash2, Volume2, RotateCw, BrainCircuit } from 'lucide-react';

export default function CircleTimeDebate() {
  const [questions, setQuestions] = useState<string[]>([
    'Si la cultura humana es como un iceberg, ¿cuál crees que es tu parte sumergida favorita (valores, concepción del tiempo, códigos de cortesía)?',
    '¿Alguna vez has reflexionado sobre un privilegio invisible que posees en tu vida escolar rutinaria?',
    '¿Qué diferencia hay entre simplemente tolerar que otros compañeros hablen diferente y valorar activamente su lengua de origen?',
    '¿Cómo reaccionarías si en un aeropuerto te confiscaran tres objetos de gran valor afectivo o tradicional bajo el pretexto de ser "inútiles"?',
    '¿De qué manera los comentarios cotidianos humorísticos o chistes de pasillo alimentan silenciosamente "El Teléfono Estropeado de los Prejuicios"?',
    '¿Cómo podemos ayudar a un compañero recién llegado al instituto que apenas comprende el idioma sin ser sobreprotectores ni condescendientes?',
    'Si pudieras intercambiar tu "mochila cultural" con la de un compañero durante un día, ¿qué aspecto de su visión del mundo te daría más curiosidad experimentar?',
    '¿Crees que el concepto de "normalidad" en el aula es un consenso real o una imposición de la mayoría?',
    '¿De qué manera la música o la comida que consumimos influye en nuestros sesgos culturales sin darnos cuenta?',
    'Imagina que se prohíben todas las referencias geográficas para presentarse. ¿Cómo definirías quién eres y de dónde vienes?',
    '¿Es posible tener una identidad cultural "pura" en el siglo XXI, o todos somos el resultado de un constante mestizaje?'
  ]);

  const [currentQuestion, setCurrentQuestion] = useState<string>('Haz clic en el botón de abajo para lanzar al aire un detonante pedagógico...');
  const [customInput, setCustomInput] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);

  const synthesizeChime = (frequency: number, type: OscillatorType, duration: number) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Audio synthesis blocked by browser or unsupportive', e);
    }
  };

  const handleSpinQuestion = async () => {
    if (isSpinning || isGenerating) return;
    
    // We decide randomly whether to pick an existing question or generate a new one with AI.
    // 30% chance to generate a brand new one using AI, 70% chance to pick from the existing pool.
    const shouldUseAI = Math.random() < 0.3;

    if (shouldUseAI) {
      // Execute the AI path silently
      setIsGenerating(true);
      setCurrentQuestion("Generando una nueva reflexión (unos segundos)...");
      try {
        const response = await fetch('/api/generate-question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (!response.ok) {
          throw new Error('No se pudo generar la pregunta');
        }
        
        const data = await response.json();
        const newQuestion = data.question;
        
        setQuestions(prev => [newQuestion, ...prev]);
        setCurrentQuestion(newQuestion);
        
        synthesizeChime(587.33, 'triangle', 0.6);
        setTimeout(() => synthesizeChime(880.00, 'sine', 0.8), 100);
      } catch (error) {
        console.error("AI Error:", error);
        setCurrentQuestion("Fallo en conexión. Por favor, gira la ruleta de nuevo.");
        synthesizeChime(200, 'sawtooth', 0.3);
      } finally {
        setIsGenerating(false);
      }
    } else {
      // Normal roulette logic
      setIsSpinning(true);
      let counter = 0;
      const interval = setInterval(() => {
        const tempIdx = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[tempIdx]);
        synthesizeChime(400 + (counter * 60), 'sine', 0.1);
        counter++;
        
        if (counter > 8) {
          clearInterval(interval);
          const finalIdx = Math.floor(Math.random() * questions.length);
          setCurrentQuestion(questions[finalIdx]);
          setIsSpinning(false);
          setTimeout(() => {
            synthesizeChime(587.33, 'triangle', 0.6); 
            setTimeout(() => synthesizeChime(880.00, 'sine', 0.8), 100); 
          }, 120);
        }
      }, 150);
    }
  };

  const handleAddQuestion = (e: FormEvent) => {
    e.preventDefault();
    const clean = customInput.trim();
    if (!clean) return;
    setQuestions([clean, ...questions]);
    setCurrentQuestion(`Pregunta añadida: "${clean}". ¡Lánzala de nuevo girando el reflector!`);
    setCustomInput('');
    synthesizeChime(440, 'triangle', 0.3);
  };

  const handleDeleteQuestion = (idxToDelete: number) => {
    if (questions.length <= 3) {
      alert('Por favor, mantén al menos 3 preguntas de debate para que el generador tenga suficiente variedad.');
      return;
    }
    const updated = questions.filter((_, i) => i !== idxToDelete);
    setQuestions(updated);
    setCurrentQuestion('Pregunta borrada. ¡Gira la ruleta para refrescar el debate!');
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all" id="circle-debate-box">
      <div className="flex items-center gap-3.5 mb-6">
        <div className="p-2.5 bg-rose-500 text-white rounded-xl shadow-xs">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-sans font-extrabold text-[#111827] text-lg leading-tight md:text-xl">
            Preguntas del Círculo / Debate al Azar
          </h3>
          <p className="font-sans text-xs text-slate-500">
            Generador instantáneo de dilemas y dinámicas de asamblea para tutorías grupales.
          </p>
        </div>
      </div>

      {/* Spun Question Area */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-inner text-center min-h-[140px] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-20 hover:opacity-100 transition-opacity">
          <Volume2 className="w-4 h-4 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Audio Activo</span>
        </div>
        
        {isSpinning || isGenerating ? (
          <div className="space-y-3 animate-pulse">
            <div className="w-8 h-8 rounded-full border-4 border-slate-100 border-t-orange-600 animate-spin mx-auto" />
            <p className="font-sans text-slate-400 text-xs italic tracking-wide">
              {isGenerating ? "Generando reflexión (puede tardar unos 10-15 seg)..." : "Mezclando reflexiones sociológicas..."}
            </p>
          </div>
        ) : (
          <p className="font-sans text-sm md:text-base text-slate-700 font-semibold leading-relaxed max-w-xl animate-fadeIn">
            "{currentQuestion}"
          </p>
        )}
      </div>

      {/* Master Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={handleSpinQuestion}
          disabled={isSpinning || isGenerating}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-sans font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed group w-full sm:w-auto"
          id="btn-spin-debate"
        >
          <RotateCw className={`w-4 h-4 group-hover:rotate-45 transition-transform ${isSpinning ? 'animate-spin' : ''}`} />
          Girar Ruleta Intercultural
          <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-pulse text-white' : 'text-amber-300'}`} />
        </button>
      </div>


    </div>
  );
}
