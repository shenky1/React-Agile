import React from "react";
import ImageUploader from 'react-images-upload';
import defaultImage from "../assets/images/default-user.jpg";
import '../App.scss';
import axios from 'axios';
import { Form, FormGroup, Label, Input } from "reactstrap";

class Profile extends React.Component {
 
    constructor(props) {
        super(props);
        this.user = JSON.parse(localStorage.getItem('user'));
         this.state = { 
            image: this.user.image,
            sex: this.user.sex || 'male',
            firstName: this.user.firstName || '',
            lastName: this.user.lastName || '',
            bio: this.user.bio || '',
            email: this.user.eMail || ''
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        axios.put('https://localhost:44322/api/users/' + this.user.id, {
                ...this.user,
                image: this.state.image,
            })
            .then(response => {
                this.user.image = this.state.image;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.props.updateUser();
            });
    }
 
    render() {
        return (
            <div className="d-flex flex-column m-4 w-100">
                <div className="d-flex flex-grow-1 text-center">
                    <div className="d-flex flex-column m-3 w-50 align-items-center">
                        <div className="header">
                            <div>
                                <b>{this.user.firstName} {this.user.lastName}</b>
                            </div>
                            <div>
                                {this.user.eMail}
                            </div>
                            <div>
                                {this.user.sex} {this.user.state && this.user.birthdate && '|'} {this.user.birthdate}
                            </div>
                        </div>
                        {this.state.image ? 
                            <img className="rounded-circle mt-2" src={this.state.image} alt={defaultImage} width="300" height="300"/> : 
                            <img className="rounded-circle mt-2" src={defaultImage} alt="" width="300" height="300"/>}
                        <div className="buttons">
                            <ImageUploader
                                fileContainerStyle={{'padding': '0px', 'margin': '0px', 'boxShadow': 'none'}}
                                withIcon={false}
                                buttonText='Choose image'
                                onChange={(image) => this.onDrop(image)}
                                withLabel={false}
                                imgExtension={['.jpg', '.jpeg', '.png']}
                                maxFileSize={5242880}
                                singleImage={true}
                            />
                            <div onClick={() => this.saveImage()} className="save-file-button">Save image</div>
                        </div>
                    </div>
                    <div className="form flex-grow-1 m-3" style={{borderLeft: '1px solid black'}}>
                        <Form className="m-auto w-50">
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input
                                    autoFocus
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={e => this.setState({ firstName: e.target.value})}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input
                                    value={this.state.lastName}
                                    onChange={e => this.setState({ lastName: e.target.value})}
                                    type="text"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value})}
                                    type="email"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Biography</Label>
                                <Input
                                    value={this.state.bio}
                                    onChange={e => this.setState({ bio: e.target.value})}
                                    type="textarea"
                                />
                            </FormGroup>

                            <FormGroup>
                                <div>Sex</div>
                                <div className="radio d-inline">
                                <label>
                                    <input type="radio" value="Male" checked={this.state.sex === 'Male'} 
                                        onChange={this.handleOptionChange}  />
                                    Male
                                </label>
                                </div>
                                <div className="radio d-inline ml-2">
                                <label>
                                <input type="radio" value="Female" checked={this.state.sex === 'Female'} 
                                        onChange={this.handleOptionChange}  />
                                    Female
                                </label>
                                </div>
                            </FormGroup>

                            <div className="save-file-button" onClick={() => this.handleSubmit()}>
                                Save
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    handleOptionChange(changeEvent) {
        this.setState({
            sex: changeEvent.target.value
       });
    }

    handleSubmit() {
        axios.put('https://localhost:44322/api/users/' + this.user.id, {
            ...this.user,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            bio: this.state.bio,
            eMail: this.state.email,
            sex: this.state.sex
        })
        .then(response => {
            this.user.firstName = this.state.firstName;
            this.user.lastName = this.state.lastName;
            this.user.bio = this.state.bio;
            this.user.eMail = this.state.email;
            this.user.sex = this.state.sex;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.setState({});
        });
    }
    
}

export default Profile;