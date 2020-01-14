import React from "react";
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Boards extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        board: null,
        myBoards: [],
        user: JSON.parse(localStorage.getItem('user'))
    };
}


componentDidMount() {
    axios.get('https://localhost:44322/api/boards/getBoardsOfUser/' + this.state.user.id)
    .then(response => {
        this.setState(prevState => ({
            ...prevState,
            myBoards: response.data
        }));
    });
}

render() {
    return this.state.board ? 
        ( <Redirect to={{
            pathname: '/board',
            state: { board: this.state.board}
        }}/> 
        ) :
        (
            <Container fluid className="mt-4">
                <Row><h3 className="ml-3">Personal Boards</h3></Row>
                <Row xs="4" className="mt-2">
                    {this.state.myBoards.map(board => (
                        <Col key={board.id}>
                            <Card>
                                <CardImg top src={board.imageUrl} alt="Card image cap" width="100%" height="200px"/>
                                <CardBody>
                                    <CardTitle>{board.name}</CardTitle>
                                    <CardText style={{height: "40px"}}>{board.description}</CardText>
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

export default Boards;