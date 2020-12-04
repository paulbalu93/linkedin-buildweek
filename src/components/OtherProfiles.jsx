import React, {Component} from 'react'
import {Container, Row, Col, Jumbotron,Button,Dropdown,DropdownButton, Image} from 'react-bootstrap'
import {IconContext} from 'react-icons'
import {FaCamera,FaEye} from 'react-icons/fa'
import '../style/ProfilePage.css'
import Experience from './Experience'
import NavBar from './NavBar'
import ContentLoader from "react-content-loader"

class OtherProfiles extends Component {
    state={
        user:[],
        experiences:[],
        show: false,
        newExperience: {
            role: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
            area: ""
        },
        isLoading: true,
        errMess: "",
        showPicture: false,
        showEditUser: false
    }

    componentDidMount=async()=>{
        let response= await fetch(process.env.REACT_APP_BASE_URL + `${window.location.pathname}`,{
            headers: new Headers({
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                'content-type': 'application/json'})
        })
        let user=await response.json()
        this.setState({user})
        this.fetchExperience()
     }

    fetchExperience = async() =>{
        
        let response= await fetch(process.env.REACT_APP_BASE_URL + `/profile/${this.state.user._id}/experiences`,{
            headers: new Headers({
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                'content-type': 'application/json'})
        })
        let experiences=await response.json()
        this.setState({experiences, isLoading: false})
     }


render(){
    return(
        <>
            <NavBar />
            {this.state.isLoading ? <Container className='d-flex justify-content-center' style={{marginTop: '65px'}}>
                                        <ContentLoader
                                                speed={1}
                                                width={1110}
                                                height={500}
                                                viewBox="0 0 1110 500"
                                                backgroundColor="#f6f4f4"
                                                foregroundColor="#0073b1"
                                            >
                                                <rect x="0" y="0" rx="0" ry="0" width="825" height="300" />
                                                <rect x="840" y="0" rx="0" ry="0" width="250" height="80" />
                                                <circle cx="129" cy="296" r="70" />
                                                <rect x="50" y="390" rx="0" ry="0" width="725" height="20" />
                                                <rect x="100" y="430" rx="0" ry="0" width="625" height="20" />
                                        </ContentLoader>
                                    </Container> 
                                    :
                <>
                <Container className='my-5 pt-3'>
                  <Row>
                    <Col className="col-9">
                        <Jumbotron>
                            <div className='bgImage'>
                            <img src="https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg" alt=""/>
                            <IconContext.Provider value={{className : "jumbotronCamera"}}>
                                <div><FaCamera/></div>
                            </IconContext.Provider>
                            </div>
                            <div id='profileSection'>
                            <div>
                                <Image className='userImage' src={this.state.user.image} alt={this.state.user.name + 'image'} roundedCircle/>
                            </div>
                            <div id='profileButtons'>
                                <DropdownButton id="dropdown-basic-button" title="Add profile section">
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                                <Button variant="outline-info">More..</Button>
                                <IconContext.Provider value={{className : "editIcon"}}>
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
                  <Row>
                      <Col className='col-9'>
                        <div className='experiences'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h3 className='mb-3'>Experiences</h3>
                            </div>
                            {this.state.experiences.map((e) => {
                                return(
                                    <>
                                    <Experience data={e} userID={this.state.user._id} fetchExperience={this.fetchExperience} />
                                    {this.state.experiences.length > 1 ? <hr/> : <></>}
                                    </>
                                )
                            })}
                        </div>
                      </Col>
                  </Row>
                </Container>
            </>}
        </>
    )
}
}

export default OtherProfiles;