import React from 'react';

const AcqInvoiceLineItemActions = props => {
    const deleteItem = () => {
        props.delete(props.item.id);
    };

    const editItem = () => {
        props.edit(props.item.id);
    };

    return (
        <div>
            <div onClick={deleteItem}>Delete</div>
            <div onClick={editItem}>Edit</div>
        </div>
    );
};

export default AcqInvoiceLineItemActions;
