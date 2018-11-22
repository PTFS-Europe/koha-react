import React from 'react';

const AcqInvoiceFunds = props => {
    return (
        <select
            onChange={event => props.handleChange('budget', event.target.value)}
            value={props.selected}
            name="funds"
        >
            {props.funds.map(f => {
                return (
                    <option key={f.fund_id} value={f.fund_id}>
                        {f.fund_name}
                    </option>
                );
            })}
        </select>
    );
};

export default AcqInvoiceFunds;
