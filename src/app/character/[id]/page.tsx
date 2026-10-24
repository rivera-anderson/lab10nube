import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Character, CharacterResponse } from '@/types/rickandmorty';
import {
  IoArrowBackOutline,
  IoPlanetOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoFilmOutline,
  IoLinkOutline,
  IoSparklesOutline,
  IoMaleFemaleOutline,
  IoBarcodeOutline,
  IoSearchOutline,
} from 'react-icons/io5';

// Requisito: Revalidación de datos cada 10 días (ISR)
// 10 días = 10 * 24 * 60 * 60 = 864000 segundos
export const revalidate = 864000;

// Requisito: Generar rutas estáticas con generateStaticParams
export async function generateStaticParams() {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/character', {
      headers: {
        'User-Agent': 'NextJS-RickAndMorty/1.0',
        Accept: 'application/json',
      },
    });
    if (!res.ok) return [];

    const data: CharacterResponse = await res.json();
    return data.results.map((character) => ({
      id: character.id.toString(),
    }));
  } catch (error) {
    console.error('Error generando static params:', error);
    return [];
  }
}

// Función con async/await y fetch configurado para ISR
async function getCharacter(id: string): Promise<Character> {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
      next: { revalidate: 864000 }, // ISR: Revalida cada 10 días
      headers: {
        'User-Agent': 'NextJS-RickAndMorty/1.0',
        Accept: 'application/json',
      },
    });

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status} al consultar personaje con ID ${id}`);
    }

    return await res.json();
  } catch (error) {
    if ((error as { digest?: string })?.digest?.includes('NEXT_NOT_FOUND')) {
      throw error;
    }
    console.error('Error en fetch getCharacter:', error);
    notFound();
  }
}

export default async function CharacterDetailPage(props: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await Promise.resolve(props.params);
  const id = resolvedParams?.id;

  if (!id) {
    notFound();
  }

  const character = await getCharacter(id);

  // Formateo seguro de fecha de creación del personaje
  const fechaCreacion = character.created
    ? new Date(character.created).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No registrada';

  const episodes = Array.isArray(character.episode) ? character.episode : [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Barra de navegación superior */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition duration-200 text-sm font-semibold shadow-md"
          >
            <IoArrowBackOutline size={18} /> Catálogo
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 transition duration-200 text-sm font-semibold shadow-md"
          >
            <IoSearchOutline size={18} /> Buscador (CSR)
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <IoSparklesOutline /> ISR: Revalida cada 10 días (864,000s)
          </span>
        </div>
      </div>

      {/* Tarjeta Principal de Información */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
        {/* Resplandor ambiental de la tarjeta */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Columna Izquierda: Imagen del Personaje con dimensiones calculadas */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border-2 border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.3)] group">
              <Image
                src={character.image}
                alt={character.name}
                width={400}
                height={400}
                priority // Priority para imagen de detalle principal LCP
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badge de Estado con Pulso */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md bg-slate-950/80 border border-white/10 shadow-xl">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    character.status === 'Alive'
                      ? 'bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse'
                      : character.status === 'Dead'
                      ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'
                      : 'bg-amber-400 shadow-[0_0_10px_#fbbf24]'
                  }`}
                />
                <span className="capitalize text-white">{character.status}</span>
              </div>

              {/* ID Badge */}
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-xs font-mono font-bold text-emerald-400 border border-emerald-500/40">
                ID: #{character.id.toString().padStart(3, '0')}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Todos los Campos Mapeados del Response */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                <IoBarcodeOutline size={16} /> Registro Dimensional Oficial
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
                {character.name}
              </h1>
              <div className="text-slate-400 text-sm mt-2 flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-slate-800 text-emerald-300 font-semibold text-xs border border-slate-700">
                  {character.species}
                </span>
                {character.type && (
                  <span className="px-3 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 font-semibold text-xs border border-cyan-800/60">
                    Tipo: {character.type}
                  </span>
                )}
                <span className="px-3 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 capitalize">
                  {character.gender}
                </span>
              </div>
            </div>

            {/* Mapeo Completo de Campos en Cuadrícula */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Origen */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <IoPlanetOutline className="text-emerald-400" size={16} />
                  <span>Planeta / Dimensión de Origen</span>
                </div>
                <p className="text-sm font-bold text-slate-100">{character.origin?.name || 'Desconocido'}</p>
                {character.origin?.url && (
                  <p className="text-[10px] font-mono text-slate-500 truncate">{character.origin.url}</p>
                )}
              </div>

              {/* Ubicación Actual */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <IoLocationOutline className="text-cyan-400" size={16} />
                  <span>Ubicación Actual</span>
                </div>
                <p className="text-sm font-bold text-slate-100">{character.location?.name || 'Desconocida'}</p>
                {character.location?.url && (
                  <p className="text-[10px] font-mono text-slate-500 truncate">{character.location.url}</p>
                )}
              </div>

              {/* Género */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <IoMaleFemaleOutline className="text-purple-400" size={16} />
                  <span>Género Biológico</span>
                </div>
                <p className="text-sm font-bold text-slate-100 capitalize">{character.gender}</p>
              </div>

              {/* Fecha de Creación */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <IoTimeOutline className="text-amber-400" size={16} />
                  <span>Registrado en Base de Datos</span>
                </div>
                <p className="text-xs font-semibold text-slate-200">{fechaCreacion}</p>
              </div>
            </div>

            {/* URL oficial de la API */}
            <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5 font-mono">
                <IoLinkOutline className="text-emerald-400" /> Endpoint API:
              </span>
              <a
                href={character.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-mono underline truncate max-w-xs"
              >
                {character.url}
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Episodios: Mapeo de todo el array episode */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <IoFilmOutline className="text-emerald-400" size={22} />
              Apariciones en Episodios del Multiverso
            </h2>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Total: {episodes.length} episodio{episodes.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            {episodes.map((epUrl, idx) => {
              const epNumber = epUrl.split('/').pop();
              return (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/80 hover:border-emerald-500/50 hover:text-emerald-400 transition"
                >
                  Episodio #{epNumber}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
