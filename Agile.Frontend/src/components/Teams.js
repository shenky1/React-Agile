import React from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AiOutlineTeam } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi"
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import '../App.scss';
import defaultImage from "../assets/images/default-user.jpg";
import { Redirect } from "react-router-dom";
import Multiselect from "react-widgets/lib/Multiselect";
import ImageUploader from 'react-images-upload';
import { GiHand } from "react-icons/gi";

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            teamUsers: [],
            boards: [],
            board: null,
            edit: false,
            editName: '',
            editDescription: '',
            editSelectedUsers: [],
            deleteModal: false,
            team: null,
            image: null,
            teamDeleted: false
        };

        if (props.location.teamsProps) {
            this.team = props.location.teamsProps.team
        } 

        this.user = JSON.parse(localStorage.getItem('user'));
        
        this.getTeamById = this.getTeamById.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.editTeam = this.editTeam.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onMultiselectChange = this.onMultiselectChange.bind(this);
    }

    componentDidMount() {
        if(!this.team) {
            this.getTeamById();
            return;
        };

        axios.get('https://localhost:44322/api/Users').then(
            response => {
                this.setState(prevState => ({
                    ...prevState,
                    allUsers: response.data
                }));
            }
        );

        axios.get('https://localhost:44322/api/TeamUserMappings/getUsersForTeam/' + this.team.id)
        .then(response => {
            this.setState({
                teamUsers: response.data,
                editSelectedUsers: response.data,
                editName: this.team.name || '',
                editDescription: this.team.description || '',
                team: this.team,
                image: this.team.image
            });
        });

        axios.get('https://localhost:44322/api/boards/getBoardsForTeam/' + this.team.id)
        .then(response => {
            this.setState({
                boards: response.data,
            });
        });
    }

    getTeamById() {
        axios.get('https://localhost:44322/api/teams/' + this.props.match.params.id)
        .then(response => {
            this.team = response.data.value;
            this.componentDidMount();
        });
    }

    render() { 
        return (
            <div className="w-100">
                {!this.state.teamDeleted || 
                <Redirect to={{
                    pathname: '/',
                }}/>}
                {this.showDeleteModal()}
                {this.displayHeader()}
                <Tabs >
                    <TabList>
                        <Tab>Boards</Tab>
                        <Tab>Members</Tab>
                    </TabList>

                    <TabPanel>
                        {this.displayBoards()}
                    </TabPanel>
                    <TabPanel>
                        {this.displayMembers()}
                    </TabPanel>
                </Tabs>
            </div>
        );
    }

    showDeleteModal() {
        return !this.state.deleteModal || (
            <Modal isOpen={this.state.deleteModal}>
                <ModalHeader>Delete team</ModalHeader>
                <ModalBody>
                    Are you sure that you want to delete this team?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.deleteTeam()}>Delete Team</Button>{' '}
                    <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                </ModalFooter>
        </Modal>
        );
    }

    deleteTeam() {
        axios.post('https://localhost:44322/api/teams/deleteEntireTeam/' + this.state.team.id)
        .then(response => {
            this.setState({
                deleteModal: false,
                teamDeleted: true
            })
        });
    }

    toggleModal() {
        this.setState(prevState => ({
            ...prevState,
            deleteModal: !prevState.deleteModal
        }))
    }

    displayMembers() {
        return (
            <Container fluid className="mt-4">
                <Row xs="6" className="mt-2">
                    {this.state.teamUsers.map(user => (
                        <Col className="mt-2" key={user.id}>
                            <Card>
                                {this.state.team.authorId !== user.id || <GiHand className="m-1 member-owner"/>}
                                <CardImg top src={user.image || defaultImage} alt="Card image cap" width="100px" height="100px"/>
                                <CardBody>
                                    <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                                    <CardText>{user.eMail}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }

    toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file[file.length - 1]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
 
    onDrop(picture) {
        this.toBase64(picture).then(res => {
            this.setState({
                image: res
            });
        })
    }

    saveImage() {
        axios.put('https://localhost:44322/api/teams/' + this.team.id, {
                ...this.team,
                image: this.state.image,
            })
            .then(response => {
                this.team.image = this.state.image;
            });
    }

    displayHeader() {
        return (
            <div className="d-flex p-3">
                <div className="mr-3">
                    {this.team.image ? 
                        <img className="rounded-circle mt-2" src={this.state.image} alt="" width="100" height="100"/> : 
                        <div className="team-image-container team-image">
                            <AiOutlineTeam className="d-inline team-image"/>
                        </div>
                    }
                    {!this.state.edit ||
                        <div className="buttons">
                            <ImageUploader
                                fileContainerStyle={{'padding': '0px', 'margin': '0px', 'boxShadow': 'none'}}
                                withIcon={false}
                                buttonText='Choose'
                                onChange={(image) => this.onDrop(image)}
                                withLabel={false}
                                imgExtension={['.jpg', '.jpeg', '.png']}
                                maxFileSize={5242880}
                                singleImage={true}
                            />
                            <div onClick={() => this.saveImage()} className="save-file-button">Save</div>
                        </div>}
                    </div>
                {this.state.edit ? this.displayEdit() : this.displayInfo()}
            </div>
        );
    }

    displayInfo() {
        return (
            <div className="d-inline d-flex flex-column">     
                <h2>{this.state.team ? this.state.team.name : ''}</h2>
                
                <div>{this.state.team ? this.state.team.description : ''}</div>
                {!this.state.team || this.state.team.authorId !== this.user.id || 
                    <Button color="link text-left" onClick={() => this.setState({edit: true})}>
                        <FiEdit3 />
                        <span className="ml-2">Edit team</span>
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
                        <Label>Team name</Label>
                        <Input
                            placeholder="Enter team name"
                            value={this.state.editName}
                            onChange={(e) => this.setState({editName: e.target.value})}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Team Description</Label>
                        <Input
                            placeholder="Enter team description"
                            value={this.state.editDescription}
                            onChange={(e) => this.setState({editDescription: e.target.value})}
                        ></Input>
                    </FormGroup>
                    <Button color="primary" className="mr-1" onClick={() => this.editTeam()}>Edit team</Button>
                    <Button color="secondary" onClick={() => this.cancelEdit()}>Cancel</Button>
                    <FormGroup>
                        <Button color="link" onClick={() => this.setState({deleteModal: true})}>Delete this team?</Button>
                    </FormGroup>
                </div>
                    <FormGroup className="ml-4" style={{'maxWidth': '500px'}}>
                    <Label>Members</Label>
                    <Multiselect
                        data={this.state.allUsers}
                        value={this.state.editSelectedUsers}
                        textField="firstName"
                        filter='contains'
                        onChange={(value, metadata) => this.onMultiselectChange(value, metadata)}
                        placeholder="Select team members"
                    />
                </FormGroup>
               
            </Form>
        );
    }

    onMultiselectChange(value, metadata) {
        if(metadata.action === "remove" && metadata.dataItem.id === this.team.authorId) {
            this.setState({
                editSelectedUsers: metadata.lastValue
            });
            return;
        }

        this.setState({
             editSelectedUsers: value
        });
    }

    editTeam() {
        if (!this.state.editName.length) return;

        axios.put('https://localhost:44322/api/teams/' + this.state.team.id, {
            id: this.state.team.id,
            authorId: this.state.team.authorId,
            name: this.state.editName,
            description: this.state.editDescription,
            image: this.team.image
        }).then(response => {
            axios.post(
                'https://localhost:44322/api/teams/updateTeamUsers/' + this.state.team.id, 
                this.state.editSelectedUsers
            ).then(response => {
                this.getTeamById();
                this.cancelEdit();
            });
        });

       
    }

    cancelEdit() {
        this.setState({
            edit: false
        });
    }

    displayBoards() {
        return this.state.board ? 
            ( <Redirect to={{
                pathname: '/board',
                state: { board: this.state.board}
            }}/> 
            ) :
            (
                <Container fluid className="mt-4">
                    <Row xs="4" className="mt-2">
                        {this.state.boards.map(board => (
                            <Col key={board.id}>
                                <Card>
                                    <CardImg top src={board.image} alt="Card image cap" width="100%" height="100px"/>
                                    <CardBody>
                                        <CardTitle><b>{board.name}</b></CardTitle>
                                        <CardText >{board.description}</CardText>
                                        <Button onClick={() => this.setState(prevState => ({...prevState, board: board}))}>Enter</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
        );
    }
}

export default Teams;