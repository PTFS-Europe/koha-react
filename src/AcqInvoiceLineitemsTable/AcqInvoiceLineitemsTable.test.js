import React from 'react';
import ReactDOM from 'react-dom';
import AcqInvoiceLineitemsTable from './AcqInvoiceLineitemsTable';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AcqInvoiceLineitemsTable />, div);
    ReactDOM.unmountComponentAtNode(div);
});
