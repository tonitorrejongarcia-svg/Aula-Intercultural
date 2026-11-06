/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Activity, ActivityCategory } from '../types';
import { MessageSquare, Share2, Plus, CheckCircle, Trash, Mail, Send, RefreshCw } from 'lucide-react';

interface ContactProps {
  onAddCustomActivity: (newAct: Activity) => void;
  customActivities: Activity[];
  onClearCustomActivities: () => void;
  supportEmail?: string;
}

export default function Contact({ 
  onAddCustomActivity, 
  customActivities, 
  onClearCustomActivities,
  supportEmail = 'ciudadaniaglobal@horuelo.net'
}: ContactProps) {
  // Feedback Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactRole, setContactRole] = useState('Profesorado');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [contactError, setContactError] = useState('');

  // Proposal Form State (Interactive Dynamic Creator)
  const [propTitle, setPropTitle] = useState('');
  const [propGrade, setPropGrade] = useState('ESO');
  const [propCategory, setPropCategory] = useState<ActivityCategory>('reflexion');
  const [propDuration, setPropDuration] = useState('30');
  const [propObjective, setPropObjective] = useState('');
  const [propMaterials, setPropMaterials] = useState('');
  const [propSteps, setPropSteps] = useState('');
  const [propQuestions, setPropQuestions] = useState('');
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);
  const [proposalError, setProposalError] = useState('');

  // Submit Feedback
  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setContactError('');
    if (!contactName || !contactEmail || !contactMessage) {
      setContactError('Por favor, rellena todos los campos del formulario de contacto.');
      return;
    }
    
    setIsSubmitting(true);
    const targetEmail = supportEmail || 'ciudadaniahoruelo@horuelo.net';

    // 1. Guardar el contenido completo en el buzón local de la intranet
    const storedMessages = JSON.parse(localStorage.getItem('intercultural_inbox') || '[]');
    const newMsg = {
      id: Date.now().toString(),
      name: contactName,
      email: contactEmail,
      role: contactRole,
      date: new Date().toISOString(),
      message: contactMessage,
      status: 'pending'
    };
    storedMessages.unshift(newMsg);
    localStorage.setItem('intercultural_inbox', JSON.stringify(storedMessages));

    // 2. Registrar en la API interna del servidor en paralelo
    fetch('/api/send-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contactName,
        email: contactEmail,
        role: contactRole,
        message: contactMessage,
        targetEmail: targetEmail
      })
    }).catch(err => console.warn('Registro en servidor local:', err));

    // 3. Despachar AVISO GENÉRICO a la cuenta de correo para no duplicar ni saturar
    // Informa al administrador con enlace DIRECTO a la sección de intranet (Buzón de Consultas)
    const directInboxUrl = `${window.location.origin}/?tab=intranet&subtab=inbox`;
    fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        notificacion: 'Tienes un mensaje nuevo. Revisa la bandeja de entrada en la intranet.',
        remitente: `${contactName} (${contactRole})`,
        enlace_directo_intranet: directInboxUrl,
        instrucciones: 'Haz clic en el enlace para acceder directamente al Buzón de la Intranet y contestar la consulta.',
        _url: directInboxUrl,
        _subject: 'Tienes un mensaje nuevo. Revisa la bandeja de entrada en la intranet',
        _replyto: contactEmail,
        _template: 'table',
        _captcha: 'false'
      })
    }).catch(err => console.warn('Aviso de envío por pasarela web:', err));

    // Breve transición visual de feedback fluido
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    setFeedbackSent(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => {
      setFeedbackSent(false);
    }, 8000);
  };

  // Submit Proposal Activity
  const handleProposalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProposalError('');
    if (!propTitle || !propObjective || !propSteps) {
      setProposalError('Por favor, rellena los campos principales (Título, Objetivo y Paso a paso).');
      return;
    }

    setIsSubmittingProposal(true);
    const targetEmail = supportEmail || 'ciudadaniahoruelo@horuelo.net';

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
      isApproved: false,
    };

    onAddCustomActivity(newActivity);

    // Enviar notificación a los administradores para que entren a la intranet y validen la nueva dinámica con enlace directo
    const directDynamicsUrl = `${window.location.origin}/?tab=intranet&subtab=dynamics`;
    fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        notificacion: 'Se ha creado una nueva dinámica de aula propuesta por un docente.',
        titulo_dinamica: propTitle,
        nivel_educativo: propGrade,
        categoria: propCategory,
        duracion_minutos: propDuration,
        objetivo: propObjective,
        enlace_directo_intranet: directDynamicsUrl,
        instrucciones: 'Por favor, haz clic en el enlace para acceder directamente a la Intranet (apartado Dinámicas) y validar o publicar esta propuesta.',
        _url: directDynamicsUrl,
        _subject: 'Nueva dinámica pendiente de validación en la intranet',
        _template: 'table',
        _captcha: 'false'
      })
    }).catch(err => console.warn('Aviso de nueva dinámica:', err));

    await new Promise(resolve => setTimeout(resolve, 400));

    setIsSubmittingProposal(false);
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
    <section className="py-12 md:py-16 px-4 md:px-8 bg-slate-50" id="contact-section">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold font-sans uppercase tracking-wide border border-orange-200">
            <Share2 className="w-3.5 h-3.5" />
            Comunidad de Docentes Activa
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Intercambio de Saberes e Incidencia
          </h2>
          <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
            ¿Has probado alguna dinámica innovadora en tu centro educativo? Rellena el creador interactivo para subirla de inmediato o contáctanos para asesorías personalizadas de claustro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT COLUMN: PROPOSAL FORM (Add Dynamic Community Board) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="font-sans font-extrabold text-slate-900 text-xl flex items-center gap-2">
                <Plus className="w-6 h-6 text-orange-600" />
                Creador de Dinámicas Interactivas
              </h3>
              <p className="font-sans text-xs text-slate-500 leading-normal">
                Rellena este creador. Al proponer tu recurso, este se añadirá <strong>de inmediato y de forma persistente</strong> a la lista de "Recursos de Aula" en la cabecera, junto con todas tus fases.
              </p>
            </div>

            {proposalSent ? (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center space-y-4 animate-scaleUp">
                <CheckCircle className="w-12 h-12 text-orange-600 mx-auto animate-pulse" />
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-lg text-orange-800">¡Dinámica creada con éxito!</h4>
                  <p className="font-sans text-xs text-orange-900 leading-normal">
                    Tu propuesta ha sido enviada con éxito. Un administrador revisará la dinámica desde el panel de control antes de que sea publicada en la pestaña de <strong>"Recursos de Aula"</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="space-y-4 font-sans text-xs [align-items:stretch]">
                {proposalError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl font-bold flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{proposalError}</span>
                  </div>
                )}
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
                      <option value="Infantil">Infantil</option>
                      <option value="Primaria">Primaria</option>
                      <option value="ESO">ESO</option>
                      <option value="Bachillerato">Bachillerato</option>
                      <option value="Todos los Niveles">Todos los Niveles</option>
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
                      <option value="cooperativo">Trabajo Cooperativo</option>
                      <option value="resolucion-conflictos">Resolución de Conflictos</option>
                      <option value="analisis-medios">Análisis de Medios</option>
                      <option value="juego-de-roles">Role-playing y Empatía</option>
                      <option value="literatura-cine">Cine y Narrativas</option>
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
                  disabled={isSubmittingProposal}
                  className={`w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none cursor-pointer flex items-center justify-center gap-2 ${isSubmittingProposal ? 'opacity-75 cursor-wait' : 'transform hover:-translate-y-0.5'}`}
                  id="submit-proposal-btn"
                >
                  {isSubmittingProposal ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Enviando propuesta...</span>
                    </>
                  ) : (
                    <span>🚀 Crear y Publicar Dinámica</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: DIRECT FEEDBACK CONTACT & COMMUNITY STATS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Consultation Contact Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="font-sans font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                Asesorías pedagógicas y Consultas
              </h3>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                ¿Planeas un proyecto pluricultural de centro o deseas formación a medida para el claustro? Envíanos tu mensaje o escríbenos a{' '}
                <a 
                  href={`mailto:${supportEmail}`} 
                  className="font-bold text-orange-600 hover:text-orange-700 underline"
                >
                  {supportEmail}
                </a>.
              </p>

              {feedbackSent ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-sm font-extrabold text-emerald-900">¡Mensaje enviado con éxito!</p>
                    <p className="font-sans text-xs text-emerald-800 leading-relaxed">
                      Tu consulta ha sido enviada. Nos pondremos en contacto contigo lo antes posible.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3 font-sans text-xs">
                  {contactError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl font-bold flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{contactError}</span>
                    </div>
                  )}
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Nombre y Apellidos *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Sofía Pérez"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="sofia@instituto.es"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Tu rol educativo</label>
                    <select
                      value={contactRole}
                      onChange={(e) => setContactRole(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700"
                    >
                      <option value="Docente (Infantil / Primaria / Secundaria)">Docente (Infantil / Primaria / Secundaria)</option>
                      <option value="Departamento de Orientación">Departamento de Orientación</option>
                      <option value="Equipo de Dirección">Equipo de Dirección</option>
                      <option value="Alumno / Alumna">Alumno / Alumna</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Mensaje o Consulta *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Escribe aquí tu consulta o de qué formas podemos apoyarte..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 bg-scroll focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none cursor-pointer flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-wait' : 'transform hover:-translate-y-0.5'}`}
                    id="submit-contact-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Enviando mensaje...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Mensaje</span>
                      </>
                    )}
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
                      <span className="bg-orange-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full shrink-0">
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
