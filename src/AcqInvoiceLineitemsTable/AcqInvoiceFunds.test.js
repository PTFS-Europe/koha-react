import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AcqInvoiceFunds from './AcqInvoiceFunds';

configure({ adapter: new Adapter() });

describe('<AcqInvoiceFunds />', () => {
    let wrapper;
    const funds = [
        {
            fund_amount: '20000.000000',
            fund_branchcode: 'MAIN',
            fund_code: 'GEN',
            fund_encumb: '0.000000',
            fund_expend: '0.000000',
            fund_id: 2,
            fund_name: 'General Stacks',
            fund_notes: null,
            fund_owner_id: null,
            fund_parent_id: null,
            fund_period_id: 1,
            fund_permission: 2,
            sort1_authcat: null,
            sort2_authcat: null,
            timestamp: '2017-06-19 18:50:31'
        },
        {
            fund_amount: '5000.000000',
            fund_branchcode: 'MAIN',
            fund_code: 'REF',
            fund_encumb: '0.000000',
            fund_expend: '0.000000',
            fund_id: 3,
            fund_name: 'Reference Materials',
            fund_notes: null,
            fund_owner_id: null,
            fund_parent_id: null,
            fund_period_id: 1,
            fund_permission: 2,
            sort1_authcat: null,
            sort2_authcat: null,
            timestamp: '2017-06-19 18:50:31'
        }
    ];

    beforeEach(() => {
        wrapper = shallow(
            <AcqInvoiceFunds
                funds={funds}
                selected={2}
                handleChange={() => {}}
            />
        );
    });

    it('renders one funds select box', () => {
        expect(wrapper.find('select.react-acq-lineitem-funds')).toHaveLength(1);
    });
    it('renders a select with the length of the funds array + 1 blank', () => {
        expect(
            wrapper.find('select.react-acq-lineitem-funds').children('option')
        ).toHaveLength(funds.length + 1);
    });
    it('preselects the passed value', () => {
        expect(
            wrapper.find('select.react-acq-lineitem-funds').props().value
        ).toEqual(2);
    });
});
