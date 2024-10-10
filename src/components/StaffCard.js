import React from 'react';

const TeamStaffCard = ({ photo, name, nickname, surname, socialLink, role }) => {
  return (
    <div className="max-w-xs h-112 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      {/* Foto del miembro */}
      <img
        className="w-full h-64 object-cover"
        src={photo}
        alt={`${nickname}'s profile`}
      />

      <div className="p-4 flex-grow">
      <h3 className="text-1xl font-akiraRegular text-pureBlack line-clamp-3 overflow-hidden">
        {role} 
        </h3>
        {/* Nombre y apodo */}
        <h3 className="text-2xl font-akiraBold text-pureBlack line-clamp-3 overflow-hidden">
          {name} <span className="text-avalancheBlue">"{nickname}"</span> <span className="font-akiraBold text-pureBlack">{surname}</span>
        </h3>

      </div>


      {/* Icono de la red social con enlace */}
      <div className="p-4 flex items-end justify-start">
        <a
          href={socialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-avalancheBlue hover:text-avalanche10 transition"
        >
          {/* Ajuste del tamaño del ícono usando TailwindCSS */}
          <i className="fab fa-square-x-twitter text-4xl"></i>
        </a>
      </div>
    </div>
  );
};

export default TeamStaffCard;
