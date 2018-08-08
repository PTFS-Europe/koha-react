import React from 'react';

const AcqInvoiceLineItemActions = props => {
    if (props.editing !== props.item.id) {
        return (
            <div>
                <button
                    disabled={props.editing && props.editing !== props.item.id}
                    onClick={() => props.delete(props.item.id)}
                >
                    Delete
                </button>
                <button
                    disabled={props.editing && props.editing !== props.item.id}
                    onClick={() => props.setEditing(props.item.id)}
                >
                    Edit
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <button onClick={() => props.save(props.item.id)}>Save</button>
                <button onClick={() => props.cancel()}>Cancel</button>
            </div>
        );
    }
};

export default AcqInvoiceLineItemActions;
