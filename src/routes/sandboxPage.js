import React, { useState, useEffect } from "react";
import Assets from "../components/sandboxPage/assets";
import CoinList from "../components/sandboxPage/coinList";
import SelectTime from "../components/sandboxPage/selectTime";
import { formatHistoricData, simplifyData } from "../components/utils";
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'; 


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function SandboxPage() {
    const [coins, setCoins] = useState([])
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [assetData, setAssetData] = useState([]);
    const [selectedDays, setSelectedDays] = useState(30);
    const [portfolioData, setPortfolioData] = useState([]);
    let formattedData = [];

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
    
    /*
        Functions for handling on click effects
    */

    const handleCoinListClick = (target) => {
        if (selectedAssets.length === 5 || selectedAssets.includes(target[1])) {
            console.log('reached asset limit!')
        } else {
            fetchCoinData(target[0], selectedDays)
            setSelectedAssets(prev => [...prev, target[1]]);  
        } 
    }

    const removeAsset = (target) => {
        const targetIndex = selectedAssets.findIndex((value) => value === target)
        setSelectedAssets(prev => prev.filter((val,index) => { return index !== targetIndex}))
        setAssetData(prev => prev.filter((val,index) => {return index !== targetIndex}))
        formattedData = formattedData.filter((val,index) => {return index !== targetIndex})
    }

    const handleSelectDayClick = (target) => {
        setSelectedDays(target);
    }

    /*
        functions for formatting the asset data
    */
    const formatData = () => {
        if (formattedData.length !== selectedAssets.length) {
            if (assetData.length > 0) {
                for (let i = 0; i < assetData.length; i++) {
                    
                    let res = formatHistoricData(assetData[i][1].prices);
                    res = simplifyData(res);
                    formattedData.push(res);
                    
                }
            } else {
                console.log('assets data', 'empty');
            }

        }
    }

    const constructData = (investments) => {
        let numOfCoins = []
        for (let i = 0; i < investments.length; i++) {
            
            const coins = parseInt(investments[i][1]) / assetData[i][1].prices[0][1];
            numOfCoins.push(coins);
        }
        formatData()
        for (let i = 0; i < formattedData.length; i++) {
            for (let j = 2; j < formattedData[i].length; j++) {
                formattedData[i][j][1] = formattedData[i][j][1] * numOfCoins[i];
            }
        }

        const data = formattedData[0].slice(2);
        
        for (let i = 1; i < formattedData.length; i++) {
            for (let j = 2; j < formattedData[i].length; j++) {
                data[j-2][1] += formattedData[i][j][1];
            }
        }
        setPortfolioData(data);

    }

    return (
        <>
        <div>
            <div className="portfolio-chart-container">
                {
                    portfolioData.length > 0 ? 
                    <Line 
                    data={{
                        labels: portfolioData.map((element) => {
                            return element[0];
                        }),

                        datasets: [
                            {
                                data: portfolioData.map((element) => element[1]),
                                label: `Virtual portfolio ( Past ${selectedDays} Days )`,
                                borderColor: "#0a8dff",
                                pointHoverRadius: 1,
                                pointRadius: 1
                            }
                        ],
                    }}
                    options={{
                        responsive: true,
                       
                        interaction: {
                            mode: 'index',
                            intersect: false
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                display: true,
                                text: 'Time Period'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                display: true,
                                text: 'Value'
                                }
                            }
                        }
                    }}
                    />
                     :
                    <h2>Select a time period, then select up to 5 coins</h2>
                }
            </div>
            <div className="assets-buttons-container">
            <SelectTime handleClick={handleSelectDayClick}/>
            <Assets asset={selectedAssets} removeAsset={removeAsset} constructData={constructData}/>
            </div>
            <CoinList data={coins} onClick={handleCoinListClick}/>
        </div>
        </>
    )
}