import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function ConfigDoctores({ onClose }) {
    const [doctores, setDoctores] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [nuevoDoctor, setNuevoDoctor] = useState({
        nombre: "",
        especialidad: "",
    });
    const [error, setError] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    const obtenerDatos = async () => {
        try {
            const [espRes, docRes] = await Promise.all([
                axios.get(`${API}/especialidades`),
                axios.get(`${API}/doctores`)
            ]);
            setEspecialidades(espRes.data);
            setDoctores(docRes.data);
        } catch (err) {
            console.error("Error al obtener datos", err);
        }
    };

    useEffect(() => {
        obtenerDatos();
    }, []);


    const agregarDoctor = async (e) => {
        e.preventDefault();
        setError("");

        if (!nuevoDoctor.nombre.trim() || !nuevoDoctor.especialidad) {
            setError("Nombre y especialidad son obligatorios");
            return;
        }

        const doctorAEnviar = {
            nombre: nuevoDoctor.nombre.trim(),
            especialidad: nuevoDoctor.especialidad,
        };

        try {
            if (editandoId) {
                await axios.put(`${API}/doctores/${editandoId}`, doctorAEnviar);
            } else {
                await axios.post(`${API}/doctores`, doctorAEnviar);
            }

            setNuevoDoctor({ nombre: "", especialidad: ""});
            setEditandoId(null);
            obtenerDatos();
        } catch (err) {
            console.error("Error al guardar doctor", err);
            setError("Error al guardar doctor");
        }
    };

    const eliminarDoctor = async (id) => {
        try {
            await axios.delete(`${API}/doctores/${id}`);
            obtenerDatos();
        } catch (err) {
            console.error("Error al eliminar doctor", err);
        }
    };

    const editarDoctor = (doctor) => {
        setNuevoDoctor({
            nombre: doctor.nombre,
            especialidad: typeof doctor.especialidad === "object" ? doctor.especialidad._id : doctor.especialidad,
        });
        setEditandoId(doctor._id);
        setError("");
    };

    const cancelarEdicion = () => {
        setNuevoDoctor({ nombre: "", especialidad: ""});
        setEditandoId(null);
        setError("");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4 text-blue-700">Médicos</h2>

                <form onSubmit={agregarDoctor} className="space-y-4 mb-4">
                    <input
                        type="text"
                        placeholder="Nombre del doctor"
                        value={nuevoDoctor.nombre}
                        onChange={(e) =>
                            setNuevoDoctor({ ...nuevoDoctor, nombre: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />

                    <select
                        value={nuevoDoctor.especialidad}
                        onChange={(e) =>
                            setNuevoDoctor({ ...nuevoDoctor, especialidad: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Seleccione especialidad</option>
                        {especialidades.map((esp) => (
                            <option key={esp._id} value={esp._id}>
                                {esp.nombre}
                            </option>
                        ))}
                    </select>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            {editandoId ? "Guardar Cambios" : "Agregar Doctor"}
                        </button>
                        {editandoId && (
                            <button
                                type="button"
                                onClick={cancelarEdicion}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancelar edición
                            </button>
                        )}
                    </div>
                </form>

                <div className="overflow-y-auto max-h-[30vh] pr-2">
                    <ul className="space-y-2">
                        {doctores.map((doc) => (
                            <li
                                key={doc._id}
                                className="flex justify-between items-center bg-gray-100 p-3 rounded"
                            >
                                <div>
                                    <strong>{doc.nombre}</strong> – {typeof doc.especialidad === "object" ? doc.especialidad.nombre : doc.especialidad}
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => editarDoctor(doc)}
                                        className="text-blue-600 hover:text-blue-800 font-semibold"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => eliminarDoctor(doc._id)}
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ConfigDoctores;
