import React from "react";
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import "./Login.css";
import { Link } from 'react-router-dom';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }
  
    handleSubmit(event) {
        event.preventDefault();
        axios.post('https://localhost:44322/api/users/authenticate', this.state)
            .then(res => {
                this.props.login(res.data);
            })
    }

    render() {
        return (
            <div className="Login">
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

                      <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                          Login
                      </Button>

                      <Link to="/register">
                          <Button className='mt-2' block bsSize="large">
                              Sign up
                          </Button>
                      </Link>

                </Form>
            </div>
        );
    }
}

export default Login;