import Link from 'next/link';
import { IoPlanetOutline, IoSearchOutline, IoHomeOutline } from 'react-icons/io5';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Glow de portal */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <IoPlanetOutline size={44} className="animate-spin-slow" />
        </div>

        <span className="inline-block px-3 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-full mb-3">
          Error 404 • Dimensión No Encontrada
        </span>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          ¡Wubba Lubba Dub Dub!
        </h1>

        <p className="text-slate-300 text-sm mb-8 leading-relaxed">
          Parece que la pistola de portales falló o este espécimen fue borrado de la línea temporal.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition"
          >
            <IoHomeOutline size={18} /> Volver a Casa
          </Link>

          <Link
            href="/search"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition"
          >
            <IoSearchOutline size={18} /> Buscar Personaje
          </Link>
        </div>
      </div>
    </div>
  );
}
