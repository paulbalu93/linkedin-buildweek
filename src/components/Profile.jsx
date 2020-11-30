import React, {Component} from 'react'
import {Container, Row, Col, Jumbotron,Button,Dropdown,DropdownButton, Image} from 'react-bootstrap'
import {IconContext} from 'react-icons'
import {FaCamera,FaEye} from 'react-icons/fa'
import {RiPencilLine} from 'react-icons/ri'
import '../style/ProfilePage.css'

class Profile extends Component {
    state={
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
    console.log(this.state.user)
    return(
        <Container className='mt-5 pt-3'>
          <Row>
            <Col className="col-10">
                <Jumbotron>
                    <div className='bgImage'>
                    <img src="https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg" alt=""/>
                    <IconContext.Provider value={{className : "jumbotronCamera"}}>
                        <div><FaCamera/></div>
                    </IconContext.Provider>
                    </div>
                    <div id='profileSection'>
                    <div style={{cursor: 'pointer'}}>
                        <img src={this.state.user.image} alt={this.state.user.name + 'image'}/>
                    </div>
                    <div id='profileButtons'>
                        <DropdownButton id="dropdown-basic-button" title="Add profile section">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="outline-info">More..</Button>
                        <IconContext.Provider value={{className : "editIcon"}}>
                        <div><RiPencilLine/></div>
                        </IconContext.Provider>
                    </div>
                    </div>
                    <div id='profileInfo'>
                    <div id='info' >
                        <div id='personalInfo'>
                            <p>{this.state.user.name + " " + this.state.user.surname}</p>
                            <p>{this.state.user.title}</p>
                            <p>{this.state.user.area}</p>
                        </div>
                        <p>{this.state.user.email}</p>
                    </div>
                    </div>
                    <div id='present'>
                    <div>
                        <p>Open to job opportunities</p>
                        <p>{this.state.user.bio}</p>
                        <p>See all details</p>
                    </div>
                    <IconContext.Provider value={{className : "editIcon"}}>
                        <div><RiPencilLine/></div>
                    </IconContext.Provider>
                    </div>
                    <div id='presentBelowSection'>
                    <IconContext.Provider  value={{className : "eyeIcon"}} >
                            <div><FaEye/></div>
                    </IconContext.Provider>
                    <p>All LinkedIn members</p>
                    </div>
                </Jumbotron>
            </Col>
          </Row>
        </Container>
    )
}
}

export default Profile;