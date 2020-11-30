import React, { Component } from 'react';
import {Container, Row, Col} from "react-bootstrap"

class Profile extends Component {
    state = {}
    render() {
        return (
            <div>
               <Container>
  <Row>
    <Col>{this.props.text}</Col>
  </Row>
</Container>
            </div>
        );
    }
}

export default Profile;