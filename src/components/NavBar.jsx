import React from 'react'
import {Navbar, Nav, Container, Image,} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../style/NavBar.css'
import { RiBriefcaseLine } from "react-icons/ri";
import { MdMessage } from "react-icons/md";
import {IoMdNotificationsOutline} from "react-icons/io";
import { BsGrid3X3GapFill } from "react-icons/bs";
import {AiOutlineHome, AiOutlinePlaySquare, AiOutlineTeam} from "react-icons/ai";




class NavBar extends React.Component {

    state= {
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

    render(){
        return(
            <Navbar
        className="navbar mt-0 fixed-top "
        style={{ height: "55px" }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Linkedin_icon.svg/1200px-Linkedin_icon.svg.png"
                className="linked"
              />
            </Link>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Link className="nav-link navIcon" to="/">
                <AiOutlineHome style={{ fontSize: "20px", color:'rgba(0, 0, 0, 0.9)' }} />
              <div style={{ fontSize: "13px", color:'rgba(0, 0, 0, 0.9)' }}>Home</div>
            </Link>
            <Nav.Link className="navIcon nav-link" to="/myNetwork">
              <AiOutlineTeam style={{ fontSize: "20px", color:'rgba(0, 0, 0, 0.9)' }} />
              <div style={{ fontSize: "13px", color:'rgba(0, 0, 0, 0.9)' }}>My Network</div>
            </Nav.Link>
            <Nav.Link className="navIcon">
              <RiBriefcaseLine style={{ fontSize: "20px", color:'rgba(0, 0, 0, 0.9)' }} />
              <div style={{ fontSize: "13px", color:'rgba(0, 0, 0, 0.9)' }}> Jobs</div>
            </Nav.Link>
            <Nav.Link className="navIcon">
              <MdMessage style={{ fontSize: "20px", color:'rgba(0, 0, 0, 0.9)' }} />
              <div style={{ fontSize: "13px", color:'rgba(0, 0, 0, 0.9)' }}> Messaging</div>
            </Nav.Link>
            <Nav.Link className="navIcon">
              <IoMdNotificationsOutline style={{ fontSize: "20px", color:'rgba(0, 0, 0, 0.9)' }} />
              <div style={{ fontSize: "13px", color:'rgba(0, 0, 0, 0.9)' }}> Notifications</div>
            </Nav.Link>
            <Link className="nav-link" to="/me">
              <Image
                src={this.state.user.image}
                style={{ width: "20px" }}
                alt={`${this.state.user.name}'s image`}
                roundedCircle
              />
              <div style={{ fontSize: "13px", color:'rgba(0, 0, 0, 0.9)' }}>
                Me
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-supported-dps="16x16"
                  fill="currentColor"
                  width="16"
                  height="16"
                  focusable="false"
                >
                  <path d="M8.8 10.66L14 5.12a.07.07 0 00-.07-.12H2.07a.07.07 0 00-.07.12l5.2 5.54a1.1 1.1 0 001.6 0z"></path>
                </svg>
              </div>
            </Link>
            <Nav.Link
              style={{ borderRight: "1px grey solid", height: "57px" }}
            ></Nav.Link>
            <Nav.Link className="navIcon" href="#work">
              <BsGrid3X3GapFill style={{ fontSize: "20px", color:'rgba(0, 0, 0, 0.9)' }} />

              <div style={{ fontSize: "13px", color:'rgba(0, 0, 0, 0.9)' }}>
                Work
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-supported-dps="16x16"
                  fill="currentColor"
                  width="16"
                  height="16"
                  focusable="false"
                >
                  <path d="M8.8 10.66L14 5.12a.07.07 0 00-.07-.12H2.07a.07.07 0 00-.07.12l5.2 5.54a1.1 1.1 0 001.6 0z"></path>
                </svg>
              </div>
            </Nav.Link>
            <Nav.Link className="navIcon" href="#learning">
              <AiOutlinePlaySquare style={{ fontSize: "20px", color:'rgba(0, 0, 0, 0.9)' }} />
              <div style={{ fontSize: "13px", color:'rgba(0, 0, 0, 0.9)' }}>Learning</div>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        )
    }
}
export default NavBar;