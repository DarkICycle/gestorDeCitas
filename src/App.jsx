import React, { useState, useEffect } from 'react';
import CitaForm from './components/CitaForm';
import CitaList from './components/CitaList';
import EditCitaFormModal from './components/EditCitaFormModal';
import SettingsMenu from './components/SettingsMenu';

const API = import.meta.env.VITE_API_URL;

function App() {
  const [citas, setCitas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const obtenerCitas = async () => {
    try {
      const res = await fetch(`${API}/citas`);
      const data = await res.json();
      setCitas(data);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  const agregarCita = async (cita) => {
    try {
      const res = await fetch(`${API}/citas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cita),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Error al agregar cita:', data.error || data.message || 'Error desconocido');
        return;
      }

      obtenerCitas();
      setMostrarModal(false);
    } catch (error) {
      console.error('Error de red al agregar cita:', error);
    }
  };


  const eliminarCita = async (id) => {
    try {
      await fetch(`${API}/citas/${id}`, { method: 'DELETE' });
      setCitas(citas.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error al eliminar cita:', error);
    }
  };

  const editarCita = (cita) => {
    setCitaSeleccionada(cita);
    setMostrarModal(true);
  };

  const actualizarCita = async (citaActualizada) => {
    try {
      const res = await fetch(`${API}/citas/${citaActualizada._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citaActualizada),
      });
      if (res.ok) {
        obtenerCitas();
        setMostrarModal(false);
        setCitaSeleccionada(null);
      }
    } catch (error) {
      console.error('Error al actualizar cita:', error);
    }
  };

  useEffect(() => {
    obtenerCitas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <SettingsMenu /> { }

      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Gestor de Citas Médicas
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => { setCitaSeleccionada(null); setMostrarModal(true); }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          Agregar Cita
        </button>
      </div>

      <CitaList citas={citas} onEliminar={eliminarCita} onEditar={editarCita} />

      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative">
            <button
              onClick={() => { setMostrarModal(false); setCitaSeleccionada(null); }}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>

            {citaSeleccionada === null ? (
              <CitaForm agregarCita={agregarCita} />
            ) : (
              <EditCitaFormModal
                cita={citaSeleccionada}
                onClose={() => { setMostrarModal(false); setCitaSeleccionada(null); }}
                onUpdate={actualizarCita}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
