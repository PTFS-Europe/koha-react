import React from 'react';

import EditingContext from '../../../helper/EditingContext';

const AcqInvoiceLineItemActions = props => {
    return (
        <EditingContext.Consumer>
            {({ editing, setEditing }) => {
                return editing !== props.item.id ? (
                    <div>
                        <button
                            disabled={
                                props.editing && props.editing !== props.item.id
                            }
                            onClick={() => props.delete(props.item.id)}
                        >
                            Delete
                        </button>
                        <button
                            disabled={
                                props.editing && props.editing !== props.item.id
                            }
                            onClick={() => setEditing(props.item.id)}
                        >
                            Edit
                        </button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => props.save(props.item.id)}>
                            Save
                        </button>
                        <button onClick={() => props.cancel()}>Cancel</button>
                    </div>
                );
            }}
        </EditingContext.Consumer>
    );
};

export default AcqInvoiceLineItemActions;
