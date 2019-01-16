import React from 'react';
import ReactDOM from 'react-dom';
import AcqInvoiceLineitemsTable from './AcqInvoiceLineitemsTable/AcqInvoiceLineitemsTable';

window.initReact = (invoiceId, orderNumber, readonly) => {
    const el = document.getElementById('react-orderreceive-lineitems');
    if (el) {
        ReactDOM.render(
            <AcqInvoiceLineitemsTable
                invoiceId={invoiceId}
                orderNumber={orderNumber}
                readonly={readonly}
            />,
            el
        );
    }
};

window.killReact = () => {
    const el = document.getElementById('react-orderreceive-lineitems');
    if (el) {
        ReactDOM.unmountComponentAtNode(el);
    }
};
