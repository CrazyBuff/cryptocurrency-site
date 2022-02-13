import {useEffect, useState} from 'react';
import Banner from './components/banner/banner';
import Dashboard from './components/dashboard';

// function App() {
//   const [currencies, setCurrencies] = useState([]);
//   const [priceData, setPriceData] = useState([]);

//   const fetchPrice = async (product_id) => {
//     let result;
//     await fetch(`https://api.exchange.coinbase.com/products/${product_id}/ticker`)
//         .then((res) => res.json())
//         .then((data) => {
//           result = data;
//           console.log(data)
//         });

//     return result;
//   }


//   useEffect(() => {
//     let pairs = [];

//     const apiCall = async () => {
//       await fetch('https://api.exchange.coinbase.com/products')
//       .then(res => res.json())
//       .then(data => {
//         pairs = data;
//       });
    
//       // eslint-disable-next-line array-callback-return
//       let filtered = pairs.filter((pair) => {
//         if (pair.quote_currency === "USD") {
//           return pair;
//         }
//       });

//       filtered = filtered.sort((a, b) => {
//         if (a.base_currency < b.base_currency) {
//           return -1;
//         } 
//         if (a.base_currency > b.base_currency) {
//           return 1;
//         }
//         return 0;
//       });
//       //filtered = convertDataToAud(filtered);
  
//       setCurrencies(filtered);


    
//   }
//   apiCall();

//   }, []);




//   return (
//     <div className="App">
//       <Banner />
//       {/* {currencies.map((current, index) => {
//         return (
//           <option key={index} value={current.id}>
//             {current.display_name} 
//           </option>
//         );
//       })} */}
//     </div>
//   );
// }


function App() {
  const [currentState, setCurrentState] = useState(<Banner />);

  useEffect(() => {
    const resetState = () => {
      setTimeout(() => {
        setCurrentState(<Dashboard/>);
      }, 1000);
    }
    
    window.addEventListener('click', resetState);

    return () => {
      window.removeEventListener('click', resetState);
    }
  },[]);

  return (
    <>
    {currentState}
    </>      
  )
}

export default App;
