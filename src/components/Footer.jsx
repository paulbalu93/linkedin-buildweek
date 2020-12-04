import React from "react";
import {
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";

import { FaRegQuestionCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

class Footer extends React.Component {
render(){

    return (
      <Container>
        <hr></hr>
        <Row className="ml-0">
          <Image
            style={{ width: "40px", margin: "20px 0px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Linkedin_icon.svg/1200px-Linkedin_icon.svg.png"
          />
        </Row>
        <Row className="ml-0">
          <Col md={2} className="footerA">
              <Row>
                <a href="#" className="footerA">
                  About
                </a>
              </Row>
              <Row>
                <a href="#" className="footerA">
                    Community Guidlines
                </a>
              </Row>
              <Row>
                <a href="#" className="footerA">
                    Privacy & Terms
                </a>
              </Row>
              <Row>
                <a href="#" className="footerA">
                    Sales Solutions"
                </a>
              </Row>
              <Row>
                <a href="#" className="footerA">
                    Safety Center
                </a>
              </Row>
          </Col>
  
          <Col md={2} className="footerA">
              <Row>
                <a href="#" className="footerA">
                    Accessibility
                </a>
              </Row>
              <Row>
                <a href="#" className="footerA">
                    Careers
                </a>
              </Row>
              <Row>
                <a href="#" className="footerA">
                    Ad Choices
                </a>
              </Row>
              <Row>
                <a href="#" className="footerA">
                    Mobile
                </a>
              </Row>
          </Col>
  
          <Col md={2} className="footerA">
              <Row>
                <a href="#" className="footerA">
                    Talent Solutions
                </a>
              </Row>
              <Row>
                <a href="#" className="footerA">
                    Marketing Solutions
                </a>
              </Row>
              <Row>
                <a href="#" className="footerA">
                    Advertising
                </a>
              </Row>
              <Row>
                <a href="#" className="footerA">
                    Small Buisness
                </a>
              </Row>
          </Col>
  
          <Col md={3}>
            <div>
              <h6 className="mb-0">
                <FaRegQuestionCircle className="footerItems" />
                <a href="#"> Questions</a>
              </h6>
              <p className="footerA">Visit our Help Center.</p>
            </div>
  
            <div className="footerA">
              <h6 className="mb-0">
                <FiSettings className="footerItems" />
                <a href="#" className="ml-2">
                  Manage your account and privacy
                </a>
              </h6>
              <p className='footerText'>Go to your Settings.</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
}
}

export default Footer;
