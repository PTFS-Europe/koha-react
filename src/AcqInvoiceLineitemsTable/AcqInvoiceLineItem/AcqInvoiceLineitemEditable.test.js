import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AcqInvoiceLineItemEditable } from './AcqInvoiceLineItemEditable';

configure({ adapter: new Adapter() });

describe('<AcqInvoiceLineItemEditable />', () => {
    let wrapper;
    const item = {
        id: 5,
        invoice: 3,
        order: 2,
        description: 'This is the item description',
        quantity: 2,
        list_price: 13.99,
        discount_rate: 10,
        discount_amount: null,
        pre_tax_amount: null,
        tax_rate: 20,
        tax_amount: 20,
        total_price: null
    };
    beforeEach(() => {
        wrapper = shallow(
            <AcqInvoiceLineItemEditable
                calc={() => {}}
                handleChange={() => {}}
                key={item.id}
                item={item}
                save={() => {}}
                cancel={() => {}}
            />
        );
    });
    it('has initialised pre-defined state', () => {
        expect(wrapper.state()).toEqual({
            item: item,
            calculated: {}
        });
    });
    it('renders 1 table row', () => {
        expect(wrapper.find('tr')).toHaveLength(1);
    });
    it('renders 10 table columns', () => {
        expect(wrapper.find('td')).toHaveLength(10);
    });
    it('renders 4 <AcqInvoiceLineItemCalc /> elements', () => {
        expect(wrapper.find('AcqInvoiceLineItemCalc')).toHaveLength(4);
    });
    it('renders 1 <AcqInvoiceLineItemActions /> element', () => {
        expect(wrapper.find('AcqInvoiceLineItemActions')).toHaveLength(1);
    });
    it('handleChange takes a property and value and modifies the state item object accordingly', () => {
        let newState = wrapper.state();

        wrapper.instance().handleChange('description', 'new');
        newState.item.description = 'new';
        expect(wrapper.state()).toEqual(newState);

        wrapper.instance().handleChange('list_price', 30.2);
        newState.item.list_price = 30.2;
        expect(wrapper.state()).toEqual(newState);
    });
    it('Displays the description, if defined', () => {
        expect(
            wrapper.find('input.react-acq-lineitem-edit-description').props()
                .value
        ).toBe('This is the item description');
    });
    it('Displays an empty string for description, if null', () => {
        wrapper.setState({
            ...wrapper.state(),
            item: {
                ...wrapper.state().item,
                description: null
            }
        });
        expect(
            wrapper.find('input.react-acq-lineitem-edit-description').props()
                .value
        ).toBe('');
    });
    it('Changing description in the input updates the state', () => {
        let newState = wrapper.state();
        newState.item.description = 5;
        wrapper
            .find('input.react-acq-lineitem-edit-description')
            .simulate('change', { target: { value: 5 } });
        expect(wrapper.state()).toEqual(newState);
    });
    it('Displays the tax_rate, if defined', () => {
        expect(
            wrapper.find('input.react-acq-lineitem-edit-tax_rate').props().value
        ).toBe(20);
    });
    it('Displays an empty string for tax_rate, if null', () => {
        wrapper.setState({
            ...wrapper.state(),
            item: {
                ...wrapper.state().item,
                tax_rate: null
            }
        });
        expect(
            wrapper.find('input.react-acq-lineitem-edit-tax_rate').props().value
        ).toBe('');
    });
    it('Changing tax_rate in the input updates the state', () => {
        let newState = wrapper.state();
        newState.item.tax_rate = 5;
        wrapper
            .find('input.react-acq-lineitem-edit-tax_rate')
            .simulate('change', { target: { value: 5 } });
        expect(wrapper.state()).toEqual(newState);
    });
    it('Displays the tax_amount, if defined', () => {
        expect(
            wrapper.find('input.react-acq-lineitem-edit-tax_amount').props()
                .value
        ).toBe(20);
    });
    it('Displays an empty string for tax_amount, if null', () => {
        wrapper.setState({
            ...wrapper.state(),
            item: {
                ...wrapper.state().item,
                tax_amount: null
            }
        });
        expect(
            wrapper.find('input.react-acq-lineitem-edit-tax_amount').props()
                .value
        ).toBe('');
    });
    it('Changing tax_amount in the input updates the state', () => {
        let newState = wrapper.state();
        newState.item.tax_amount = 5;
        wrapper
            .find('input.react-acq-lineitem-edit-tax_amount')
            .simulate('change', { target: { value: 5 } });
        expect(wrapper.state()).toEqual(newState);
    });
});
