import React, { useState } from 'react';

const CitaCard = ({ cita, onEditar, onEliminar }) => {
  const [expandido, setExpandido] = useState(false);

  const toggleExpandir = () => setExpandido(!expandido);

  const formatoFecha = new Date(cita.fecha).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    onEditar(cita); 
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    onEliminar(cita._id); 
  };

  return (
    <div
      onClick={toggleExpandir}
      className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer transition-all hover:shadow-lg"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{cita.paciente}</h2>
          <p className="text-sm text-gray-600">
            Doctor: {cita.doctor?.nombre || cita.doctor}
          </p>
          <p className="text-sm text-gray-600">
            Especialidad: {cita.especialidad?.nombre || cita.especialidad}
          </p>
        </div>
        <p className="text-sm text-gray-500">{formatoFecha}</p>
      </div>

      {expandido && (
        <div
          className="mt-4 border-t pt-2 text-sm text-gray-700"
          onClick={(e) => e.stopPropagation()} 
        >
          <p><strong>Motivo:</strong> {cita.motivo}</p>
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={handleEditClick}
              className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
            >
              Editar
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitaCard;
