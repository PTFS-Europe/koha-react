import React, { Component } from 'react';

import AcqLineItemActions from './AcqInvoiceLineItemActions/AcqInvoiceLineItemActions';
import AcqInvoiceLineItemCalc from './AcqInvoiceLineItemCalc';

class AcqInvoiceLineItemEditable extends Component {
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
                <td>
                    <input
                        placeholder="Item description"
                        type="text"
                        onChange={event =>
                            this.handleChange('description', event.target.value)
                        }
                        value={this.state.item.description || ''}
                    />
                </td>
                <td>**Type goes here**</td>
                <td>**Fund goes here**</td>
                <td>
                    <AcqInvoiceLineItemCalc
                        propName="list_price"
                        handleChange={this.handleChange}
                        item={this.state.item}
                        calc={this.props.calc}
                    />
                </td>
                <td>
                    <AcqInvoiceLineItemCalc
                        propName="discount_rate"
                        handleChange={this.handleChange}
                        item={this.state.item}
                        calc={this.props.calc}
                    />
                </td>
                <td>
                    <AcqInvoiceLineItemCalc
                        propName="pre_tax_amount"
                        handleChange={this.handleChange}
                        item={this.state.item}
                        calc={this.props.calc}
                    />
                </td>
                <td>
                    <input
                        placeholder="Tax rate"
                        type="number"
                        onChange={event =>
                            this.handleChange('tax_rate', event.target.value)
                        }
                        value={this.state.item.tax_rate || ''}
                    />
                </td>
                <td>
                    <input
                        placeholder="Tax amount"
                        type="number"
                        onChange={event =>
                            this.handleChange('tax_amount', event.target.value)
                        }
                        value={this.state.item.tax_amount || ''}
                    />
                </td>
                <td>
                    <AcqInvoiceLineItemCalc
                        propName="total_price"
                        handleChange={this.handleChange}
                        item={this.state.item}
                        calc={this.props.calc}
                    />
                </td>
                <td>
                    <AcqLineItemActions
                        save={() => this.props.save(this.state.item)}
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
