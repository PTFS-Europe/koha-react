import React from 'react';

import AcqLineItemActions from './AcqInvoiceLineItemActions/AcqInvoiceLineItemActions';

const AcqInvoiceLineItem = props => {
    return (
        <tr>
            <td>{props.item.description}</td>
            <td>**Type goes here**</td>
            <td>**Fund goes here**</td>
            <td>{props.item.list_price}</td>
            <td>{props.item.discount_rate}</td>
            <td>**Your price goes here**</td>
            <td>**Net price goes here**</td>
            <td>{props.item.tax_rate}</td>
            <td>**Tax amount goes here**</td>
            <td>{props.item.total_price}</td>
            <td>
                <AcqLineItemActions item={props.item} delete={props.delete} />
            </td>
        </tr>
    );
};

export default AcqInvoiceLineItem;
