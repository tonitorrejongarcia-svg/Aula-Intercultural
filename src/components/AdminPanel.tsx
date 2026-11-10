/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Activity, GlossaryTerm, FAQItem, ActivityCategory } from '../types';
import { 
  Lock, KeyRound, LayoutDashboard, BookOpen, Globe, HelpCircle, 
  Settings, LogOut, Plus, Trash2, Edit3, Save, RefreshCw, Check, AlertCircle,
  Eye, EyeOff, ShieldAlert, Mail, Send, Inbox, CheckCircle, FileText, ArrowRight,
  Copy, Reply, MessageSquare, RotateCcw, Filter
} from 'lucide-react';

interface InboxMessage {
  id: string;
  name: string;
  email: string;
  role?: string;
  date: string;
  message: string;
  status: 'pending' | 'resolved';
  replyText?: string;
  replyDate?: string;
}

interface AdminPanelProps {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  glossaryTerms: GlossaryTerm[];
  setGlossaryTerms: React.Dispatch<React.SetStateAction<GlossaryTerm[]>>;
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  generalTexts: {
    heroTitle: string;
    heroSubtitle: string;
    supportEmail: string;
  };
  setGeneralTexts: React.Dispatch<React.SetStateAction<{
    heroTitle: string;
    heroSubtitle: string;
    supportEmail: string;
  }>>;
  onRestoreDefaults: () => void;
  initialSubTab?: string;
  onSubTabChange?: (subTab: string) => void;
}

