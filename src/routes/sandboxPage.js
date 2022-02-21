import React, { useState, useEffect } from "react";
import Assets from "../components/sandboxPage/assets";
import CoinList from "../components/sandboxPage/coinList";

export default function SandboxPage() {
    const [coins, setCoins] = useState([])
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [assetData, setAssetData] = useState([]);

    
    const fetchCoinData = async (coinId, days) => {
        await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=aud&days=${days}`)
        .then((res) => res.json())
        .then((data) => setCoins(data));
    }

    const handleCoinListClick = (target) => {
        if (selectedAssets.length !== 5) {
            setSelectedAssets(prev => prev.push(target));
        } else {
            console.log('reached asset limit!')
        }
    }

    const addAssetData = (data) => {
        setAssetData(prev => prev.push(data));
    }

    return (
        <>
        <div>
            <Assets addData={addAssetData}/>
            <CoinList data={coins} onClick={handleCoinListClick}/>
        </div>
        </>
    )
}