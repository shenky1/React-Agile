import React from "react";
import axios from 'axios';
import { Button } from "reactstrap";
import defaultImage from "../../assets/images/default-user.jpg";
import './Comment.css';
import moment from 'moment';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
        };
    }

    componentDidMount() {
        axios.get('https://localhost:44322/api/users/' + this.props.comment.userId)
        .then(response => {
            this.setState({
                user: response.data
            })            
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex align-items-center">
                    <img 
                        className="rounded-circle ml-2"
                        src={this.state.user.image || defaultImage}
                        alt=''
                        width="30" 
                        height="30"
                    />
                    <div className="m-2 flex-grow-1 d-flex flex-column">
                        <div className="header">
                            <b>{this.state.user.firstName} {this.state.user.lastName}</b> {moment(this.props.comment.dateCreated).format('lll')}
                        </div>
                        <div className="content">
                            <div>{this.props.comment.content}</div>
                        </div>
                        <div>
                        <Button className="p-0" color="link text-left" onClick={() => this.props.deleteComment(this.props.comment)}>
                            Delete
                        </Button>
                    </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Comment;