import React from "react";
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from "reactstrap";
import { DropdownList } from "react-widgets";

class CreateBoardModal extends React.Component {
    constructor(props) {
        super(props);
        this.showModal = true;

        this.user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            name: '',
            description: '',
            teams: [],
            selectedTeam: null,
        }

        this.createBoard = this.createBoard.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
    }

    componentDidMount() {
        axios.get('https://localhost:44322/api/teams').then(
            response => {
                this.setState({
                    teams: response.data.value.filter(team => team.authorId === this.user.id)
                });
            }
        );
    }

    createBoard() {
        if (!this.state.name.length || !this.state.selectedTeam) return;

        axios.post('https://localhost:44322/api/boards', {
            name: this.state.name,
            description: this.state.description,
            teamId: this.state.selectedTeam.id
        }).then(
            response => {
                console.log('Board Created!');
                this.props.onBoardCreated();
            }
        )
    }

    cancelModal() {
        this.showModal = false;
        this.props.onBoardCreated();
    }

    render() {
        return (
            <Modal isOpen={this.showModal}>
                <ModalHeader>Create new board</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Board name</Label>
                            <Input
                                placeholder="Enter board name"
                                value={this.state.name}
                                onChange={(e) => this.setState({name: e.target.value})}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Board description</Label>
                            <Input
                                placeholder="Enter board description"
                                value={this.state.description}
                                onChange={(e) => this.setState({description: e.target.value})}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Teams</Label>
                            <DropdownList 
                                data={this.state.teams}
                                value={this.state.selectedTeam}
                                onChange={value => this.setState({selectedTeam: value})}
                                textField="name"
                                placeholder="Select team"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.createBoard()}>Create board</Button>{' '}
                    <Button color="secondary" onClick={() => this.cancelModal()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CreateBoardModal;