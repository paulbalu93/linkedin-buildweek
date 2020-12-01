import React from 'react'
import {Row, Col, Modal, Image, Form, Button} from 'react-bootstrap'
import {RiPencilLine} from 'react-icons/ri'

class Experience extends React.Component {

    state={
        showEditModal: false,
        exp:[],
        showDeleteModal: false
    }

    singleExperience = async() => {
        let response= await fetch(process.env.REACT_APP_BASE_URL + `/profile/${this.props.userID}/experiences/${this.props.data._id}`,{
            headers: new Headers({
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                'content-type': 'application/json'})
            })
            let exp=await response.json()
            this.setState({exp})
            this.setState({ showEditModal: true })
    }

    updateExperienceField = input => {
        let exp = {...this.state.exp};
        let currentId = input.currentTarget.id;
        exp[currentId] = input.currentTarget.value;

    
        this.setState({ exp });
      };

    editExperience = async e => {
        e.preventDefault();
    
        try {
          let response = await fetch(process.env.REACT_APP_BASE_URL + `/profile/${this.props.userID}/experiences/${this.props.data._id}`, {
            method: "PUT",
            body: JSON.stringify(this.state.exp),
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
          });
          if (response.ok) {
            this.setState({
                showEditModal: false,
              exp: {
                role: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
                area: ""
                }
            });
            this.props.fetchExperience()
          } else {
            let json = await response.json();
            console.log(json)
          }
        } catch (err) {
          console.log(err);
        }
      };

    deleteExperience = async() => {
        let response= await fetch(process.env.REACT_APP_BASE_URL + `/profile/${this.props.userID}/experiences/${this.props.data._id}`,{
        method:'DELETE',
        // body: JSON.stringify(this.state.student),
        headers: new Headers({
            'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            'content-type': 'application/json'})
    }
   
    )
    if(response.ok){
        this.setState({showEditModal: false, showDeleteModal: false})
        this.props.ifUpdated();
    }    
    }

    render(){
        console.log("User ID",this.props.userID)
        return(
            <>
                <Row>
                    <Col className='col-2'>
                        <Image src={this.props.data.image} />
                    </Col>
                    <Col className='col-9 experienceInfo'>
                        <p className='company'>{this.props.data.company}</p>
                        <p>{this.props.data.role}</p>
                        <p className='dateAndArea'>{this.props.data.startDate} - {this.props.data.endDate}</p>
                        <p className='dateAndArea'>{this.props.data.description}</p>
                        <p>{this.props.data.area}</p>
                    </Col>
                    <Col className='col-1'>
                        <RiPencilLine onClick={this.singleExperience}/>
                    </Col>
                </Row>
                <Modal show={this.state.showEditModal} onHide={() => this.setState({ showEditModal: false,exp: {
                                                                                                        role: "",
                                                                                                        company: "",
                                                                                                        startDate: "",
                                                                                                        endDate: "",
                                                                                                        description: "",
                                                                                                        area: ""
                                                                                                    } })}>
                <Modal.Header closeButton>
                <Modal.Title>New Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="role">Role</Form.Label>
                            <Form.Control type="text" id="role" placeholder="Enter your role" value={this.state.exp.role} onChange={this.updateExperienceField} required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="company">Company</Form.Label>
                            <Form.Control type="text" id="company" placeholder="Company" value={this.state.exp.company} onChange={this.updateExperienceField} required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="startDate">Stert date</Form.Label>
                            <Form.Control type="date" id="startDate" placeholder="Enter your role" value={this.state.exp.startDate} onChange={this.updateExperienceField} required/>
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label htmlFor="endDate">End date</Form.Label>
                            <Form.Control type="date" id="endDate" placeholder="Company" value={this.state.exp.endDate} onChange={this.updateExperienceField}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control as="textarea" id="description" rows={3} placeholder="Describe your job" value={this.state.exp.description} onChange={this.updateExperienceField} required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label htmlFor="area">Area</Form.Label>
                            <Form.Control type="text" id="area" placeholder="Area" value={this.state.exp.area} onChange={this.updateExperienceField} required/>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <div className="w-100 d-flex justify-content-between">
                    <Button variant="danger" onClick={() => this.setState({ showDeleteModal: true})}>
                        Delete
                    </Button>
                    <Button variant="success" onClick={this.editExperience}>
                        Edit Experience
                    </Button>
                </div>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.showDeleteModal} onHide={() => this.setState({ showDeleteModal: false})} >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({ showDeleteModal: false})}>Close</Button>
                    <Button variant="danger" onClick={this.deleteExperience}>Delete</Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}

export default Experience;