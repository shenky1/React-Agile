import React from "react";
import axios from 'axios';
import Multiselect from 'react-widgets/lib/Multiselect';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from "reactstrap";

class CreateTeamModal extends React.Component {
    constructor(props) {
        super(props);
        this.showModal = true;

        this.user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            name: '',
            users: [],
            selectedUsers: [this.user],
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

    createTeam() {
        if (!this.state.name.length || !this.state.selectedUsers.length) return;

        axios.post('https://localhost:44322/api/teams', {
            name: this.state.name,
            authorId: JSON.parse(localStorage.getItem('user')).id
        }).then(
            response => {
                const teamId = response.data.id;
                let length = this.state.selectedUsers.length;
                this.state.selectedUsers.forEach(user => {
                    axios.post('https://localhost:44322/api/TeamUserMappings', {
                        userId: user.id,
                        teamId: teamId
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