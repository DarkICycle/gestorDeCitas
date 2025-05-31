import React, { useState } from 'react';
import axios from 'axios';

const HistorialCitas = () => {
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState('');

  const buscarHistorial = async () => {
    if (!nombrePaciente.trim()) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/citas/paciente/${encodeURIComponent(nombrePaciente)}`
      );
      setCitas(res.data);
      setError('');
    } catch (err) {
      setCitas([]);
      setError('No se encontraron citas para este paciente.');
    }
  };

  return (
    <div className="mt-8 p-4 border rounded bg-gray-50">
      <h3 className="text-lg font-bold text-gray-700 mb-2">Historial por paciente</h3>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={nombrePaciente}
          onChange={(e) => setNombrePaciente(e.target.value)}
          placeholder="Nombre del paciente"
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={buscarHistorial}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {citas.length > 0 && (
        <ul className="space-y-2">
          {citas.map((cita) => (
            <li key={cita._id} className="p-3 border rounded bg-white shadow-sm">
              <p><strong>Fecha:</strong> {new Date(cita.fecha).toLocaleString()}</p>
              <p><strong>Especialidad:</strong> {cita.especialidad?.nombre}</p>
              <p><strong>Doctor:</strong> {cita.doctor?.nombre}</p>
              <p><strong>Motivo:</strong> {cita.motivo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorialCitas;
