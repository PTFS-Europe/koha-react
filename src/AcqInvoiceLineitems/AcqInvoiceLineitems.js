import React from 'react';

import AcqInvoiceLineitemsTable from './AcqInvoiceLineitemsTable';
import withApi from '../hoc/withApi';

const AcqInvoiceLineitems = props => {
    return <AcqInvoiceLineitemsTable items={props.items} />;
};

export default withApi(AcqInvoiceLineitems);
