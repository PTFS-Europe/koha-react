import React, { Component } from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

export default function withModal(Wrapped) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                display: false
            };
        }

        componentDidMount() {
            this.initState();
        }

        initState = () => {
            this.setState({
                title: '',
                msg: '',
                btnText: '',
                confirm: null,
                display: false
            });
        };

        show = params => {
            this.setState({
                title: params.title,
                msg: params.msg,
                btnText: params.btnText,
                confirm: params.confirm ? params.confirm : null,
                display: true
            });
        };

        hide = () => {
            this.initState();
        };

        doConfirm = () => {
            this.state.confirm();
            this.hide();
        };

        render() {
            return (
                <div>
                    <Wrapped showModal={this.show} {...this.props} />
                    <Modal
                        id="acq-lineitems-modal"
                        show={this.state.display}
                        onHide={this.hide}
                        bsSize="small"
                    >
                        <Modal.Header>
                            <Modal.Title>{this.state.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.msg}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.hide}>
                                {window._('Close')}
                            </Button>
                            {this.state.confirm && (
                                <Button
                                    bsStyle="danger"
                                    variant="error"
                                    onClick={() => this.doConfirm()}
                                >
                                    {this.state.btnText}
                                </Button>
                            )}
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
    };
}
