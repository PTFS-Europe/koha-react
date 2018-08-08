import React from 'react';

const AcqInvoiceLineItemActions = props => {
    if (props.editing !== props.item.id) {
        return (
            <div>
                <div onClick={() => props.delete(props.item.id)}>Delete</div>
                <div onClick={() => props.setEditing(props.item.id)}>Edit</div>
            </div>
        );
    } else {
        return (
            <div>
                <div onClick={() => props.save(props.item.idsave)}>Save</div>
            </div>
        );
    }
};

export default AcqInvoiceLineItemActions;
