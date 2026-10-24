import Image from 'next/image';
import Link from 'next/link';
import { Character, CharacterResponse } from '@/types/rickandmorty';
import {
  IoPlanetOutline,
  IoLocationOutline,
  IoArrowForwardOutline,
  IoSparklesOutline,
  IoSearchOutline,
  IoFlashOutline,
  IoTimeOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';

// Función para obtener la lista de personajes forzando el caché (SSG)
async function getCharacters(): Promise<Character[]> {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/character', {
      cache: 'force-cache', // Requisito: Forzar el caché en la petición (SSG)
      headers: {
        'User-Agent': 'NextJS-RickAndMorty/1.0',
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.error('Rick and Morty API status:', res.status, res.statusText);
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data: CharacterResponse = await res.json();
    return data.results;
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    throw error;
  }
}

export default async function HomePage() {
  const characters = await getCharacters();

  return (
    <div className="space-y-16">
      {/* Hero Section con Portada de la Serie y Efectos de Portal */}
      <section className="relative isolate rounded-3xl overflow-hidden border border-emerald-500/40 p-8 sm:p-14 lg:p-20 text-center shadow-[0_0_80px_rgba(16,185,129,0.25)] bg-[#070b13]">
        {/* Imagen de fondo oficial del poster de la serie */}
        <Image
          src="/hero-bg.jpg"
          alt="Rick and Morty Poster Wallpaper"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-20 opacity-45 pointer-events-none transition-transform duration-1000 scale-105"
        />

        {/* Capas de oscurecimiento y resplandor para legibilidad y elegancia */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b13]/80 via-transparent to-[#070b13]/90 -z-10 pointer-events-none" />

        {/* Anillos de Portal Giratorios en el Fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
          <div className="w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-emerald-400/25 animate-spin-slow animate-portal-pulse" />
          <div className="absolute inset-4 rounded-full border border-dotted border-cyan-400/20 animate-spin-reverse" />
        </div>

        {/* Badge flotante con animación */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-semibold uppercase tracking-wider mb-6 shadow-lg backdrop-blur-md animate-float">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <IoSparklesOutline className="w-4 h-4 text-emerald-300" />
          Dimensión C-137 • Portal Gateway Activo
        </div>

        {/* Título Principal con Efecto Shimmer */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          <span className="shimmer-text drop-shadow-[0_0_35px_rgba(16,185,129,0.4)]">
            Rick & Morty Multiverse
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-10 font-medium drop-shadow-md">
          Explora los especímenes más fascinantes de todas las realidades alternas.
          Construido con <strong className="text-emerald-400">Next.js App Router</strong>,{' '}
          <strong className="text-cyan-400">Rutas Estáticas (SSG)</strong>,{' '}
          <strong className="text-emerald-400">ISR a 10 Días</strong> e imágenes en carga diferida.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          <Link
            href="/search"
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 font-extrabold text-sm transition duration-300 hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-95"
          >
            <IoSearchOutline className="w-5 h-5" />
            Búsqueda en Tiempo Real (CSR)
          </Link>

          <a
            href="#catalogo"
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-emerald-500/30 hover:border-emerald-400 transition duration-300 hover:scale-105 backdrop-blur-md shadow-lg"
          >
            <IoFlashOutline className="w-5 h-5 text-emerald-400" />
            Explorar Catálogo Estático ↓
          </a>
        </div>

        {/* Tarjetas de Estadísticas del Multiverso */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/20 backdrop-blur-md">
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <IoPlanetOutline className="text-emerald-400" /> Total Especímenes
            </p>
            <p className="text-2xl font-black text-white mt-1">826+</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md">
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <IoTimeOutline className="text-cyan-400" /> ISR Revalidate
            </p>
            <p className="text-2xl font-black text-white mt-1">10 Días</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 backdrop-blur-md">
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <IoFlashOutline className="text-purple-400" /> Caché Forzado
            </p>
            <p className="text-2xl font-black text-white mt-1">SSG Pure</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/20 backdrop-blur-md">
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <IoShieldCheckmarkOutline className="text-amber-400" /> Certificado
            </p>
            <p className="text-2xl font-black text-white mt-1">C-137</p>
          </div>
        </div>
      </section>

      {/* Grid de Personajes del Catálogo */}
      <section id="catalogo" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] inline-block animate-pulse" />
              Especímenes Catalogados (SSG)
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Mostrando los primeros {characters.length} personajes con imágenes bajo demanda
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 bg-slate-900 border border-emerald-500/30 rounded-lg text-emerald-400 shadow-sm">
              cache: &apos;force-cache&apos;
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character) => (
            <article
              key={character.id}
              className="group relative bg-slate-900/60 backdrop-blur-md border border-slate-800/90 hover:border-emerald-500/60 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(16,185,129,0.25)] flex flex-col justify-between"
            >
              {/* Imagen con Lazy Loading explícito y contenedor seguro */}
              <div className="relative w-full h-72 sm:h-64 overflow-hidden bg-slate-950">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={300}
                  height={300}
                  loading="lazy" // Requisito: Carga de imágenes bajo demanda (Lazy Loading)
                  priority={false}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badge de Estado Flotante con Resplandor */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md bg-slate-950/80 border border-white/10 shadow-lg">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      character.status === 'Alive'
                        ? 'bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse'
                        : character.status === 'Dead'
                        ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'
                        : 'bg-amber-400 shadow-[0_0_10px_#fbbf24]'
                    }`}
                  />
                  <span className="capitalize text-slate-200">{character.status}</span>
                </div>

                {/* ID badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[11px] font-mono font-bold text-emerald-400 border border-emerald-500/40">
                  #{character.id.toString().padStart(3, '0')}
                </div>
              </div>

              {/* Información del Personaje */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition tracking-tight">
                    {character.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <span>{character.species}</span>
                    <span>•</span>
                    <span className="capitalize">{character.gender}</span>
                  </p>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3 text-slate-300">
                  <div className="flex items-center gap-2 text-slate-400">
                    <IoPlanetOutline className="text-emerald-400 shrink-0" size={16} />
                    <span className="truncate">
                      Origen: <strong className="text-slate-200">{character.origin.name}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <IoLocationOutline className="text-cyan-400 shrink-0" size={16} />
                    <span className="truncate">
                      Ubicación: <strong className="text-slate-200">{character.location.name}</strong>
                    </span>
                  </div>
                </div>

                {/* Botón de Enlace al Detalle con Efecto Neón */}
                <Link
                  href={`/character/${character.id}`}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-emerald-500 text-white hover:text-slate-950 font-bold text-xs transition duration-200 group/btn shadow-md hover:shadow-emerald-500/30"
                >
                  Ver Ficha Completa
                  <IoArrowForwardOutline className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
