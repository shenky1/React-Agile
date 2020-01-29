import React from "react";
import axios from "axios";
import { Card as ReactCard, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FaTimes, FaCheck } from 'react-icons/fa';
import '../../App.scss';


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false
        };
        this.showDeleteModal = this.showDeleteModal.bind(this);
    }

    render() {
        return (
            <div>
                {this.showDeleteModal()}
                <ReactCard className="m-2">
                    <CardBody>
                        <div className="d-flex">
                            <div className="overflow-auto flex-grow-1" style={{'white-space': 'pre-wrap'}}>{this.props.card.title}</div>
                            <Button onClick={() => this.toggleModal()} className="transparent-button p-0">
                                <FaTimes />
                            </Button>
                        </div>
                    </CardBody>
                </ReactCard>
            </div>
        );
    }

    showDeleteModal() {
        return !this.state.showDeleteModal || (
            <Modal isOpen={this.state.showDeleteModal}>
                <ModalHeader>Delete card</ModalHeader>
                <ModalBody>
                    Are you sure that you want to delete card?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.deleteCard()}>Delete card</Button>{' '}
                    <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                </ModalFooter>
        </Modal>
        );
    }

    deleteCard() {
        axios.delete('https://localhost:44322/api/card/' + this.props.card.id).then(res => {
            this.props.showToast(FaCheck, 'Success', 'Card deleted successfully');
            this.props.rerender();
        });
    }

    toggleModal() {
        this.setState(prevState => ({
            ...prevState,
            showDeleteModal: !prevState.showDeleteModal
        }))
    }
}

export default Card;