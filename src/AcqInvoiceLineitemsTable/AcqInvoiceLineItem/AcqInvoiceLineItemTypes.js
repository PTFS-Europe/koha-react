import React from 'react';

const AcqInvoiceLineItemTypes = props => {
    return (
        <select
            className="react-acq-lineitem-types"
            onChange={event =>
                props.handleChange('item_type', event.target.value)
            }
            value={props.selected}
            name="item_type"
        >
            return (<option value="" />
            {props.types.map(t => {
                return (
                    <option key={t.id} value={t.id}>
                        {t.authorised_value}
                    </option>
                );
            })}
            );
        </select>
    );
};

export default AcqInvoiceLineItemTypes;
