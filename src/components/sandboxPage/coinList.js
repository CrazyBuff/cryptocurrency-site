import React, {useState, useMemo} from 'react';
import Pagination from '../pagination/pagination';

export default function CoinList(props) {
    const { data, onClick } = props;
    const [currentPage, setCurrentPage] = useState(1);


    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * 10;
        const lastPageIndex = firstPageIndex + 10;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, data])

    return (
    <>
    <div className='coinlist-container'>
    <table className='coinlist-table'>
        <thead>
            <tr>
                <th colSpan={3} className='coinlist-header'><span>Coin</span></th>
            </tr>
        </thead>
        <tbody>
            {currentTableData.map((element, index) => {
                return (
                <tr className="tabledata-row" key={(currentPage-1)*10+index} value={element.id} onClick={() => onClick([element.id, element.name])}>
                    <td className='tabledata-index'>{(currentPage-1)*10+index+1}</td>
                    <td className='tabledata-img'><img className="coinlist-img" src={element.image} alt={element.id}/></td>
                    <td className='tabledata-name'>{element.name} <span>{element.symbol.toUpperCase()}</span></td>
                </tr>
                )
            })}
        </tbody>
    </table>
    <Pagination 
        className="coinlist-pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={10}
        onPageChange={page => setCurrentPage(page)}
    />
    </div>
    </>
    )
}