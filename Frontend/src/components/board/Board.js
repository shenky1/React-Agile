import React from "react";
import axios from 'axios';
import { Container, Row, Input, Button, Card, CardBody, Form, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import List from "../list/List";
import { FaTimes, FaPlus } from "react-icons/fa";
import './Board.css'
import { FiEdit3 } from "react-icons/fi";
import { Redirect } from "react-router-dom";

class Board extends React.Component {

    constructor(props) {
        super(props);
        
        this.board = this.props.location.state.board;
        this.user = JSON.parse(localStorage.getItem('user'));
        
        this.state = {
            myLists: [],
            newListTitle: '',
            addAnotherList: false,
            edit: false,
            editName: this.board.name,
            editDescription: this.board.description,
            team: null,
            deleteModal: false
        };

        this.getAllListsForBoard = this.getAllListsForBoard.bind(this);
        this.createList = this.createList.bind(this);
        this.displayNewList = this.displayNewList.bind(this);
        this.createNewList = this.createNewList.bind(this);
    }


    componentDidMount() {
        this.getAllListsForBoard();
        axios.get('https://localhost:44322/api/teams/' + this.board.teamId)
        .then(response => {
            this.setState({
                team: response.data.value,
            });
        });
    }

    getAllListsForBoard() {
        axios.get('https://localhost:44322/api/lists/getListsForBoard/' + this.board.id)
        .then(response => {
            this.setState(prevState => ({
                ...prevState,
                myLists: response.data.sort((a, b) => (a.orderId > b.orderId) ? 1 : -1),
            }));
        });
    }

    render() {
        return (
                <Container fluid className="p-0">
                    <div className="px-4 pt-4 pb-2 h-100 d-flex flex-column">
                    {!this.state.boardDeleted || 
                        <Redirect to={{
                            pathname: '/',
                        }}/>}
                        {this.showDeleteModal()}
                        {this.displayHeader()}
                        <Row className="mt-2 flex-grow-1 position-relative">
                            <div className="list-container">
                                {this.state.myLists.sort((a, b) => a.orderId > b.orderId ? 1 : -1).map((list, index, array) => (
                                    <div className="list" key={list.id}>
                                        {this.createList(list, index, array)}
                                    </div>
                                ))}

                                <div className="list">
                                    {this.displayNewList()}
                                </div>
                            </div>
                        </Row>
                    </div>
                </Container>
        );
    }

    showDeleteModal() {
        return !this.state.deleteModal || (
            <Modal isOpen={this.state.deleteModal}>
                <ModalHeader>Delete board</ModalHeader>
                <ModalBody>
                    Are you sure that you want to delete this board?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.deleteBoard()}>Delete board</Button>{' '}
                    <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                </ModalFooter>
        </Modal>
        );
    }

    deleteBoard() {
        axios.post('https://localhost:44322/api/boards/deleteEntireBoard/' + this.board.id)
        .then(response => {
            this.setState({
                deleteModal: false,
                boardDeleted: true
            })
        });
    }

    displayHeader() {
        var backgroundStyle = {
            backgroundImage: "url(" + this.board.imageUrl + ")",
            backgroundSize: "cover"
        };
        return (
            <div className="d-flex">
                <div className="team-image-container team-image mr-3" style={backgroundStyle}>
                </div>
                {this.state.edit ? this.displayEdit() : this.displayInfo()}
            </div>
        );
    }

    displayInfo() {
        return (
            <div className="d-inline d-flex flex-column">     
                <h2>{this.board ? this.board.name : ''}</h2>
                <div>{this.board ? this.board.description : ''}</div>
                {(this.state.team && this.state.team.authorId !== this.user.id) || 
                    <Button color="link text-left" onClick={() => this.setState({edit: true})}>
                        <FiEdit3 />
                        <span className="ml-2">Edit board</span>
                    </Button>
                }
            </div>
        );
    }

    displayEdit() {
        return (
            <Form className="d-flex">
                <div className="flex-column">
                    <FormGroup>
                        <Label>Board name</Label>
                        <Input
                            placeholder="Enter board name"
                            value={this.state.editName}
                            onChange={(e) => this.setState({editName: e.target.value})}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Board Description</Label>
                        <Input
                            placeholder="Enter board description"
                            value={this.state.editDescription}
                            onChange={(e) => this.setState({editDescription: e.target.value})}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Team</Label>
                        <Input
                            disabled
                            value={this.state.team.name}
                        ></Input>
                    </FormGroup>
                    <Button color="primary" className="mr-1" onClick={() => this.editBoard()}>Edit board</Button>
                    <Button color="secondary" onClick={() => this.cancelEdit()}>Cancel</Button>
                    <FormGroup>
                        <Button color="link" onClick={() => this.setState({deleteModal: true})}>Delete this board?</Button>
                    </FormGroup>
                </div>
            </Form>

        );
    }

    editBoard() {
        if (!this.state.editName.length) return;

        axios.put('https://localhost:44322/api/boards/' + this.board.id, {
            id: this.board.id,
            name: this.state.editName,
            description: this.state.editDescription,
            imageUrl: this.board.imageUrl,
            teamId: this.state.team.id
        }).then(response => {
            this.board.name = this.state.editName;
            this.board.description = this.state.editDescription;
            this.componentDidMount();
            this.cancelEdit();
        });
    }

    cancelEdit() {
        this.setState({
            edit: false
        });
    }

    toggleModal() {
        this.setState(prevState => ({
            ...prevState,
            deleteModal: !prevState.deleteModal
        }))
    }

    createList(list, index, array) {
        if (index === 0 && index === array.length - 1) {
            return (<List rerenderBoard={this.getAllListsForBoard} isFirst isLast list={list}></List>);
        } else if (index === array.length - 1) {
            return (<List rerenderBoard={this.getAllListsForBoard} isLast list={list}></List>);
        } else if (index === 0) {
            return (<List rerenderBoard={this.getAllListsForBoard} isFirst list={list}></List>);
        } else {
            return (<List rerenderBoard={this.getAllListsForBoard} list={list}></List>);
        }
    }

    createNewList() {
        if (this.state.newListTitle) {
            axios.post('https://localhost:44322/api/lists', {
                boardId: this.board.id,
                name: this.state.newListTitle
            })
            .then(response => {
                this.setState({
                    addAnotherList: false,
                    newListTitle: ''
                });
                this.getAllListsForBoard();
            });
        }
    }

    displayNewList() {
        return this.state.addAnotherList ?
                (
                <Card style={{"backgroundColor": "#ebecf0"}}>
                    <CardBody className="p-2">
                        <div className="m-2">
                            <Input 
                                type="textarea" 
                                value={this.state.newListTitle}
                                onChange={(e) => this.setState({newListTitle: e.target.value})}
                                placeholder="Enter a title for this list..." />
                        </div>
                        <div className="d-flex mb-2 mx-2">
                            <Button onClick={() => this.createNewList()} color="success" className="flex-grow-1 mr-2">
                                Add List
                            </Button>
                            <Button onClick={() => this.setState({addAnotherList: false, newListTitle: ''})} color="danger">
                                <FaTimes />
                            </Button>
                    </div>
                    </CardBody>
                </Card>
            ) : (
                <Button onClick={() => this.setState({addAnotherList: true})} className="hsla-button text-left">
                    <FaPlus />
                    <span className="ml-2">Add another list</span>
                </Button>
            )
    }

}

export default Board;