import React from 'react'
import {Container, Row, Col, Button, Modal, Image, Form} from 'react-bootstrap'
import '../style/Newsfeed.css'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import {ImVideoCamera, ImCalendar, ImImage, ImFileText} from 'react-icons/im'
import {BiWorld} from 'react-icons/bi'
import {IoMdArrowDropdown, IoMdDocument} from 'react-icons/io'
import Feed from './Feed'

class Newsfeed extends React.Component {
    state={
        isLoading: true,
        user:[],
        showModal: false,
        newPost:{
            text:""
        },
        posts: []
    }

    componentDidMount=async()=>{
        let response= await fetch(process.env.REACT_APP_BASE_URL + `/profile/me`,{
            headers: new Headers({
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                'content-type': 'application/json'})
        })
        let user=await response.json()
        this.setState({user})
        this.fetchPosts();
     }

     updateNewPostField = input => {
        let newPost = {...this.state.newPost};
        let currentId = input.currentTarget.id;
        newPost[currentId] = input.currentTarget.value;

    
        this.setState({ newPost });
      };

      fetchPosts = async() =>{
        let response= await fetch(process.env.REACT_APP_BASE_URL+"/posts",{
            headers: new Headers({
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                'content-type': 'application/json'})
        })
        let allposts=await response.json();
        let posts = allposts.reverse();
        this.setState({posts})
     }

     submitNewPost = async e => {
        e.preventDefault();
    
        try {
          let response = await fetch(process.env.REACT_APP_BASE_URL+"/posts", {
            method: "POST",
            body: JSON.stringify(this.state.newPost),
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
          });
          if (response.ok) {
            this.fetchPosts();
            this.setState({
                showModal: false,
              newPost: {
                text: ''
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


    render(){
        return(
            <>
                <Container className='my-3'>
                    <Row>
                        <Col className='offset-2 col-7'>
                                <div className='postFeed'>
                                    <div className='buttonsDiv'>
                                        <Button className='w-100 newPostButton d-flex justify-content-flex-start align-items-center' variant="outline-secondary" onClick={() => this.setState({showModal:true})}>
                                        <HiOutlinePencilAlt className='mr-1 newPostPencil'/>Start a post</Button>
                                    </div>
                                    <div className='d-flex justify-content-around mt-1'>
                                        <div className='py-3 px-2 mb-1 symbols d-flex align-items-center'><ImImage className='mr-1 symbolImage'/> Photo</div>
                                        <div className='py-3 px-2 mb-1 symbols d-flex align-items-center'><ImVideoCamera className='mr-1 symbolCamera' /> Video</div>
                                        <div className='py-3 px-2 mb-1 symbols d-flex align-items-center'><ImCalendar className='mr-1 symbolCalendar' /> Event</div>
                                        <div className='py-3 px-2 mb-1 symbols d-flex align-items-center'><ImFileText className='mr-1 symbolArticke' /> Write article</div>
                                    </div>
    
                                </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='offset-2 col-7'>
                            {this.state.posts.map((e)=>{
                                return(
                                    <Feed feed={e} userID={this.state.user._id} key={e._id} fetchPosts={this.fetchPosts}/>
                                )
                            })}
                        </Col>
                    </Row>
                
                </Container>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a post</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row className='mb-2'>
                            <Col className='col-2'><Image className='userImageInModal' src={this.state.user.image} roundedCircle/></Col>
                                <Col className='col-8'>
                                    <p style={{margin:0, fontSize:"16px", color: "#000000E6", fontWeight: "bold"}}>{this.state.user.name} {this.state.user.surname}</p>
                                    <Button variant='outline-secondary' className='postButton d-flex align-items-center'><BiWorld className='mr-1' />Anyone <IoMdArrowDropdown /></Button>
                                </Col>
                        </Row>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                <Form.Label htmlFor="text" style={{height: '2px'}}></Form.Label>
                                <Form.Control className='textArea' id='text' as="textarea" rows={3} placeholder='What do you want to talk about?' value={this.state.newPost.text} onChange={this.updateNewPostField} required/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                        <div className='d-flex justify-content-between align-items-center' style={{padding: "12px 24px 12px 16px"}}>
                            <div className='d-flex'>
                                <Button className='d-flex justify-content-center align-items-center iconsInModal' style={{width:'40px', height: '40px'}}><ImImage style={{color:"rgba(0, 0, 0, 0.6)", fontSize: "20px"}}/></Button>
                                <Button className='d-flex justify-content-center align-items-center iconsInModal' style={{width:'40px', height: '40px'}}><ImVideoCamera style={{color:"rgba(0, 0, 0, 0.6)", fontSize: "20px"}}/></Button>
                                <Button className='d-flex justify-content-center align-items-center iconsInModal' style={{width:'40px', height: '40px'}}><IoMdDocument style={{color:"rgba(0, 0, 0, 0.6)", fontSize: "20px"}}/></Button>
                            </div>
                            <Button className='createPostButton' variant="primary" onClick={this.submitNewPost}>Post</Button>
                        </div>
                </Modal>
            </>
        )
    }
}

export default Newsfeed;