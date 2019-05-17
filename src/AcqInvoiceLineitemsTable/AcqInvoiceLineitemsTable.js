import React, { Component } from 'react';

import withApiData from './../hoc/withApiData';
import AcqInvoiceLineItemView from './AcqInvoiceLineItem/AcqInvoiceLineItemView';
import AcqInvoiceLineItemEditable from './AcqInvoiceLineItem/AcqInvoiceLineItemEditable';
import Calc from '../helper/calc';
import EditingContext from '../helper/EditingContext';

export class AcqInvoiceLineitemsTable extends Component {
    state = {
        editing: null,
        errors: []
    };
    cancelEdit = id => {
        if (id === -1) {
            this.props.deleteFromModel(id);
        }
        this.setEditing();
    };
    setEditing = id => {
        if (typeof id === 'undefined') {
            id = null;
        }
        this.setState({
            editing: id,
            errors: []
        });
    };
    save = item => {
        return this.validateItem(item, item =>
            this.props.save(item).then(() => this.setEditing())
        );
    };
    add = () => {
        this.props.add();
        this.setEditing(-1);
    };
    validateItem = (item, callback) => {
        let errors = [];
        for (let prop in item) {
            this.validateProperty(prop, item[prop], errors);
        }
        if (errors.length > 0) {
            this.setState({ errors });
            return Promise.reject();
        } else {
            return callback(item);
        }
    };
    validateProperty = (property, value, errors) => {
        switch (property) {
            case 'description':
                if (!value || value.length === 0) {
                    errors.push(window._('You must include a description'));
                }
                break;
            case 'item_type':
                if (!value || value === '') {
                    errors.push(window._('You must choose an item type'));
                }
                break;
            case 'quantity':
                if (!/\d+/.test(value) || value < 1) {
                    errors.push(window._('Quantity must be greater than zero'));
                }
                break;
            default:
                break;
        }
    };
    render() {
        if (this.props.loading) {
            return (
                <div id="react-acq-lineitems-loading">
                    {window._('Loading...')}
                </div>
            );
        }
        if (this.props.readonly && this.props.items.length === 0) {
            return (
                <div id="react-acq-lineitems-loading">
                    {window._('No line items found')}
                </div>
            );
        }
        return (
            <EditingContext.Provider
                value={{
                    editing: this.state.editing,
                    setEditing: this.setEditing
                }}
            >
                {this.state.errors.length > 0 && (
                    <div id="react-acq-lineitems-errors" className="error">
                        <ul>
                            {this.state.errors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {!this.props.loading && (
                    <div>
                        <table id="react-acq-lineitems-table">
                            <thead>
                                <tr>
                                    <th>{window._('Description')}</th>
                                    <th>{window._('Type')}</th>
                                    <th>{window._('Fund')}</th>
                                    <th>{window._('Quantity')}</th>
                                    <th>{window._('List price')}</th>
                                    <th>{window._('Discount')} %</th>
                                    <th>{window._('Your price')}</th>
                                    <th>{window._('Tax rate')} %</th>
                                    <th>{window._('Tax amount')}</th>
                                    <th>{window._('Total')}</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.items.map(item => {
                                    if (item.id === this.state.editing) {
                                        return (
                                            <AcqInvoiceLineItemEditable
                                                calc={Calc}
                                                handleChange={
                                                    this.props.handleChange
                                                }
                                                key={item.id}
                                                item={item}
                                                funds={this.props.funds}
                                                types={this.props.types}
                                                save={this.save}
                                                cancel={this.cancelEdit}
                                            />
                                        );
                                    } else {
                                        return (
                                            <AcqInvoiceLineItemView
                                                calc={Calc}
                                                key={item.id}
                                                delete={this.props.delete}
                                                item={item}
                                                funds={this.props.funds}
                                                types={this.props.types}
                                                readonly={this.props.readonly}
                                            />
                                        );
                                    }
                                })}
                                {!this.state.editing && (
                                    <tr>
                                        <td colSpan="9">&nbsp;</td>
                                        <td colSpan="2">
                                            {Calc.getTotal(
                                                this.props.items,
                                                'total_price'
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                )}
                                {!this.props.readonly && (
                                    <tr>
                                        <td colSpan="11">
                                            <button
                                                type="button"
                                                id="react-acq-lineitems-button-add-new"
                                                disabled={this.state.editing}
                                                onClick={this.add}
                                            >
                                                {window._('Add new')}
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </EditingContext.Provider>
        );
    }
}

export default withApiData(AcqInvoiceLineitemsTable);