export default function AdminPanel({
  activities,
  setActivities,
  glossaryTerms,
  setGlossaryTerms,
  faqs,
  setFaqs,
  generalTexts,
  setGeneralTexts,
  onRestoreDefaults,
  initialSubTab,
  onSubTabChange
}: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('intercultural_admin_auth') === 'true';
  });
  const [loginError, setLoginError] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'dynamics' | 'glossary' | 'faqs' | 'texts' | 'inbox'>(() => {
    if (initialSubTab && ['stats', 'dynamics', 'glossary', 'faqs', 'texts', 'inbox'].includes(initialSubTab)) {
      return initialSubTab as any;
    }
    return 'stats';
  });

  // Keep subtab in sync when initialSubTab changes (e.g. navigation via direct URL link from email)
  useEffect(() => {
    if (initialSubTab && ['stats', 'dynamics', 'glossary', 'faqs', 'texts', 'inbox'].includes(initialSubTab)) {
      setActiveSubTab(initialSubTab as any);
    }
  }, [initialSubTab]);

  const changeSubTab = (newSubTab: 'stats' | 'dynamics' | 'glossary' | 'faqs' | 'texts' | 'inbox') => {
    setActiveSubTab(newSubTab);
    if (onSubTabChange) {
      onSubTabChange(newSubTab);
    }
  };

  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>([]);
  const [inboxFilter, setInboxFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const [replyingMessageId, setReplyingMessageId] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState<string>('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [copiedReplyId, setCopiedReplyId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const msgs: InboxMessage[] = JSON.parse(localStorage.getItem('intercultural_inbox') || '[]');
      setInboxMessages(msgs.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  }, [isAuthenticated, activeSubTab]);

  const handleResolveMessage = (id: string, replyText?: string) => {
    const updated = inboxMessages.map(m => {
      if (m.id === id) {
        return {
          ...m,
          status: 'resolved' as const,
          replyText: replyText !== undefined ? replyText : m.replyText,
          replyDate: replyText ? new Date().toISOString() : (m.replyDate || new Date().toISOString())
        };
      }
      return m;
    });
    setInboxMessages(updated);
    localStorage.setItem('intercultural_inbox', JSON.stringify(updated));
    setActionStatus({
      type: 'success',
      message: 'Consulta marcada como resuelta.'
    });
  };

  const handleReopenMessage = (id: string) => {
    const updated = inboxMessages.map(m => m.id === id ? { ...m, status: 'pending' as const } : m);
    setInboxMessages(updated);
    localStorage.setItem('intercultural_inbox', JSON.stringify(updated));
    setActionStatus({
      type: 'success',
      message: 'Consulta reabierta y devuelta al estado pendiente.'
    });
  };

  const handleDeleteMessage = (id: string) => {
    const updated = inboxMessages.filter(m => m.id !== id);
    setInboxMessages(updated);
    localStorage.setItem('intercultural_inbox', JSON.stringify(updated));
    if (replyingMessageId === id) {
      setReplyingMessageId(null);
      setReplyDraft('');
    }
    setActionStatus({
      type: 'success',
      message: 'Consulta eliminada de la bandeja de entrada.'
    });
  };

  const handleStartReply = (msg: InboxMessage) => {
    setReplyingMessageId(msg.id);
    if (msg.replyText) {
      setReplyDraft(msg.replyText);
    } else {
      setReplyDraft(
`Hola ${msg.name},

Muchas gracias por ponerte en contacto con nosotros en Aula Intercultural.

En relación a tu consulta recibida:
"${msg.message}"

[Escribe aquí tu respuesta pedagógica o indicaciones para el centro...]

Quedamos a tu total disposición para cualquier otra duda o apoyo que precises.

Un saludo cordial,
Equipo de Aula Intercultural
${supportEmail}`
      );
    }
  };

  const handleCancelReply = () => {
    setReplyingMessageId(null);
    setReplyDraft('');
  };

  const handleSaveReplyOnly = (msg: InboxMessage) => {
    if (!replyDraft.trim()) {
      setActionStatus({
        type: 'error',
        message: 'Por favor, introduce el texto de la respuesta antes de guardar.'
      });
      return;
    }
    const updated = inboxMessages.map(m => {
      if (m.id === msg.id) {
        return {
          ...m,
          status: 'resolved' as const,
          replyText: replyDraft.trim(),
          replyDate: new Date().toISOString()
        };
      }
      return m;
    });
    setInboxMessages(updated);
    localStorage.setItem('intercultural_inbox', JSON.stringify(updated));
    setReplyingMessageId(null);
    setReplyDraft('');
    setActionStatus({
      type: 'success',
      message: `¡Respuesta a ${msg.name} guardada con éxito en la intranet y consulta marcada como resuelta!`
    });
  };

  const handleSendGmailWithReply = (msg: InboxMessage) => {
    const textToSend = replyDraft.trim() || `Hola ${msg.name},\n\nEn respuesta a tu consulta recibida en Aula Intercultural:\n"${msg.message}"\n\n\nUn saludo cordial,\nEquipo de Aula Intercultural\n${supportEmail}`;
    
    // Save reply in database so it is recorded in the intranet consultation card
    const updated = inboxMessages.map(m => {
      if (m.id === msg.id) {
        return {
          ...m,
          status: 'resolved' as const,
          replyText: textToSend,
          replyDate: new Date().toISOString()
        };
      }
      return m;
    });
    setInboxMessages(updated);
    localStorage.setItem('intercultural_inbox', JSON.stringify(updated));
    setReplyingMessageId(null);
    setReplyDraft('');

    // Open Gmail composer with custom recipient, subject, and the exact response text
    const gmailUrl = `https://mail.google.com/mail/u/${encodeURIComponent(supportEmail)}/?authuser=${encodeURIComponent(supportEmail)}&view=cm&fs=1&to=${encodeURIComponent(msg.email)}&su=${encodeURIComponent('Respuesta a tu consulta en Aula Intercultural')}&body=${encodeURIComponent(textToSend)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    setActionStatus({
      type: 'success',
      message: `Respuesta registrada de forma permanente en la intranet y redactor de Gmail abierto para responder a ${msg.name}.`
    });
  };

  const handleCopyTemplate = (msg: { name: string; email: string; message: string; id: string }) => {
    const text = `Para: ${msg.email}\nAsunto: Respuesta a tu consulta en Aula Intercultural\n\nHola ${msg.name},\n\nEn respuesta a tu consulta recibida en el portal:\n"${msg.message}"\n\n\nUn saludo cordial,\nEquipo de Aula Intercultural\n${supportEmail}`;
    navigator.clipboard.writeText(text);
    setCopiedMessageId(msg.id);
    setTimeout(() => setCopiedMessageId(null), 2500);
  };

  const handleCopyReplyText = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedReplyId(msgId);
    setTimeout(() => setCopiedReplyId(null), 2500);
  };


  // --- Admin Security Settings ---
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('intercultural_admin_password') || 'aula2026';
  });
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);

  // Password Recovery via Email Verification Code
  const [recoveryEmail, setRecoveryEmail] = useState(() => {
    const saved = localStorage.getItem('intercultural_recovery_email');
    if (!saved || saved === 'ciudadaniaglobal@horuelo.net') {
      return 'ciudadaniahoruelo@horuelo.net';
    }
    return saved;
  });
  const [recoveryEmailInput, setRecoveryEmailInput] = useState('');

  const [isRecovering, setIsRecovering] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [codeTimer, setCodeTimer] = useState(0);
  const [recoveryCodeInput, setRecoveryCodeInput] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [recoveryNewPassword, setRecoveryNewPassword] = useState('');
  const [recoveryNewPasswordConfirm, setRecoveryNewPasswordConfirm] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const [simulatedEmailPopup, setSimulatedEmailPopup] = useState<{to: string; code: string} | null>(null);

  // For changing password inside the panel
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // For changing recovery email settings inside the panel
  const [recEmailSettingsInput, setRecEmailSettingsInput] = useState(recoveryEmail);
  const [securitySettingsSuccess, setSecuritySettingsSuccess] = useState(false);
  const [securitySettingsError, setSecuritySettingsError] = useState('');

  // Timer countdown for failed attempts lockout
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockoutTime && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && lockoutTime) {
      setLockoutTime(null);
      setFailedAttempts(0);
    }
    return () => clearTimeout(timer);
  }, [countdown, lockoutTime]);

  // Timer for verification code resend cooldown
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (codeTimer > 0) {
      timer = setTimeout(() => {
        setCodeTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [codeTimer]);

  // --- Dynamic editing state for Activities ---
  const [actionStatus, setActionStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [actTitle, setActTitle] = useState('');
  const [actObjective, setActObjective] = useState('');
  const [actGrade, setActGrade] = useState('1º y 2º ESO');
  const [actCategory, setActCategory] = useState<ActivityCategory>('reflexion');
  const [actDuration, setActDuration] = useState('30');
  const [actMaterials, setActMaterials] = useState('');
  const [actSteps, setActSteps] = useState('');
  const [actQuestions, setActQuestions] = useState('');

  // --- Dynamic editing state for Glossary ---
  const [editingGlossary, setEditingGlossary] = useState<GlossaryTerm | null>(null);
  const [gloWord, setGloWord] = useState('');
  const [gloDefinition, setGloDefinition] = useState('');
  const [gloEtymology, setGloEtymology] = useState('');
  const [gloPedagogicalTip, setGloPedagogicalTip] = useState('');

  // --- Dynamic editing state for FAQs ---
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState('Pedagogía Aplicada');

  // --- Web Texts State ---
  const [heroTitle, setHeroTitle] = useState(generalTexts.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(generalTexts.heroSubtitle);
  const [supportEmail, setSupportEmail] = useState(generalTexts.supportEmail);
  const [textsSuccess, setTextsSuccess] = useState(false);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime && countdown > 0) {
      setLoginError(`Acceso bloqueado temporalmente. Espera ${countdown} segundos.`);
      return;
    }

    const cleanPass = password.trim();
    // Allow either the custom adminPassword, or the bootstrap keys 'admin'/'aula2026' if it's the default
    const isDefault = adminPassword === 'aula2026';
    const isCorrect = cleanPass === adminPassword || (isDefault && (cleanPass === 'admin' || cleanPass === 'aula2026'));

    if (isCorrect) {
      setIsAuthenticated(true);
      sessionStorage.setItem('intercultural_admin_auth', 'true');
      setLoginError('');
      setFailedAttempts(0);
    } else {
      const nextFailed = failedAttempts + 1;
      setFailedAttempts(nextFailed);
      if (nextFailed >= 5) {
        setLockoutTime(Date.now());
        setCountdown(30);
        setLoginError('Demasiados intentos fallidos. Acceso bloqueado durante 30 segundos.');
      } else {
        setLoginError(`Contraseña incorrecta. Te quedan ${5 - nextFailed} intentos.`);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('intercultural_admin_auth');
    setPassword('');
    setShowPassword(false);
  };

  // --- Activity Actions ---
  const startEditActivity = (act: Activity) => {
    setEditingActivity(act);
    setActTitle(act.title);
    setActObjective(act.objective);
    setActGrade(act.targetGrade);
    setActCategory(act.category);
    setActDuration(String(act.duration));
    setActMaterials(act.materials.join(', '));
    setActSteps(act.steps.map(s => s.description).join('\n'));
    setActQuestions(act.keyReflectionQuestions.join('? '));
  };

  const startNewActivity = () => {
    setEditingActivity({
      id: 'new',
      title: '',
      objective: '',
      targetGrade: '1º y 2º ESO',
      duration: 30,
      category: 'reflexion',
      materials: [],
      steps: [],
      keyReflectionQuestions: []
    });
    setActTitle('');
    setActObjective('');
    setActGrade('1º y 2º ESO');
    setActCategory('reflexion');
    setActDuration('30');
    setActMaterials('');
    setActSteps('');
    setActQuestions('');
  };

  const cancelEditActivity = () => {
    setEditingActivity(null);
    setActTitle('');
    setActObjective('');
    setActGrade('1º y 2º ESO');
    setActCategory('reflexion');
    setActDuration('30');
    setActMaterials('');
    setActSteps('');
    setActQuestions('');
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle || !actObjective || !actSteps) {
      setActionStatus({ type: 'error', message: 'Por favor, rellena los campos requeridos (Título, Objetivo, Fases).' });
      return;
    }

    const parsedMaterials = actMaterials
      ? actMaterials.split(',').map(m => m.trim()).filter(Boolean)
      : ['Papel y bolígrafos convencionales'];

    const parsedQuestions = actQuestions
      ? actQuestions.split('?').map(q => q.trim() + '?').filter(q => q.length > 2)
      : ['¿Qué conclusiones extraéis de esta actividad?', '¿Cómo influye en el día a día?'];

    const parsedSteps = actSteps
      .split('\n')
      .map((line, idx) => line.trim())
      .filter(Boolean)
      .map((desc, idx) => ({
        title: `Paso ${idx + 1}`,
        description: desc,
        duration: Math.round(Number(actDuration) / 3 || 10)
      }));

    const isNew = !editingActivity || editingActivity.id === 'new';
    const finalId = isNew ? `act-${Date.now()}` : editingActivity.id;

    const savedActivity: Activity = {
      id: finalId,
      title: actTitle,
      objective: actObjective,
      targetGrade: actGrade,
      duration: Number(actDuration) || 30,
      category: actCategory,
      materials: parsedMaterials,
      steps: parsedSteps,
      keyReflectionQuestions: parsedQuestions,
      isCustom: true
    };

    let updated: Activity[];
    if (isNew) {
      updated = [savedActivity, ...activities];
    } else {
      updated = activities.map(a => a.id === finalId ? savedActivity : a);
    }

    setActivities(updated);
    localStorage.setItem('intercultural_activities_all', JSON.stringify(updated));
    cancelEditActivity();
    setActionStatus({ type: 'success', message: 'Dinámica de aula guardada correctamente.' });
  };

  const handleToggleApproval = (id: string) => {
    const updated = activities.map(a => {
      if (a.id === id) {
        return { ...a, isApproved: !a.isApproved };
      }
      return a;
    });
    setActivities(updated);
    localStorage.setItem('intercultural_activities_all', JSON.stringify(updated));
  };

  const handleDeleteActivity = (id: string) => {
    const updated = activities.filter(a => a.id !== id);
    setActivities(updated);
    localStorage.setItem('intercultural_activities_all', JSON.stringify(updated));
    if (editingActivity && editingActivity.id === id) {
      cancelEditActivity();
    }
    setActionStatus({ type: 'success', message: 'Dinámica eliminada correctamente.' });
  };

  // --- Glossary Actions ---
  const startEditGlossary = (term: GlossaryTerm) => {
    setEditingGlossary(term);
    setGloWord(term.word);
    setGloDefinition(term.definition);
    setGloEtymology(term.etymology || '');
    setGloPedagogicalTip(term.pedagogicalTip || '');
  };

  const startNewGlossary = () => {
    setEditingGlossary({ word: '', definition: '' });
    setGloWord('');
    setGloDefinition('');
    setGloEtymology('');
    setGloPedagogicalTip('');
  };

  const cancelEditGlossary = () => {
    setEditingGlossary(null);
    setGloWord('');
    setGloDefinition('');
    setGloEtymology('');
    setGloPedagogicalTip('');
  };

  const handleSaveGlossary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gloWord || !gloDefinition) {
      setActionStatus({ type: 'error', message: 'Palabra y Definición son obligatorios.' });
      return;
    }

    const savedTerm: GlossaryTerm = {
      word: gloWord,
      definition: gloDefinition,
      etymology: gloEtymology || undefined,
      pedagogicalTip: gloPedagogicalTip || undefined
    };

    const isNew = !editingGlossary || editingGlossary.word === '';
    
    let updated: GlossaryTerm[];
    if (isNew) {
      if (glossaryTerms.some(t => t.word.toLowerCase() === gloWord.toLowerCase())) {
        setActionStatus({ type: 'error', message: 'Este término ya existe en el glosario.' });
        return;
      }
      updated = [savedTerm, ...glossaryTerms];
    } else {
      updated = glossaryTerms.map(t => t.word.toLowerCase() === editingGlossary!.word.toLowerCase() ? savedTerm : t);
    }

    setGlossaryTerms(updated);
    localStorage.setItem('intercultural_glossary_all', JSON.stringify(updated));
    cancelEditGlossary();
    setActionStatus({ type: 'success', message: 'Término del glosario guardado correctamente.' });
  };

  const handleDeleteGlossary = (word: string) => {
    const updated = glossaryTerms.filter(t => t.word !== word);
    setGlossaryTerms(updated);
    localStorage.setItem('intercultural_glossary_all', JSON.stringify(updated));
    if (editingGlossary && editingGlossary.word === word) {
      cancelEditGlossary();
    }
    setActionStatus({ type: 'success', message: `Término "${word}" eliminado del glosario.` });
  };

  // --- FAQ Actions ---
  const startEditFAQ = (faq: FAQItem) => {
    setEditingFAQ(faq);
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
    setFaqCategory(faq.category);
  };

  const startNewFAQ = () => {
    setEditingFAQ({ question: '', answer: '', category: 'Pedagogía Aplicada' });
    setFaqQuestion('');
    setFaqAnswer('');
    setFaqCategory('Pedagogía Aplicada');
  };

  const cancelEditFAQ = () => {
    setEditingFAQ(null);
    setFaqQuestion('');
    setFaqAnswer('');
    setFaqCategory('Pedagogía Aplicada');
  };

  const handleSaveFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) {
      setActionStatus({ type: 'error', message: 'Pregunta y Respuesta son obligatorios.' });
      return;
    }

    const savedFAQ: FAQItem = {
      question: faqQuestion,
      answer: faqAnswer,
      category: faqCategory
    };

    const isNew = !editingFAQ || editingFAQ.question === '';

    let updated: FAQItem[];
    if (isNew) {
      if (faqs.some(f => f.question.toLowerCase() === faqQuestion.toLowerCase())) {
        setActionStatus({ type: 'error', message: 'Esta pregunta ya existe en el listado.' });
        return;
      }
      updated = [savedFAQ, ...faqs];
    } else {
      updated = faqs.map(f => f.question.toLowerCase() === editingFAQ!.question.toLowerCase() ? savedFAQ : f);
    }

    setFaqs(updated);
    localStorage.setItem('intercultural_faqs_all', JSON.stringify(updated));
    cancelEditFAQ();
    setActionStatus({ type: 'success', message: 'Pregunta frecuente guardada correctamente.' });
  };

  const handleDeleteFAQ = (question: string) => {
    const updated = faqs.filter(f => f.question !== question);
    setFaqs(updated);
    localStorage.setItem('intercultural_faqs_all', JSON.stringify(updated));
    if (editingFAQ && editingFAQ.question === question) {
      cancelEditFAQ();
    }
    setActionStatus({ type: 'success', message: 'Pregunta frecuente eliminada.' });
  };

  // --- Save Web Texts ---
  const handleSaveTexts = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { heroTitle, heroSubtitle, supportEmail };
    setGeneralTexts(updated);
    localStorage.setItem('intercultural_general_texts', JSON.stringify(updated));
    setTextsSuccess(true);
    setTimeout(() => setTextsSuccess(false), 3000);
  };

  // --- Change Admin Password ---
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess(false);

    const cleanCurrent = currentPasswordInput.trim();
    const cleanNew = newPasswordInput.trim();
    const cleanConfirm = newPasswordConfirm.trim();

    // Check current password
    // Support either the custom adminPassword, or 'admin' / 'aula2026' as fallback
    const isDefault = adminPassword === 'aula2026';
    const isCorrectCurrent = cleanCurrent === adminPassword || (isDefault && (cleanCurrent === 'admin' || cleanCurrent === 'aula2026'));

    if (!isCorrectCurrent) {
      setPasswordChangeError('La contraseña actual introducida no es correcta.');
      return;
    }

    if (cleanNew.length < 6) {
      setPasswordChangeError('La nueva contraseña debe tener al menos 6 caracteres de longitud.');
      return;
    }

    if (cleanNew !== cleanConfirm) {
      setPasswordChangeError('La nueva contraseña y su confirmación no coinciden.');
      return;
    }

    setAdminPassword(cleanNew);
    localStorage.setItem('intercultural_admin_password', cleanNew);
    setPasswordChangeSuccess(true);
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setNewPasswordConfirm('');
  };

  // --- Save Recovery Email Settings ---
  const handleSaveRecoveryEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSecuritySettingsError('');
    setSecuritySettingsSuccess(false);

    const cleanEmail = recEmailSettingsInput.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setSecuritySettingsError('Por favor, introduce una dirección de correo electrónico válida.');
      return;
    }

    setRecoveryEmail(cleanEmail);
    localStorage.setItem('intercultural_recovery_email', cleanEmail);
    setSecuritySettingsSuccess(true);
  };

  // --- Restore Defaults Wrapper ---
  const handleReset = () => {
    onRestoreDefaults();
    // Reset variables
    setHeroTitle('Aula Intercultural');
    setHeroSubtitle('Un rincón de recursos pedagógicos interactivos, dinámicas de aula y soporte terminológico para la formación docente en diversidad, equidad y convivencia.');
    setSupportEmail('ciudadaniahoruelo@horuelo.net');
    setAdminPassword('aula2026');
    setRecoveryEmail('ciudadaniahoruelo@horuelo.net');
    setRecEmailSettingsInput('ciudadaniahoruelo@horuelo.net');
    localStorage.setItem('intercultural_admin_password', 'aula2026');
    localStorage.setItem('intercultural_recovery_email', 'ciudadaniahoruelo@horuelo.net');
    setActionStatus({ type: 'success', message: '¡Todas las bases de datos y configuraciones han sido restablecidas con éxito a sus valores de fábrica!' });
  };

  // --- Send Recovery Code Handler ---
  const handleSendRecoveryCode = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError('');
    setIsSendingCode(true);

    const enteredEmail = recoveryEmailInput.trim().toLowerCase();
    const targetEmail = recoveryEmail.trim().toLowerCase();

    if (enteredEmail !== targetEmail) {
      setTimeout(() => {
        setRecoveryError('El correo electrónico introducido no coincide con la dirección de recuperación configurada.');
        setIsSendingCode(false);
      }, 1000);
      return;
    }

    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    setTimeout(() => {
      setGeneratedCode(code);
      setCodeSent(true);
      setIsSendingCode(false);
      setCodeTimer(60); // Cooldown of 60 seconds

      // Open email simulator popup
      setSimulatedEmailPopup({
        to: targetEmail,
        code: code
      });
    }, 1500);
  };

  // --- Password Recovery Submit Handler ---
  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError('');

    const cleanCodeInput = recoveryCodeInput.trim();

    if (cleanCodeInput !== generatedCode) {
      setRecoveryError('El código de verificación introducido es incorrecto.');
      return;
    }

    if (!recoveryNewPassword.trim() || recoveryNewPassword.trim().length < 6) {
      setRecoveryError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (recoveryNewPassword !== recoveryNewPasswordConfirm) {
      setRecoveryError('La nueva contraseña y su confirmación no coinciden.');
      return;
    }

    setAdminPassword(recoveryNewPassword);
    localStorage.setItem('intercultural_admin_password', recoveryNewPassword);
    setRecoverySuccess(true);
    setRecoveryCodeInput('');
    setRecoveryNewPassword('');
    setRecoveryNewPasswordConfirm('');
    setGeneratedCode('');
    setCodeSent(false);
    setSimulatedEmailPopup(null);
  };

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    const isLocked = !!(lockoutTime && countdown > 0);

    const maskEmail = (email: string) => {
      const [local, domain] = email.split('@');
      if (!local || !domain) return '***@***.***';
      const maskedLocal = local.length > 3 
        ? local.substring(0, 2) + '***' + local.substring(local.length - 1)
        : local.substring(0, 1) + '***';
      return `${maskedLocal}@${domain}`;
    };

    return (
      <section className="py-16 px-4 md:px-8 bg-slate-900 text-white min-h-[75vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-800/80 border border-slate-700 p-8 rounded-3xl space-y-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Decorative light flare */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-orange-500/20 rounded-full blur-2xl" />
          
          {isRecovering ? (
            // --- RECOVERY MODE VIEW ---
            <>
              <div className="text-center space-y-2">
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-2xl w-fit mx-auto shadow-sm">
                  <KeyRound className="w-8 h-8" />
                </div>
                <h2 className="font-sans font-black text-2xl tracking-tight">Recuperar Acceso</h2>
                <p className="font-sans text-xs text-slate-400">
                  Introduce el correo de recuperación para recibir un código de seguridad de 6 dígitos.
                </p>
              </div>

              {recoverySuccess ? (
                <div className="space-y-4">
                  <div className="p-4 bg-orange-500/10 border border-orange-500/30 text-teal-350 rounded-2xl text-center font-sans space-y-2">
                    <Check className="w-8 h-8 mx-auto text-orange-400" />
                    <p className="font-bold text-sm">¡Contraseña restablecida!</p>
                    <p className="text-xs text-slate-400">Tu clave de acceso de administrador se ha actualizado con éxito. Ya puedes iniciar sesión de forma segura.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecovering(false);
                      setRecoverySuccess(false);
                      setPassword('');
                    }}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-sans font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    Volver al Inicio de Sesión
                  </button>
                </div>
              ) : !codeSent ? (
                // Step 1: Request code by entering recovery email
                <form onSubmit={handleSendRecoveryCode} className="space-y-4 text-xs font-sans">
                  <div className="p-3 bg-slate-900/60 border border-slate-750 rounded-2xl space-y-1">
                    <span className="font-mono text-[9px] text-orange-400 font-black uppercase tracking-wider">Correo Vinculado</span>
                    <p className="text-slate-200 font-bold leading-relaxed tracking-wide">
                      {maskEmail(recoveryEmail)}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-350">
                      Confirma el Correo Completo *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Introduce el correo para recibir el código..."
                      value={recoveryEmailInput}
                      onChange={(e) => setRecoveryEmailInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-555 font-sans focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    />
                  </div>

                  {recoveryError && (
                    <div className="p-3 bg-red-950/40 border border-red-900/40 text-red-400 rounded-xl font-bold flex items-center gap-1.5 text-[11px]">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {recoveryError}
                    </div>
                  )}

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isSendingCode}
                      className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-sans font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                      {isSendingCode ? 'Enviando código...' : 'Enviar Código de Seguridad'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecovering(false);
                        setRecoveryEmailInput('');
                        setRecoveryError('');
                      }}
                      className="w-full py-2.5 bg-transparent border border-slate-700 hover:bg-slate-750 text-slate-300 font-sans font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Cancelar y volver
                    </button>
                  </div>
                </form>
              ) : (
                // Step 2: Enter code & new password
                <form onSubmit={handleRecoverySubmit} className="space-y-4 text-xs font-sans">
                  <div className="p-3 bg-orange-950/40 border border-orange-900/20 text-teal-350 rounded-2xl text-center">
                    <p className="font-semibold text-xs leading-normal">
                      Hemos enviado un código de verificación a: <br />
                      <strong className="text-white">{recoveryEmail}</strong>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-350">
                      Código de Verificación (6 dígitos) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="Ej: 123456"
                      value={recoveryCodeInput}
                      onChange={(e) => setRecoveryCodeInput(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-center font-mono text-lg tracking-widest text-orange-400 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-350">
                      Nueva Contraseña *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Mínimo 6 caracteres..."
                      value={recoveryNewPassword}
                      onChange={(e) => setRecoveryNewPassword(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-550 font-sans focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-350">
                      Confirmar Nueva Contraseña *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Repite la contraseña..."
                      value={recoveryNewPasswordConfirm}
                      onChange={(e) => setRecoveryNewPasswordConfirm(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-550 font-sans focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    />
                  </div>

                  {recoveryError && (
                    <div className="p-3 bg-red-950/40 border border-red-900/40 text-red-400 rounded-xl font-bold flex items-center gap-1.5 text-[11px]">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {recoveryError}
                    </div>
                  )}

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-sans font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <Save className="w-3.5 h-3.5 text-white" />
                      <span>Guardar Nueva Contraseña y Acceder</span>
                    </button>

                    <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                      <span>¿No has recibido el correo?</span>
                      {codeTimer > 0 ? (
                        <span className="text-slate-500 font-medium">Reenviar en {codeTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendRecoveryCode}
                          className="text-orange-400 hover:text-orange-300 font-bold hover:underline cursor-pointer"
                        >
                          Reenviar código
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCodeSent(false);
                        setRecoveryCodeInput('');
                        setRecoveryNewPassword('');
                        setRecoveryNewPasswordConfirm('');
                        setRecoveryError('');
                      }}
                      className="w-full mt-3 py-2.5 bg-transparent border border-slate-700 hover:bg-slate-750 text-slate-300 font-sans font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Atrás
                    </button>
                  </div>
                </form>
              )}

              {/* Simulated Email Pop-up for Testing/Preview Integration */}
              {simulatedEmailPopup && (
                <div className="mt-4 p-4 bg-slate-900 border border-slate-500/40 rounded-2xl text-xs font-sans space-y-2.5 shadow-xl relative animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono text-[10px] text-slate-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-500 animate-pulse" />
                      Simulación: Bandeja de Entrada
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setSimulatedEmailPopup(null)}
                      className="text-[10px] text-slate-400 hover:text-white cursor-pointer hover:underline"
                    >
                      Cerrar
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400"><strong className="text-slate-200">Para:</strong> {simulatedEmailPopup.to}</p>
                    <p className="text-slate-400"><strong className="text-slate-200">Asunto:</strong> Código de seguridad - Aula Intercultural</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-slate-300 leading-normal">
                      Has solicitado un código para restablecer tu contraseña en el portal de Aula Intercultural.
                    </p>
                    <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-bold">Código de seguridad:</span>
                      <span className="font-mono text-base text-slate-400 font-extrabold tracking-widest bg-slate-950 px-2.5 py-1 rounded border border-slate-500/20">{simulatedEmailPopup.code}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 italic">Este código expira en 10 minutos.</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            // --- STANDARD LOGIN MODE VIEW ---
            <>
              <div className="text-center space-y-2">
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-2xl w-fit mx-auto shadow-sm">
                  {isLocked ? (
                    <ShieldAlert className="w-8 h-8 text-red-400 animate-pulse" />
                  ) : (
                    <Lock className="w-8 h-8" />
                  )}
                </div>
                <h2 className="font-sans font-black text-2xl tracking-tight">
                  {isLocked ? 'Acceso Bloqueado' : 'Acceso Administrador'}
                </h2>
                <p className="font-sans text-xs text-slate-400">
                  {isLocked 
                    ? `Por motivos de seguridad, el sistema se ha bloqueado debido a múltiples intentos fallidos. Espera a que termine la cuenta atrás.`
                    : 'Accede al portal de gestión de centro para ampliar recursos, editar textos, reformular el glosario o cambiar la clave de acceso.'
                  }
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-350 mb-1.5">
                    Contraseña de Administrador
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-450 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      disabled={isLocked}
                      placeholder={isLocked ? "Formulario bloqueado temporalmente..." : "Introduce la contraseña corporativa..."}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-slate-100 placeholder-slate-500 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLocked}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-450 hover:text-white transition-colors cursor-pointer focus:outline-none disabled:opacity-30"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    {loginError ? (
                      <p className={`text-[11px] font-semibold flex items-center gap-1 leading-tight ${isLocked ? 'text-red-400 font-extrabold animate-pulse' : 'text-red-400'}`}>
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {loginError}
                      </p>
                    ) : (
                      <span />
                    )}
                    {!isLocked && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsRecovering(true);
                          setRecoveryError('');
                          setRecoverySuccess(false);
                          setRecoveryEmailInput('');
                          setRecoveryNewPassword('');
                          setRecoveryNewPasswordConfirm('');
                        }}
                        className="text-[11px] font-semibold text-orange-400 hover:text-orange-300 hover:underline cursor-pointer ml-auto shrink-0"
                      >
                        ¿Has olvidado tu contraseña?
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLocked}
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-sans font-extrabold text-sm tracking-wide rounded-xl transition-all cursor-pointer shadow-md hover:shadow-orange-500/20 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  id="admin-login-submit"
                >
                  {isLocked ? (
                    <>
                      <Lock className="w-4 h-4 text-white stroke-[2.5]" />
                      <span>Bloqueado ({countdown}s)</span>
                    </>
                  ) : (
                    <span>Iniciar Sesión Segura</span>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    );
  }

  // Render Admin Workspace
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-slate-50 text-slate-800 min-h-[80vh]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 text-[10px] font-black uppercase tracking-wider">
              <LayoutDashboard className="w-3 h-3" /> Panel de Control
            </span>
            <h2 className="font-sans font-black text-3xl text-slate-900 tracking-tight">Panel de Administración</h2>
            <p className="font-sans text-xs text-slate-500">
              Administra el contenido didáctico interactivo de forma persistente y en tiempo real.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-300 hover:bg-red-50 text-slate-650 hover:text-red-750 text-xs font-bold rounded-xl cursor-pointer transition-colors"
              id="admin-reset-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Resetear Fábrica
            </button>
             <button
               onClick={handleLogout}
               className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer transition-colors"
               id="admin-logout-btn"
             >
               <LogOut className="w-3.5 h-3.5" />
               Salir del Portal
             </button>
           </div>
         </div>
 
         {/* Dashboard Nav Tabs */}
         <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
          <button
            onClick={() => { changeSubTab('stats'); setEditingActivity(null); setEditingGlossary(null); setEditingFAQ(null); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-black transition-all cursor-pointer ${
              activeSubTab === 'stats' ? 'bg-slate-900 text-white shadow-md border-2 border-slate-900' : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-650'
            }`}
          >
            📊 Resumen General
          </button>
          <button
            onClick={() => { changeSubTab('dynamics'); cancelEditActivity(); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-black transition-all cursor-pointer relative ${
              activeSubTab === 'dynamics' ? 'bg-slate-900 text-white shadow-md border-2 border-slate-900' : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-650'
            }`}
          >
            📚 Dinámicas de Aula ({activities.length})
            {activities.filter(a => a.isCustom && !a.isApproved).length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </button>
          <button
            onClick={() => { changeSubTab('glossary'); cancelEditGlossary(); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-black transition-all cursor-pointer ${
              activeSubTab === 'glossary' ? 'bg-slate-900 text-white shadow-md border-2 border-slate-900' : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-650'
            }`}
          >
            🌐 Glosario Técnico ({glossaryTerms.length})
          </button>
          <button
            onClick={() => { changeSubTab('faqs'); cancelEditFAQ(); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-black transition-all cursor-pointer ${
              activeSubTab === 'faqs' ? 'bg-slate-900 text-white shadow-md border-2 border-slate-900' : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-650'
            }`}
          >
            ❓ Dudas / FAQs ({faqs.length})
          </button>
          <button
            onClick={() => { changeSubTab('texts'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-black transition-all cursor-pointer ${
              activeSubTab === 'texts' ? 'bg-slate-900 text-white shadow-md border-2 border-slate-900' : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-650'
            }`}
          >
            ⚙ Textos y Ajustes Web
          </button>
          <button
            onClick={() => { changeSubTab('inbox'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-black transition-all cursor-pointer relative ${
              activeSubTab === 'inbox' ? 'bg-slate-900 text-white shadow-md border-2 border-slate-900' : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-650'
            }`}
          >
            📥 Bandeja de Entrada
            {inboxMessages.filter(m => m.status === 'pending').length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </button>
        </div>

        {/* Global Action Status Banner */}
        {actionStatus && (
          <div className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold transition-all shadow-sm ${
            actionStatus.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
              : 'bg-rose-50 text-rose-900 border border-rose-200'
          }`}>
            <div className="flex items-center gap-2">
              <span>{actionStatus.type === 'success' ? '✓' : '⚠️'}</span>
              <span>{actionStatus.message}</span>
            </div>
            <button 
              onClick={() => setActionStatus(null)}
              className="ml-4 p-1 hover:bg-black/5 rounded-lg font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* SUBTAB CONTENT: STATS */}
        {activeSubTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs">
              <div className="p-3 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 w-fit">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-950">{activities.length}</h4>
                <p className="text-xs font-sans font-bold text-slate-400 uppercase tracking-wide">Fichas Didácticas Activas</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Listas en la pestaña "Recursos de Aula" con todas sus secuencias guiadas y materiales.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 w-fit">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-950">{glossaryTerms.length}</h4>
                <p className="text-xs font-sans font-bold text-slate-400 uppercase tracking-wide">Términos en Glosario</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Vocabulario crítico indexado alfabéticamente para guiar programaciones y resolver dudas de aula.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 text-slate-600 w-fit">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-950">{faqs.length}</h4>
                <p className="text-xs font-sans font-bold text-slate-400 uppercase tracking-wide">Consultas Resueltas (FAQs)</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Dudas pedagógicas y de claustro resueltas de forma interactiva mediante acordeón de centro.
                </p>
              </div>
            </div>
            
            {/* Quick action card */}
            <div className="bg-orange-600 rounded-3xl p-6 text-white md:col-span-3 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1 max-w-2xl">
                <h4 className="font-sans font-black text-lg text-white">¿Deseas añadir un recurso didáctico rápido?</h4>
                <p className="font-sans text-xs text-orange-50">
                  Accede a la subpestaña de "Dinámicas de Aula" superior y pincha en "+ Añadir Nueva". Podrás dar de alta títulos de talleres, niveles, y estructurar paso a paso de forma totalmente flexible.
                </p>
              </div>
              <button
                onClick={() => setActiveSubTab('dynamics')}
                className="px-5 py-3 bg-slate-900 text-white font-bold text-xs uppercase rounded-xl hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                Acceder a Fichas
              </button>
            </div>
          </div>
        )}

        {/* SUBTAB CONTENT: DYNAMICS */}
        {activeSubTab === 'dynamics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: List of Activities */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-sans font-black text-lg text-slate-900">Listado de Fichas Didácticas</h3>
                <button
                  onClick={cancelEditActivity}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-xl cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + Limpiar / Crear Nueva
                </button>
              </div>

              <div className="text-[10px] text-slate-400 font-sans italic mb-1 lg:hidden flex items-center justify-end gap-1 px-2">
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" /> Desliza para ver más columnas
              </div>
              <div className="overflow-x-auto shadow-[inset_-12px_0_12px_-12px_rgba(0,0,0,0.1)] pr-2">
                <table className="w-full text-left font-sans text-xs sm:text-sm text-slate-650 [align-items:stretch]">
                  <thead>
                    <tr className="border-b border-slate-150 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                      <th className="py-3 px-4">Título</th>
                      <th className="py-3 px-4">Nivel</th>
                      <th className="py-3 px-4">Duración</th>
                      <th className="py-3 px-4">Categoría</th>
                      <th className="py-3 px-4 text-center">Estado</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activities.map((act) => (
                      <tr key={act.id} className={`hover:bg-slate-50/50 transition-colors ${editingActivity && editingActivity.id === act.id ? 'bg-amber-50/40' : ''}`}>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{act.title}</td>
                        <td className="py-3.5 px-4 text-xs font-medium text-slate-600">{act.targetGrade}</td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">{act.duration} min</td>
                        <td className="py-3.5 px-4 uppercase text-[9px] font-black text-orange-600">{act.category}</td>
                        <td className="py-3.5 px-4 text-center">
                          {act.isCustom ? (
                            <button
                              onClick={() => handleToggleApproval(act.id)}
                              className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1 ${
                                act.isApproved 
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              }`}
                              title={act.isApproved ? "Publicada. Clic para ocultar" : "Pendiente. Clic para publicar"}
                            >
                              {act.isApproved ? <CheckCircle className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              {act.isApproved ? 'Publicada' : 'Pendiente'}
                            </button>
                          ) : (
                            <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Base
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => startEditActivity(act)}
                            className="p-1.5 bg-slate-100 hover:bg-orange-50 text-slate-600 hover:text-orange-700 rounded-lg cursor-pointer transition-colors inline-block"
                            title="Editar"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(act.id)}
                            className="p-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-650 rounded-lg cursor-pointer transition-colors inline-block"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT COLUMN: Permanent Form */}
            <form onSubmit={handleSaveActivity} className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm font-sans text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-sans font-black text-base text-slate-900">
                  {editingActivity && editingActivity.id !== 'new' ? '📝 Editar Ficha Didáctica' : '✨ Crear Nueva Dinámica'}
                </h3>
                {editingActivity && (
                  <button
                    type="button"
                    onClick={cancelEditActivity}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-md cursor-pointer text-[10px]"
                  >
                    Volver a Crear
                  </button>
                )}
              </div>

              {editingActivity && editingActivity.id !== 'new' && (
                <div className="p-3 bg-amber-50 text-amber-900 rounded-xl border border-amber-100 font-bold text-[11px] flex items-center justify-between">
                  <span>Modo Edición activo</span>
                  <button type="button" onClick={cancelEditActivity} className="underline hover:text-amber-950 font-black">Limpiar / Crear Nuevo</button>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Título de la Dinámica *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: El Árbol de las Familias"
                    value={actTitle}
                    onChange={(e) => setActTitle(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Curso / Nivel Educativo</label>
                  <input
                    type="text"
                    placeholder="Ej: 3º y 4º ESO"
                    value={actGrade}
                    onChange={(e) => setActGrade(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Categoría</label>
                    <select
                      value={actCategory}
                      onChange={(e) => setActCategory(e.target.value as ActivityCategory)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 font-medium"
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
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Duración (min) *</label>
                    <input
                      type="number"
                      required
                      min="5"
                      max="120"
                      value={actDuration}
                      onChange={(e) => setActDuration(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Objetivo General *</label>
                  <textarea
                    required
                    placeholder="Objetivo pedagógico..."
                    rows={2}
                    value={actObjective}
                    onChange={(e) => setActObjective(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-1.5 text-xs bg-scroll focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Materiales</label>
                  <input
                    type="text"
                    placeholder="Ficha impresa, rotuladores"
                    value={actMaterials}
                    onChange={(e) => setActMaterials(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fases Paso a Paso (Escribe cada paso en línea nueva) *</label>
                  <textarea
                    required
                    placeholder="Línea 1: Presentación por el tutor (10 min)&#13;Línea 2: Trabajo grupal (20 min)"
                    rows={3}
                    value={actSteps}
                    onChange={(e) => setActSteps(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-1.5 text-xs bg-scroll focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reflexiones finales (Separa con '?')</label>
                  <input
                    type="text"
                    placeholder="¿Cómo te sentiste? ¿Qué descubriste?"
                    value={actQuestions}
                    onChange={(e) => setActQuestions(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg text-center"
              >
                💾 {editingActivity && editingActivity.id !== 'new' ? 'Guardar Cambios en Dinámica' : 'Crear y Añadir Dinámica'}
              </button>
            </form>
          </div>
        )}

        {/* SUBTAB CONTENT: GLOSSARY */}
        {activeSubTab === 'glossary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: List of Glossary Terms */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-sans font-black text-lg text-slate-900">Vocabulario Crítico</h3>
                <button
                  onClick={cancelEditGlossary}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-xl cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + Limpiar / Crear Nuevo
                </button>
              </div>

              <div className="text-[10px] text-slate-400 font-sans italic mb-1 lg:hidden flex items-center justify-end gap-1 px-2">
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" /> Desliza para ver más columnas
              </div>
              <div className="overflow-x-auto shadow-[inset_-12px_0_12px_-12px_rgba(0,0,0,0.1)] pr-2">
                <table className="w-full text-left font-sans text-xs sm:text-sm text-slate-650 [align-items:stretch]">
                  <thead>
                    <tr className="border-b border-slate-150 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                      <th className="py-3 px-4">Palabra / Concepto</th>
                      <th className="py-3 px-4">Etimología</th>
                      <th className="py-3 px-4">Definición</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {glossaryTerms.map((term) => (
                      <tr key={term.word} className={`hover:bg-slate-50/50 transition-colors ${editingGlossary && editingGlossary.word === term.word ? 'bg-amber-50/40' : ''}`}>
                        <td className="py-3 px-4 font-bold text-slate-900">{term.word}</td>
                        <td className="py-3 px-4 text-xs font-medium text-slate-500 italic">{term.etymology || 'N/A'}</td>
                        <td className="py-3 px-4 text-xs max-w-sm truncate text-slate-600">{term.definition}</td>
                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => startEditGlossary(term)}
                            className="p-1.5 bg-slate-100 hover:bg-orange-50 text-slate-600 hover:text-orange-700 rounded-lg cursor-pointer transition-colors inline-block"
                            title="Editar"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteGlossary(term.word)}
                            className="p-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-650 rounded-lg cursor-pointer transition-colors inline-block"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT COLUMN: Glossary Form */}
            <form onSubmit={handleSaveGlossary} className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm font-sans text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-sans font-black text-base text-slate-900">
                  {editingGlossary && editingGlossary.word !== '' ? '📝 Editar Vocablo' : '✨ Crear Término de Glosario'}
                </h3>
                {editingGlossary && (
                  <button
                    type="button"
                    onClick={cancelEditGlossary}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-md cursor-pointer text-[10px]"
                  >
                    Volver a Crear
                  </button>
                )}
              </div>

              {editingGlossary && editingGlossary.word !== '' && (
                <div className="p-3 bg-amber-50 text-amber-900 rounded-xl border border-amber-100 font-bold text-[11px] flex items-center justify-between">
                  <span>Modo Edición activo</span>
                  <button type="button" onClick={cancelEditGlossary} className="underline hover:text-amber-950 font-black">Limpiar / Crear Nuevo</button>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Término / Palabra *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Decolonialidad"
                    value={gloWord}
                    onChange={(e) => setGloWord(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Origen / Etimología</label>
                  <input
                    type="text"
                    placeholder="Ej: Del latín de- y colonus"
                    value={gloEtymology}
                    onChange={(e) => setGloEtymology(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Definición Científica *</label>
                  <textarea
                    required
                    placeholder="Definición rigurosa..."
                    rows={3}
                    value={gloDefinition}
                    onChange={(e) => setGloDefinition(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-1.5 text-xs bg-scroll focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consejo Didáctico para el Docente</label>
                  <textarea
                    placeholder="Consejos o metáforas para explicar este término fácilmente..."
                    rows={2}
                    value={gloPedagogicalTip}
                    onChange={(e) => setGloPedagogicalTip(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-1.5 text-xs bg-scroll focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg text-center"
              >
                💾 {editingGlossary && editingGlossary.word !== '' ? 'Guardar Cambios en Término' : 'Crear y Añadir al Glosario'}
              </button>
            </form>
          </div>
        )}

        {/* SUBTAB CONTENT: FAQS */}
        {activeSubTab === 'faqs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: List of FAQs */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-sans font-black text-lg text-slate-900">Preguntas Frecuentes de Claustro</h3>
                <button
                  onClick={cancelEditFAQ}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-xl cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + Limpiar / Crear Nueva
                </button>
              </div>

              <div className="text-[10px] text-slate-400 font-sans italic mb-1 lg:hidden flex items-center justify-end gap-1 px-2">
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" /> Desliza para ver más columnas
              </div>
              <div className="overflow-x-auto shadow-[inset_-12px_0_12px_-12px_rgba(0,0,0,0.1)] pr-2">
                <table className="w-full text-left font-sans text-xs sm:text-sm text-slate-650 [align-items:stretch]">
                  <thead>
                    <tr className="border-b border-slate-150 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                      <th className="py-3 px-4">Pregunta</th>
                      <th className="py-3 px-4">Categoría</th>
                      <th className="py-3 px-4">Respuesta</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {faqs.map((faq) => (
                      <tr key={faq.question} className={`hover:bg-slate-50/50 transition-colors ${editingFAQ && editingFAQ.question === faq.question ? 'bg-amber-50/40' : ''}`}>
                        <td className="py-3 px-4 font-bold text-slate-900 max-w-[150px] sm:max-w-[200px] truncate" title={faq.question}>{faq.question}</td>
                        <td className="py-3 px-4 text-xs font-semibold text-orange-600 whitespace-nowrap">{faq.category}</td>
                        <td className="py-3 px-4 text-xs max-w-[150px] sm:max-w-[200px] truncate text-slate-600" title={faq.answer}>{faq.answer}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => startEditFAQ(faq)}
                            className="p-1.5 bg-slate-100 hover:bg-orange-50 text-slate-600 hover:text-orange-700 rounded-lg cursor-pointer transition-colors inline-block"
                            title="Editar"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteFAQ(faq.question)}
                            className="p-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-650 rounded-lg cursor-pointer transition-colors inline-block"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT COLUMN: FAQ Form */}
            <form onSubmit={handleSaveFAQ} className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm font-sans text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-sans font-black text-base text-slate-900">
                  {editingFAQ && editingFAQ.question !== '' ? '📝 Editar FAQ' : '✨ Crear Consulta FAQ'}
                </h3>
                {editingFAQ && (
                  <button
                    type="button"
                    onClick={cancelEditFAQ}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-md cursor-pointer text-[10px]"
                  >
                    Volver a Crear
                  </button>
                )}
              </div>

              {editingFAQ && editingFAQ.question !== '' && (
                <div className="p-3 bg-amber-50 text-amber-900 rounded-xl border border-amber-100 font-bold text-[11px] flex items-center justify-between">
                  <span>Modo Edición activo</span>
                  <button type="button" onClick={cancelEditFAQ} className="underline hover:text-amber-950 font-black">Limpiar / Crear Nuevo</button>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pregunta o Consulta *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: ¿Qué hacer ante discursos de odio?"
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Categoría Pedagógica</label>
                  <input
                    type="text"
                    placeholder="Ej: Pedagogía Aplicada"
                    value={faqCategory}
                    onChange={(e) => setFaqCategory(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Respuesta Orientadora *</label>
                  <textarea
                    required
                    placeholder="Redacta la respuesta recomendada..."
                    rows={4}
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs bg-scroll focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg text-center"
              >
                💾 {editingFAQ && editingFAQ.question !== '' ? 'Guardar Cambios en FAQ' : 'Crear y Añadir FAQ'}
              </button>
            </form>
          </div>
        )}

                {/* SUBTAB CONTENT: INBOX */}
        {activeSubTab === 'inbox' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-4 gap-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Inbox className="w-6 h-6 text-orange-600" /> Consultas de Docentes y Buzón
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Buzón central de la intranet con registro de consultas recibidas y respuestas emitidas.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-850 text-xs font-medium">
                <Mail className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Cuenta oficial del centro: <strong>{supportEmail}</strong></span>
              </div>
            </div>

            {/* Practical guidance tip for replying and tracking responses */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-amber-950">Registro permanente de respuestas:</p>
                <p className="text-amber-800 leading-relaxed">
                  Ahora puedes redactar la respuesta directamente en cada consulta. Al pulsar <strong>"Guardar respuesta en intranet"</strong> o <strong>"Guardar y enviar por Gmail"</strong>, el texto de la contestación quedará <strong>visible permanentemente</strong> en la ficha de la consulta, junto con la fecha y hora en que se respondió.
                </p>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setInboxFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    inboxFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Todas ({inboxMessages.length})
                </button>
                <button
                  type="button"
                  onClick={() => setInboxFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    inboxFilter === 'pending' ? 'bg-white text-orange-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Pendientes</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-orange-100 text-orange-800">
                    {inboxMessages.filter(m => m.status === 'pending').length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setInboxFilter('resolved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    inboxFilter === 'resolved' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Resueltas</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800">
                    {inboxMessages.filter(m => m.status === 'resolved').length}
                  </span>
                </button>
              </div>

              <span className="text-xs text-slate-500 font-medium">
                Mostrando {inboxMessages.filter(m => inboxFilter === 'all' || m.status === inboxFilter).length} consultas
              </span>
            </div>

            {inboxMessages.filter(m => inboxFilter === 'all' || m.status === inboxFilter).length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-slate-900 font-bold mb-1">
                  {inboxFilter === 'pending' ? 'No hay consultas pendientes' : inboxFilter === 'resolved' ? 'No hay consultas resueltas aún' : 'Bandeja vacía'}
                </h4>
                <p className="text-sm text-slate-500">
                  {inboxFilter === 'pending' ? '¡Buen trabajo! Todas las consultas han sido respondidas o resueltas.' : 'Las nuevas consultas enviadas desde el formulario de contacto aparecerán aquí.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inboxMessages
                  .filter(m => inboxFilter === 'all' || m.status === inboxFilter)
                  .map(msg => (
                  <div 
                    key={msg.id} 
                    className={`p-5 rounded-2xl border transition-all ${
                      msg.status === 'resolved' 
                        ? 'bg-slate-50/70 border-slate-200' 
                        : 'bg-white border-orange-200 shadow-xs border-l-4 border-l-orange-500'
                    }`}
                  >
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-slate-900 text-base">{msg.name}</h4>
                          {msg.role && (
                            <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                              {msg.role}
                            </span>
                          )}
                          {msg.status === 'resolved' ? (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-emerald-600" /> Resuelta
                            </span>
                          ) : (
                            <span className="text-[10px] bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-orange-600" /> Pendiente
                            </span>
                          )}
                        </div>
                        <a 
                          href={`mailto:${msg.email}`} 
                          className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-mono inline-flex items-center gap-1 mt-0.5"
                        >
                          <Mail className="w-3 h-3" /> {msg.email}
                        </a>
                      </div>
                      <span className="text-xs text-slate-500 font-mono shrink-0">
                        {new Date(msg.date).toLocaleDateString()} {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Received message */}
                    <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 mb-3 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Consulta enviada por el docente:
                      </span>
                      <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed italic">
                        "{msg.message}"
                      </p>
                    </div>

                    {/* Saved response display (The core feature requested by the user) */}
                    {msg.replyText && replyingMessageId !== msg.id && (
                      <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-4 mb-3 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Respuesta dada y registrada:</span>
                          </div>
                          {msg.replyDate && (
                            <span className="text-[11px] text-emerald-700/80 font-mono">
                              {new Date(msg.replyDate).toLocaleDateString()} {new Date(msg.replyDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                        <div className="bg-white border border-emerald-200/70 rounded-lg p-3 text-slate-800 whitespace-pre-wrap leading-relaxed text-xs shadow-2xs">
                          {msg.replyText}
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleCopyReplyText(msg.replyText!, msg.id)}
                            className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            title="Copiar el texto de la respuesta al portapapeles"
                          >
                            {copiedReplyId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>¡Copiada!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-emerald-600" />
                                <span>Copiar respuesta</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStartReply(msg)}
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            title="Editar o ampliar la respuesta dada"
                          >
                            <Edit3 className="w-3 h-3 text-slate-600" />
                            <span>Modificar respuesta</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Inline Response Editor */}
                    {replyingMessageId === msg.id && (
                      <div className="bg-orange-50/80 border-2 border-orange-300 rounded-xl p-4 mb-3 space-y-3 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-orange-950 flex items-center gap-1.5">
                            <Reply className="w-4 h-4 text-orange-600" />
                            Redactar respuesta para {msg.name} ({msg.email})
                          </span>
                          <button
                            type="button"
                            onClick={handleCancelReply}
                            className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer underline"
                          >
                            Cancelar
                          </button>
                        </div>
                        <textarea
                          rows={7}
                          value={replyDraft}
                          onChange={(e) => setReplyDraft(e.target.value)}
                          placeholder="Escribe aquí la respuesta que se guardará en la intranet..."
                          className="w-full bg-white text-slate-900 border border-orange-200 rounded-xl p-3 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-orange-500/30 font-sans"
                        />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                          <span className="text-[11px] text-slate-500">
                            La respuesta se guardará en la intranet para consulta futura y marcará la ficha como resuelta.
                          </span>
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => handleSaveReplyOnly(msg)}
                              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                              title="Guarda la respuesta en la intranet y marca la consulta como resuelta sin abrir Gmail"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Guardar en Intranet</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSendGmailWithReply(msg)}
                              className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                              title="Guarda la respuesta en la intranet y abre Gmail con el texto redactado"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Guardar y Enviar por Gmail</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Action buttons footer */}
                    {replyingMessageId !== msg.id && (
                      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200/60 pt-3">
                        {/* If pending without reply yet */}
                        {msg.status === 'pending' && !msg.replyText && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStartReply(msg)}
                              className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                              title="Redactar una respuesta para enviarla y dejarla registrada en la intranet"
                            >
                              <Reply className="w-3.5 h-3.5" />
                              <span>Responder consulta</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCopyTemplate(msg)}
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="Copiar texto y destinatario al portapapeles para pegarlo en cualquier gestor o webmail"
                            >
                              {copiedMessageId === msg.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700">¡Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                                  <span>Copiar plantilla</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleResolveMessage(msg.id)}
                              className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="Marcar como resuelta sin añadir respuesta escrita"
                            >
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Marcar resuelta</span>
                            </button>
                          </>
                        )}

                        {/* If resolved or already has reply */}
                        {msg.status === 'resolved' && (
                          <>
                            {!msg.replyText && (
                              <button
                                type="button"
                                onClick={() => handleStartReply(msg)}
                                className="px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <Reply className="w-3.5 h-3.5" />
                                <span>Añadir registro de respuesta</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleReopenMessage(msg.id)}
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="Volver a marcar como pendiente"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                              <span>Reabrir</span>
                            </button>
                          </>
                        )}

                        <button 
                          type="button"
                          onClick={() => {
                            setFaqQuestion(msg.message);
                            setFaqAnswer(msg.replyText || '');
                            setFaqCategory('Consultas');
                            changeSubTab('faqs');
                          }}
                          className="px-3.5 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Convertir esta consulta (y su respuesta si existe) en una pregunta frecuente FAQ"
                        >
                          <HelpCircle className="w-3.5 h-3.5" /> 
                          <span>Convertir en FAQ</span>
                        </button>

                        <button 
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Eliminar esta consulta del registro"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> 
                          <span>Borrar</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB CONTENT: WEB TEXTS */}
        {activeSubTab === 'texts' && (
          <div className="space-y-8">
            <form onSubmit={handleSaveTexts} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs font-sans text-xs">
              <h3 className="font-sans font-black text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-600" /> Configurar Textos Generales
              </h3>

              {textsSuccess && (
                <div className="p-3 bg-orange-100 text-orange-800 rounded-2xl border border-orange-200 font-bold text-center flex items-center justify-center gap-1.5 animate-fadeIn">
                  <Check className="w-4 h-4" />
                  ¡Cambios de textos aplicados y guardados con éxito!
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Título del Banner Principal (Hero Title)</label>
                <textarea
                  rows={2}
                  placeholder="Educar en la diferencia es construir comunidad..."
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 bg-scroll focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-xs"
                />
                <span className="text-[10px] text-slate-400 block mt-1 leading-normal">
                  Este título preside la página de Inicio de Aula Intercultural. Puedes incluir texto simple.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Descripción del Banner (Hero Subtitle)</label>
                <textarea
                  rows={3}
                  placeholder="Descripción detallada de la misión del portal..."
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 bg-scroll focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Correo de Soporte y Consultas (Email de Contacto)</label>
                <input
                  type="email"
                  required
                  placeholder="ciudadaniahoruelo@horuelo.net"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-xs"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Utilizado para las respuestas informativas o derivaciones de asesoría de claustros.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md hover:shadow-lg border-2 border-slate-900"
                id="admin-save-texts-btn"
              >
                💾 Actualizar Textos Globales de la Web
              </button>
            </form>

            {/* NEW ACCESSIBILITY & SECURITY PANEL */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-8 shadow-xs font-sans text-xs">
              <h3 className="font-sans font-black text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-600" /> Seguridad y Control de Acceso
              </h3>

              <div className="space-y-8">
                {/* Change Password Form */}
                <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                  <h4 className="font-sans font-black text-sm text-slate-900 uppercase tracking-wider text-[11px] text-orange-600">
                    🔑 Cambiar Clave de Acceso Administrador
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Al cambiar la contraseña, las claves por defecto de fábrica quedarán invalidadas y solo se podrá acceder utilizando tu clave nueva personalizada.
                  </p>

                  {passwordChangeError && (
                    <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-100 font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {passwordChangeError}
                    </div>
                  )}

                  {passwordChangeSuccess && (
                    <div className="p-3 bg-orange-50 text-orange-800 rounded-xl border border-orange-100 font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 shrink-0" />
                      ¡Contraseña de administrador actualizada con éxito! La nueva clave ya es persistente.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Contraseña Actual *</label>
                      <input
                        type="password"
                        required
                        placeholder="Introduce la contraseña actual..."
                        value={currentPasswordInput}
                        onChange={(e) => setCurrentPasswordInput(e.target.value)}
                        className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nueva Contraseña *</label>
                      <input
                        type="password"
                        required
                        placeholder="Mínimo 6 caracteres..."
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Confirmar Nueva Contraseña *</label>
                      <input
                        type="password"
                        required
                        placeholder="Repite la nueva contraseña..."
                        value={newPasswordConfirm}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-orange-600 hover:bg-orange-500 text-white font-sans font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md hover:shadow-orange-500/10"
                  >
                    Establecer Nueva Contraseña
                  </button>
                </form>

                {/* Change Recovery Email Form */}
                <form onSubmit={handleSaveRecoveryEmail} className="space-y-4 border-t border-slate-100 pt-6">
                  <h4 className="font-sans font-black text-sm text-slate-900 uppercase tracking-wider text-[11px] text-orange-600 flex items-center gap-1.5">
                    <Mail className="w-4 h-4" /> Correo Electrónico de Recuperación
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Introduce el correo donde deseas recibir los códigos de restablecimiento de contraseña en caso de olvido.
                  </p>

                  {securitySettingsError && (
                    <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-100 font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {securitySettingsError}
                    </div>
                  )}

                  {securitySettingsSuccess && (
                    <div className="p-3 bg-orange-50 text-orange-800 rounded-xl border border-orange-100 font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 shrink-0" />
                      ¡Correo de recuperación guardado con éxito!
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Correo de Recuperación *</label>
                      <input
                        type="email"
                        required
                        placeholder="Ej: tu-correo@ejemplo.com"
                        value={recEmailSettingsInput}
                        onChange={(e) => setRecEmailSettingsInput(e.target.value)}
                        className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-orange-600 hover:bg-orange-500 text-white font-sans font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md hover:shadow-orange-500/10"
                  >
                    Guardar Correo de Recuperación
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
