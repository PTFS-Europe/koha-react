import React, { Component } from 'react';
import axios from 'axios';

export default function withApi(Wrapped) {
    const base =
        'http://aidev.rebus.ptfsadmin.uk0.bigv.io:8080/api/v1/acquisitions/invoices/';
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                items: [],
                loading: false,
                error: null
            };
        }

        componentDidMount() {
            this.populate = () => {
                var url = base + this.state.invoiceId + '/lines';
                const params = this.state.orderNumber
                    ? { order_id: this.state.orderNumber }
                    : {};
                axios
                    .get(url, { params })
                    .then(response => {
                        this.setState({ items: response.data });
                    })
                    .catch(error => {
                        if (error.response) {
                            this.setState({ error: error.response.data });
                        }
                    })
                    .then(() => this.setState({ loading: false }));
            };
            // Initial population
            this.setState(
                {
                    loading: true,
                    // TODO: Modify these fallbacks to be null
                    invoiceId: window.invoiceId ? window.invoiceId : 3,
                    orderNumber: window.orderNumber ? window.orderNumber : 397
                },
                // Ensure population happens after our state has been set
                () => this.populate()
            );
        }

        saveItem = item => {
            const url = base + this.state.invoiceId + '/lines';
            return axios
                .post(url, item)
                .then(response => {
                    const itemsCopy = [...this.state.items];
                    const index = itemsCopy.findIndex(i => i.id === item.id);
                    itemsCopy.splice(index, 1, response.data);
                    this.setState({ items: itemsCopy });
                })
                .catch(error => {
                    const msg = error.response
                        ? error.response.data.errors
                              .map(e => e.message)
                              .join(', ')
                        : 'Unknown error';
                    throw new Error(msg);
                });
        };

        addItem = () => {
            const itemsCopy = [...this.state.items];
            itemsCopy.push({
                id: -1,
                invoice: null,
                order: null,
                description: '',
                quantity: null,
                list_price: null,
                discount_rate: null,
                discount_amount: null,
                pre_tax_amount: null,
                tax_rate: null,
                tax_amount: null,
                total_price: null
            });
            this.setState({ items: itemsCopy });
        };

        deleteFromModel = id => {
            const itemsCopy = [...this.state.items];
            const index = itemsCopy.findIndex(i => i.id === id);
            itemsCopy.splice(index, 1);
            this.setState({ items: itemsCopy });
        };

        deleteItem = id => {
            const url = base + this.state.invoiceId + '/lines/' + id;
            return axios
                .delete(url)
                .then(() => {
                    this.deleteFromModel(id);
                })
                .catch(error => {
                    const msg = error.response
                        ? error.response.data.errors
                              .map(e => e.message)
                              .join(', ')
                        : 'Unknown error';
                    throw new Error(msg);
                });
        };

        render() {
            return (
                <Wrapped
                    handleChange={this.handleChange}
                    add={this.addItem}
                    save={this.saveItem}
                    delete={this.deleteItem}
                    deleteFromModel={this.deleteFromModel}
                    items={this.state.items}
                    loading={this.state.loading}
                    error={this.state.error}
                    {...this.props}
                />
            );
        }
    };
}
