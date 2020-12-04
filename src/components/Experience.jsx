import React from 'react'
import {Row, Col, Modal, Image, Form, Button} from 'react-bootstrap'
import {RiPencilLine} from 'react-icons/ri'

class Experience extends React.Component {

    state={
        showEditModal: false,
        exp:[],
        showDeleteModal: false,
        showExpPicture: false,
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
        this.props.fetchExperience()
    }    
    }

    render(){
        console.log("User ID",this.props.data.image)
        return(
            <>
                <Row>
                    <Col className='col-2'>
                        {this.props.data.image ? <Image style={{width: '100%', cursor: 'pointer'}} onClick={() => this.setState({ showExpPicture: true })} src={this.props.data.image} />: <Image style={{width: '100%', cursor: 'pointer'}} src='https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg' onClick={() => this.setState({ showExpPicture: true })} />}
                    </Col>
                    <Col className='col-9 experienceInfo'>
                        <p className='company'>{this.props.data.company}</p>
                        <p>{this.props.data.role}</p>
                        <p className='dateAndArea'>Start date: {this.props.data.startDate.slice(0,10)} End date: {this.props.data.endDate ? <>{this.props.data.endDate.slice(0,10)}</>:<>Current position!</>}</p>
                        <p className='dateAndArea'>{this.props.data.description}</p>
                        <p>{this.props.data.area}</p>
                    </Col>
                    <Col className='col-1'>
                        {this.state.user._id === this.props.userID ? <RiPencilLine onClick={this.singleExperience}/>:<></>}
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
                    <Button variant="danger" onClick={() => this.setState({ showDeleteModal: true, showEditModal:false})}>
                        Delete
                    </Button>
                    <Button variant="success" onClick={this.editExperience}>
                        Edit Experience
                    </Button>
                </div>
                </Modal.Footer>
            </Modal>
            <Modal size="sm" backdrop="static" show={this.state.showDeleteModal} onHide={() => this.setState({ showDeleteModal: false, showEditModal: true})} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete experience</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to permanently remove this experience from FlinkedIn?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({ showDeleteModal: false, showEditModal: true})}>Close</Button>
                    <Button variant="danger" onClick={this.deleteExperience}>Delete</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={this.state.showExpPicture}
                onHide={() => this.setState({ showExpPicture: false })}
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
                            formData.append("experience", event.target.files[0]);
                            fetch( process.env.REACT_APP_BASE_URL + `/profile/${this.props.userID}/experiences/${this.props.data._id}/picture`,
                                {
                                method: "POST",
                                body: formData,
                                headers: {
                                    'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
                                }
                                }
                                ).then(()=> {console.log('new picture was uploaded!')
                                            this.setState({ showExpPicture: false })
                                            this.props.fetchExperience()})
                            }}                         
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
            </Modal>
            </>
        )
    }
}

export default Experience;