import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AcqInvoiceLineItemTypes from './AcqInvoiceLineItemTypes';

configure({ adapter: new Adapter() });

describe('<AcqInvoiceLineItemTypes />', () => {
    let wrapper;
    const types = [
        {
            authorised_value: 'Item type 1',
            category: 'LINEITEMTYPE',
            id: 391,
            imageurl: '',
            lib: 'Item type 1 desc',
            lib_opac: 'Item type 1 opac'
        },
        {
            authorised_value: 'Item type 2',
            category: 'LINEITEMTYPE',
            id: 392,
            imageurl: '',
            lib: 'Item type 2 desc',
            lib_opac: 'Item type 2 opac'
        },
        {
            authorised_value: 'Item type 3',
            category: 'LINEITEMTYPE',
            id: 393,
            imageurl: '',
            lib: null,
            lib_opac: null
        }
    ];

    beforeEach(() => {
        wrapper = shallow(
            <AcqInvoiceLineItemTypes
                types={types}
                selected={392}
                handleChange={() => {}}
            />
        );
    });

    it('renders one types select box', () => {
        expect(wrapper.find('select.react-acq-lineitem-types')).toHaveLength(1);
    });
    it('renders a select with the length of the types array + 1 blank', () => {
        expect(
            wrapper.find('select.react-acq-lineitem-types').children('option')
        ).toHaveLength(types.length + 1);
    });
    it('preselects the passed value', () => {
        expect(
            wrapper.find('select.react-acq-lineitem-types').props().value
        ).toEqual(392);
    });
});
