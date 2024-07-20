import React from 'react';
import PaymentForm from '../components/PaymentForm';
import PaymentHistory from '../components/PaymentHistory';

const PaymentPage = () => {
    return (
        <div>
            <div className="container flex justify-center mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-purple-600 mb-6">Mis Pagos</h1>
            </div>
            <PaymentHistory />
        </div>
    );
};

export default PaymentPage;
