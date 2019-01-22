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
                if (msg) {
                    this.props.showModal({
                        title: window._('There was an error'),
                        msg: msg.toString()
                    });
                }
            })
            .then(() => this.setState({ inProgress: false }));
    };

    save(item) {
        this.setState({
            inProgress: true
        });
        this.props
            .save(item)
            .catch(msg => {
                if (msg) {
                    this.props.showModal({
                        title: window._('There was an error'),
                        msg: msg.toString()
                    });
                }
            })
            .then(() => this.setState({ inProgress: false }));
    }

    render() {
        return (
            <EditingContext.Consumer>
                {({ editing, setEditing }) => {
                    return editing !== this.props.item.id ? (
                        <div id="react-acq-lineitem-disp-actions">
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
                                        title: window._('Delete line item'),
                                        msg: window._('Are you sure?'),
                                        btnText: window._('Delete'),
                                        confirm: this.delete
                                    })
                                }
                            >
                                {this.state.inProgress
                                    ? window._('Deleting...')
                                    : window._('Delete')}
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
                                {window._('Edit')}
                            </button>
                        </div>
                    ) : (
                        <div id="react-acq-lineitem-edit-actions">
                            <button
                                disabled={this.state.inProgress}
                                type="button"
                                className="react-acq-lineitem-edit-actions-save"
                                onClick={() => this.save(this.props.item)}
                            >
                                {this.state.inProgress
                                    ? window._('Saving...')
                                    : window._('Save')}
                            </button>
                            <button
                                type="button"
                                className="react-acq-lineitem-edit-actions-cancel"
                                onClick={() =>
                                    this.props.cancel(this.props.item.id)
                                }
                            >
                                {window._('Cancel')}
                            </button>
                        </div>
                    );
                }}
            </EditingContext.Consumer>
        );
    }
}

export default withModal(AcqInvoiceLineItemActions);
