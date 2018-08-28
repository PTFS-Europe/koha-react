import React from 'react';

import EditingContext from '../../../helper/EditingContext';

const AcqInvoiceLineItemActions = props => {
    return (
        <EditingContext.Consumer>
            {({ editing, setEditing }) => {
                return editing !== props.item.id ? (
                    <div className="react-acq-lineitem-disp-actions">
                        <button
                            className="react-acq-lineitem-disp-actions-delete"
                            disabled={
                                props.editing && props.editing !== props.item.id
                            }
                            onClick={() => props.delete(props.item.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="react-acq-lineitem-disp-actions-edit"
                            disabled={
                                props.editing && props.editing !== props.item.id
                            }
                            onClick={() => setEditing(props.item.id)}
                        >
                            Edit
                        </button>
                    </div>
                ) : (
                    <div className="react-acq-lineitem-edit-actions">
                        <button
                            className="react-acq-lineitem-disp-actions-save"
                            onClick={() => props.save(props.item.id)}
                        >
                            Save
                        </button>
                        <button
                            className="react-acq-lineitem-disp-actions-cancel"
                            onClick={() => props.cancel()}
                        >
                            Cancel
                        </button>
                    </div>
                );
            }}
        </EditingContext.Consumer>
    );
};

export default AcqInvoiceLineItemActions;
