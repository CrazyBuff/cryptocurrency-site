import React from 'react';


export default function Assets(props) {
    const { asset, removeAsset, constructData } = props;
    let investments = []

    const handleClick = () => {
        console.log('ass',asset)
        for (let i = 0; i < asset.length; i++) {
            //console.log(document.getElementById(`${asset[i]}`).value)
            const investment = document.getElementById(`${asset[i]}`).value;
            investments.push([`${asset[i]}`, investment]);
        }
        console.log('investments', investments);
        constructData(investments);
        investments = [];
    }

    return (
        <div className='assets-table-container'>
            <table className='assets-table'>
                <thead>
                    <tr>
                    <th colSpan={2}><span>Selected Assets</span></th>
                    { asset.length > 0 ? 
                    <th>Initial Investment</th>
                    : <></>
                    }
                    </tr>
                </thead>
                <tbody>
                    {asset.length === 0 ? 
                        <tr>
                            <td className='assets-table-index'></td>
                            <td className='assets-table-name'>Nothing here!</td>
                        </tr>
                        :
                        (
                        asset.map((element, index) => {
                            return (
                                <tr className='assets-row' >
                                    <td className='assets-table-index' onClick={() => removeAsset(element)}>{index+1}</td>
                                    <td className='assets-table-name' onClick={() => removeAsset(element)}>{element}</td>
                                    <td>
                                        <label>$</label>
                                        <input className='investment-input' type="number" name='investment' id={`${element}`} min={0} max={10000} step={5} placeholder='up to $10K'/>
                                    </td>
                                </tr>
                            )
                        })
                        )
                    }
                    {asset.length === 0 ? 
                        <></>
                        :
                        <tr>
                            <td className='load-button-cell'></td>
                            <td className='load-button-cell'>lock in to load virtual portfolio</td>
                            <td className='load-button-cell'>
                                <button className='chart-load-button' onClick={handleClick}>lock in</button>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}