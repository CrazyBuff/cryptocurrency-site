import React, { useState, useEffect } from "react";
import Assets from "../components/sandboxPage/assets";
import CoinList from "../components/sandboxPage/coinList";

export default function SandboxPage() {
    const [coins, setCoins] = useState([])
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [assetData, setAssetData] = useState([]);
    const [selectedDays, setSelectedDays] = useState(1);

    useEffect (() => {
        const fetchCoinsListData = async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=AUD&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then((res) => res.json())
            .then((data) => setCoins(data));
        }

        fetchCoinsListData()
    }, [])

    const fetchCoinData = async (coinId, days) => {
        await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=aud&days=${days}`)
        .then((res) => res.json())
        .then((data) => setAssetData(prev => [...prev, [coinId, data]]))
    }
    

    const handleCoinListClick = (target) => {
        if (selectedAssets.length === 5 || selectedAssets.includes(target[1])) {
            console.log('reached asset limit!')
        } else {
            fetchCoinData(target[0], selectedDays)
            setSelectedAssets(prev => [...prev, target[1]]);  
        } 
    }


    return (
        <>
        <div>
            <Assets asset={selectedAssets}/>
            <CoinList data={coins} onClick={handleCoinListClick}/>
        </div>
        </>
    )
}