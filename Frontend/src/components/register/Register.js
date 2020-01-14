import React from "react";
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import "./Register.css";
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            eMail: '',
            password: '',
            firstName: '',
            lastName: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm() {
        let isValid = true;
        Object.keys(this.state).forEach(key => {
            if (!this.state[key].length) {
                isValid = false;
            }
        });
        return isValid;
    }
  
    handleSubmit(event) {
        event.preventDefault();
        axios.post('https://localhost:44322/api/users/register', this.state)
        .then(res => {
            this.props.history.push('/login');
        })
    }



    render() {
        return (
            <div className="Register">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.username}
                            onChange={e => this.setState({ 'username': e.target.value})}
                        />
                    </FormGroup>

                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={e => this.setState({ 'password': e.target.value})}
                            type="password"
                        />
                    </FormGroup>

                    <FormGroup controlId="eMail" bsSize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                        autoFocus
                        type="email"
                        value={this.state.eMail}
                        onChange={e => this.setState({ 'eMail': e.target.value})}
                        />
                    </FormGroup>

                    <FormGroup controlId="firstName" bsSize="large">
                        <FormLabel>First Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.firstName}
                            onChange={e => this.setState({ 'firstName': e.target.value})}
                        />
                    </FormGroup>

                    <FormGroup controlId="lastName" bsSize="large">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.lastName}
                            onChange={e => this.setState({ 'lastName': e.target.value})}
                        />
                    </FormGroup>

                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                        Register
                    </Button>

                    <Button className='mt-2' block bsSize="large" onClick={() => this.props.history.push('/login')}>
                        Return to Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Register);