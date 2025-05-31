import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import ConfigEspecialidades from "./ConfigEspecialidades";
import ConfigDoctores from "./ConfigDoctores"; 

function SettingsMenu() {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [mostrarModalEspecialidades, setMostrarModalEspecialidades] = useState(false);
  const [mostrarModalDoctores, setMostrarModalDoctores] = useState(false); 

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setMostrarMenu(!mostrarMenu)}
        className="text-gray-700 hover:text-blue-600 text-2xl"
        title="Configuración"
      >
        <FaCog />
      </button>

      {mostrarMenu && (
        <div className="mt-2 bg-white rounded shadow-lg p-3 space-y-2">
          <button
            className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              setMostrarModalEspecialidades(true);
              setMostrarMenu(false);
            }}
          >
            Especialidades
          </button>

          <button
            className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              setMostrarModalDoctores(true); 
              setMostrarMenu(false);
            }}
          >
            Médicos
          </button>
        </div>
      )}

      {mostrarModalEspecialidades && (
        <ConfigEspecialidades onClose={() => setMostrarModalEspecialidades(false)} />
      )}

      {mostrarModalDoctores && (
        <ConfigDoctores onClose={() => setMostrarModalDoctores(false)} />
      )}
    </div>
  );
}

export default SettingsMenu;
