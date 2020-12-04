import React, {Component} from 'react'
import {Container, Row, Col, Jumbotron,Button,Dropdown,DropdownButton, Image, Modal,Form} from 'react-bootstrap'
import {IconContext} from 'react-icons'
import {FaCamera,FaEye, FaQuestionCircle} from 'react-icons/fa'
import {RiPencilLine} from 'react-icons/ri'
import '../style/ProfilePage.css'
import Experience from './Experience'
import {HiOutlinePlus} from 'react-icons/hi'
import NavBar from './NavBar'
import Footer from './Footer'
import ContentLoader from "react-content-loader"

class Profile extends Component {
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
        let response= await fetch(process.env.REACT_APP_BASE_URL + `/profile/me`,{
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
        this.setState({experiences, isLoading:false})
     }

     updateNewExperienceField = input => {
        let newExperience = {...this.state.newExperience};
        let currentId = input.currentTarget.id;
        newExperience[currentId] = input.currentTarget.value;

    
        this.setState({ newExperience });
      };

      submitNewExperience = async e => {
        e.preventDefault();
    
        try {
          let response = await fetch(process.env.REACT_APP_BASE_URL + `/profile/${this.state.user._id}/experiences`, {
            method: "POST",
            body: JSON.stringify(this.state.newExperience),
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
          });
          if (response.ok) {
            this.fetchExperience();
            this.setState({
                show: false,
              newExperience: {
                role: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
                area: ""
                }
            });
          } else {
            let json = await response.json();
            console.log(json)
          }
        } catch (err) {
          console.log(err);
        }
      };

      updateUser = input => {
        let user = {...this.state.user};
        let currentId = input.currentTarget.id;
        user[currentId] = input.currentTarget.value;    
        this.setState({ user });
      };

      editUser = async e => {
        e.preventDefault();
    
        try {
          let response = await fetch(process.env.REACT_APP_BASE_URL + `/profile/`, {
            method: "PUT",
            body: JSON.stringify(this.state.user),
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
          });
          if (response.ok) {
            this.setState({
                showEditUser: false,
            });
            this.componentDidMount()
          } else {
            let json = await response.json();
            console.log(json)
          }
        } catch (err) {
          console.log(err);
        }
      };


render(){
    console.log("WINDOWS URL", window.location.pathname)
    return(
        <>
            <NavBar />
            {this.state.isLoading ? <Container className='d-flex justify-content-center' style={{marginTop: '20vh'}}>
                                        <ContentLoader
                                                speed={1}
                                                width={825}
                                                height={400}
                                                viewBox="0 0 825 400"
                                                backgroundColor="#f6f4f4"
                                                foregroundColor="#0073b1"
                                            >
                                                <rect x="3" y="4" rx="0" ry="0" width="825" height="200" />
                                                <circle cx="129" cy="196" r="70" />
                                                <rect x="50" y="290" rx="0" ry="0" width="725" height="20" />
                                                <rect x="100" y="330" rx="0" ry="0" width="625" height="20" />
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
                                <Image className='userImage' style={{cursor: 'pointer'}} src={this.state.user.image} alt={this.state.user.name + 'image'} onClick={() => this.setState({ showPicture: true })} roundedCircle/>
                            </div>
                            <div id='profileButtons'>
                                <DropdownButton id="dropdown-basic-button" title="Add profile section">
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                                <Button variant="outline-info">More..</Button>
                                <IconContext.Provider value={{className : "editIcon"}}>
                                <div><RiPencilLine onClick={()=> this.setState({showEditUser: true})}/></div>
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
                    <Col className='col-3 sideBar' style={{margin:0}}>
                    <div className='mb-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span>Edit public profile & URL</span><FaQuestionCircle />
                            </div>
                            <hr className='my-3'/>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span>Add profile in another language</span><FaQuestionCircle />
                            </div>
                        </div>
                    </Col>
                  </Row>
                  <Row>
                      <Col className='col-9'>
                        <div className='experiences'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h3 className='mb-3'>Experiences</h3>
                                <HiOutlinePlus onClick={()=> {this.setState({show: true})}}/>
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
                  <Footer />
                </Container>
            </>}
            <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                <Modal.Header closeButton>
                <Modal.Title>New Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="role">Role</Form.Label>
                            <Form.Control type="text" id="role" placeholder="Enter your role" value={this.state.newExperience.role} onChange={this.updateNewExperienceField} required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="company">Company</Form.Label>
                            <Form.Control type="text" id="company" placeholder="Company" value={this.state.newExperience.company} onChange={this.updateNewExperienceField}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="startDate">Stert date</Form.Label>
                            <Form.Control type="date" id="startDate" placeholder="Enter your role" value={this.state.newExperience.startDate} onChange={this.updateNewExperienceField} />
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label htmlFor="endDate">End date</Form.Label>
                            <Form.Control type="date" id="endDate" placeholder="Company" value={this.state.newExperience.endDate} onChange={this.updateNewExperienceField}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control as="textarea" id="description" rows={3} placeholder="Describe your job" value={this.state.newExperience.description} onChange={this.updateNewExperienceField} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="area">Area</Form.Label>
                            <Form.Control type="text" id="area" placeholder="Area" value={this.state.newExperience.area} onChange={this.updateNewExperienceField} />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({ show: false, newExperience: {
                                                                                                        role: "",
                                                                                                        company: "",
                                                                                                        startDate: "",
                                                                                                        endDate: "",
                                                                                                        description: "",
                                                                                                        area: ""
                                                                                                    }  })}>
                    Close
                </Button>
                <Button variant="success" onClick={this.submitNewExperience}>
                    Add Experience
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={this.state.showPicture}
                onHide={() => this.setState({ showPicture: false })}
                >
                <Modal.Header closeButton>
                <Modal.Title>Edit picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group>
                    <Form.File
                        label="Example file input"
                        onChange={
                        (event) => {
                            const formData = new FormData();
                            formData.append("profile", event.target.files[0]);
                            fetch( process.env.REACT_APP_BASE_URL + `/profile/${this.state.user._id}/picture`,
                                {
                                method: "POST",
                                body: formData,
                                headers: {
                                    'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
                                }
                                }
                                ).then(() => {this.setState({ showPicture: false })
                                            this.componentDidMount()})
                            }}                         
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
            </Modal>
            <Modal show={this.state.showEditUser}
                onHide={() => this.setState({ showEditUser: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control type="text" id="name" placeholder="Enter your name" value={this.state.user.name} onChange={this.updateUser} required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="surname">Surname</Form.Label>
                            <Form.Control type="text" id="surname" placeholder="Enter your surname" value={this.state.user.surname} onChange={this.updateUser} required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control type="text" id="email" placeholder="Enter your email" value={this.state.user.email} onChange={this.updateUser} required/>
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label htmlFor="bio">Bio</Form.Label>
                            <Form.Control as="textarea" id="bio" rows={3} placeholder="Enter your bio" value={this.state.user.bio} onChange={this.updateUser} required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control tyoe="text" id="title" placeholder="Enter your title" value={this.state.user.title} onChange={this.updateUser} required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="area">Area</Form.Label>
                            <Form.Control type="text" id="area" placeholder="Where do you live" value={this.state.user.area} onChange={this.updateUser} required/>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({ showEditUser: false })}>Close</Button>
                    <Button variant="primary" onClick={this.editUser}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
}

export default Profile;