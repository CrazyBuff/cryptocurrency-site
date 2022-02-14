import React, { useEffect } from 'react';

export default function Coinpage(props) {

    const fetchSingleCoinData = async (id, currency, days) => {
        await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
        .then(res => res.json())
        .then(data => console.log(data))
    }

    useEffect(() => {
        fetchSingleCoinData('bitcoin');
    }, [])

    return (
        <>
        <div>hello</div>
        </>
    )
}