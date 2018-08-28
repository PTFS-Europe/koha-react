import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AcqInvoiceLineItemActions from './AcqInvoiceLineItemActions';
import { wrap } from 'module';

configure({ adapter: new Adapter() });

describe('<AcqInvoiceLineItemActions />', () => {
    let outer;
    beforeEach(() => {
        outer = shallow(<AcqInvoiceLineItemActions />);
    });
    it('renders a "Delete" and "Edit" buttons when not editing', () => {
        outer.setProps({ item: { id: 3 } });
        const Children = outer.props().children;
        const wrapper = shallow(<Children editing={4} setEditing={() => {}} />);
        expect(
            wrapper
                .find('div.react-acq-lineitem-disp-actions')
                .find('button.react-acq-lineitem-disp-actions-delete')
        ).toHaveLength(1);
        expect(
            wrapper
                .find('div.react-acq-lineitem-disp-actions')
                .find('button.react-acq-lineitem-disp-actions-edit')
        ).toHaveLength(1);
    });
    it('renders a "Save" and "Cancel" buttons when editing', () => {
        outer.setProps({ item: { id: 4 } });
        const Children = outer.props().children;
        const wrapper = shallow(<Children editing={4} setEditing={() => {}} />);
        expect(
            wrapper
                .find('div.react-acq-lineitem-edit-actions')
                .find('button.react-acq-lineitem-disp-actions-save')
        ).toHaveLength(1);
        expect(
            wrapper
                .find('div.react-acq-lineitem-edit-actions')
                .find('button.react-acq-lineitem-disp-actions-cancel')
        ).toHaveLength(1);
    });
});
