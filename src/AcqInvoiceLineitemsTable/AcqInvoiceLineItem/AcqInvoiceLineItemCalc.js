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
    if (props.disp) {
        return (
            <div>
                {!isNaN(parseFloat(getVal()).toFixed(2))
                    ? parseFloat(getVal()).toFixed(2)
                    : ''}
                {isCalc() && (
                    <i
                        title="Value is calculated"
                        className="calc-val fa fa-calculator"
                    />
                )}
            </div>
        );
    } else {
        return (
            <div>
                <input
                    type="number"
                    onChange={event =>
                        props.handleChange(props.propName, event.target.value)
                    }
                    value={getVal()}
                />
                {isCalc() && (
                    <i
                        title="Value is calculated"
                        className="calc-val fa fa-calculator"
                    />
                )}
            </div>
        );
    }
};

export default AcqInvoiceLineItemCalc;
