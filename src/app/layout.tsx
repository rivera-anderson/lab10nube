import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { IoPlanetOutline, IoSearchOutline, IoFlashOutline, IoLogoGithub } from 'react-icons/io5';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rick & Morty Portal | SSG, ISR & CSR Next.js App',
  description: 'Aplicación de alto rendimiento con rutas estáticas, ISR y búsqueda en tiempo real usando Rick & Morty API.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#070b13] text-slate-100 selection:bg-emerald-500 selection:text-black">
        {/* Fondo con brillo ambiental cósmico / portal */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[350px] bg-gradient-to-t from-emerald-600/10 to-transparent blur-3xl rounded-full" />
        </div>

        {/* Barra de Navegación de Alta Calidad */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-emerald-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo y Nombre */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[2px] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center text-emerald-400">
                  <IoPlanetOutline className="w-6 h-6 animate-spin-slow" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-300 transition">
                  Rick & Morty <span className="text-emerald-400 text-sm font-semibold">C-137</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-widest">
                  Next.js SSG + ISR + CSR
                </span>
              </div>
            </Link>

            {/* Enlaces de Navegación */}
            <nav className="flex items-center gap-3 sm:gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-emerald-500/30 transition duration-200"
              >
                <IoFlashOutline className="text-emerald-400 w-4 h-4" />
                <span>Personajes (SSG)</span>
              </Link>

              <Link
                href="/search"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-lg shadow-emerald-500/20 transition duration-200 hover:scale-105 active:scale-95"
              >
                <IoSearchOutline className="w-4 h-4" />
                <span>Búsqueda en Vivo (CSR)</span>
              </Link>

              <a
                href="https://rickandmortyapi.com/documentation/#character"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 py-1.5 px-3 rounded-lg border border-slate-800 hover:border-emerald-500/40 transition"
              >
                API Docs ↗
              </a>
            </nav>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Pie de Página */}
        <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 backdrop-blur-md mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-400">
            <p className="flex items-center justify-center gap-2">
              Desarrollado con <span className="text-emerald-400 font-bold">Next.js (App Router)</span>, Tailwind CSS y la API de Rick and Morty.
            </p>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              Estrategias implementadas: SSG (cache: &apos;force-cache&apos;) + ISR (revalidate: 864000s) + CSR (Hooks de React)
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
