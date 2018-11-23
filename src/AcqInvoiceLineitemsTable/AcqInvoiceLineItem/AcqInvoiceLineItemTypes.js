import React from 'react';

const AcqInvoiceLineItemTypes = props => {
    return (
        <select
            onChange={event =>
                props.handleChange('item_type', event.target.value)
            }
            value={props.selected}
            name="item_type"
        >
            {props.types.map(t => {
                return (
                    <option key={t.id} value={t.id}>
                        {t.authorised_value}
                    </option>
                );
            })}
        </select>
    );
};

export default AcqInvoiceLineItemTypes;
