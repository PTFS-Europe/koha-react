import React, { Component } from 'react';

import AcqLineItemActions from './AcqInvoiceLineItemActions/AcqInvoiceLineItemActions';
import AcqInvoiceLineItemCalc from './AcqInvoiceLineItemCalc';
import AcqInvoiceFunds from '../AcqInvoiceFunds';
import AcqInvoiceLineItemTypes from './AcqInvoiceLineItemTypes';

export class AcqInvoiceLineItemEditable extends Component {
    state = {
        item: {},
        calculated: {}
    };
    componentDidMount() {
        this.setState({
            item: JSON.parse(JSON.stringify(this.props.item))
        });
    }
    handleChange = (property, value) => {
        const newVal = !isNaN(value) ? parseFloat(value) : value;
        const newItem = {
            ...this.state.item,
            [property]: newVal
        };
        this.setState({ item: newItem });
    };

    render() {
        return (
            <tr>
                <td id="react-acq-lineitem-edit-description">
                    <input
                        placeholder={window._('Item description')}
                        type="text"
                        onChange={event =>
                            this.handleChange('description', event.target.value)
                        }
                        value={this.state.item.description || ''}
                    />
                </td>
                <td id="react-acq-lineitem-edit-type">
                    <AcqInvoiceLineItemTypes
                        types={this.props.types}
                        selected={this.state.item.item_type}
                        handleChange={this.handleChange}
                    />
                </td>
                <td id="react-acq-lineitem-edit-budget">
                    <AcqInvoiceFunds
                        funds={this.props.funds}
                        selected={this.state.item.budget}
                        handleChange={this.handleChange}
                    />
                </td>
                <td id="react-acq-lineitem-edit-quantity">
                    <input
                        placeholder={window._('Quantity')}
                        type="number"
                        onChange={event =>
                            this.handleChange('quantity', event.target.value)
                        }
                        value={this.state.item.quantity || ''}
                    />
                </td>
                <td id="react-acq-lineitem-edit-list_price">
                    <AcqInvoiceLineItemCalc
                        propName="list_price"
                        handleChange={this.handleChange}
                        item={this.state.item}
                        calc={this.props.calc}
                    />
                </td>
                <td id="react-acq-lineitem-edit-discount_rate">
                    <AcqInvoiceLineItemCalc
                        propName="discount_rate"
                        handleChange={this.handleChange}
                        item={this.state.item}
                        calc={this.props.calc}
                    />
                </td>
                <td id="react-acq-lineitem-edit-pre_tax_amount">
                    <AcqInvoiceLineItemCalc
                        propName="pre_tax_amount"
                        handleChange={this.handleChange}
                        item={this.state.item}
                        calc={this.props.calc}
                    />
                </td>
                <td id="react-acq-lineitem-edit-tax_rate">
                    <input
                        placeholder={window._('Tax rate')}
                        type="number"
                        onChange={event =>
                            this.handleChange('tax_rate', event.target.value)
                        }
                        value={this.state.item.tax_rate || ''}
                    />
                </td>
                <td id="react-acq-lineitem-edit-tax_amount">
                    <input
                        placeholder={window._('Tax amount')}
                        type="number"
                        onChange={event =>
                            this.handleChange('tax_amount', event.target.value)
                        }
                        value={this.state.item.tax_amount || ''}
                    />
                </td>
                <td id="react-acq-lineitem-edit-total_price">
                    <AcqInvoiceLineItemCalc
                        propName="total_price"
                        handleChange={this.handleChange}
                        item={this.state.item}
                        calc={this.props.calc}
                    />
                </td>
                <td id="react-acq-lineitem-edit-actions">
                    <AcqLineItemActions
                        save={this.props.save}
                        cancel={this.props.cancel}
                        editing={this.props.editing}
                        item={this.state.item}
                    />
                </td>
            </tr>
        );
    }
}

export default AcqInvoiceLineItemEditable;
