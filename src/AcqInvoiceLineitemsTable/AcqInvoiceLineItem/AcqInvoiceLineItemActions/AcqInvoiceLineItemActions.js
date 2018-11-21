import React, { Component } from 'react';

import EditingContext from '../../../helper/EditingContext';
import withModal from '../../../hoc/withModal';

export class AcqInvoiceLineItemActions extends Component {
    state = {
        inProgress: false
    };

    delete = () => {
        this.setState({
            inProgress: true
        });
        this.props
            .delete(this.props.item.id)
            .catch(msg => {
                this.props.showModal({
                    title: 'There was an error',
                    msg: msg.toString()
                });
            })
            .then(() => this.setState({ inProgress: false }));
    };

    save(item) {
        this.setState({
            inProgress: true
        });
        this.props
            .save(item)
            .catch(msg =>
                this.props.showModal({
                    title: 'There was an error',
                    msg: msg.toString()
                })
            )
            .then(() => this.setState({ inProgress: false }));
    }

    render() {
        return (
            <EditingContext.Consumer>
                {({ editing, setEditing }) => {
                    return editing !== this.props.item.id ? (
                        <div>
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
                                        this.props.showModal({
                                            title: 'Delete line item',
                                            msg: 'Are you sure?',
                                            confirm: this.delete
                                        })
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
                                        this.props.editing !==
                                            this.props.item.id
                                    }
                                    onClick={() =>
                                        setEditing(this.props.item.id)
                                    }
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="react-acq-lineitem-edit-actions">
                            <button
                                disabled={this.state.inProgress}
                                type="button"
                                className="react-acq-lineitem-disp-actions-save"
                                onClick={() => this.save(this.props.item)}
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

export default withModal(AcqInvoiceLineItemActions);
