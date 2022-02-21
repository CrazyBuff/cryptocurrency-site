import React, { useEffect, useState } from 'react';
import Button from '../components/button';
import {useParams} from 'react-router-dom';
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

const style = {
    width: "75%",
    position: 'relative',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 50,
    padding: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderStyle: 'solid',
    borderWidth: '1px',
}

const buttonStyle = {
    position: 'absolute',
    right: '150px',
    top: '10px',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    border: '0px solid',
    boxSizing: 'border-box',
    cursor: 'pointer'
}

const buttonStyle2 = {
    position: 'absolute',
    right: '110px',
    top: '10px',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    border: '0px solid',
    boxSizing: 'border-box',
    cursor: 'pointer'
}

const buttonStyle3 = {
    position: 'absolute',
    right: '70px',
    top: '10px',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    border: '0px solid',
    boxSizing: 'border-box',
    cursor: 'pointer'
}

const spanStyle = {
    fontSize: 12,
    fontFamily: "Segoe UI,Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
}

export default function Coinpage() {
    let params = useParams();
    const coinId = params.coinid;
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);

    console.log("data", historicalData);
    console.log("coin", coinId)
    useEffect(() => {
        const fetchSingleCoinData = async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=aud&days=${days}`)
            .then(res => res.json())
            .then(data => setHistoricalData(data.prices));
        }

        fetchSingleCoinData();
        document.getElementById('chart-container').scrollIntoView({behavior: 'smooth', block: 'center'})
    }, [coinId, days])

    const handleClick = (target) => {
        setDays(target);
    }

    return (
        <>
        <div id="chart-container" style={style}>
        {console.log('log', historicalData)}
        {
            !historicalData ? (
                <div><p>loading</p></div>
            ) : (
                <>
                <Button btnStyle={buttonStyle} spanStyle={spanStyle} parentFunction={handleClick} displayText={'1D'} value={1}/>
                <Button btnStyle={buttonStyle2} spanStyle={spanStyle} parentFunction={handleClick} displayText={'1M'} value={30}/>
                <Button btnStyle={buttonStyle3} spanStyle={spanStyle} parentFunction={handleClick} displayText={'3M'} value={90}/>
                <Line
                data={{
                    labels: historicalData.map((coin) => { 
                        let date = new Date(coin[0]);
                        let time = date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                        {
                            data: historicalData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in ${coinId}`,
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
                            display: false,
                            title: {
                            display: true,
                            text: 'Value'
                            }
                        }
                    }
                }}
                />
                </>
            )
        }
        </div>
        </>
    )
    
}