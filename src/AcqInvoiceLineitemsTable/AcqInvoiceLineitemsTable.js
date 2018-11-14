import React, { Component } from 'react';

import withApiData from './../hoc/withApiData';
import AcqInvoiceLineItemView from './AcqInvoiceLineItem/AcqInvoiceLineItemView';
import AcqInvoiceLineItemEditable from './AcqInvoiceLineItem/AcqInvoiceLineItemEditable';
import Calc from '../helper/calc';
import EditingContext from '../helper/EditingContext';

export class AcqInvoiceLineitemsTable extends Component {
    state = {
        editing: null
    };
    setEditing = id => {
        if (typeof id === 'undefined') {
            id = null;
        }
        this.setState({ editing: id });
    };
    save = item => {
        this.props.save(item);
        // TODO: We should move this to the resolve function of the
        // API promise...once we have one...
        this.setEditing();
    };
    add = () => {
        this.props.add();
        this.setEditing(-1);
    };
    render() {
        return (
            <EditingContext.Provider
                value={{
                    editing: this.state.editing,
                    setEditing: this.setEditing
                }}
            >
                <table id="react-acq-lineitems-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Fund</th>
                            <th>List price</th>
                            <th>Discount %</th>
                            <th>Your price</th>
                            <th>Tax rate %</th>
                            <th>Tax amount</th>
                            <th>Total</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map(item => {
                            if (item.id === this.state.editing) {
                                return (
                                    <AcqInvoiceLineItemEditable
                                        calc={Calc}
                                        handleChange={this.props.handleChange}
                                        key={item.id}
                                        item={item}
                                        save={this.save}
                                        cancel={this.setEditing}
                                    />
                                );
                            } else {
                                return (
                                    <AcqInvoiceLineItemView
                                        calc={Calc}
                                        key={item.id}
                                        delete={this.props.delete}
                                        item={item}
                                    />
                                );
                            }
                        })}
                        {!this.state.editing && (
                            <tr>
                                <td colSpan="8">&nbsp;</td>
                                <td colSpan="2">
                                    {Calc.getTotal(
                                        this.props.items,
                                        'total_price'
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button
                    id="react-acq-lineitems-button-add-new"
                    disabled={this.state.editing}
                    onClick={this.add}
                >
                    Add new
                </button>
            </EditingContext.Provider>
        );
    }
}

export default withApiData(AcqInvoiceLineitemsTable);
