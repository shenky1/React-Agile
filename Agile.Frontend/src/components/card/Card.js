import React from "react";
import axios from "axios";
import { Card as ReactCard, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { FaTimes, FaList } from 'react-icons/fa';
import { GoCommentDiscussion } from 'react-icons/go';
import { MdAssignmentInd } from 'react-icons/md';
import '../../App.scss';
import { DropdownList } from "react-widgets";
import defaultImage from "../../assets/images/default-user.jpg";
import Comment from "../comment/Comment";
import './Card.css';


class Card extends React.Component {
    constructor(props) {
        super(props);

        this.list = this.props.list;
        this.card = this.props.card;
        this.assigneId = this.props.card.assigneId;
        this.user = JSON.parse(localStorage.getItem('user'));

        this.state = {
            showDeleteModal: false,
            openCardModal: false,
            allLists: [],
            selectedList: this.props.list,
            selectedAssigne: null,
            users: [],
            comments: [],
            newComment: ''
        };
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.openCardModal = this.openCardModal.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    componentDidMount() {
        axios.get('https://localhost:44322/api/lists/getListsForBoard/' + this.props.board.id)
        .then(response => {
            this.setState({
                allLists: response.data.sort((a, b) => (a.orderId > b.orderId) ? 1 : -1),
            });
        });

        axios.get('https://localhost:44322/api/TeamUserMappings/getUsersForTeam/' + this.props.team.id)
        .then(response => {
            const assigne = response.data.find(user => user.id === this.props.card.assigneId);
            this.setState({
                users: response.data,
                selectedAssigne: assigne
            });
        });

        axios.get('https://localhost:44322/api/comments/getCommentsForCard/' + this.props.card.id)
        .then(response => {
            this.setState({
                comments: response.data
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
                        <div>
                            <div className="d-flex">
                                <span onClick={() => this.openCardModal()} className="overflow-auto flex-grow-1" style={{'whiteSpace': 'pre-wrap'}}>{this.props.card.title}</span>
                                <Button onClick={() => this.setState({showDeleteModal: true})} className="transparent-button p-0">
                                    <FaTimes />
                                </Button>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <div className="d-flex align-items-center">
                                    {!this.state.comments.length || 
                                    (<div> <GoCommentDiscussion className="m-2" style={{fontSize: '20px'}}/>
                                    <span>{this.state.comments.length}</span> </div>)}
                                </div>
                                {!this.state.selectedAssigne || <img 
                                className="rounded-circle"
                                src={this.state.selectedAssigne.image || defaultImage}
                                alt='' 
                                width="30" 
                                height="30"
                                />}
                            </div>
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
            <Modal className={'modal-content'} isOpen={this.state.openCardModal}>
                <ModalHeader>{this.props.card.title}</ModalHeader>
                <ModalBody>
                    <div className="d-flex mb-2">
                        <FaList style={{fontSize: '24px'}}/>
                        <h5 className="ml-2">In List</h5>
                    </div>
                        <DropdownList 
                            data={this.state.allLists}
                            value={this.state.selectedList}
                            onChange={(value) => this.setState({selectedList: value})}
                            textField="name"
                            placeholder="Select List"
                        />
                    <hr/>
                    <div className="d-flex mb-2">
                        <MdAssignmentInd style={{fontSize: '24px'}}/>
                        <h5 className="ml-2">Assigne</h5>
                    </div>
                        <DropdownList 
                            data={this.state.users}
                            value={this.state.selectedAssigne}
                            onChange={(value) => this.setState({selectedAssigne: value})}
                            textField="firstName"
                            placeholder="Select Assigne"
                        />
                    <hr/>
                    <div>
                        <div className="d-flex">
                            <GoCommentDiscussion style={{fontSize: '24px'}}/>
                            <h5 className="ml-2">Comments</h5>
                        </div>
                        <div className="text-right">
                            <div className="d-flex align-items-center">
                                <img 
                                    className="rounded-circle ml-2"
                                    src={this.user.image ? this.user.image : defaultImage}
                                    alt=""
                                    width="30"
                                    height="30"
                                />
                                <div className="m-2 flex-grow-1 d-flex flex-column">
                                    <Input type="textarea" value={this.state.newComment} onChange={(e) => this.setState({newComment: e.target.value})} placeholder="Write a comment..." />
                                </div>
                            </div>
                            <Button className="mr-2" onClick={() => this.saveComment()} color={this.state.newComment.length ? "success" : "secondary"}>Save</Button>
                        </div>
                        {this.state.comments.map(comment => (
                            <Comment key={comment.id} comment={comment} deleteComment={(comment) => this.deleteComment(comment)}/>
                        ))}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.saveCard()}>Save card</Button>{' '}
                    <Button color="secondary" onClick={() => this.cancelButton()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }


    deleteComment(comment) {
        axios.delete('https://localhost:44322/api/comments/' + comment.id)
        .then(response => {
            this.setState(prevState => {
                const comments = prevState.comments.filter(com => com.id !== comment.id);
                return ({
                    ...prevState,
                    comments: comments
                });
            });
        });
    }

    saveComment() {
        axios.post('https://localhost:44322/api/comments', {
            userId: this.user.id,
            cardId: this.props.card.id,
            content: this.state.newComment,
            dateCreated: new Date()
        }).then(resp => {
            this.setState(prevState => ({
                newComment: '',
                comments: prevState.comments.concat(resp.data)
            }));
        });
    }

    cancelButton() {
        this.setState({
            openCardModal: false,
        });
    }

    saveCard() {
        axios.put('https://localhost:44322/api/card/' + this.props.card.id, {
            ...this.props.card,
            listId: this.state.selectedList.id,
            assigneId: this.state.selectedAssigne ? this.state.selectedAssigne.id: this.props.card.assigneId
        }).then(resp => {
            this.setState({
                openCardModal: false
            });
            this.props.rerender();
         });
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
            this.setState({showDeleteModal: false});
            this.props.rerender();
        });
    }
}

export default Card;