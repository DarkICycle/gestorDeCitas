import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CitaForm = ({ agregarCita }) => {
  const [paciente, setPaciente] = useState('');
  const [fecha, setFecha] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [doctor, setDoctor] = useState('');
  const [motivo, setMotivo] = useState('');

  const [especialidades, setEspecialidades] = useState([]);
  const [doctores, setDoctores] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/especialidades`)
      .then((res) => setEspecialidades(res.data))
      .catch((err) => console.error('Error al cargar especialidades', err));
  }, []);

  useEffect(() => {
    if (especialidad) {
      axios.get(`${import.meta.env.VITE_API_URL}/doctores`)
        .then((res) => {
          const filtrados = res.data.filter(doc => doc.especialidad._id === especialidad);
          setDoctores(filtrados);
        })
        .catch((err) => console.error('Error al cargar doctores', err));
    } else {
      setDoctores([]);
    }
  }, [especialidad]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaCita = {
      paciente,
      fecha,
      especialidad,
      doctor,
      motivo,
    };

    agregarCita(nuevaCita);

    // Limpiar el formulario
    setPaciente('');
    setFecha('');
    setEspecialidad('');
    setDoctor('');
    setMotivo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Paciente</label>
        <input
          type="text"
          value={paciente}
          onChange={(e) => setPaciente(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Especialidad</label>
        <select
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecciona una especialidad</option>
          {especialidades.map((esp) => (
            <option key={esp._id} value={esp._id}>{esp.nombre}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Doctor</label>
        <select
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecciona un doctor</option>
          {doctores.map((doc) => (
            <option key={doc._id} value={doc._id}>{doc.nombre}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Motivo</label>
        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        Agregar Cita
      </button>
    </form>
  );
};

export default CitaForm;
