import React, { Component } from 'react';

export default function withApi(Wrapped) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                items: [
                    {
                        id: 5,
                        invoice: 3,
                        order: 2,
                        description: 'This is the item description',
                        quantity: 2,
                        list_price: 13.99,
                        discount_rate: null,
                        discount_amount: null,
                        pre_tax_amount: null,
                        tax_rate: null,
                        total_price: null
                    },
                    {
                        id: 6,
                        invoice: 4,
                        order: 3,
                        description: 'This is another item description',
                        quantity: 1,
                        list_price: 23.99,
                        discount_rate: null,
                        discount_amount: null,
                        pre_tax_amount: null,
                        tax_rate: null,
                        total_price: null
                    }
                ]
            };
        }
        render() {
            return <Wrapped items={this.state.items} {...this.props} />;
        }
    };
}
