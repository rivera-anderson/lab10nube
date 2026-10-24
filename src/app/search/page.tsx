'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Character, CharacterResponse } from '@/types/rickandmorty';
import {
  IoSearchOutline,
  IoFilterOutline,
  IoRefreshOutline,
  IoPlanetOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';

export default function SearchPage() {
  // Manejo de hooks de estado (CSR)
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  // Hook useEffect para búsqueda en tiempo real (CSR)
  useEffect(() => {
    const controller = new AbortController();
    const debounceTimer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      // Construcción dinámica de los parámetros de consulta
      const params = new URLSearchParams();
      if (name.trim()) params.append('name', name.trim());
      if (status) params.append('status', status);
      if (type.trim()) params.append('type', type.trim());
      if (gender) params.append('gender', gender);

      try {
        const url = `https://rickandmortyapi.com/api/character/?${params.toString()}`;
        const res = await fetch(url, { signal: controller.signal });

        if (res.status === 404) {
          // La API de Rick and Morty devuelve 404 cuando no hay coincidencias
          setCharacters([]);
          setTotalResults(0);
          setError('No se encontraron especímenes en el multiverso que coincidan con estos filtros.');
          setLoading(false);
          return;
        }

        if (!res.ok) {
          throw new Error('Error de conexión con la API de Rick and Morty');
        }

        const data: CharacterResponse = await res.json();
        setCharacters(data.results || []);
        setTotalResults(data.info?.count || 0);
      } catch (err: unknown) {
        if ((err as Error).name !== 'AbortError') {
          setError('Ocurrió un problema al buscar en el multiverso.');
        }
      } finally {
        setLoading(false);
      }
    }, 350); // Debounce de 350ms para optimizar llamadas a la API

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [name, status, type, gender]);

  const resetFilters = () => {
    setName('');
    setStatus('');
    setType('');
    setGender('');
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="border-b border-slate-800 pb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest mb-2 font-mono">
          Client Side Rendering (CSR)
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Búsqueda Dimensional en Tiempo Real
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Filtra simultáneamente por <strong className="text-emerald-400">nombre</strong>,{' '}
          <strong className="text-emerald-400">estado</strong>,{' '}
          <strong className="text-emerald-400">tipo</strong> y{' '}
          <strong className="text-emerald-400">género</strong> mediante React Hooks (useState + useEffect).
        </p>
      </div>

      {/* Panel de Filtros Interactivos */}
      <section className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <IoFilterOutline size={18} />
            <span>Filtros de Búsqueda</span>
          </div>
          {(name || status || type || gender) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold transition cursor-pointer"
            >
              <IoRefreshOutline size={16} /> Limpiar Filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtro: Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Nombre (Name)
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Rick, Morty, Summer..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
              <IoSearchOutline className="absolute left-3.5 top-3 text-slate-500" size={16} />
            </div>
          </div>

          {/* Filtro: Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Estado (Status)
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="">Todos los Estados</option>
              <option value="alive">Vivo (Alive)</option>
              <option value="dead">Muerto (Dead)</option>
              <option value="unknown">Desconocido (Unknown)</option>
            </select>
          </div>

          {/* Filtro: Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Tipo / Subespecie (Type)
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Ej. Clone, Parasite, Robot..."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Filtro: Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Género (Gender)
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="">Todos los Géneros</option>
              <option value="female">Femenino (Female)</option>
              <option value="male">Masculino (Male)</option>
              <option value="genderless">Sin Género (Genderless)</option>
              <option value="unknown">Desconocido (Unknown)</option>
            </select>
          </div>
        </div>

        {/* Resumen de resultados */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <IoCheckmarkCircleOutline className="text-emerald-400" size={16} />
            <span>
              Resultados encontrados:{' '}
              <strong className="text-emerald-400 text-sm font-bold">{totalResults}</strong>
            </span>
          </div>
          {loading && (
            <span className="text-emerald-400 animate-pulse flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Buscando en el multiverso...
            </span>
          )}
        </div>
      </section>

      {/* Resultados de Búsqueda */}
      <section>
        {loading && characters.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-sm font-mono">Consultando dimensiones...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-2xl font-bold">
              !
            </div>
            <h3 className="text-xl font-bold text-white">Sin coincidencias</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">{error}</p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-sm font-semibold transition cursor-pointer"
            >
              Restablecer todos los filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <article
                key={character.id}
                className="group bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] flex flex-col justify-between"
              >
                <div className="relative w-full h-72 sm:h-64 bg-slate-950 overflow-hidden">
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={300}
                    height={300}
                    loading="lazy"
                    priority={false}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md bg-slate-950/70 border border-white/10 shadow-lg">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        character.status === 'Alive'
                          ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                          : character.status === 'Dead'
                          ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                          : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                      }`}
                    />
                    <span className="capitalize text-slate-200">{character.status}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono font-semibold text-emerald-400 border border-emerald-500/30">
                    #{character.id.toString().padStart(3, '0')}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition tracking-tight">
                      {character.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {character.species} {character.type ? `(${character.type})` : ''} • {character.gender}
                    </p>
                  </div>

                  <div className="text-xs border-t border-slate-800/80 pt-3 text-slate-400 space-y-1">
                    <p className="flex items-center gap-1.5 truncate">
                      <IoPlanetOutline className="text-emerald-400 shrink-0" size={14} />
                      <span>{character.origin.name}</span>
                    </p>
                  </div>

                  <Link
                    href={`/character/${character.id}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white hover:text-slate-950 font-semibold text-xs transition duration-200 group/btn"
                  >
                    Ver Detalles
                    <IoArrowForwardOutline className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
