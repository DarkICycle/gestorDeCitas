import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function ConfigEspecialidades({ onClose }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState("");
  const [error, setError] = useState("");

  const obtenerEspecialidades = async () => {
    try {
      const res = await axios.get(`${API}/especialidades`);
      const ordenadas = res.data.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
      setEspecialidades(ordenadas);
    } catch (error) {
      console.error("Error al obtener especialidades", error);
    }
  };

  const agregarEspecialidad = async (e) => {
    e.preventDefault();
    setError(""); 

    const nombreLimpio = nuevaEspecialidad.trim();
    if (!nombreLimpio) {
      setError("El nombre no puede estar vacío");
      return;
    }

    try {
      const res = await axios.post(`${API}/especialidades`, {
        nombre: nombreLimpio,
      });

      if (res.status === 201 || res.status === 200) {
        setNuevaEspecialidad("");
        obtenerEspecialidades();
      } else {
        setError("No se pudo agregar la especialidad");
        console.error("Respuesta inesperada:", res);
      }
    } catch (error) {
      const mensaje = error.response?.data?.error || "Error al agregar especialidad";
      setError(mensaje);
      console.error("Error al agregar especialidad:", error);
    }
  };

  const eliminarEspecialidad = async (id) => {
    try {
      await axios.delete(`${API}/especialidades/${id}`);
      obtenerEspecialidades();
    } catch (error) {
      console.error("Error al eliminar especialidad", error);
    }
  };

  useEffect(() => {
    obtenerEspecialidades();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-700">Especialidades</h2>

        <form onSubmit={agregarEspecialidad} className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Nueva especialidad"
            value={nuevaEspecialidad}
            onChange={(e) => setNuevaEspecialidad(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        </form>

        {}
        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}

        <div className="overflow-y-auto max-h-[60vh] pr-2">
          <ul className="space-y-2">
            {especialidades.map((esp) => (
              <li
                key={esp._id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded"
              >
                <span>{esp.nombre}</span>
                <button
                  onClick={() => eliminarEspecialidad(esp._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ConfigEspecialidades;
