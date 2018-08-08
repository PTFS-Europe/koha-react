import React from 'react';

import AcqInvoiceLineItem from './AcqInvoiceLineItem/AcqInvoiceLineItem';

const AcqInvoiceLineitemsTable = props => {
    return (
        <table>
            <tbody>
                {props.items.map(item => (
                    <AcqInvoiceLineItem
                        key={item.id}
                        delete={props.delete}
                        item={item}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default AcqInvoiceLineitemsTable;
