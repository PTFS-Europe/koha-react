import React from 'react';

import AcqLineItemActions from './AcqInvoiceLineItemActions/AcqInvoiceLineItemActions';
import AcqInvoiceLineItemCalc from './AcqInvoiceLineItemCalc';

const AcqInvoiceLineItem = props => {
    return (
        <tr>
            <td className="react-acq-lineitem-description">
                {props.item.description || ''}
            </td>
            <td>**Type goes here**</td>
            <td>**Fund goes here**</td>
            <td>
                <AcqInvoiceLineItemCalc
                    disp
                    propName="list_price"
                    item={props.item}
                    calc={props.calc}
                />
            </td>
            <td>
                <AcqInvoiceLineItemCalc
                    disp
                    propName="discount_rate"
                    item={props.item}
                    calc={props.calc}
                />
            </td>
            <td>
                <AcqInvoiceLineItemCalc
                    disp
                    propName="pre_tax_amount"
                    item={props.item}
                    calc={props.calc}
                />
            </td>
            <td className="react-acq-lineitem-tax_rate">
                {props.item.tax_rate || ''}
            </td>
            <td className="react-acq-lineitem-tax_amount">
                {props.item.tax_amount || ''}
            </td>
            <td>
                <AcqInvoiceLineItemCalc
                    disp
                    propName="total_price"
                    item={props.item}
                    calc={props.calc}
                />
            </td>
            <td>
                <AcqLineItemActions
                    editing={props.editing}
                    setEditing={props.setEditing}
                    item={props.item}
                    delete={props.delete}
                />
            </td>
        </tr>
    );
};

export default AcqInvoiceLineItem;
