import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class MiniProfile extends Component {
  state = {
    user:[]
  }

  componentDidMount=async()=>{
    let response= await fetch(process.env.REACT_APP_BASE_URL + `/profile/me`,{
        headers: new Headers({
            'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            'content-type': 'application/json'})
    })
    let user=await response.json()
    this.setState({user})
 }

  render() {
    return (
      <div className="leftSidebarShadow">
        <div className="home back">
          <img
            className="img-fluid"
            src="https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg"
            alt=""
          />
        </div>
        <img
          className="img-fluid rounded-circle first"
          src={this.state.user.image}
        />
        <div className=" home p-2 text-center" style={{ borderBottom: "0px" }}>
          <p className="p1">Welcome, {this.props.name}</p>
          <a className="a1">Update your profile</a>
        </div>
        <div className="p-2  home" style={{ borderBottom: "0px" }}>
          <p className="p2">Who viewed your profile </p>
          <p className="p2">Connections </p>
          <p className="p3">Grow your Network</p>
        </div>
        <div className="p-2  home" style={{ borderBottom: "0px" }}>
          <p className="p3">See all premium features</p>
        </div>
        <div className="p-2 home">
          <p className="p3">Saved Items</p>
        </div>
      </div>
    );
  }
}

export default MiniProfile;
