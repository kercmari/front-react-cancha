import React from 'react';
import CanchaList from '../components/CanchaList';

const HomePage = () => {
    return (
        <div>
            <h1 className='font-bold text-center text-2xl m-8 text-purple-600'>MIS CANCHAS</h1>
            <CanchaList />
        </div>
    );
};

export default HomePage;
