import React from 'react';
import ReactDOM from 'react-dom';
import AcqInvoiceLineitems from './AcqInvoiceLineitems';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AcqInvoiceLineitems />, div);
    ReactDOM.unmountComponentAtNode(div);
});
