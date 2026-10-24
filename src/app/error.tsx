'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { IoWarningOutline, IoRefreshOutline, IoHomeOutline } from 'react-icons/io5';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorHandler({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error en el portal dimensional:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900/80 border border-rose-500/30 rounded-3xl p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 animate-pulse">
          <IoWarningOutline size={44} />
        </div>

        <span className="inline-block px-3 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-rose-400 bg-rose-950/60 border border-rose-800/60 rounded-full mb-3">
          Error en el Flujo Espacio-Temporal
        </span>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          ¡Fallo en la Pistola de Portales!
        </h1>

        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Ocurrió una anomalía inesperada al procesar los datos de esta dimensión.
        </p>

        <div className="bg-slate-950/70 border border-rose-500/20 rounded-xl p-3.5 mb-8 text-left">
          <p className="text-xs font-mono text-rose-300 break-words">
            {error.message || 'Error no especificado'}
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-slate-500 mt-1">Digest: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <IoRefreshOutline size={18} /> Reintentar
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition"
          >
            <IoHomeOutline size={18} /> Ir al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
