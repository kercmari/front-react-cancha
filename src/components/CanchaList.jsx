import React, { useEffect, useState } from 'react';
import { getCanchas } from '../services/api';
import CanchaDetail from './CanchaDetail';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const CanchaList = () => {
    const [canchas, setCanchas] = useState([]);
    const [filteredCanchas, setFilteredCanchas] = useState([]);
    const [selectedCanchaId, setSelectedCanchaId] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCanchas();
            setCanchas(result.data);
            setFilteredCanchas(result.data);
        };

        fetchData();
    }, []);

    const handleCanchaClick = (id) => {
        setSelectedCanchaId(id);
    };

    const handleClose = () => {
        setSelectedCanchaId(null);
    };

    const handleFilter = () => {
        if (startTime && endTime && startTime < endTime) {
            const filtered = canchas.filter(cancha => {
                if (cancha.horario_inicio) {
                    const horarioInicio = cancha.horario_inicio.substring(11, 16);
                    const horarioFin = cancha.horario_fin.substring(11, 16);
                    return (horarioInicio >= startTime && horarioFin <= endTime);
                }
                return false;
            });

            setFilteredCanchas(filtered);
        } else {
            alert('Por favor, asegúrese de que la hora de inicio es menor que la hora de fin.');
        }
    };

    const handleClearFilter = () => {
        setStartTime('');
        setEndTime('');
        setFilteredCanchas(canchas);
    };

    const sortByAvailability = (asc) => {
        const sorted = [...filteredCanchas].sort((a, b) => {
            if (asc) return a.reservada - b.reservada;
            return b.reservada - a.reservada;
        });
        setFilteredCanchas(sorted);
    };

    const sortByPrice = (asc) => {
        const sorted = [...filteredCanchas].sort((a, b) => {
            if (asc) return a.costo_por_hora - b.costo_por_hora;
            return b.costo_por_hora - a.costo_por_hora;
        });
        setFilteredCanchas(sorted);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative">
            {selectedCanchaId && <CanchaDetail id={selectedCanchaId} onClose={handleClose} />}
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                        <div>
                            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">Hora de inicio</label>
                            <input
                                type="time"
                                id="start-time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">Hora de fin</label>
                            <input
                                type="time"
                                id="end-time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                            />
                        </div>
                        <button
                            onClick={handleFilter}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Filtrar
                        </button>
                        <button
                            onClick={handleClearFilter}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Limpiar
                        </button>
                    </div>
                    <div className="relative inline-block text-left z-20">
                        <div>
                            <button
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-teal-500 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                id="options-menu"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                                onClick={toggleDropdown}
                            >
                                Ordenar
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {isDropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <div className="py-1" role="none">
                                    <button onClick={() => sortByAvailability(true)} className="text-gray-700 block px-4 py-2 text-sm w-full text-left" role="menuitem">
                                        Disponibles primero <FaSortUp className="inline ml-2" />
                                    </button>
                                    <button onClick={() => sortByAvailability(false)} className="text-gray-700 block px-4 py-2 text-sm w-full text-left" role="menuitem">
                                        Ocupados primero <FaSortDown className="inline ml-2" />
                                    </button>
                                    <button onClick={() => sortByPrice(true)} className="text-gray-700 block px-4 py-2 text-sm w-full text-left" role="menuitem">
                                        Menor precio <FaSortUp className="inline ml-2" />
                                    </button>
                                    <button onClick={() => sortByPrice(false)} className="text-gray-700 block px-4 py-2 text-sm w-full text-left" role="menuitem">
                                        Mayor precio <FaSortDown className="inline ml-2" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={`container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${selectedCanchaId ? 'blur-sm' : ''}`}>
                {filteredCanchas.map(cancha => (
                    <div
                        key={cancha.id}
                        className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        onClick={() => handleCanchaClick(cancha.id)}
                    >
                        <img
                            src="https://st4.depositphotos.com/11433486/19930/i/450/depositphotos_199304310-stock-photo-green-grass-3d-soccer-field.jpg"
                            alt={cancha.nombre}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="font-bold text-lg text-purple-600">{cancha.nombre}</h2>
                            <p className="text-gray-600">${cancha.costo_por_hora}</p>
                        </div>
                        <div
                            className={`absolute bottom-4 right-4 w-4 h-4 rounded-full ${cancha.reservada ? 'bg-red-500' : 'bg-green-500'}`}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CanchaList;
