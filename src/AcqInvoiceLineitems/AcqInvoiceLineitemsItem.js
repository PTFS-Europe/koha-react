import React from 'react';

const AcqInvoiceLineitemsItem = props => {
    return (
        <tr>
            <td>{props.item.description}</td>
        </tr>
    );
};

export default AcqInvoiceLineitemsItem;
