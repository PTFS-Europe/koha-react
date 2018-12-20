import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AcqInvoiceLineItemView from './AcqInvoiceLineItemView';

configure({ adapter: new Adapter() });

describe('<AcqInvoiceLineItemView />', () => {
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
            <AcqInvoiceLineItemView
                calc={() => {}}
                key={item.id}
                delete={() => {}}
                item={item}
            />
        );
    });
    it('renders 1 table row', () => {
        expect(wrapper.find('tr')).toHaveLength(1);
    });
    it('renders 11 table columns', () => {
        expect(wrapper.find('td')).toHaveLength(11);
    });
    it('renders 4 <AcqInvoiceLineItemCalc /> elements', () => {
        expect(wrapper.find('AcqInvoiceLineItemCalc')).toHaveLength(4);
    });
    it('Displays the description, if defined', () => {
        expect(wrapper.find('td.react-acq-lineitem-description').text()).toBe(
            'This is the item description'
        );
    });
    it('Displays an empty string for description, if its null', () => {
        wrapper.setProps({
            item: {
                ...item,
                description: null
            }
        });
        expect(wrapper.find('td.react-acq-lineitem-description').text()).toBe(
            ''
        );
    });
    it('Displays the tax_rate, if defined', () => {
        expect(wrapper.find('td.react-acq-lineitem-tax_rate').text()).toBe(
            '20'
        );
    });
    it('Displays an empty string for tax_rate, if its null', () => {
        wrapper.setProps({
            item: {
                ...item,
                tax_rate: null
            }
        });
        expect(wrapper.find('td.react-acq-lineitem-tax_rate').text()).toBe('');
    });
    it('Displays the tax_amount, if defined', () => {
        expect(wrapper.find('td.react-acq-lineitem-tax_amount').text()).toBe(
            '20'
        );
    });
    it('Displays an empty string for tax_amount, if its null', () => {
        wrapper.setProps({
            item: {
                ...item,
                tax_amount: null
            }
        });
        expect(wrapper.find('td.react-acq-lineitem-tax_amount').text()).toBe(
            ''
        );
    });
});
