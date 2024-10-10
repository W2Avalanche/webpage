import React, { useState, useEffect, useRef } from 'react';
import TeamMemberCard from './TeamMemberCard';
import casters from '../data/casters.json';
import realizadores from '../data/staff.json';
import TeamStaffCard from './StaffCard';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const castersSectionRef = useRef(null);

  // Manejamos el evento de scroll y la posición de la sección de casters
  useEffect(() => {
    const handleScroll = () => {
      const castersSection = castersSectionRef.current;
      const castersTop = castersSection.getBoundingClientRect().top;

      // Mostrar el header solo si la sección de casters está por encima de la mitad de la pantalla
      if (castersTop <= window.innerHeight / 2) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-avalanche10 via-fearOrange to-avalanche20 min-h-screen">
      {/* Header con logos y línea horizontal */}
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-md transition-all duration-500 z-50 py-2 border-b ${
          scrolled
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
        style={{ transition: 'opacity 0.5s ease, transform 0.5s ease' }}
      >
        <div className="flex justify-between items-center w-full px-4">
          {/* Logo en pequeño a la izquierda */}
          <a href="/" className="flex-shrink-0">
            <img
              src="/logo.svg"
              alt="Team Logo"
              className="w-10 h-10"  // Ajusta el tamaño del logo según tus necesidades
            />
          </a>

          {/* Redes sociales centradas */}
          <div className="flex justify-center space-x-6 text-5xl flex-grow">
          <a
              href="https://x.com/w2avalanche"
              target="_blank"
              rel="noopener noreferrer"
            >              <i className="fab fa-square-x-twitter"></i>
            </a>
            <a
              href="https://twitch.tv/w2atv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitch"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Slogan y logos grandes con imagen de fondo */}
      <div className="relative flex flex-col items-center justify-center h-screen z-10 bg-cover bg-center bg-no-repeat">
        {/* Background image with blur */}
        <div className="absolute inset-0 bg-cover bg-center z-0 filter blur-md opacity-30"
          style={{
            backgroundImage: `url('./logo.svg')`,
            backgroundSize: 'contain', // Ajusta el tamaño de la imagen de fondo
            backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
          }}
        ></div>

        {/* Ajustes responsivos del texto */}
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-akiraBold text-avalancheBlue mb-5 sm:mb-10 px-4 text-center">
          Welcome to the Avalanche
        </h1>
        <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-akiraRegular text-pureBlack mb-5 sm:mb-10 px-4 text-center">
          Casteos y realización para <br/>league of legends amateur
        </h2>

        {/* Logos grandes justo debajo del eslogan */}
        <div
          id="logos"
          className={`relative z-10 flex space-x-4 sm:space-x-6 transition-all duration-500 ${
            scrolled ? 'scale-75 opacity-50' : 'scale-100'
          }`}
        >
          <a
              href="https://x.com/w2avalanche"
              target="_blank"
              rel="noopener noreferrer"
            >             <i className="fab fa-square-x-twitter text-6xl sm:text-7xl md:text-9xl"></i>
          </a>
          <a
            href="https://twitch.tv/w2atv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitch text-6xl sm:text-7xl md:text-9xl"></i>
          </a>
        </div>
      </div>

      {/* Lista de casters */}
      <div
        id="casters-section"
        ref={castersSectionRef}
        className="bg-coolWhite min-h-screen p-10"
      >
        <h2 className="text-4xl font-akiraRegular text-center mb-10">
          Nuestros Casters
        </h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 lg:gap-x-10 max-w-screen-lg mx-auto ${
            casters.length < 3 ? 'justify-center' : ''
          }`}
        >
          {casters.map((member, index) => (
            <TeamMemberCard
              key={index}
              id={member.id}
              photo={member.photo}
              name={member.name}
              nickname={member.nickname}
              surname={member.surname}
              socialLink={member.socialLink}
            />
          ))}
        </div>
      </div>

      {/* Lista de realizadores */}
      <div id="realizadores-section" className="bg-coolWhite min-h-screen p-10">
        <h2 className="text-4xl font-akiraRegular text-center mb-10">
          El equipo
        </h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 lg:gap-x-10 max-w-screen-lg mx-auto ${
            realizadores.length < 3 ? 'justify-center' : ''
          }`}
        >
          {realizadores.map((member, index) => (
            <TeamStaffCard
              key={index}
              photo={member.photo}
              name={member.name}
              nickname={member.nickname}
              surname={member.surname}
              socialLink={member.socialLink}
              role={member.role}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
