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

export const numberFormat = (data) => {
    if (data >= 1000000000000) {
        const num = data / 1000000000000;
        return [Math.round(num * 10) / 10, 'T'];
    } else if (data >= 1000000000) {
        const num = data / 1000000000;
        return [Math.round(num * 10) / 10, 'B'];
    } else if (data >= 1000000) {
        const num = data / 1000000;
        return [Math.round(num * 10) / 10, 'M'];
    } else if (data >= 1000) {
        const num = data / 1000
        return [Math.round(num * 10) / 10, 'K'];
    } else {
        return [data, '']
    }
}

export const percentageFormat = (data) => {
    if (data < 0) {
        const output = Math.round(data * 100) / 100;
        return `${output}`;
    }
    const output = Math.round(data * 100) / 100;
    return (`${output}`.length === 1 ? `+${output}.00` : `+${output}`);
}

export const formatPrice = (data) => {
    if (`${data*10}`.length === 2) {
        return `$${data}0`;
    } else if (!`${data}`.includes('.')) {
        return `$${data}.00`;
    } else {
        return `$${data}`;
    }
}

export const formatHistoricData = (data) => {
    const newData = data.map((coin) => {
        let date = new Date(coin[0]);
        return [date.toLocaleDateString(), coin[1]];
    });

    return newData
}

export const simplifyData = (data) => {
    // for some fucking reason the element at index 1 always become NaN, so this is the only fix
    // I could come up with AM I DUMB???
    let simplifiedData = [0, 0];
    for (let i = 0; i < data.length; i++) {
        if (i !== data.length - 1) {
            if (data[i][0] !== data[i+1][0]) {
                simplifiedData.push(data[i])
            }
        } else {
            simplifiedData.push(data[i])
        }
    }
    return simplifiedData;
}