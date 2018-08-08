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

        addItem = () => {
            const itemsCopy = [...this.state.items];
            itemsCopy.push({
                id: null,
                invoice: null,
                order: null,
                description: null,
                quantity: null,
                list_price: null,
                discount_rate: null,
                discount_amount: null,
                pre_tax_amount: null,
                tax_rate: null,
                total_price: null
            });
            this.setState({ items: itemsCopy });
        };

        deleteItem = id => {
            // TODO: Make API call to delete item
            // Upon API success...
            const itemsCopy = [...this.state.items];
            const index = itemsCopy.findIndex(i => i.id === id);
            itemsCopy.splice(index, 1);
            this.setState({ items: itemsCopy });
            // TODO: Upon API fail...
            // TODO: Something here
        };

        handleChange = (id, property, value) => {
            let itemsCopy = [...this.state.items];
            let index = itemsCopy.findIndex(i => i.id === id);
            const newItem = {
                ...itemsCopy[index],
                [property]: value
            };
            itemsCopy.splice(index, 1, newItem);
            this.setState({ items: itemsCopy });
        };

        render() {
            return (
                <Wrapped
                    handleChange={this.handleChange}
                    add={this.addItem}
                    delete={this.deleteItem}
                    items={this.state.items}
                    {...this.props}
                />
            );
        }
    };
}
