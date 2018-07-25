import React from 'react';

import AcqInvoiceLineitemsItem from './AcqInvoiceLineitemsItem';

const AcqInvoiceLineitemsTable = props => {
    return (
        <table>
            <tbody>
                {props.items.map(item => (
                    <AcqInvoiceLineitemsItem key={item.id} item={item} />
                ))}
            </tbody>
        </table>
    );
};

export default AcqInvoiceLineitemsTable;
