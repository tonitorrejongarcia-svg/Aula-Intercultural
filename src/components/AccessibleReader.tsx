/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { Accessibility, Volume2, Type, Check, Eye } from 'lucide-react';

interface AccessibleReaderProps {
  fontSizeScale: 'normal' | 'large' | 'xl';
  setFontSizeScale: (scale: 'normal' | 'large' | 'xl') => void;
  highContrast: boolean;
  setHighContrast: (active: boolean) => void;
}

export default function AccessibleReader({
  fontSizeScale,
  setFontSizeScale,
  highContrast,
  setHighContrast
}: AccessibleReaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const testSpeaker = () => {
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
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {
      console.warn('Audio Context API blocked by security policies', e);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="accessibility-floating-panel">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer relative group-hover:rotate-12 outline-none focus:ring-4 focus:ring-orange-500/40"
        title="Opciones de Accesibilidad y Lectura"
        id="theme-accessibility-button"
      >
        <Accessibility className="w-6 h-6" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-semibold">
          Lector Accesible
        </span>
      </button>

      {/* Popover Options Card */}
      {isOpen && (
        <div className="absolute bottom-18 right-0 w-72 bg-white border border-slate-200 rounded-2xl p-5 shadow-2xl space-y-5 animate-scaleUp text-slate-800">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <h4 className="font-extrabold text-sm flex items-center gap-1.5 text-slate-900">
              <Accessibility className="w-4 h-4 text-orange-600" />
              Asistente de Lectura
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
            >
              Cerrar
            </button>
          </div>

          {/* Sizing Controls */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-slate-400" />
              Tamaño del texto (Zoom)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontSizeScale('normal')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                  fontSizeScale === 'normal'
                    ? 'bg-orange-50 text-orange-700 border-orange-500 font-extrabold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
                id="btn-font-normal"
              >
                Chico (A)
              </button>
              <button
                onClick={() => setFontSizeScale('large')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                  fontSizeScale === 'large'
                    ? 'bg-orange-50 text-orange-700 border-orange-500 font-extrabold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
                id="btn-font-large"
              >
                Medio (A+)
              </button>
              <button
                onClick={() => setFontSizeScale('xl')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                  fontSizeScale === 'xl'
                    ? 'bg-orange-50 text-orange-700 border-orange-500 font-extrabold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
                id="btn-font-xl"
              >
                Grande (A++)
              </button>
            </div>
            <p className="text-[10px] text-slate-400 italic">Ideal para proyectores de aula.</p>
          </div>

          {/* High Contrast */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              Aspecto de Contraste
            </label>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                highContrast
                  ? 'bg-slate-900 text-white border-slate-800 font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              id="opt-contrast-toggle"
            >
              <span>{highContrast ? 'Contraste Clínico Activado' : 'Contraste Cálido Regular'}</span>
              <span className={`w-2 h-2 rounded-full ${highContrast ? 'bg-green-400' : 'bg-slate-300'}`} />
            </button>
          </div>

          {/* Volume Test */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              Sincronización Acústica
            </span>
            <button
              onClick={testSpeaker}
              className="w-full py-2 bg-white border border-slate-200 hover:bg-orange-50/10 text-slate-700 hover:text-orange-700 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
              id="btn-speak-test"
            >
              <Volume2 className="w-3.5 h-3.5 text-orange-600" />
              Probar Timbre de Aula
            </button>
            <p className="text-[9px] text-slate-400 leading-normal">
              Pulsa antes de clase para verificar el altavoz para las dinámicas de audio.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
