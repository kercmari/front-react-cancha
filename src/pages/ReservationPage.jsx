import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getUserReservations, registrarPago } from '../services/api';
import { FaDollarSign } from 'react-icons/fa';

const ReservationPage = () => {
    const { token } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const result = await getUserReservations(token);
                setReservations(result.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, [token]);

    const handlePayment = async (reservation) => {
        try {
            const pagoData = {
                reserva_id: reservation.id,
                total: reservation.costo_por_hora,
            };
            await registrarPago(pagoData);
            setAlertMessage('Pago realizado con éxito');
            setTimeout(() => {
                setAlertMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error processing payment:', error);
            setAlertMessage('Error al realizar el pago');
            setTimeout(() => {
                setAlertMessage('');
            }, 3000);
        }
    };

    const formatTime = (datetime) => {
        return datetime.substring(11, 16);
    };

    const formatDate = (datetime) => {
        return datetime.substring(0, 10);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className='flex justify-center'> <h1 className="text-2xl font-bold text-purple-600 mb-6">Mis Reservas</h1></div>

            {alertMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
                    {alertMessage}
                </div>
            )}
            <div className="space-y-4">
                {reservations.map((reservation) => (
                    <div key={reservation.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold">{reservation.cancha_nombre}</h2>
                            <p>{formatDate(reservation.horario_inicio)} {formatTime(reservation.horario_inicio)} - {formatTime(reservation.horario_fin)}</p>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg font-bold mr-2">Total: {reservation.costo_por_hora}</span>
                            <FaDollarSign className="text-yellow-500 text-2xl" />
                            <button
                                onClick={() => handlePayment(reservation)}
                                className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Pagar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationPage;
