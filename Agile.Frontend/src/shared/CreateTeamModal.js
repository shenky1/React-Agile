import React from "react";
import axios from 'axios';
import Multiselect from 'react-widgets/lib/Multiselect';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from "reactstrap";
import { AiOutlineTeam } from "react-icons/ai";
import defaultImage from "../assets/images/default-user.jpg";
import ImageUploader from 'react-images-upload';
import '../App.scss';

class CreateTeamModal extends React.Component {
    constructor(props) {
        super(props);
        this.showModal = true;

        this.user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            name: '',
            users: [],
            selectedUsers: [this.user],
            image: null
        }

        this.createTeam = this.createTeam.bind(this);
        this.onMultiselectChange = this.onMultiselectChange.bind(this);
    }

    componentDidMount() {
        axios.get('https://localhost:44322/api/Users').then(
            response => {
                this.setState(prevState => ({
                    ...prevState,
                    users: response.data
                }));
            }
        );
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

    createTeam() {
        if (!this.state.name.length || !this.state.selectedUsers.length) return;

        axios.post('https://localhost:44322/api/teams', {
            name: this.state.name,
            authorId: JSON.parse(localStorage.getItem('user')).id,
            image: this.state.image
        }).then(
            response => {
                const teamId = response.data.id;
                let length = this.state.selectedUsers.length;
                this.state.selectedUsers.forEach(user => {
                    axios.post('https://localhost:44322/api/TeamUserMappings', {
                        userId: user.id,
                        teamId: teamId,
                    }).finally(() => {
                        length--;
                        if (!length) {
                            this.showModal = false;
                            this.props.onTeamCreated();
                        }
                    })
                })
            }
        )
    }

    cancelModal() {
        this.props.onTeamCreated();
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader>Create new team</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Team name</Label>
                            <Input
                                placeholder="Enter team name"
                                value={this.state.name}
                                onChange={(e) => this.setState({name: e.target.value})}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Members</Label>
                            <Multiselect 
                                data={this.state.users}
                                value={this.state.selectedUsers}
                                textField="firstName"
                                filter='contains'
                                onChange={(value, metadata) => this.onMultiselectChange(value, metadata)}
                                placeholder="Select team members"
                            />
                        </FormGroup>
                    </Form>
                    <div className="text-center">
                        {this.state.image ? 
                                <img className="rounded-circle mt-2" src={this.state.image} alt={defaultImage} width="150" height="150"/> : 
                                <AiOutlineTeam className="d-inline team-image"/>
                            }                     
                        </div>
                        <div className="buttons">
                            <ImageUploader
                                fileContainerStyle={{'padding': '0px', 'margin': '0px', 'boxShadow': 'none', 'backgroundColor': 'transparent'}}
                                withIcon={false}
                                buttonText='Choose image'
                                onChange={(image) => this.onDrop(image)}
                                withLabel={false}
                                imgExtension={['.jpg', '.jpeg', '.png']}
                                maxFileSize={5242880}
                                singleImage={true}
                            />
                        </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.createTeam()}>Create team</Button>{' '}
                    <Button color="secondary" onClick={() => this.cancelModal()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

    onMultiselectChange(value, metadata) {
        if(metadata.action === "remove" && metadata.dataItem.id === this.user.id) {
            this.setState({
                selectedUsers: metadata.lastValue
            });
            return;
        }

        this.setState({
            selectedUsers: value
        });
    }
}

export default CreateTeamModal;