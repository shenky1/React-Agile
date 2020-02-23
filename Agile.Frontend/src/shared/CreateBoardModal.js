import React from "react";
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from "reactstrap";
import { DropdownList } from "react-widgets";
import defaultImage from "../assets/images/default-user.jpg";
import ImageUploader from 'react-images-upload';
import { FaChessBoard } from "react-icons/fa";
import '../App.scss';

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
            image: null
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
            teamId: this.state.selectedTeam.id,
            image: this.state.image
        }).then(
            response => {
                this.props.onBoardCreated();
            }
        )
    }

    cancelModal() {
        this.showModal = false;
        this.props.onBoardCreated();
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
                    <div className="text-center">
                        {this.state.image ? 
                                <img className="rounded-circle mt-2" src={this.state.image} alt={defaultImage} width="150" height="150"/> : 
                                <FaChessBoard className="d-inline team-image"/>
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
                    <Button color="primary" onClick={() => this.createBoard()}>Create board</Button>{' '}
                    <Button color="secondary" onClick={() => this.cancelModal()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CreateBoardModal;