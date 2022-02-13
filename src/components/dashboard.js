import React, { useState, useEffect } from 'react';
import Table from './table';
import Navbar from './navbar/navbar';

export default function Dashboard() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        let result = [];

        const fetchCoins = async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=AUD&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then((res) => res.json())
            .then((data) => result = data);

            
            setCoins(result);
        }


        fetchCoins()

    }, [])

    return (
        <>
        <Navbar />
        <Table data={coins}/>
        </>
    );
}