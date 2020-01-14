import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
      }


    componentDidMount() {
        axios.get('https://localhost:44322/api/users')
        .then(response => {
            this.setState({
              users: response.data.map(item => ({
                  id: item.id,
                  name: item.firstName,
                  lastName: item.lastName,
                  eMail: item.eMail,
                  bio: item.bio,
                  image: item.image,
                  username: item.username,
              }))
            });
          });
    }

    render() {
        return (
            <ul>{this.state.users.map(user => <li key={user.id}>{user.name}</li>)}</ul>
        );
    }
}

export default Home;