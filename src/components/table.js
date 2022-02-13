import React, { useState, useMemo} from 'react';
import Pagination from './pagination/pagination';
import { numberFormat, percentageFormat, formatPrice } from './utils';


const tableStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%',
    borderRadius: '20px',
    border: '1px solid grey',
    width: '90%',
    display: 'table',
    borderCollapse: 'separate',
    boxSizing: 'border-box',
    textIndent: 'initial',
    borderSpacing: '0px',
    borderColor: 'grey'
}

const coinColStyle = {
    marginLeft: '20%',
    textAlign: 'left',
    
}

const imgColStyle = {
    width:'50px'
}

const dataStyle = {
    textAlign: 'right',
    paddingRight: '20px'
}


const PAGESIZE = 10;

export default function Table(props) {
    const data = props.data;

    const [currentPage, setCurrentPage] = useState(1);


    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PAGESIZE;
        const lastPageIndex = firstPageIndex + PAGESIZE;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, data])


    return (
        <>
        <table style={tableStyle}>
            <thead>
                <tr style={{borderRadius: '20px', border:'1px solid grey', height:'50px'}}>
                    <th colSpan={3} style={{textAlign:'left', borderBottom: '1px solid grey'}}><span style={{paddingLeft:'50px'}}>Name</span></th>
                    <th style={{borderBottom: '1px solid grey', textAlign: 'right', paddingRight: '20px'}}>Price</th>
                    <th style={{borderBottom: '1px solid grey', textAlign: 'right', paddingRight: '20px'}}>24h Change</th>
                    <th style={{borderBottom: '1px solid grey', textAlign: 'right', paddingRight: '20px'}}>Market Cap</th>
                    <th style={{borderBottom: '1px solid grey', textAlign: 'right', paddingRight: '20px'}}>Supply</th>
                </tr>
            </thead>
            <tbody>
                {console.log(currentTableData)}
                {currentTableData.map((element, ind) => {
                    return (
                        <tr key={(currentPage-1)*PAGESIZE+ind} value={element.id} style={{height: '70px'}}>
                            <td style={{textAlign: 'center'}}>{(currentPage-1)*PAGESIZE+ind+1}</td>
                            <td style={imgColStyle}><img src={element.image} alt={element.id} style={{width:"40px", height:'40px', align:'center'}} /></td>
                            <td style={coinColStyle}>{element.name} <span style={{color: 'grey', paddingLeft: '15px'}}>{element.symbol.toUpperCase()}</span></td>
                            <td style={dataStyle}>{formatPrice(element.current_price)}</td>
                            <td style={{color: element.price_change_percentage_24h < 0 ? 'red' : 'green', textAlign:'right', paddingRight: '20px'}}>{percentageFormat(element.price_change_percentage_24h)}%</td>
                            <td style={dataStyle}>${numberFormat(element.market_cap)[0]}{numberFormat(element.market_cap)[1]}</td>
                            <td style={dataStyle}>{numberFormat(element.circulating_supply)[0]}{numberFormat(element.circulating_supply)[1]}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <Pagination 
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PAGESIZE}
            onPageChange={page => setCurrentPage(page)}
        />
        </>
    )
}
