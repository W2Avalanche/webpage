// CollaborationCard.js
import React from 'react';

const CollaborationCard = ({ group, selectedColor }) => {
  const handleClick = () => {
    window.open(group.rrss, "_blank", "noopener,noreferrer");
  };

  return (
    <div onClick={handleClick} style={{ color: selectedColor }} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer">
      <div className="flex items-center space-x-4 mb-4">
        <img src={group.logo} alt={`${group.name} logo`} className="w-10 h-10" />
        <h3 className="text-xl font-semibold " style={{ color: selectedColor }}>{group.name}</h3>
      </div>
      <p className="text-gray-600 ">
        {group.start} - {group.end ? group.end : "Actualidad"}
      </p>
    </div>
  );
};

export default CollaborationCard;
