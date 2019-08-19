import React from "react";


class Home extends React.Component {
    fetchUsers = async () => {
        const api_call = await fetch('http://localhost/appzacuvanjebiljeski/controller/Controller.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rt: 'users'
            })
        });
        const data = await api_call.json();
        console.log(data);
    }
    
    render() {
        this.fetchUsers();
        return (
            <div>Home component</div>
        );
    }
}

export default Home;