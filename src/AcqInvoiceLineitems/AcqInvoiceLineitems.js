import React from 'react';

import AcqInvoiceLineitemsTable from './AcqInvoiceLineitemsTable/AcqInvoiceLineitemsTable';
import withApiData from '../hoc/withApiData';

const AcqInvoiceLineitems = props => {
    return (
        <div>
            <AcqInvoiceLineitemsTable
                handleChange={props.handleChange}
                delete={props.delete}
                items={props.items}
            />
            <button onClick={props.add}>Add new</button>
        </div>
    );
};

export default withApiData(AcqInvoiceLineitems);
