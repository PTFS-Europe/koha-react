import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import EditingContext from '../../../helper/EditingContext';

const AcqInvoiceLineItemActions = props => {
    const deleteConfirm = id => {
        confirmAlert({
            title: 'Delete line item',
            message: 'Are you sure you want to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        props.delete(id).catch(msg => showError(msg));
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return;
                    }
                }
            ]
        });
    };
    const showError = msg => {
        confirmAlert({
            title: 'Error',
            message: 'Unable to carry out action: ' + msg,
            buttons: [
                {
                    label: 'Close',
                    onClick: () => {}
                }
            ]
        });
    };
    return (
        <EditingContext.Consumer>
            {({ editing, setEditing }) => {
                return editing !== props.item.id ? (
                    <div className="react-acq-lineitem-disp-actions">
                        <button
                            type="button"
                            className="react-acq-lineitem-disp-actions-delete"
                            disabled={
                                props.editing && props.editing !== props.item.id
                            }
                            onClick={() => deleteConfirm(props.item.id)}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
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
                            type="button"
                            className="react-acq-lineitem-disp-actions-save"
                            onClick={() =>
                                props
                                    .save(props.item)
                                    .catch(msg => showError(msg))
                            }
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="react-acq-lineitem-disp-actions-cancel"
                            onClick={() => props.cancel(props.item.id)}
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
