import React, { useEffect, useState } from 'react';
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
import {Chart as Chartjs} from 'chart.js/auto'

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 50,
    padding: 0,
    margin: 'auto',
    borderStyle: 'solid',
    borderWidth: '1px'
}

export default function Coinpage(props) {
    let params = useParams();
    const coinId = props.coinId;
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);

    console.log("data", historicalData);
    useEffect(() => {
        const fetchSingleCoinData = async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=aud&days=${days}`)
            .then(res => res.json())
            .then(data => setHistoricalData(data.prices));
        }

        fetchSingleCoinData();
        document.getElementById('chart-container').scrollIntoView({behavior: "smooth", block: "center"})
    }, [coinId, days])

    return (
        <>
        <div id="chart-container" style={style}>
        {
            !historicalData ? (
                <p>loading</p>
            ) : (
                <Line
                data={{
                    labels: historicalData.map((coin) => {
                        let date = new Date(coin[0]);
                        console.log(coin[0]);
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
                    plugins: {
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart'
                        },
                    },
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
            )
        }
        </div>
        </>
    )
}