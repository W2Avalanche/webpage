import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import casters from '../data/casters.json';
import gamesData from '../data/games.json';
import groups from '../data/groups.json';
import CollaborationCard from './CollaborationCard';
import ClipCarousel from './ClipCarousel';

const CasterPortfolio = () => {
  const { id } = useParams();
  const caster = casters.find(caster => caster.id === parseInt(id));

  // ID predeterminado para "League of Legends"
  const defaultGameId = "lol";

  const [copied, setCopied] = useState(false);
  const [selectedGame, setSelectedGame] = useState(defaultGameId);
  const [selectedColor, setSelectedColor] = useState(() => {
    const defaultGame = gamesData.find(game => game.id === defaultGameId);
    return defaultGame ? defaultGame.color : '#000';
  });
  const sectionRefs = useRef({});

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

  const handleGameSelection = (gameId) => {
    // Solo cambiar la selección si el ID es diferente del actual
    if (gameId !== selectedGame) {
      setSelectedGame(gameId);
      const game = gamesData.find(g => g.id === gameId);
      setSelectedColor(game ? game.color : '#000');
    }
  };

  const collaborationGroups = selectedGame && caster.profiles && caster.profiles[selectedGame]?.collaborator.map(collab => {
    const group = groups.find(g => g.id === collab.entity);
    return { ...group, ...collab };
  });

  // Refs para las secciones de clips

  // Función para desplazar a la sección correspondiente
  const scrollToSection = (sectionName) => {
    sectionRefs.current[sectionName].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-avalanche10 via-fearOrange to-avalanche20 p-10 text-avalancheBlue">
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
          <div className="flex justify-center flex-grow text-2xl md:text-3xl font-akiraBold ">
            CONOCE A NUESTROS CASTERS
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto flex flex-col items-center max-w-screen-lg mt-16 pt-6">
        {/* Tarjeta del caster */}
        <div className="relative bg-white rounded-lg shadow-lg p-8 w-full mb-10 min-h-[300px]">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex-shrink-0 flex flex-col items-center w-32 h-32 md:w-40 md:h-40 mb-4 md:mb-0">
              <img
                src={`${process.env.PUBLIC_URL}${caster.photo}`}
                alt={`${caster.name} ${caster.surname}`}
                className="w-full h-full object-cover rounded-full text-avalancheBlue"
                style={{ border: `4px solid` }}
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
              <h1 className="text-4xl font-akiraBold text-avalancheBlue">{caster.name}  {caster.surname}</h1>
              <p className="text-2xl font-akiraRegular text-pureBlack mt-1">"{caster.nickname}"</p>
              <p className="mt-4 text-lg text-gray-800 font-robotoLight text-justify">
                {caster.description}
              </p>
            </div>
          </div>

          {/* Logos de juegos */}
          <div className="flex justify-center mt-8 space-x-4">
            {caster.profiles && Object.keys(caster.profiles).map((gameId, index) => {
              const game = gamesData.find(g => g.id === gameId);
              const isActive = selectedGame === gameId;
              return (
                <img
                  key={index}
                  src={isActive ? game.image_active : game.image_inactive}
                  alt={`${gameId} logo`}
                  className="w-12 h-12 md:w-14 md:h-14 cursor-pointer"
                  onClick={() => handleGameSelection(gameId)}
                />
              );
            })}
          </div>

          {/* Nombre del juego seleccionado */}
          {selectedGame && (
            <p className="text-center mt-4 text-xl font-akiraRegular" style={{ color: selectedColor }}>
              {gamesData.find(g => g.id === selectedGame)?.name}
            </p>
          )}


          {/* Sección de Colaboraciones */}
          {selectedGame && caster.profiles && caster.profiles[selectedGame] && (
            <>
              <div className="grid mt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full">
                {collaborationGroups && collaborationGroups.map((group, index) => (
                  <CollaborationCard key={index} group={group} selectedColor={selectedColor} />
                ))}
              </div>

              {/* Índice de categorías */}
              {selectedGame && caster.profiles && caster.profiles[selectedGame] && (
                <div className="flex justify-center mt-8 space-x-4 mb-8">
                  {Object.keys(caster.profiles[selectedGame].clips).length > 1 &&
                    Object.keys(caster.profiles[selectedGame].clips).map((sectionName, index) => (
                      <React.Fragment key={index}>
                        <button
                          onClick={() => scrollToSection(sectionName)}
                          style={{ color: selectedColor }}
                          className="text-lg font-akiraRegular hover:underline"
                        >
                          {sectionName}
                        </button>
                        {index < Object.keys(caster.profiles[selectedGame].clips).length - 1 && (
                          <span className="text-gray-400">|</span>
                        )}
                      </React.Fragment>
                    ))
                  }
                </div>
              )}
              {/* Secciones de clips dinámicos */}
              {Object.entries(caster.profiles[selectedGame].clips).map(([sectionName, clips], index) => (
                <div
                  key={index}
                  ref={(el) => (sectionRefs.current[sectionName] = el)}
                  className="mt-12"
                >
                  <h2 className="text-3xl font-akiraRegular mb-6 text-center" style={{ color: selectedColor }}>
                    {sectionName}
                  </h2>
                  <ClipCarousel clips={clips} selectedGame={selectedGame} />
                </div>
              ))}
            </>
          )}

          {!selectedGame && <p className="text-center mt-8 text-xl text-gray-700">Selecciona un juego para ver más detalles</p>}
        </div>
      </div>
    </div>
  );
};

export default CasterPortfolio;
