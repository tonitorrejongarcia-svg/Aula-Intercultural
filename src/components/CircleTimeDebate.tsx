/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, FormEvent } from 'react';
import { Sparkles, MessageSquare, Plus, Trash2, Volume2, RotateCw } from 'lucide-react';

export default function CircleTimeDebate() {
  const [questions, setQuestions] = useState<string[]>([
    'Si la cultura humana es como un iceberg, ¿cuál crees que es tu parte sumergida favorita (valores, concepción del tiempo, códigos de cortesía)?',
    '¿Alguna vez has reflexionado sobre un privilegio invisible que posees en tu vida escolar rutinaria?',
    '¿Qué diferencia hay entre simplemente tolerar que otros compañeros hablen diferente y valorar activamente su lengua de origen?',
    '¿Cómo reaccionarías si en un aeropuerto te confiscaran tres objetos de gran valor afectivo o tradicional bajo el pretexto de ser "inútiles"?',
    '¿De qué manera los comentarios cotidianos humorísticos o chistes de pasillo alimentan silenciosamente "El Teléfono Estropeado de los Prejuicios"?',
    '¿Cómo podemos ayudar a un compañero recién llegado al instituto que apenas comprende el idioma sin ser sobreprotectores ni condescendientes?'
  ]);

  const [currentQuestion, setCurrentQuestion] = useState<string>('Haz clic en el botón de abajo para lanzar al aire un detonante pedagógico...');
  const [customInput, setCustomInput] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  
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

  const handleSpinQuestion = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    let counter = 0;
    
    // Simulate spin visual sound effects
    const interval = setInterval(() => {
      const tempIdx = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[tempIdx]);
      synthesizeChime(400 + (counter * 60), 'sine', 0.1);
      counter++;
      
      if (counter > 8) {
        clearInterval(interval);
        // Final select
        const finalIdx = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[finalIdx]);
        setIsSpinning(false);
        // Winning chime chord
        setTimeout(() => {
          synthesizeChime(587.33, 'triangle', 0.6); // D5
          setTimeout(() => synthesizeChime(880.00, 'sine', 0.8), 100); // A5
        }, 120);
      }
    }, 150);
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
    <div className="bg-gradient-to-br from-indigo-50/50 via-teal-50/30 to-rose-50/25 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all" id="circle-debate-box">
      <div className="flex items-center gap-3.5 mb-6">
        <div className="p-2.5 bg-gradient-to-tr from-rose-500 to-amber-500 text-white rounded-xl shadow-xs">
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
        
        {isSpinning ? (
          <div className="space-y-3 animate-pulse">
            <div className="w-8 h-8 rounded-full border-4 border-slate-100 border-t-teal-600 animate-spin mx-auto" />
            <p className="font-sans text-slate-400 text-xs italic tracking-wide">Mezclando reflexiones sociológicas...</p>
          </div>
        ) : (
          <p className="font-sans text-sm md:text-base text-slate-700 font-semibold leading-relaxed max-w-xl animate-fadeIn">
            "{currentQuestion}"
          </p>
        )}
      </div>

      {/* Master Action Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSpinQuestion}
          disabled={isSpinning}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-sans font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed group"
          id="btn-spin-debate"
        >
          <RotateCw className={`w-4 h-4 group-hover:rotate-45 transition-transform ${isSpinning ? 'animate-spin' : ''}`} />
          Girar Ruleta Intercultural
          <Sparkles className="w-4 h-4 text-amber-300" />
        </button>
      </div>

      {/* Add / Manage own questions */}
      <div className="mt-8 border-t border-slate-200/80 pt-6 space-y-4">
        <h4 className="font-sans font-bold text-slate-800 text-xs uppercase tracking-wider">
          Añade o Gestiona el Banco de Preguntas ({questions.length})
        </h4>

        <form onSubmit={handleAddQuestion} className="flex gap-2">
          <input
            type="text"
            placeholder="Propón una pregunta de debate para tu aula..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-sans text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            id="debate-custom-input"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl flex items-center gap-1.5 font-sans font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            id="debate-add-btn"
          >
            <Plus className="w-4 h-4" />
            Añadir
          </button>
        </form>

        {/* Scrollable list of existing questions */}
        <div className="max-h-[140px] overflow-y-auto pr-2 space-y-1.5">
          {questions.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 p-2 bg-white/60 hover:bg-white border border-slate-100 rounded-lg text-[11px] font-sans text-slate-600 transition-all">
              <span className="line-clamp-1 flex-1 leading-normal">
                {idx + 1}. {q}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteQuestion(idx)}
                className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors shrink-0"
                title="Eliminar pregunta"
                id={`delete-question-${idx}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
