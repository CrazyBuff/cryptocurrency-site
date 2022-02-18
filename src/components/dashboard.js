import React, { useState, useEffect } from 'react';
import Table from './table';
import Navbar from './navbar/navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Coinpage from '../routes/coinpage';

export default function Dashboard() {
    let navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    

    const handleClick = (target) => {
        console.log(target)
        navigate(`/dashboard/${target}`);
    }

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
        <Table data={coins} parentCallback={handleClick}/>
        <Outlet />
        </>
    );
}