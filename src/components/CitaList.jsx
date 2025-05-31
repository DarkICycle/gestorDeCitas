import React from 'react';
import CitaCard from './CitaCard';

const CitaList = ({ citas, onEliminar, onEditar }) => {
  return (
    <div className="space-y-4">
      {citas.length === 0 ? (
        <p className="text-center text-gray-500">No hay citas agendadas.</p>
      ) : (
        citas.map((cita) => (
          <CitaCard
            key={cita._id}
            cita={cita}
            onEliminar={onEliminar}
            onEditar={onEditar}
          />
        ))
      )}
    </div>
  );
};

export default CitaList;
