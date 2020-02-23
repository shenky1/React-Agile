import React from "react";
import axios from 'axios';
import {NavLink} from "react-router-dom";
import {AiOutlineTeam} from 'react-icons/ai'
import '../App.scss';
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";
import CreateTeamModal from "./CreateTeamModal";
import { GiHand } from "react-icons/gi";
import CreateBoardModal from "./CreateBoardModal";

class Sidebar extends React.Component {
    
    constructor(props) {
        super(props);
        this.userId = props.user.id
        this.state = {
            teams: [],
            openModal: false
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.openTeamModal = this.openTeamModal.bind(this);
        this.openBoardsModal = this.openBoardsModal.bind(this);
    }

    componentDidMount() {
        axios.get('https://localhost:44322/api/TeamUserMappings/getTeamsForUser/' + this.userId)
        .then(response => {
            this.setState({
                teams: response.data,
                openTeamModal: false,
                openBoardsModal: false
            });
        });
    }  

    openTeamModal() {
        this.setState({
            openTeamModal: true
        });
    }

    openBoardsModal() {
        this.setState({
            openBoardsModal: true
        });
    }

    render() {
        return (
            <div className="bg-light border-right sidebar-container">
                {!this.state.openTeamModal || <CreateTeamModal onTeamCreated={() => this.componentDidMount()}/>}
                {!this.state.openBoardsModal || <CreateBoardModal onBoardCreated={() => this.componentDidMount()}/>}
                <div className="list-group list-group-flush">
                    <div>
                        <NavLink 
                            activeClassName="selected" 
                            to="/" 
                            className="list-group-item list-group-item-action bg-light">
                            My Boards
                        </NavLink>
                    </div>
                    <Button onClick={() => this.openBoardsModal()} className="list-group-item list-group-item-action border-top-0 bg-light">
                        <FaPlus />
                        <span className="ml-2">Create new board</span>
                    </Button>

                    <div className="list-group-item list-group-item-action bg-light boarder-bottom-0">
                           My Teams
                    </div>
                    {this.state.teams.map(team => {
                        return (
                            <div key={team.id}>
                                <NavLink 
                                    activeClassName="selected" 
                                    to={{
                                        pathname: "/teams/" + team.id,
                                        teamsProps: {team: team}
                                    }}
                                    className="list-group-item list-group-item-action bg-light">
                                        <AiOutlineTeam className="m-1"/>
                                        <span className="m-1">{team.name}</span>
                                        {team.authorId !== this.userId || <GiHand style={{color: 'blue'}} className="m-1"/>}
                                </NavLink>
                            </div>
                        );
                    })}
                    <Button onClick={() => this.openTeamModal()} className="list-group-item list-group-item-action border-top-0 bg-light">
                        <FaPlus />
                        <span className="ml-2">Create new team</span>
                    </Button>
                </div>
            </div>
        );
    }
}



export default Sidebar;