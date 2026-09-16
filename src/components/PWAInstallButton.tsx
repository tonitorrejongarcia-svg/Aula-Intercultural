import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, PlusSquare, MoreVertical, MonitorSmartphone, ExternalLink } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowGuide(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-orange-600 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold text-white shadow-sm hover:bg-orange-700 transition uppercase tracking-wider shrink-0"
      >
        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Instalar App</span>
        <span className="sm:hidden">Instalar</span>
      </button>

      {showGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 md:p-8 shadow-2xl relative">
            <h3 className="text-xl font-black text-slate-900 font-sans mb-5 flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <MonitorSmartphone className="w-6 h-6" />
              </div>
              Instalar Aplicación
            </h3>
            
            {isIOS ? (
               <div className="space-y-4 text-sm text-slate-600 font-sans leading-relaxed">
                <p>Para instalar en tu iPhone o iPad y usarla sin conexión:</p>
                <div className="bg-slate-50 p-4 rounded-xl space-y-4 border border-slate-100">
                  <p className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-200 text-orange-800 font-bold shrink-0 text-xs">1</span>
                    <span>Pulsa el botón <strong>Compartir</strong> <Share className="w-4 h-4 inline mx-1 text-blue-500" /> en la barra inferior de Safari.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-200 text-orange-800 font-bold shrink-0 text-xs">2</span>
                    <span>Desliza hacia abajo y selecciona <strong>Añadir a la pantalla de inicio</strong> <PlusSquare className="w-4 h-4 inline mx-1 text-slate-800" />.</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-sm text-slate-600 font-sans leading-relaxed">
                <p>Tu navegador está bloqueando la instalación automática por seguridad (suele pasar en previsualizaciones integradas). Para instalarla manualmente:</p>
                <div className="bg-slate-50 p-4 rounded-xl space-y-4 border border-slate-100">
                  <p className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-200 text-orange-800 font-bold shrink-0 text-xs">1</span>
                    <span>Primero, abre la aplicación en una pestaña limpia: <a href="https://ais-pre-d7cuzigax4vxvpzdpcgyvx-439828789133.europe-west3.run.app" target="_blank" rel="noopener noreferrer" className="text-orange-600 font-bold hover:underline inline-flex items-center gap-1">Abrir app externa <ExternalLink className="w-3 h-3" /></a></span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-200 text-orange-800 font-bold shrink-0 text-xs">2</span>
                    <span>En esa nueva pestaña, busca el icono de instalar en la barra de direcciones (arriba), o abre el menú (<MoreVertical className="w-4 h-4 inline text-slate-800" />) y selecciona <strong>Instalar aplicación</strong>.</span>
                  </p>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setShowGuide(false)}
              className="mt-6 w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white hover:bg-slate-800 uppercase tracking-wider transition-colors shadow-md"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};

