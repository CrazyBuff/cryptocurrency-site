import React, {useEffect, useState} from 'react';

export default function Assets(props) {
    const {coinId, days} = props;
    const [assets, setAssets] = useState([]);
    const [resultData, setResultData] = useState();


    useEffect(() => {
        const fetchSingleCoinData = async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=aud&days=${days}`)
            .then(res => res.json())
            .then(data => setAssets(prev => prev.push(data)));
        }

        fetchSingleCoinData();
        
        
    }, [coinId, days])

    return (
        <div>
            <table>
                <thead>
                    <th colSpan={2}>Selected Assets</th>
                </thead>
            </table>
        </div>
    )
}