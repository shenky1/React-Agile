import React from "react";
import axios from "axios";
import { Card as ReactCard, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import { FaTimes } from 'react-icons/fa';
import '../../App.scss';
import { DropdownList } from "react-widgets";


class Card extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            showDeleteModal: false,
            openCardModal: false,
            allLists: [],
            selectedList: this.props.list
        };
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.openCardModal = this.openCardModal.bind(this);
    }

    componentDidMount() {
        axios.get('https://localhost:44322/api/lists/getListsForBoard/' + this.props.board.id)
        .then(response => {
            this.setState({
                allLists: response.data.sort((a, b) => (a.orderId > b.orderId) ? 1 : -1),
            });
        });
    }

    render() {
        return (
            <div>
                {this.showDeleteModal()}
                {this.displayCardModal()}
                <ReactCard className="m-2">
                    <CardBody>
                        <div className="d-flex">
                            <div onClick={() => this.openCardModal()} className="overflow-auto flex-grow-1" style={{'white-space': 'pre-wrap'}}>{this.props.card.title}</div>
                            <Button onClick={() => this.setState({showDeleteModal: true})} className="transparent-button p-0">
                                <FaTimes />
                            </Button>
                        </div>
                    </CardBody>
                </ReactCard>
            </div>
        );
    }

    openCardModal() {
        this.setState({
            openCardModal: true
        });
    }

    displayCardModal() {
        return !this.state.openCardModal || (
            <Modal isOpen={this.state.openCardModal}>
                <ModalHeader>{this.props.card.title}</ModalHeader>
                <ModalBody>
                    <Label>In List</Label>
                        <DropdownList 
                            data={this.state.allLists}
                            value={this.state.selectedList}
                            onChange={value => this.setState({selectedList: value})}
                            textField="name"
                            placeholder="Select List"
                        />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.saveCard()}>Save card</Button>{' '}
                    <Button color="secondary" onClick={() => this.setState({openCardModal: false})}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

    saveCard() {

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
                    <Button color="secondary" onClick={() => this.setState({showDeleteModal: false})}>Cancel</Button>
                </ModalFooter>
        </Modal>
        );
    }

    deleteCard() {
        axios.delete('https://localhost:44322/api/card/' + this.props.card.id).then(res => {
            this.props.rerender();
        });
    }
}

export default Card;