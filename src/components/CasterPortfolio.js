// CasterPortfolio.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import casters from '../data/casters.json';
import groups from '../data/groups.json';
import CollaborationCard from './CollaborationCard';
import ClipCarousel from './ClipCarousel';

const gameLogos = {
  "League of Legends": "/images/game_logos/lol.svg",
  "Valorant": "/images/game_logos/valorant.svg",
  "Wild Rift": "/images/game_logos/wild.svg"
};

const CasterPortfolio = () => {
  const { id } = useParams();
  const caster = casters.find(caster => caster.id === parseInt(id));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!caster) {
    return <p>Este caster no existe.</p>;
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(caster.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Error al copiar al portapapeles:', err));
  };

  // Filtrar la información de los grupos en los que el caster colabora
  const collaborationGroups = caster.collaborator.map(collab => {
    const group = groups.find(g => g.id === collab.entity);
    return { ...group, ...collab };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-avalanche10 via-fearOrange to-avalanche20 p-10">
      {/* Cabecera */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md transition-all duration-500 z-50 py-2 border-b">
        <div className="flex justify-between items-center w-full px-4">
          <a href="/" className="flex-shrink-0">
            <img
              src="/logo.svg"
              alt="Team Logo"
              className="w-10 h-10"
            />
          </a>
          <div className="flex justify-center flex-grow text-2xl md:text-3xl font-akiraBold text-avalancheBlue">
            CONOCE A NUESTROS CASTERS
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto flex flex-col items-center max-w-screen-lg mt-16 pt-6">
        {/* Tarjeta del caster */}
        <div className="relative bg-white rounded-lg shadow-lg p-8 w-full mb-10 min-h-[300px]">
          <div className="absolute top-4 right-4 flex space-x-2">
            {caster.games && caster.games.map((game, index) => (
              <img
                key={index}
                src={gameLogos[game]}
                alt={`${game} logo`}
                className="w-12 h-12 md:w-14 md:h-14"
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex-shrink-0 flex flex-col items-center w-32 h-32 md:w-40 md:h-40 mb-4 md:mb-0">
              <img
                src={`${process.env.PUBLIC_URL}${caster.photo}`}
                alt={`${caster.name} ${caster.surname}`}
                className="w-full h-full object-cover rounded-full border-4 border-avalancheBlue"
              />
              <div className="flex space-x-4 mt-4">
                <a href={caster.socialLink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-square-x-twitter text-3xl text-avalancheBlue"></i>
                </a>
                <button onClick={handleCopyEmail} className="text-3xl text-avalancheBlue">
                  <i className="fa-solid fa-envelope"></i>
                </button>
              </div>
              {copied && <p className="text-sm text-green-600 mt-2">¡Copiado!</p>}
            </div>
            <div className="md:ml-8 flex flex-col mt-4 md:mt-0">
              <h1 className="text-4xl font-akiraBold text-avalancheBlue">{caster.name} {caster.surname}</h1>
              <p className="text-2xl font-akiraRegular text-pureBlack mt-1">"{caster.nickname}"</p>
              <p className="mt-4 text-lg text-gray-800 font-robotoLight text-justify ">
                {caster.description}
              </p>
            </div>
          </div>
          {/* Sección de Colaboraciones */}
          <div className="grid mt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full">
            {collaborationGroups.map((group, index) => (
              <CollaborationCard
                key={index}
                group={group}
              />
            ))}
          </div>
          <h2 className="text-3xl font-akiraRegular mt-12 mb-6 text-center text-avalancheBlue">Clips Destacados</h2>
          
          {/* Clips Destacados Carousel */}
          <ClipCarousel clips={caster.clips} />
        </div>
      </div>
    </div>
  );
};

export default CasterPortfolio;
