import React from 'react';

import AcqInvoiceLineItemActions from './AcqInvoiceLineItemActions/AcqInvoiceLineItemActions';
import AcqInvoiceLineItemCalc from './AcqInvoiceLineItemCalc';

const AcqInvoiceLineItem = props => {
    const getTypeName = () => {
        if (props.types && props.types.length) {
            const found = props.types.find(t => t.id === props.item.item_type);
            return typeof found !== 'undefined' ? found.authorised_value : '';
        } else {
            return '';
        }
    };
    const getFundName = () => {
        if (props.funds && props.funds.length) {
            const found = props.funds.find(
                f => f.fund_id === props.item.budget
            );
            return typeof found !== 'undefined' ? found.fund_name : '';
        } else {
            return '';
        }
    };
    return (
        <tr>
            <td className="react-acq-lineitem-description">
                {props.item.description || ''}
            </td>
            <td>{getTypeName()}</td>
            <td>{getFundName()}</td>
            <td
                className="react-acq-lineitem-quantity"
                AcqInvoiceLineItemActions
            >
                {props.item.quantity || ''}
            </td>
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
                {!props.readonly && (
                    <AcqInvoiceLineItemActions
                        editing={props.editing}
                        setEditing={props.setEditing}
                        item={props.item}
                        delete={props.delete}
                    />
                )}
            </td>
        </tr>
    );
};

export default AcqInvoiceLineItem;
