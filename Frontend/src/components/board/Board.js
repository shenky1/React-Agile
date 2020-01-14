import React from "react";
import axios from 'axios';
import { Container, Row, Input, Button, Card, CardBody } from "reactstrap";
import List from "../list/List";
import { FaTimes, FaPlus } from "react-icons/fa";
import './Board.css'

class Board extends React.Component {

    constructor(props) {
        super(props);
        
        this.board = this.props.location.state.board;
        this.user = JSON.parse(localStorage.getItem('user'));
        
        this.state = {
            myLists: [],
            newListTitle: '',
            addAnotherList: false
        };

        this.getAllListsForBoard = this.getAllListsForBoard.bind(this);
        this.createList = this.createList.bind(this);
        this.displayNewList = this.displayNewList.bind(this);
        this.createNewList = this.createNewList.bind(this);
    }


    componentDidMount() {
        this.getAllListsForBoard();
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
        var backgroundStyle = {
            backgroundImage: "url(" + this.board.imageUrl + ")",
            backgroundSize: "cover"
        };

        return (
                <Container fluid className="p-0" style={ backgroundStyle }>
                    <div className="px-4 pt-4 pb-2 h-100 d-flex flex-column">
                        <Row><h3 className="ml-3">Welcome to {this.board.name }</h3></Row>
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