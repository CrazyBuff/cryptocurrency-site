import {useEffect, useState} from 'react';
import {convertDataToAud} from './utils';

function App() {
  const [currencies, setCurrencies] = useState([]);


  useEffect(() => {
    let pairs = [];

    const apiCall = async () => {
      await fetch('https://api.exchange.coinbase.com/products')
      .then(res => res.json())
      .then(data => {
        pairs = data;
      });
    
      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair;
        }
      });

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        } 
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });
      filtered = convertDataToAud(filtered);
      console.log(filtered);
      setCurrencies(filtered);

  }
    apiCall();

  }, []);


  return (
    <div className="App">
      {currencies.map((current, index) => {
        return (
          <option key={index} value={current.id}>
            {current.display_name} 
          </option>
        );
      })}
    </div>
  );
}

export default App;
