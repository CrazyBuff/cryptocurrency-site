import React, {useEffect, useState} from 'react';

export default function Assets(props) {
    const { asset } = props;

    return (
        <div className='assets-table-container'>
            <table className='assets-table'>
                <thead>
                    <tr>
                    <th colSpan={2}><span>Selected Assets</span></th>
                    </tr>
                </thead>
                <tbody>
                    {asset.length === 0 ? 
                        <tr>
                            <td className='assets-table-index'>0</td>
                            <td className='assets-table-name'>Nothing here!</td>
                        </tr>
                        :
                        asset.map((element, index) => {
                            return (
                                <tr className='assets-row'>
                                    <td className='assets-table-index'>{index+1}</td>
                                    <td className='assets-table-name'>{element}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}