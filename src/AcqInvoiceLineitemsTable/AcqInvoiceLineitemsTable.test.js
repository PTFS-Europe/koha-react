import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AcqInvoiceLineItemView from './AcqInvoiceLineItem/AcqInvoiceLineItemView';
import AcqInvoiceLineItemEditable from './AcqInvoiceLineItem/AcqInvoiceLineItemEditable';
import { AcqInvoiceLineitemsTable } from './AcqInvoiceLineitemsTable';

configure({ adapter: new Adapter() });

describe('<AcqInvoiceLineitemsTable />', () => {
    let wrapper;
    const items = [
        {
            id: 5,
            invoice: 3,
            order: 2,
            description: 'This is the item description',
            quantity: 2,
            list_price: 13.99,
            discount_rate: 10,
            discount_amount: null,
            pre_tax_amount: null,
            tax_rate: null,
            tax_amount: null,
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
            tax_rate: 20,
            tax_amount: null,
            total_price: null
        }
    ];
    const editableId = 6;

    beforeEach(() => {
        wrapper = shallow(
            <AcqInvoiceLineitemsTable
                items={items}
                save={() => Promise.resolve()}
                add={() => {}}
            />
        );
    });
    it('renders one line items <table>', () => {
        expect(wrapper.find('table#react-acq-lineitems-table')).toHaveLength(1);
    });
    it('renders one add "Add new" <button>', () => {
        expect(
            wrapper.find('button#react-acq-lineitems-button-add-new')
        ).toHaveLength(1);
    });
    it('initial editing state is null', () => {
        expect(wrapper.state().editing).toBe(null);
    });
    it('clicking the "Add new" button sets the state "editing" property to -1', () => {
        wrapper.instance().setEditing(5);
        const button = wrapper.find(
            'button#react-acq-lineitems-button-add-new'
        );
        button.simulate('click');
        expect(button.html().includes('disabled="-1"'));
    });
    it('clicking the "Add new" button disables it', () => {
        const button = wrapper.find(
            'button#react-acq-lineitems-button-add-new'
        );
        button.simulate('click');
        expect(wrapper.state().editing).toBe(-1);
    });
    it('renders 11 table columns', () => {
        expect(wrapper.find('th')).toHaveLength(11);
    });
    it('setEditing() should set the state "editing" property to the passed ID', () => {
        wrapper.instance().setEditing(editableId);
        expect(wrapper.state().editing).toBe(editableId);
    });
    it('setEditing() should set the state "editing" property to null when not passed an ID', () => {
        wrapper.instance().setEditing();
        expect(wrapper.state().editing).toBe(null);
    });
    it('add() should set the state "editing" property to -1', () => {
        wrapper.instance().add();
        expect(wrapper.state().editing).toBe(-1);
    });
    it('renders one view row and one editable when that row is not editing', () => {
        wrapper.setState({ editing: editableId });
        expect(wrapper.find(AcqInvoiceLineItemView)).toHaveLength(1);
    });
    it('renders an editable row when that row is editing', () => {
        wrapper.setState({ editing: editableId });
        expect(wrapper.find(AcqInvoiceLineItemEditable)).toHaveLength(1);
    });
    it('renders two view rows when no rows are editable', () => {
        wrapper.setState({ editing: null });
        expect(wrapper.find(AcqInvoiceLineItemEditable)).toHaveLength(0);
    });
});
