import React from 'react';

import AcqInvoiceLineitemsTable from './AcqInvoiceLineitemsTable/AcqInvoiceLineitemsTable';
import withApiData from '../hoc/withApiData';

const AcqInvoiceLineitems = props => {
    return (
        <AcqInvoiceLineitemsTable delete={props.delete} items={props.items} />
    );
};

export default withApiData(AcqInvoiceLineitems);
