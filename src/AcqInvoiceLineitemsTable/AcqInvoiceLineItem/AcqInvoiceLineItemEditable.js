import React, { Component } from 'react';

import AcqLineItemActions from './AcqInvoiceLineItemActions/AcqInvoiceLineItemActions';

class AcqInvoiceLineItemEditable extends Component {
    state = {
        item: {}
    };
    componentDidMount() {
        this.setState({
            item: JSON.parse(JSON.stringify(this.props.item))
        });
    }
    handleChange = (property, value) => {
        const newItem = {
            ...this.state.item,
            [property]: value
        };
        this.setState({ item: newItem });
    };

    render() {
        return (
            <tr>
                <td>
                    <input
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
                    <input
                        type="number"
                        onChange={event =>
                            this.handleChange('list_price', event.target.value)
                        }
                        value={this.state.item.list_price || ''}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        onChange={event =>
                            this.handleChange(
                                'discount_rate',
                                event.target.value
                            )
                        }
                        value={this.state.item.discount_rate || ''}
                    />
                </td>
                <td>**Your price goes here**</td>
                <td>**Net price goes here**</td>
                <td>
                    <input
                        type="number"
                        onChange={event =>
                            this.handleChange('tax_rate', event.target.value)
                        }
                        value={this.state.item.tax_rate || ''}
                    />
                </td>
                <td>**Tax amount goes here**</td>
                <td>
                    <input
                        type="number"
                        onChange={event =>
                            this.handleChange('total_price', event.target.value)
                        }
                        value={this.state.item.total_price || ''}
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
