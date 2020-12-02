import React from 'react'
import {Row, Col, Image, Modal, Form, Button} from 'react-bootstrap'
import {RiPencilLine} from 'react-icons/ri'
import {BiWorld} from 'react-icons/bi'
import {IoMdArrowDropdown, IoMdDocument} from 'react-icons/io'
import {ImVideoCamera, ImImage} from 'react-icons/im'

class Feed extends React.Component{
    state={
        showModal: false,
        showDeleteModal: false,
        post:[]
    }

    singlePost = async() => {
        let response= await fetch(process.env.REACT_APP_BASE_URL + `/posts/${this.props.feed._id}`,{
            headers: new Headers({
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                'content-type': 'application/json'})
            })
            let post=await response.json()
            this.setState({post})
            this.setState({showModal:true})
    }

    editPost = async e => {
        e.preventDefault();
    
        try {
          let response = await fetch(process.env.REACT_APP_BASE_URL + `/posts/${this.props.feed._id}`, {
            method: "PUT",
            body: JSON.stringify(this.state.post),
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
          });
          if (response.ok) {
            this.setState({
                showModal: false,
              post: {
                text:''
                }
            });
            this.props.fetchPosts()
          } else {
            let json = await response.json();
            console.log(json)
          }
        } catch (err) {
          console.log(err);
        }
      };

      editPostsState = input => {
        let post = {...this.state.post};
        let currentId = input.currentTarget.id;
        post[currentId] = input.currentTarget.value;

    
        this.setState({ post });
      };

      deletePost = async() => {
        let response= await fetch(process.env.REACT_APP_BASE_URL + `/posts/${this.props.feed._id}`,{
        method:'DELETE',
        headers: new Headers({
            'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            'content-type': 'application/json'})
    }
   
    )
    if(response.ok){
        this.setState({showModal: false, showDeleteModal: false})
        this.props.fetchPosts()
    }    
    }

    render(){
        console.log("postID ",this.props.feed._id)
        return(
            <>
                <div className='singleFeed mb-2'>
                    <Row>
                        <Col className='col-2'>
                            <Image src={this.props.feed.user.image} style={{width: "80%"}} roundedCircle />
                        </Col>
                        <Col className='col-9 d-flex align-items-center'>
                            <h5>{this.props.feed.user.name} {this.props.feed.user.surname}</h5>
                        </Col>
                        {this.props.feed.user._id === this.props.userID ? 
                        <Col className='col-1'>
                            <RiPencilLine onClick={this.singlePost}/>
                        </Col>:<></>}
                    </Row>
                    <p>{this.props.feed.text}</p>
                </div>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a post</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row className='mb-2'>
                            <Col className='col-2'><Image className='userImageInModal' src={this.props.feed.user.image} roundedCircle/></Col>
                                <Col className='col-8'>
                                    <p style={{margin:0, fontSize:"16px", color: "#000000E6", fontWeight: "bold"}}>{this.props.feed.user.name} {this.props.feed.user.surname}</p>
                                    <Button variant='outline-secondary' className='postButton d-flex align-items-center'><BiWorld className='mr-1' />Anyone <IoMdArrowDropdown /></Button>
                                </Col>
                        </Row>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                <Form.Label htmlFor="text" style={{height: '2px'}}></Form.Label>
                                <Form.Control className='textArea' id='text' as="textarea" rows={3} placeholder='What do you want to talk about?' value={this.state.post.text} onChange={this.editPostsState} required/>
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
                            <div>
                                <Button className='createPostButton mr-1' variant="danger" onClick={() => this.setState({ showDeleteModal: true, showModal:false})}>Delete</Button>
                                <Button className='createPostButton' variant="primary" onClick={this.editPost}>Edit</Button>
                            </div>
                        </div>
                </Modal>
                <Modal size="sm" backdrop="static" show={this.state.showDeleteModal} onHide={() => this.setState({ showDeleteModal: false, showModal: true})} >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete post</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to permanently remove this post from FlinkedIn?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ showDeleteModal: false, showModal: true})}>Close</Button>
                        <Button variant="danger" onClick={this.deletePost}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default Feed;