/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Activity, ActivityCategory } from '../types';
import { Filter, Clock, BookOpen, Search, Layers, Play, Pause, RotateCcw, AlertTriangle, CheckSquare, Plus, Bell, Volume2, Sparkles, HelpCircle, Image as ImageIcon } from 'lucide-react';

interface ResourcesProps {
  activities: Activity[];
}

export default function Resources({ activities }: ResourcesProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Filters State
  const [stageFilter, setStageFilter] = useState<string>('todos');
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [durationFilter, setDurationFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerMaxSeconds, setTimerMaxSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [flashAlert, setFlashAlert] = useState<boolean>(false);
  
  // Auditory Alert Config
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Set first activity as default selected on load if not selected or if previous selected is gone
  useEffect(() => {
    if (activities.length > 0) {
      if (!selectedActivity || !activities.some(a => a.id === selectedActivity.id)) {
        setSelectedActivity(activities[0]);
      }
    } else {
      setSelectedActivity(null);
    }
  }, [activities, selectedActivity]);

  // Sync timer when selectedActivity changes
  useEffect(() => {
    if (selectedActivity) {
      const defaultDuration = selectedActivity.steps[0]?.duration || selectedActivity.duration || 10;
      const secs = defaultDuration * 60;
      setTimerSeconds(secs);
      setTimerMaxSeconds(secs);
      setActiveStepIndex(0);
      setTimerRunning(false);
      setFlashAlert(false);
    }
  }, [selectedActivity]);

  // Timer Ticker Loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerRunning && timerSeconds === 0) {
      setTimerRunning(false);
      triggerTimerAlert();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  // Synthesize custom chime using Web Audio API to prevent external file loads
  const playChimeAlert = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const now = ctx.currentTime;
      
      // Arpeggio chord synthesis
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        
        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.45);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.5);
      });
    } catch (e) {
      console.warn('Audio Context API blocked by security policies', e);
    }
  };

  const triggerTimerAlert = () => {
    playChimeAlert();
    setFlashAlert(true);
    
    // Auto clear alert state after 6 seconds
    setTimeout(() => {
      setFlashAlert(false);
    }, 6000);
  };

  const handleSelectActivity = (act: Activity) => {
    setSelectedActivity(act);
    setTimerRunning(false);
    setFlashAlert(false);
  };

  const adjustTimer = (amountSeconds: number) => {
    setTimerSeconds((prev) => {
      const newSecs = Math.max(0, prev + amountSeconds);
      if (newSecs > timerMaxSeconds) {
        setTimerMaxSeconds(newSecs);
      }
      return newSecs;
    });
    setFlashAlert(false);
  };

  const handleLoadStepTime = (mins: number, stepIdx: number) => {
    const secs = mins * 60;
    setTimerSeconds(secs);
    setTimerMaxSeconds(secs);
    setActiveStepIndex(stepIdx);
    setTimerRunning(true);
    setFlashAlert(false);
    
    // Small click confirmation beep
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
    setFlashAlert(false);
  };

  const resetTimer = () => {
    setTimerSeconds(timerMaxSeconds);
    setTimerRunning(false);
    setFlashAlert(false);
  };

  // Filter and Search Logic
  const filteredActivities = activities.filter((act) => {
    // Search query match
    const matchesSearch = 
      searchQuery.trim() === '' ||
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.targetGrade.toLowerCase().includes(searchQuery.toLowerCase());

    // Course Match
    const matchesStage =
      stageFilter === 'todos' ||
      (stageFilter === '1_2_eso' && (act.targetGrade.includes('1º') || act.targetGrade.includes('2º'))) ||
      (stageFilter === '3_4_eso' && (act.targetGrade.includes('3º') || act.targetGrade.includes('4º'))) ||
      (stageFilter === 'bach' && (act.targetGrade.toLowerCase().includes('bach') || act.targetGrade.toLowerCase().includes('bachillerato')));

    // Category
    const matchesCategory =
      categoryFilter === 'todos' || act.category === categoryFilter;

    // Duration
    let matchesDuration = true;
    if (durationFilter === 'short') matchesDuration = act.duration < 25;
    else if (durationFilter === 'med') matchesDuration = act.duration >= 25 && act.duration <= 45;
    else if (durationFilter === 'long') matchesDuration = act.duration > 45;

    return matchesSearch && matchesStage && matchesCategory && matchesDuration;
  });

  const getCategoryLabel = (cat: ActivityCategory) => {
    switch (cat) {
      case 'rompehielos': return 'Rompehielos Dinámico';
      case 'reflexion': return 'Reflexión Profunda';
      case 'debate': return 'Debate Activo';
      case 'artistico': return 'Expresión Artística';
      default: return 'Recurso de Aula';
    }
  };

  const getCategoryColor = (cat: ActivityCategory) => {
    switch (cat) {
      case 'rompehielos': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'reflexion': return 'bg-violet-50 text-violet-800 border-violet-200/60';
      case 'debate': return 'bg-rose-50 text-rose-800 border-rose-200/60';
      case 'artistico': return 'bg-teal-50 text-teal-800 border-teal-200/60';
      default: return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  // Map category to a gorgeous free Unsplash support photo to address the 'supporting images' goal
  const getCategoryPhoto = (cat: ActivityCategory) => {
    switch (cat) {
      case 'rompehielos': 
        return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&h=300&q=80'; // collaborative digital table
      case 'reflexion': 
        return 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=700&h=300&q=80'; // focused study/books
      case 'debate': 
        return 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=700&h=300&q=80'; // laughing diverse students
      case 'artistico': 
        return 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=700&h=300&q=80'; // color templates
      default: 
        return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&h=300&q=80';
    }
  };

  const formatTimeMinutes = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-white via-slate-50/55 to-slate-100/50" id="resources-section">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Title */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold font-sans uppercase tracking-wide border border-indigo-200">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            Catálogo Didáctico Activo
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight leading-none">
            Recursos y Dinámicas de Aula
          </h2>
          <p className="font-sans text-slate-500 text-sm md:text-base max-w-3xl leading-relaxed">
            Fichas metodológicas interactivas, desglosadas cronológicamente para facilitar su aplicación inmediata en el aula. Utiliza el **cronómetro integrado** para liderar cada fase de juego sin desviar el compás escolar.
          </p>
        </div>

        {/* Filters and Live Search Panel (Beautifully interactive) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-12 gap-5 shadow-xs items-center" id="filter-and-search-form">
          
          {/* Live Search */}
          <div className="md:col-span-4 relative">
            <label className="block text-[10px] font-bold font-sans text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Search className="w-3 h-3" /> Buscar en catálogo
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Escribe título o palabra clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/50 hover:bg-slate-50 text-xs sm:text-sm text-slate-800 font-medium border border-slate-200 focus:border-teal-500 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
                id="search-input-catalog"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Filter 1: Curso */}
          <div className="md:col-span-3">
            <label className="block text-[10px] font-bold font-sans text-slate-400 uppercase tracking-widest mb-1.5">Curso / Etapa</label>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full bg-slate-50/50 hover:bg-slate-50 text-xs sm:text-sm text-slate-700 font-bold border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              id="filter-stage"
            >
              <option value="todos">Todos los niveles</option>
              <option value="1_2_eso">1º y 2º ESO</option>
              <option value="3_4_eso">3º y 4º ESO</option>
              <option value="bach">4º ESO y Bachillerato</option>
            </select>
          </div>

          {/* Filter 2: Categoría */}
          <div className="md:col-span-3">
            <label className="block text-[10px] font-bold font-sans text-slate-400 uppercase tracking-widest mb-1.5">Tipo de Dinámica</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50/50 hover:bg-slate-50 text-xs sm:text-sm text-slate-700 font-bold border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              id="filter-category"
            >
              <option value="todos">Todas las categorías</option>
              <option value="rompehielos">Rompehielos Dinámicos</option>
              <option value="reflexion">Reflexión Profunda</option>
              <option value="debate">Debates Activos</option>
              <option value="artistico">Expresión Artística</option>
            </select>
          </div>

          {/* Filter 3: Duración */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold font-sans text-slate-400 uppercase tracking-widest mb-1.5">Minutos libres</label>
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="w-full bg-slate-50/50 hover:bg-slate-50 text-xs sm:text-sm text-slate-700 font-bold border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              id="filter-duration"
            >
              <option value="todos">Cualquiera</option>
              <option value="short">Corta (&lt; 25 min)</option>
              <option value="med">Media (25 - 45 min)</option>
              <option value="long">Larga (&gt; 45 min)</option>
            </select>
          </div>
        </div>

        {/* Main Work Area: Left grid cards / Right detail plan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Grid of filtered activities */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-sans font-extrabold text-xs text-slate-400 uppercase tracking-widest flex items-center justify-between pl-1">
              <span>Dinámicas coincidentes ({filteredActivities.length})</span>
              {(stageFilter !== 'todos' || categoryFilter !== 'todos' || durationFilter !== 'todos' || searchQuery !== '') ? (
                <button 
                  onClick={() => {setStageFilter('todos'); setCategoryFilter('todos'); setDurationFilter('todos'); setSearchQuery('');}}
                  className="text-xs text-teal-600 hover:underline cursor-pointer font-extrabold font-sans"
                  id="reset-filters"
                >
                  Limpiar filtros
                </button>
              ) : null}
            </h3>

            {filteredActivities.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-4 shadow-2xs">
                <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto animate-bounce" />
                <p className="font-sans text-sm text-slate-700 font-extrabold">No se encontraron dinámicas.</p>
                <p className="font-sans text-xs text-slate-400">Intenta reescribir la palabra clave o restablecer el panel.</p>
                <button
                  onClick={() => { setStageFilter('todos'); setCategoryFilter('todos'); setDurationFilter('todos'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  id="reset-filters-empty"
                >
                  Restablecer filtros globales
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[850px] overflow-y-auto pr-2" id="filtered-cards-scroller">
                {filteredActivities.map((act) => {
                  const isSelected = selectedActivity?.id === act.id;
                  return (
                    <button
                      key={act.id}
                      onClick={() => handleSelectActivity(act)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer select-none ${
                        isSelected
                          ? 'bg-gradient-to-br from-teal-600 to-[#1d4ed8] text-white border-transparent shadow-md transform -translate-y-0.5'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300 shadow-3xs'
                      }`}
                      id={`activity-card-${act.id}`}
                    >
                      <div className="space-y-3 w-full">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full font-sans font-bold text-[9px] border uppercase ${
                            isSelected 
                              ? 'bg-white/15 text-white border-white/25' 
                              : getCategoryColor(act.category)
                          }`}>
                            {getCategoryLabel(act.category)}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase border ${
                            isSelected 
                              ? 'bg-white/10 text-teal-100 border-white/10' 
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                          }`}>
                            {act.targetGrade}
                          </span>
                        </div>

                        <h4 className="font-sans font-extrabold text-base md:text-lg tracking-tight leading-tight">
                          {act.title}
                        </h4>

                        {/* Short objective */}
                        <p className={`line-clamp-2 text-xs font-sans leading-relaxed ${isSelected ? 'text-teal-50/90 font-medium' : 'text-slate-500'}`}>
                          {act.objective}
                        </p>
                      </div>

                      {/* Footer label */}
                      <div className="mt-4 pt-3 flex items-center justify-between border-t border-dashed w-full text-xs"
                        style={{ borderColor: isSelected ? 'rgba(255,255,255,0.15)' : '#e2e8f0' }}>
                        <span className="flex items-center gap-1 font-semibold font-sans">
                          <Clock className="w-3.5 h-3.5" />
                          {act.duration} Minutos
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-amber-300' : 'text-teal-600 font-extrabold'}`}>
                          Ver planificación completa →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Detailed Planning & Interactive Live Classroom Timer */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
            {selectedActivity ? (
              <div className="space-y-8 animate-fadeIn" key={selectedActivity.id}>
                
                {/* Visual Header Image from Unsplash relevant database */}
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group" id="selected-activity-visual-photo">
                  <img
                    src={getCategoryPhoto(selectedActivity.category)}
                    alt={selectedActivity.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-200/90 font-mono mb-1 rounded-md bg-slate-950/40 px-2 py-0.5 inline-block self-start">
                      Fotografía de apoyo educativo
                    </span>
                    <h4 className="text-white font-sans font-black text-lg md:text-xl leading-tight tracking-tight shadow-text">
                      {selectedActivity.title}
                    </h4>
                  </div>
                </div>

                {/* Header info metadata */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#4f46e5] font-extrabold bg-[#4f46e5]/10 px-2.5 py-1 rounded-lg">
                      Ficha Lectiva Curricular
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold font-sans border border-teal-100">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      Plan completo: {selectedActivity.duration} mins
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1.5">
                    <h5 className="font-sans font-bold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Objetivo Pedagógico Principal
                    </h5>
                    <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold italic">
                      "{selectedActivity.objective}"
                    </p>
                  </div>
                </div>

                {/* INTERACTIVE CRONÓMETRO - CLASSROOM TIMER WIDGET */}
                <div className={`border-2 rounded-2xl p-6 transition-all shadow-inner ${
                  flashAlert 
                    ? 'border-rose-500 bg-rose-50 animate-bounce' 
                    : 'border-teal-600 bg-teal-50/10'
                }`} id="classroom-live-runner">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="font-sans font-extrabold text-sm text-slate-900 flex items-center justify-center sm:justify-start gap-2 leading-none">
                        <Volume2 className="w-4 h-4 text-teal-600 animate-pulse" />
                        Cronómetro de Aula Integrado
                      </h4>
                      <p className="font-sans text-[11px] text-slate-500 leading-normal">
                        {activeStepIndex >= 0 
                          ? `Fase ${activeStepIndex + 1}: ${selectedActivity.steps[activeStepIndex].title}` 
                          : 'Haz clic en "Cargar e Iniciar" en cualquier fase de abajo.'
                        }
                      </p>
                    </div>

                    {/* Timer digits display with manual adjustments */}
                    <div className="flex items-center gap-3 md:gap-4 shrink-0 bg-slate-100/50 p-2 rounded-2xl border border-slate-200/40">
                      <div className="font-mono text-3xl sm:text-3.5xl text-teal-800 font-extrabold bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-2xs min-w-[100px] sm:min-w-[120px] text-center tracking-tight leading-none">
                        {formatTimeMinutes(timerSeconds)}
                      </div>

                      {/* Minute Adjusters */}
                      <div className="flex flex-col gap-1 justify-center shrink-0">
                        <button
                          onClick={() => adjustTimer(60)}
                          className="px-2 py-1 bg-teal-100 hover:bg-teal-200 text-teal-800 text-[10px] sm:text-[11px] font-black rounded-lg border border-teal-200 cursor-pointer hover:scale-102 transition-all duration-150 relative select-none"
                          title="Añadir 1 minuto"
                          id="timer-add-min"
                        >
                          +1 Min
                        </button>
                        <button
                          onClick={() => adjustTimer(-60)}
                          className="px-2 py-1 bg-slate-200/70 hover:bg-slate-200 text-slate-750 text-[10px] sm:text-[11px] font-black rounded-lg border border-slate-300 cursor-pointer hover:scale-102 transition-all duration-150 relative select-none"
                          title="Restar 1 minuto"
                          id="timer-sub-min"
                        >
                          -1 Min
                        </button>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
                        <button
                          onClick={toggleTimer}
                          className="p-2.5 sm:p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-all cursor-pointer shadow-xs focus:ring-4 focus:ring-teal-500/10 hover:scale-105 active:scale-95"
                          title={timerRunning ? 'Pausar' : 'Iniciar'}
                          id="timer-play-pause"
                        >
                          {timerRunning ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        </button>
                        <button
                          onClick={resetTimer}
                          className="p-2.5 sm:p-3 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all cursor-pointer hover:scale-105 active:scale-95"
                          title="Reiniciar"
                          id="timer-reset"
                        >
                          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Flash notice */}
                  {flashAlert && (
                    <div className="mt-3 text-center text-rose-700 font-sans font-extrabold text-xs flex items-center justify-center gap-1.5 leading-none animate-pulse bg-white py-2 rounded-lg border border-rose-200 shadow-2xs">
                      <Bell className="w-4 h-4 animate-shake" /> ¡FASE COMPLETADA! Es momento de pasar a la siguiente dinámica.
                    </div>
                  )}
                </div>

                {/* Required Materials */}
                <div className="space-y-3">
                  <h4 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2 pl-1">
                    <CheckSquare className="w-4 h-4 text-teal-600" />
                    Materiales Requeridos para el Aula
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-600">
                    {selectedActivity.materials.map((mat, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-50 border border-slate-100 p-3 rounded-xl hover:border-slate-300 transition-all">
                        <span className="text-teal-600 font-bold">✔</span>
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step by Step - Paso a Paso */}
                <div className="space-y-4">
                  <h4 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-wider pl-1 font-sans">
                    Desarrollo del Paso a Paso (Cronometrado)
                  </h4>
                  <p className="font-sans text-xs text-slate-400 italic">
                    💡 Haz clic en el botón <strong className="text-teal-600">"Cargar e Iniciar"</strong> al lado de cada fase para volcar de inmediato los minutos recomendados en el cronómetro de arriba.
                  </p>

                  <div className="relative border-l-2 border-slate-100 pl-5 ml-2.5 space-y-6">
                    {selectedActivity.steps.map((step, idx) => {
                      const isActiveStep = activeStepIndex === idx;
                      return (
                        <div key={idx} className="relative group/step">
                          {/* Circle node indicator */}
                          <div className={`absolute -left-[31px] top-1.5 w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center text-[9px] font-black ${
                            isActiveStep 
                              ? 'bg-teal-600 border-teal-600 text-white shadow-xs' 
                              : 'bg-white border-slate-200 text-slate-400'
                          }`}>
                            {idx + 1}
                          </div>

                          <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
                            isActiveStep 
                              ? 'bg-teal-50/20 border-teal-500' 
                              : 'bg-white border-slate-200 hover:border-slate-300 shadow-3xs'
                          }`}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                              <h5 className="font-sans font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                                {step.title}
                              </h5>
                              {step.duration && (
                                <button
                                  onClick={() => handleLoadStepTime(step.duration!, idx)}
                                  className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer select-none shrink-0 ${
                                    isActiveStep 
                                      ? 'bg-teal-600 text-white border-transparent' 
                                      : 'bg-white text-teal-700 border-teal-200 hover:bg-teal-50/50'
                                  }`}
                                  id={`load-step-${idx}`}
                                >
                                  <Clock className="w-3.5 h-3.5" />
                                  {step.duration} min - Cargar e Iniciar
                                </button>
                              )}
                            </div>

                            <p className="font-sans text-xs text-slate-500 leading-relaxed font-normal">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Teacher's Key Reflection Questions */}
                <div className="pt-6 border-t border-slate-200 space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h4 className="font-sans font-extrabold text-xs text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Preguntas Clave para el Cierre y Plenaria
                  </h4>
                  <p className="font-sans text-xs text-slate-400">
                    Utiliza estas preguntas formuladas por psicopedagogos para exprimir el aprendizaje al final de la sesión grupal:
                  </p>
                  <ul className="space-y-2 font-sans text-xs text-slate-700">
                    {selectedActivity.keyReflectionQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-white border border-slate-100/50 p-2 rounded-lg">
                        <span className="text-teal-600 font-bold shrink-0">💬</span>
                        <span className="font-semibold">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-slate-400 font-sans text-sm italic">
                Cargando dinámicas didácticas...
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
