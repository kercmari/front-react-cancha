import React, { useState, useEffect, useContext } from 'react';
import { obtenerHistorialPagos } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { FaDollarSign, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const PaymentHistory = () => {
    const [pagos, setPagos] = useState([]);
    const [sortedPagos, setSortedPagos] = useState([]);
    const [sortOrder, setSortOrder] = useState(null); // null, 'asc', 'desc'
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const result = await obtenerHistorialPagos(token);
            setPagos(result.data);
            setSortedPagos(result.data);
        };

        fetchData();
    }, [token]);

    const formatTime = (datetime) => datetime.substring(11, 16);
    const formatDate = (datetime) => datetime.substring(0, 10);

    const sortPagosByDate = () => {
        let sorted;
        if (sortOrder === 'asc' || sortOrder === null) {
            sorted = [...sortedPagos].sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
            setSortOrder('desc');
        } else {
            sorted = [...sortedPagos].sort((a, b) => new Date(a.fecha_creacion) - new Date(b.fecha_creacion));
            setSortOrder('asc');
        }
        setSortedPagos(sorted);
    };

    return (
        <div className="container mx-auto px-4 py-6">

            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">
                            <span className="flex items-center">
                                <FaDollarSign className="mr-2 text-yellow-500" /> Total
                            </span>
                        </th>
                        <th className="py-2 px-4 border-b">Cancha</th>
                        <th className="py-2 px-4 border-b">Horario</th>
                        <th className="py-2 px-4 border-b cursor-pointer" onClick={sortPagosByDate}>
                            <span className="flex items-center">
                                Fecha
                                {sortOrder === 'asc' ? (
                                    <FaSortUp className="ml-2" />
                                ) : sortOrder === 'desc' ? (
                                    <FaSortDown className="ml-2" />
                                ) : (
                                    <FaSort className="ml-2" />
                                )}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPagos.map((pago) => (
                        <tr key={pago.id} className="bg-gray-100">
                            <td className="py-2 px-4 border-b flex items-center">
                                <FaDollarSign className="text-yellow-500 mr-2" /> {pago.total}
                            </td>
                            <td className="py-2 px-4 border-b">{pago.cancha_nombre}</td>
                            <td className="py-2 px-4 border-b">{formatTime(pago.horario_inicio)} - {formatTime(pago.horario_fin)}</td>
                            <td className="py-2 px-4 border-b">{formatDate(pago.fecha_creacion)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
