import React from 'react';

const ChartsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-avalanche10 via-fearOrange to-avalanche20">
      <h2 className="text-4xl font-akiraRegular text-center py-10 text-avalancheBlue">
        Dynamic Charts
      </h2>

      {/* Contenido de gráficos dinámicos */}
      <div className="flex flex-col items-center space-y-10">
        <div className="bg-coolWhite p-6 rounded-lg shadow-lg w-11/12 max-w-4xl">
          {/* Aquí agregarías tus gráficos dinámicos */}
          <p className="font-robotoLight text-xl">Chart 1</p>
        </div>
        <div className="bg-coolWhite p-6 rounded-lg shadow-lg w-11/12 max-w-4xl">
          <p className="font-robotoLight text-xl">Chart 2</p>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;