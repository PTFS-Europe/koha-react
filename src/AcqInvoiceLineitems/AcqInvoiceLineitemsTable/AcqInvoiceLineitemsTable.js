import React, { Component } from 'react';

import AcqInvoiceLineItem from './AcqInvoiceLineItem/AcqInvoiceLineItem';

class AcqInvoiceLineitemsTable extends Component {
    state = {
        editing: null
    };
    setEditing = id => {
        this.setState({ editing: id });
    };
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Fund</th>
                        <th>List price</th>
                        <th>Discount</th>
                        <th>Your price</th>
                        <th>Net price</th>
                        <th>Tax rate</th>
                        <th>Tax amount</th>
                        <th>Total</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map(item => (
                        <AcqInvoiceLineItem
                            handleChange={this.props.handleChange}
                            setEditing={this.setEditing}
                            editing={this.state.editing}
                            key={item.id}
                            delete={this.props.delete}
                            item={item}
                        />
                    ))}
                </tbody>
            </table>
        );
    }
}

export default AcqInvoiceLineitemsTable;
