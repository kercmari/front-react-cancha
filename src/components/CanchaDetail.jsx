import React, { useEffect, useState } from 'react';
import { getCanchaById } from '../services/api';
import { FaInfoCircle } from 'react-icons/fa';

const CanchaDetail = ({ id, onClose }) => {
    const [cancha, setCancha] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCanchaById(id);
            setCancha(result.data);
        };

        fetchData();
    }, [id]);

    if (!cancha) return <div>Loading...</div>;

    const formatTime = (datetime) => {
        if (!datetime) return "N/A";
        const time = datetime.substring(11, 16);
        return time;
    };

    const handleInfoClick = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <>
            {showAlert && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75"
                    onClick={handleCloseAlert}
                >
                    <div
                        className="bg-white w-1/2 p-6 shadow-lg rounded-lg z-60"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-purple-600 mb-4">{cancha.cancha?.nombre || "N/A"}</h2>
                        <ul>
                            {cancha.horarios?.length > 0 ? (
                                cancha.horarios.map((horario, index) => (
                                    <li key={index} className="text-gray-600 mb-2">
                                        {formatTime(horario.hora_inicio)} - {formatTime(horario.hora_fin)}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-600 mb-2">No hay horarios disponibles.</li>
                            )}
                        </ul>
                        <button
                            onClick={handleCloseAlert}
                            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
            <div
                className="fixed inset-0 z-40 flex items-center justify-end"
                onClick={onClose}
            >
                <div
                    className="bg-white w-1/3 h-full p-6 shadow-lg overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-purple-600 mb-2">{cancha.cancha?.nombre || "N/A"}</h2>
                        <div className={`w-4 h-4 rounded-full ${cancha.reservada ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    </div>
                    <div className="mb-4">
                        <img
                            src="https://st4.depositphotos.com/11433486/19930/i/450/depositphotos_199304310-stock-photo-green-grass-3d-soccer-field.jpg"
                            alt={cancha.cancha?.nombre || "Cancha"}
                            className="w-full h-48 object-cover border-2 border-gray-200 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Descripción</h3>
                        <p className="text-gray-600">{cancha.cancha?.descripcion || "No hay descripción disponible."}</p>
                    </div>
                    {cancha.reservada && (
                        <div className="mb-4 flex w-2/3 items-end justify-between px-2 py-2 bg-gray-100 rounded-full bg-gray-200">
                            <span className="font-semibold ml-4">Reservado por:</span>
                            <span className="text-gray-600 mr-4">{cancha.reserva_persona || "N/A"}</span>
                        </div>
                    )}
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Horario:</h3>
                            <p className="text-gray-600">{formatTime(cancha.cancha?.horario_inicio)} - {formatTime(cancha.cancha?.horario_fin)}</p>
                        </div>
                        <button
                            className="px-2 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
                            onClick={handleInfoClick}
                        >
                            <FaInfoCircle className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CanchaDetail;
