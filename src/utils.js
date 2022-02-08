//const FOREX_API_KEY = "f51bf1158ca70b9395db3f4616742559";

//const fetchConvertionRates = async (from, to, amount) => {}



const fetchCryptoPrice = async (product_id) => {
    let result;
    const url = `https://api.exchange.coinbase.com/products/${product_id}/ticker`;
    const options = {method: 'GET', headers: {Accept: 'application/json'}};

    await fetch(url, options)
    .then(res => res.json())
    .then(json => result = json.price)
    .catch(err => console.error('error:' + err));

    return result;
}

export const convertDataToAud = (data) => {
    //const convertionRate = fetchConvertionRates('USD', 'AUD', 1)
    for (let i = 0; i < data.length; i++) {
        data[i].display_name = data[i].display_name.replace('USD', 'AUD');
        data[i].quote_currency = "AUD";
        data[i].id = data[i].id.replace('USD', 'AUD');
        //data[i].price = fetchCryptoPrice(data[i].id) * convertionRate;
    }
    return data;
}

