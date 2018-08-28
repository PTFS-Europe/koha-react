import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AcqInvoiceLineItemCalc from './AcqInvoiceLineItemCalc';
import calc from '../../helper/calc';

configure({ adapter: new Adapter() });

describe('<AcqInvoiceLineItemCalc />', () => {
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
            <AcqInvoiceLineItemCalc
                propName="description"
                handleChange={() => {}}
                item={item}
                calc={() => {}}
            />
        );
    });
    it('renders 1 edit div when the disp prop is not set', () => {
        expect(
            wrapper.find('div.react-acq-lineitem-edit-calculated')
        ).toHaveLength(1);
    });
    it('renders 1 disp div when the disp prop is set', () => {
        wrapper.setProps({ disp: true });
        expect(
            wrapper.find('div.react-acq-lineitem-disp-calculated')
        ).toHaveLength(1);
    });
    it('renders a *display* value to two decimal places when supplied', () => {
        wrapper.setProps({
            item: {
                ...item,
                list_price: 10.3512
            },
            propName: 'list_price',
            disp: true
        });
        expect(
            wrapper.find('div.react-acq-lineitem-disp-calculated').text()
        ).toBe('10.35');
        wrapper.setProps({
            item: {
                ...item,
                list_price: 10
            },
            propName: 'list_price',
            disp: true
        });
        expect(
            wrapper.find('div.react-acq-lineitem-disp-calculated').text()
        ).toBe('10.00');
    });
    it('renders a *display* value of an empty string when a null value is supplied', () => {
        wrapper.setProps({
            item: {
                ...item,
                list_price: null
            },
            propName: 'list_price',
            disp: true,
            calc
        });
        expect(
            wrapper.find('div.react-acq-lineitem-disp-calculated').text()
        ).toBe('');
    });
    it('renders a calculator icon in the display output when the value is calculated', () => {
        wrapper.setProps({
            calc,
            propName: 'pre_tax_amount',
            disp: true
        });
        expect(
            wrapper
                .find('div.react-acq-lineitem-disp-calculated')
                .find('i')
                .hasClass('fa-calculator')
        ).toEqual(true);
    });
    it('renders a calculator icon in the editing output when the value is calculated', () => {
        wrapper.setProps({
            calc,
            propName: 'pre_tax_amount'
        });
        expect(
            wrapper
                .find('div.react-acq-lineitem-edit-calculated')
                .find('i')
                .hasClass('fa-calculator')
        ).toEqual(true);
    });
});
