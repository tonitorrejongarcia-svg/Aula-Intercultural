/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Activity, ActivityCategory } from '../types';
import { Filter, Clock, BookOpen, Search, Layers, CheckSquare, Sparkles } from 'lucide-react';

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

  const handleSelectActivity = (act: Activity) => {
    setSelectedActivity(act);
  };

  // Filter and Search Logic
  const filteredActivities = activities.filter((act) => {
    const targetGradeSafe = (act.targetGrade || '').toLowerCase();
    const titleSafe = (act.title || '').toLowerCase();
    const objectiveSafe = (act.objective || '').toLowerCase();
    const querySafe = (searchQuery || '').trim().toLowerCase();

    const matchesSearch = 
      querySafe === '' ||
      titleSafe.includes(querySafe) ||
      objectiveSafe.includes(querySafe) ||
      targetGradeSafe.includes(querySafe);

    const matchesStage = 
      stageFilter === 'todos' ||
      targetGradeSafe.includes('todos') ||
      (stageFilter === 'infantil' && (targetGradeSafe.includes('infantil') || targetGradeSafe.includes('3-6'))) ||
      (stageFilter === 'primaria' && (targetGradeSafe.includes('primaria') || targetGradeSafe.includes('6-12'))) ||
      (stageFilter === 'eso' && targetGradeSafe.includes('eso')) ||
      (stageFilter === 'bachillerato' && targetGradeSafe.includes('bach'));

    const matchesCategory =
      categoryFilter === 'todos' || act.category === categoryFilter;

    let matchesDuration = true;
    const dur = Number(act.duration) || 0;
    if (durationFilter === 'short') matchesDuration = dur <= 30;
    else if (durationFilter === 'med') matchesDuration = dur > 30 && dur <= 50;
    else if (durationFilter === 'long') matchesDuration = dur > 50;

    return matchesSearch && matchesStage && matchesCategory && matchesDuration;
  });

  const getCategoryLabel = (cat: ActivityCategory) => {
    switch (cat) {
      case 'rompehielos': return 'Rompehielos Dinámico';
      case 'reflexion': return 'Reflexión Profunda';
      case 'debate': return 'Debate Activo';
      case 'artistico': return 'Expresión Artística';
      case 'cooperativo': return 'Trabajo Cooperativo';
      case 'resolucion-conflictos': return 'Resolución de Conflictos';
      case 'analisis-medios': return 'Análisis de Medios';
      case 'juego-de-roles': return 'Role-playing y Empatía';
      case 'literatura-cine': return 'Cine y Narrativas';
      case 'empatia': return 'Empatía y Emociones';
      case 'cohesion': return 'Cohesión Grupal';
      default: return 'Recurso de Aula';
    }
  };

  const getCategoryColor = (cat: ActivityCategory) => {
    switch (cat) {
      case 'rompehielos': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'reflexion': return 'bg-violet-50 text-violet-800 border-violet-200/60';
      case 'debate': return 'bg-rose-50 text-rose-800 border-rose-200/60';
      case 'artistico': return 'bg-orange-50 text-orange-800 border-orange-200/60';
      case 'cooperativo': return 'bg-blue-50 text-blue-800 border-blue-200/60';
      case 'resolucion-conflictos': return 'bg-emerald-50 text-emerald-800 border-emerald-200/60';
      case 'analisis-medios': return 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200/60';
      case 'juego-de-roles': return 'bg-indigo-50 text-indigo-800 border-indigo-200/60';
      case 'literatura-cine': return 'bg-cyan-50 text-cyan-800 border-cyan-200/60';
      default: return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  const getCategoryPhoto = (cat: ActivityCategory) => {
    switch (cat) {
      case 'rompehielos': 
        return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&h=300&q=80';
      case 'reflexion': 
        return 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=700&h=300&q=80';
      case 'debate': 
        return 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=700&h=300&q=80';
      case 'artistico': 
        return 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=700&h=300&q=80';
      default: 
        return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&h=300&q=80';
    }
  };

  return (
    <section id="resources" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-serif text-slate-900 tracking-tight sm:text-4xl mb-4">
            Recursos y Dinámicas de Aula
          </h2>
          <p className="text-lg text-slate-600 font-sans leading-relaxed">
            Explora nuestro banco de actividades interactivas. Fichas metodológicas desglosadas para facilitar su aplicación inmediata en el aula. Sigue los pasos detallados para liderar cada fase de juego.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-96 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por objetivo, título o curso..."
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 sm:text-sm font-sans transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Filtros:</span>
            </div>
            <select
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500/20 focus:border-orange-500 block p-2 font-sans outline-none"
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
            >
              <option value="todos">Todos los Niveles</option>
              <option value="infantil">Infantil</option>
              <option value="primaria">Primaria</option>
              <option value="eso">ESO</option>
              <option value="bachillerato">Bachillerato</option>
            </select>
            <select
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500/20 focus:border-orange-500 block p-2 font-sans outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="todos">Todas las Temáticas</option>
              <option value="empatia">Empatía</option>
              <option value="cohesion">Cohesión</option>
              <option value="rompehielos">Rompehielos</option>
              <option value="reflexion">Reflexión</option>
              <option value="debate">Debate</option>
              <option value="artistico">Artístico</option>
              <option value="cooperativo">Cooperativo</option>
              <option value="resolucion-conflictos">Resolución de Conflictos</option>
              <option value="analisis-medios">Análisis de Medios</option>
              <option value="juego-de-roles">Role-playing</option>
              <option value="literatura-cine">Cine y Literatura</option>
            </select>
            <select
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500/20 focus:border-orange-500 block p-2 font-sans outline-none"
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
            >
              <option value="todos">Cualquier Duración</option>
              <option value="short">Corta (hasta 30 min)</option>
              <option value="med">Media (de 35 a 50 min)</option>
              <option value="long">Larga (más de 50 min)</option>
            </select>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3 shrink-0 lg:sticky lg:top-24 max-h-[80vh] overflow-y-auto pr-2 pb-8 custom-scrollbar">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((act) => (
                <button
                  key={act.id}
                  onClick={() => handleSelectActivity(act)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 group ${
                    selectedActivity?.id === act.id
                      ? 'bg-white border-orange-500 shadow-md ring-1 ring-orange-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${getCategoryColor(act.category)}`}>
                      {getCategoryLabel(act.category)}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 font-sans flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {act.duration} min
                    </span>
                  </div>
                  <h3 className={`font-serif text-lg font-medium leading-tight mb-1.5 transition-colors ${
                    selectedActivity?.id === act.id ? 'text-orange-900' : 'text-slate-900 group-hover:text-orange-600'
                  }`}>
                    {act.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Nivel: {act.targetGrade}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500 font-sans">No hay actividades que coincidan con estos filtros.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setStageFilter('todos');
                    setCategoryFilter('todos');
                    setDurationFilter('todos');
                  }}
                  className="mt-4 text-orange-600 font-semibold text-xs hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>

          {/* Main Activity Detail Panel */}
          <div className="w-full lg:w-2/3 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {selectedActivity ? (
              <div className="flex flex-col h-full relative">
                
                {/* Hero Image Block */}
                <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-slate-100">
                  <img 
                    src={getCategoryPhoto(selectedActivity.category)} 
                    alt="Soporte visual dinámica" 
                    className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                    <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${getCategoryColor(selectedActivity.category)}`}>
                      {getCategoryLabel(selectedActivity.category)}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 space-y-8 relative">
                  
                  {/* Header Info */}
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 leading-tight">
                      {selectedActivity.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-sans font-semibold text-slate-500">
                      <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        {selectedActivity.targetGrade}
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                        <Clock className="w-4 h-4 text-slate-400" />
                        Tiempo total: {selectedActivity.duration} min
                      </div>
                      {selectedActivity.isCustom && (
                        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
                          <CheckSquare className="w-4 h-4" />
                          Aportación Comunitaria
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100/50">
                      <p className="font-sans text-sm text-slate-700 leading-relaxed">
                        <strong className="text-orange-800 font-bold">Objetivo: </strong>
                        {selectedActivity.objective}
                      </p>
                    </div>
                  </div>

                  {/* Required Materials */}
                  <div className="space-y-3">
                    <h4 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2 pl-1">
                      <CheckSquare className="w-4 h-4 text-orange-600" />
                      Materiales Requeridos para el Aula
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-600">
                      {selectedActivity.materials.map((mat, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-50 border border-slate-100 p-3 rounded-xl hover:border-slate-300 transition-all">
                          <span className="text-orange-600 font-bold">✔</span>
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Situaciones Propuestas */}
                  {selectedActivity.situations && selectedActivity.situations.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2 pl-1">
                        <Layers className="w-4 h-4 text-blue-600" />
                        Situaciones Propuestas de Aplicación
                      </h4>
                      <ul className="flex flex-col gap-2 text-xs font-sans text-slate-700">
                        {selectedActivity.situations.map((sit, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl hover:border-blue-200 transition-all leading-relaxed">
                            <span className="text-blue-600 font-bold mt-0.5">▶</span>
                            <span>{sit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Ejemplos Prácticos sugeridos */}
                  {selectedActivity.practicalExamples && selectedActivity.practicalExamples.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2 pl-1">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        Ejemplos de Aplicación Práctica
                      </h4>
                      <ul className="flex flex-col gap-2 text-xs font-sans text-slate-700">
                        {selectedActivity.practicalExamples.map((ex, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-xl hover:border-emerald-200 transition-all leading-relaxed">
                            <span className="text-emerald-600 font-bold mt-0.5">↳</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Step by Step - Paso a Paso */}
                  <div className="space-y-4">
                    <h4 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-wider pl-1 font-sans">
                      Desarrollo del Paso a Paso
                    </h4>
                    <div className="relative border-l-2 border-slate-100 pl-5 ml-2.5 space-y-6">
                      {selectedActivity.steps.map((step, idx) => {
                        return (
                          <div key={idx} className="relative group/step">
                            {/* Circle node indicator */}
                            <div className="absolute -left-[31px] top-1.5 w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center text-[9px] font-black bg-white border-slate-200 text-slate-400">
                              {idx + 1}
                            </div>
                            <div className="p-4 rounded-2xl border transition-all space-y-3 bg-white border-slate-200 hover:border-slate-300 shadow-sm">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                <h5 className="font-sans font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                                  {step.title}
                                </h5>
                                {step.duration && (
                                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 shrink-0">
                                    <Clock className="w-3.5 h-3.5" />
                                    {step.duration} min
                                  </span>
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
                      <Sparkles className="w-4 h-4 text-slate-500" />
                      Preguntas Clave para el Cierre y Plenaria
                    </h4>
                    <p className="font-sans text-xs text-slate-400">
                      Utiliza estas preguntas formuladas por psicopedagogos para exprimir el aprendizaje al final de la sesión grupal:
                    </p>
                    <ul className="space-y-2 font-sans text-xs text-slate-700">
                      {selectedActivity.keyReflectionQuestions.map((q, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white border border-slate-100/50 p-2 rounded-lg">
                          <span className="text-orange-600 font-bold shrink-0">💬</span>
                          <span className="font-semibold">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

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
