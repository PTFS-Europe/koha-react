import React from 'react';

import AcqLineItemActions from './AcqInvoiceLineItemActions/AcqInvoiceLineItemActions';

const AcqInvoiceLineItem = props => {
    let row = null;

    if (props.editing !== props.item.id) {
        row = (
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
                    <AcqLineItemActions
                        editing={props.editing}
                        setEditing={props.setEditing}
                        item={props.item}
                        delete={props.delete}
                    />
                </td>
            </tr>
        );
    } else {
        row = (
            <tr>
                <td>
                    <input
                        type="text"
                        onChange={event =>
                            props.handleChange(
                                props.item.id,
                                'description',
                                event.target.value
                            )
                        }
                        value={props.item.description}
                    />
                </td>
                <td>**Type goes here**</td>
                <td>**Fund goes here**</td>
                <td>
                    <input
                        type="number"
                        onChange={event =>
                            props.handleChange(
                                props.item.id,
                                'list_price',
                                event.target.value
                            )
                        }
                        value={props.item.list_price}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        onChange={event =>
                            props.handleChange(
                                props.item.id,
                                'discount_rate',
                                event.target.value
                            )
                        }
                        value={props.item.discount_rate}
                    />
                </td>
                <td>**Your price goes here**</td>
                <td>**Net price goes here**</td>
                <td>
                    <input
                        type="number"
                        onChange={event =>
                            props.handleChange(
                                props.item.id,
                                'tax_rate',
                                event.target.value
                            )
                        }
                        value={props.item.tax_rate}
                    />
                </td>
                <td>**Tax amount goes here**</td>
                <td>
                    <input
                        type="number"
                        onChange={event =>
                            props.handleChange(
                                props.item.id,
                                'total_price',
                                event.target.value
                            )
                        }
                        value={props.item.total_price}
                    />
                </td>
                <td>
                    <AcqLineItemActions
                        editing={props.editing}
                        item={props.item}
                    />
                </td>
            </tr>
        );
    }

    return row;
};

export default AcqInvoiceLineItem;
