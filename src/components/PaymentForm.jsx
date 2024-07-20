import React, { useState, useContext } from 'react';
import { registrarPago } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

const PaymentForm = () => {
    const [reservaId, setReservaId] = useState('');
    const [total, setTotal] = useState('');
    const { token } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await registrarPago({ reserva_id: reservaId, total }, token);
            alert('Payment registered successfully');
        } catch (error) {
            console.error('Error registering payment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Reserva ID" value={reservaId} onChange={(e) => setReservaId(e.target.value)} />
            <input type="text" placeholder="Total" value={total} onChange={(e) => setTotal(e.target.value)} />
            <button type="submit">Register Payment</button>
        </form>
    );
};

export default PaymentForm;
