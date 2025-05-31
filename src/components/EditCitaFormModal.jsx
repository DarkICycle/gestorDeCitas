import React, { useState, useEffect } from 'react';

function EditCitaFormModal({ cita, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    paciente: '',
    fecha: '',
    especialidad: '',
    doctor: '',
    motivo: '',
  });

  // Llenar el formulario al recibir la cita
  useEffect(() => {
    if (cita) {
      setFormData({
        paciente: cita.paciente || '',
        fecha: cita.fecha ? formatearFechaLocal(cita.fecha) : '',
        especialidad: cita.especialidad || '',
        doctor: cita.doctor || '',
        motivo: cita.motivo || '',
      });
    }
  }, [cita]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...cita, ...formData }); 
  };

  const formatearFechaLocal = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const offset = fecha.getTimezoneOffset(); 
    const fechaLocal = new Date(fecha.getTime() - offset * 60 * 1000);
    return fechaLocal.toISOString().slice(0, 16);
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Editar Cita</h2>

      <input
        type="text"
        name="paciente"
        value={formData.paciente}
        onChange={handleChange}
        placeholder="Nombre del paciente"
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        type="datetime-local"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        type="text"
        name="especialidad"
        value={formData.especialidad}
        onChange={handleChange}
        placeholder="Especialidad"
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        type="text"
        name="doctor"
        value={formData.doctor}
        onChange={handleChange}
        placeholder="Doctor"
        className="w-full border px-4 py-2 rounded"
        required
      />

      <textarea
        name="motivo"
        value={formData.motivo}
        onChange={handleChange}
        placeholder="Motivo de la cita"
        className="w-full border px-4 py-2 rounded"
        required
      />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose} 
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Actualizar
        </button>
      </div>
    </form>
  );
}

export default EditCitaFormModal;
