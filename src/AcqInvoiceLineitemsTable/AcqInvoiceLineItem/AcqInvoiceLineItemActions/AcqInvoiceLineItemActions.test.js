import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AcqInvoiceLineItemActions from './AcqInvoiceLineItemActions';

configure({ adapter: new Adapter() });

describe('<AcqInvoiceLineItemActions />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<AcqInvoiceLineItemActions item={{ id: 3 }} />);
  });
  // TODO: We're in a sticky situation with testing this component.
  // It makes use of React's new(-ish) Context API for passing a row's
  // editing state. However, as of now (2018-12-20), Enzyme doesn't support
  // testing it. Googling around, there are a number of workaround, none
  // of them satisfactory. So tl;dr, we need to revisit these tests when
  // Enzyme support for Context is added.
  // It's worth noting that this component also uses the withModal HOC, which
  // returns the passed component AND the modal component as sibling elements
  // (wrapped in a <div>), so that may complicate things further

  it('placeholder', () => {
    expect(wrapper.find('div')).toHaveLength(2);
  });
  /*
    it('renders only "Delete" and "Edit" buttons when not editing', () => {
        expect(
            wrapper
                .find('div#react-acq-lineitem-disp-actions')
                .find('button.react-acq-lineitem-disp-actions-delete')
        ).toHaveLength(1);
        expect(
            wrapper
                .find('div#react-acq-lineitem-disp-actions')
                .find('button.react-acq-lineitem-disp-actions-edit')
        ).toHaveLength(1);
        expect(
            wrapper.find('div#react-acq-lineitem-edit-actions')
        ).toHaveLength(0);
        expect(
            wrapper.find('div#react-acq-lineitem-edit-actions')
        ).toHaveLength(0);
    });
    it('renders only "Save" and "Cancel" buttons when editing', () => {
        expect(
            wrapper.find('div#react-acq-lineitem-disp-actions')
        ).toHaveLength(0);
        expect(
            wrapper.find('div#react-acq-lineitem-disp-actions')
        ).toHaveLength(0);
        expect(
            wrapper
                .find('div#react-acq-lineitem-edit-actions')
                .find('button.react-acq-lineitem-edit-actions-save')
        ).toHaveLength(1);
        expect(
            wrapper
                .find('div#react-acq-lineitem-edit-actions')
                .find('button.react-acq-lineitem-edit-actions-cancel')
        ).toHaveLength(1);
    });
    */
});
