/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Activity, ActivityCategory } from '../types';
import { MessageSquare, Share2, Plus, CheckCircle, Trash } from 'lucide-react';

interface ContactProps {
  onAddCustomActivity: (newAct: Activity) => void;
  customActivities: Activity[];
  onClearCustomActivities: () => void;
}

export default function Contact({ onAddCustomActivity, customActivities, onClearCustomActivities }: ContactProps) {
  // Feedback Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactRole, setContactRole] = useState('Profesorado');
  const [contactMessage, setContactMessage] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Proposal Form State (Interactive Dynamic Creator)
  const [propTitle, setPropTitle] = useState('');
  const [propGrade, setPropGrade] = useState('1º y 2º ESO');
  const [propCategory, setPropCategory] = useState<ActivityCategory>('reflexion');
  const [propDuration, setPropDuration] = useState('30');
  const [propObjective, setPropObjective] = useState('');
  const [propMaterials, setPropMaterials] = useState('');
  const [propSteps, setPropSteps] = useState('');
  const [propQuestions, setPropQuestions] = useState('');
  const [proposalSent, setProposalSent] = useState(false);

  // Submit Feedback
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert('Por favor, rellena todos los campos del formulario de contacto.');
      return;
    }
    setFeedbackSent(true);
    setTimeout(() => {
      // Refresh form
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 3000);
  };

  // Submit Proposal Activity
  const handleProposalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!propTitle || !propObjective || !propSteps) {
      alert('Por favor, rellena los campos principales (Título, Objetivo y Paso a paso).');
      return;
    }

    // Parse comma-separated materials and questions
    const parsedMaterials = propMaterials
      ? propMaterials.split(',').map((item) => item.trim()).filter(Boolean)
      : ['Papel y bolígrafos convencionales'];

    const parsedQuestions = propQuestions
      ? propQuestions.split('?').map((item) => item.trim() + '?').filter((item) => item.length > 2)
      : ['¿Qué conclusiones extraéis de esta actividad?', '¿Cómo influye en el día a día?'];

    // Parse lines to steps list
    const stepsArray = propSteps
      .split('\n')
      .map((line, idx) => line.trim())
      .filter(Boolean)
      .map((stepDesc, idx) => ({
        title: `Paso ${idx + 1}`,
        description: stepDesc,
        duration: Math.round(Number(propDuration) / 3 || 10), // approximate duration per step
      }));

    const newActivity: Activity = {
      id: `custom-${Date.now()}`,
      title: propTitle,
      objective: propObjective,
      targetGrade: propGrade,
      duration: Number(propDuration) || 30,
      category: propCategory,
      materials: parsedMaterials,
      steps: stepsArray,
      keyReflectionQuestions: parsedQuestions,
      isCustom: true,
    };

    onAddCustomActivity(newActivity);
    setProposalSent(true);

    // Reset fields after quick delay
    setTimeout(() => {
      setPropTitle('');
      setPropObjective('');
      setPropMaterials('');
      setPropSteps('');
      setPropQuestions('');
      setPropDuration('30');
      setProposalSent(false);
    }, 4000);
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-b from-white via-teal-50/10 to-slate-50/50" id="contact-section">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold font-sans uppercase tracking-wide border border-teal-200">
            <Share2 className="w-3.5 h-3.5" />
            Comunidad de Docentes Activa
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Intercambio de Saberes e Incidencia
          </h2>
          <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
            ¿Has probado alguna dinámica innovadora en tu centro de secundaria? Rellena el creador interactivo para subirla de inmediato o contáctanos para asesorías personalizadas de claustro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT COLUMN: PROPOSAL FORM (Add Dynamic Community Board) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="font-sans font-extrabold text-slate-900 text-xl flex items-center gap-2">
                <Plus className="w-6 h-6 text-teal-600" />
                Creador de Dinámicas Interactivas
              </h3>
              <p className="font-sans text-xs text-slate-500 leading-normal">
                Rellena este creador. Al proponer tu recurso, este se añadirá <strong>de inmediato y de forma persistente</strong> a la lista de "Recursos de Aula" en la cabecera, junto con todas tus fases para poder usar el cronómetro en directo.
              </p>
            </div>

            {proposalSent ? (
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center space-y-4 animate-scaleUp">
                <CheckCircle className="w-12 h-12 text-teal-600 mx-auto animate-pulse" />
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-lg text-teal-800">¡Dinámica creada con éxito!</h4>
                  <p className="font-sans text-xs text-teal-900 leading-normal">
                    Tu propuesta ha sido incorporada a la base de datos local de forma inmediata. Navega a la pestaña de <strong>"Recursos de Aula"</strong> en la cabecera para verla publicada con todas sus fases y cronómetro adaptado.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="space-y-4 font-sans text-xs [align-items:stretch]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Título de la Dinámica *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: El Buzón de la Diversidad"
                      value={propTitle}
                      onChange={(e) => setPropTitle(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-550/20"
                    />
                  </div>
                  
                  {/* Grade */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Nivel Educativo Recomendado</label>
                    <select
                      value={propGrade}
                      onChange={(e) => setPropGrade(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-550/20 font-medium text-slate-700"
                    >
                      <option value="1º y 2º ESO font-medium">1º y 2º ESO</option>
                      <option value="3º y 4º ESO font-medium">3º y 4º ESO</option>
                      <option value="Bachillerato font-medium">Bachillerato</option>
                      <option value="Cualquier curso font-medium">Todos los Cursos</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Categoría Pedagógica</label>
                    <select
                      value={propCategory}
                      onChange={(e) => setPropCategory(e.target.value as ActivityCategory)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-550/20 font-medium text-slate-700"
                    >
                      <option value="rompehielos">Rompehielos Dinámico</option>
                      <option value="reflexion">Reflexión Profunda</option>
                      <option value="debate">Debate Activo</option>
                      <option value="artistico">Expresión Artística</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Duración Total Estimada (Minutos)</label>
                    <input
                      type="number"
                      required
                      min="5"
                      max="120"
                      value={propDuration}
                      onChange={(e) => setPropDuration(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-550/20"
                    />
                  </div>
                </div>

                {/* Objective */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Objetivo General *</label>
                  <textarea
                    required
                    placeholder="Describe en una frase corta la meta formativa o afectiva..."
                    rows={2}
                    value={propObjective}
                    onChange={(e) => setPropObjective(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 bg-scroll focus:outline-none focus:ring-2 focus:ring-teal-550/20"
                  />
                </div>

                {/* Materials */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Materiales Necesarios (Separados por comas)</label>
                  <input
                    type="text"
                    placeholder="Ej: Globos de colores, Hilos de lana, Tijeras"
                    value={propMaterials}
                    onChange={(e) => setPropMaterials(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-550/20"
                  />
                </div>

                {/* Steps */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Fases / Paso a paso de la Dinámica (Escribe cada paso en una línea nueva) *</label>
                  <textarea
                    required
                    placeholder="Línea 1: Presentación inicial de los roles&#13;Línea 2: Formación de equipos cooperativos&#13;Línea 3: Debate plenario"
                    rows={3}
                    value={propSteps}
                    onChange={(e) => setPropSteps(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 bg-scroll focus:outline-none focus:ring-2 focus:ring-teal-550/20"
                  />
                </div>

                {/* Questions */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Preguntas de Reflexión Final (Separados por signos de interrogación '?')</label>
                  <input
                    type="text"
                    placeholder="¿Cómo os habéis sentido al iniciar? ¿Qué valores habéis descubierto?"
                    value={propQuestions}
                    onChange={(e) => setPropQuestions(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-550/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none cursor-pointer transform hover:-translate-y-0.5"
                  id="submit-proposal-btn"
                >
                  🚀 Crear y Publicar Dinámica
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: DIRECT FEEDBACK CONTACT & COMMUNITY STATS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Consultation Contact Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="font-sans font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-teal-600" />
                Asesorías pedagógicas y Consultas
              </h3>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                ¿Planeas un proyecto pluricultural de centro o deseas formación a medida para el claustro? Envíanos tu mensaje.
              </p>

              {feedbackSent ? (
                <div className="bg-teal-50 border border-teal-200 text-teal-800 rounded-2xl p-5 text-center space-y-2 animate-fadeIn">
                  <p className="font-sans text-xs font-bold">¡Mensaje enviado con éxito!</p>
                  <p className="font-sans text-[11px] text-teal-700">Nos pondremos en contacto contigo lo antes posible para coordinarnos.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Nombre y Apellidos</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Sofía Pérez"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      placeholder="sofia@instituto.es"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Tu rol educativo</label>
                    <select
                      value={contactRole}
                      onChange={(e) => setContactRole(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700"
                    >
                      <option value="Profesorado font-medium">Profesor / Profesora secundaria</option>
                      <option value="Orientacion font-medium">Departamento de Orientación</option>
                      <option value="Equipo Directivo font-medium">Equipo de Dirección</option>
                      <option value="Alumno font-medium">Alumno / Alumna</option>
                      <option value="Otros font-medium">Otros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Mensaje o Consulta</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Escribe aquí de qué formas podemos apoyarte..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 bg-scroll focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none cursor-pointer transform hover:-translate-y-0.5"
                    id="submit-contact-btn"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>

            {/* List of custom activities proposed in LocalStorage */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="font-sans font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center justify-between">
                <span>Dinámicas Creadas por Ti ({customActivities.length})</span>
                {customActivities.length > 0 && (
                  <button
                    onClick={onClearCustomActivities}
                    className="font-sans font-bold text-[10px] text-red-650 hover:underline flex items-center gap-1 cursor-pointer"
                    id="clear-customs-btn"
                  >
                    <Trash className="w-3.5 h-3.5" />
                    Borrar todas
                  </button>
                )}
              </h3>

              {customActivities.length === 0 ? (
                <p className="font-sans text-xs text-slate-400 italic">
                  Aún no has propuesto ninguna dinámica personalizada. ¡Usa el formulario creador de la izquierda para verla aparecer instantáneamente!
                </p>
              ) : (
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-2">
                  {customActivities.map((act) => (
                    <div key={act.id} className="p-3.5 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-between gap-3 shadow-3xs">
                      <div className="space-y-1">
                        <h4 className="font-sans font-bold text-xs text-slate-800 leading-tight line-clamp-1">{act.title}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-450">
                          <span>⏱ {act.duration} Min</span>
                          <span>•</span>
                          <span>{act.targetGrade}</span>
                        </div>
                      </div>
                      <span className="bg-teal-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full shrink-0">
                        {act.category.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
