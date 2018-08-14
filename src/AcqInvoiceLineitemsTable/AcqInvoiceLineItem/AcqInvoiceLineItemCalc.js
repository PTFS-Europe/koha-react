import React from 'react';

const AcqInvoiceLineItemCalc = props => {
    // Is the field calculated
    const isCalc = () => {
        return (
            (!props.item[props.propName] ||
                props.item[props.propName].toString().length === 0) &&
            props.calc[props.propName](props.item)
        );
    };
    // Get the field's value
    const getVal = () => {
        if (isCalc()) {
            return props.calc[props.propName](props.item);
        } else if (
            props.item[props.propName] ||
            props.item[props.propName] === 0
        ) {
            return props.item[props.propName];
        } else {
            return '';
        }
    };
    return (
        <div>
            <input
                type="number"
                onChange={event =>
                    props.handleChange(props.propName, event.target.value)
                }
                value={getVal()}
            />
            {isCalc() && <span>!</span>}
        </div>
    );
};

export default AcqInvoiceLineItemCalc;
