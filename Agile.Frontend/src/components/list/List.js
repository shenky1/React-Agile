import React from "react";
import axios from 'axios';
import Card from "../card/Card";
import { Card as ReactCard,
         CardBody, CardTitle,
         Button, Modal, ModalHeader,
         ModalBody, ModalFooter, Label,
         Input, ButtonDropdown, DropdownToggle,
         DropdownMenu, DropdownItem } from "reactstrap";
import { FaPlus, FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import '../../App.scss';
import './List.css'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myCards: [],
            showModal: false,
            title: '',
            dropdownOpen: false

        };

        this.list = this.props.list;

        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    componentDidMount() {
        axios.get('https://localhost:44322/api/card/getCardsForList/' + this.list.id)
        .then(response => {
            this.setState({
                myCards: response.data,
                showNewCard: false,
                title: ''
            });
        });
    }

    removeList() {
        axios.delete('https://localhost:44322/api/lists/' + this.list.id).then(res => {
            this.props.rerenderBoard();
        });
    }

    render() {
        return (
            <ReactCard className="react-card">
                <CardBody className="p-2 d-flex flex-column">
                    <CardTitle className="ml-2 mt-2 d-flex">
                        <div className="pr-2 flex-grow-1">
                            <b>{this.props.list.name}</b>
                        </div>
                        <ButtonDropdown 
                            direction="down"
                            isOpen={this.state.dropdownOpen}
                            toggle={() => this.setState(prevState => (
                                {
                                    ...prevState,
                                    dropdownOpen: !prevState.dropdownOpen
                                }))
                            }>
                            <DropdownToggle tag="div">
                                <Button className="transparent-button">
                                    <GiHamburgerMenu/>
                                </Button>
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu'>
                                <div>
                                    {this.props.isFirst || <DropdownItem onClick={() => this.moveListLeft()}>Move Left</DropdownItem>}
                                    {this.props.isLast || <DropdownItem onClick={() => this.moveListRight()}>Move Right</DropdownItem>}
                                    {(this.props.isFirst && this.props.isLast) || <DropdownItem divider />}
                                    <DropdownItem color="danger" className="w-100" onClick={() => this.removeList()}>Delete List</DropdownItem>
                                </div>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </CardTitle>
                    <div className="flex-grow-1">                        
                        {this.state.myCards.map(card => (
                            <Card team={this.props.team} board={this.props.board} list={this.list} card={card} rerender={this.props.rerenderBoard} key={card.id}></Card>
                        ))}
                    </div>
                    {this.showAccordingFooter()}
                </CardBody>
                
            </ReactCard>
        );
    }

    moveListLeft() {
        axios.get('https://localhost:44322/api/lists/moveListLeft/' + this.list.id)
        .then(response => {
            this.props.rerenderBoard();
        });
    }

    moveListRight() {
        axios.get('https://localhost:44322/api/lists/moveListRight/' + this.list.id)
        .then(response => {
            this.props.rerenderBoard();
        });
    }


    showAccordingFooter() {
        return this.state.showNewCard ? (
            <div>
                <div className="m-2">
                    <Input type="textarea" value={this.state.title} onChange={this.handleChange} placeholder="Enter a title for this card..." />
                </div>
                <div className="d-flex mb-2 mx-2">
                    <Button onClick={() => this.addNewCard()} color="success" className="flex-grow-1 mr-2">
                        Add Card
                    </Button>
                    <Button onClick={() => this.setState({showNewCard: false, title: ''})} color="danger">
                        <FaTimes />
                    </Button>
                </div>
            </div>
        ) : (
            <Button onClick={() => this.setState({showNewCard: true})} className="transparent-button text-left mb-2 mx-3">
                <FaPlus />
                <span className="ml-2">Add another card</span>
            </Button>
        )
    }



    addNewCard() {
        if (this.state.title) {
            axios.post('https://localhost:44322/api/card', {
                title: this.state.title,
                ListId: this.props.list.id
            })
            .then(response => {
                this.componentDidMount();
            });
        }
    }

    returnModal() {
        return (
            <Modal isOpen={this.state.showModal}>
                <ModalHeader>Card</ModalHeader>
                <ModalBody>
                    <Label for="card-title">Card name</Label>
                    <Input type="textarea" placeholder="" id="card-title" />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toggleModal()}>Save card</Button>{' '}
                    <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                </ModalFooter>
        </Modal>
        );
    }

    handleChange(event) {
        this.setState({title: event.target.value});
    }

    toggleModal() {
        this.setState(prevState => ({
            ...prevState,
            showModal: !prevState.showModal
        }))
    }
}

export default List;