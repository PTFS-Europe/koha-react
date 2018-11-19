import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import EditingContext from '../../../helper/EditingContext';

export class AcqInvoiceLineItemActions extends Component {
    state = {
        inProgress: false
    };
    deleteConfirm(id) {
        confirmAlert({
            title: 'Delete line item',
            message: 'Are you sure you want to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.setState({ inProgress: true });
                        this.props
                            .delete(id)
                            .catch(msg => this.showError(msg))
                            .then(() => this.setState({ inProgress: false }));
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
    }
    showError(msg) {
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
    }
    save(item) {
        this.setState({
            inProgress: true
        });
        return this.props.save(item);
    }
    render() {
        return (
            <EditingContext.Consumer>
                {({ editing, setEditing }) => {
                    return editing !== this.props.item.id ? (
                        <div className="react-acq-lineitem-disp-actions">
                            <button
                                type="button"
                                className="react-acq-lineitem-disp-actions-delete"
                                disabled={
                                    (this.props.editing &&
                                        this.props.editing !==
                                            this.props.item.id) ||
                                    this.state.inProgress
                                }
                                onClick={() =>
                                    this.deleteConfirm(this.props.item.id)
                                }
                            >
                                {this.state.inProgress
                                    ? 'Deleting...'
                                    : 'Delete'}
                            </button>
                            <button
                                type="button"
                                className="react-acq-lineitem-disp-actions-edit"
                                disabled={
                                    this.props.editing &&
                                    this.props.editing !== this.props.item.id
                                }
                                onClick={() => setEditing(this.props.item.id)}
                            >
                                Edit
                            </button>
                        </div>
                    ) : (
                        <div className="react-acq-lineitem-edit-actions">
                            <button
                                disabled={this.state.inProgress}
                                type="button"
                                className="react-acq-lineitem-disp-actions-save"
                                onClick={() =>
                                    this.save(this.props.item)
                                        .catch(msg => this.showError(msg))
                                        .then(() =>
                                            this.setState({ inProgress: false })
                                        )
                                }
                            >
                                {this.state.inProgress ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                type="button"
                                className="react-acq-lineitem-disp-actions-cancel"
                                onClick={() =>
                                    this.props.cancel(this.props.item.id)
                                }
                            >
                                Cancel
                            </button>
                        </div>
                    );
                }}
            </EditingContext.Consumer>
        );
    }
}

export default AcqInvoiceLineItemActions;
