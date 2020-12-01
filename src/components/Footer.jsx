import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import "../style/footer.css";
import { SiLinkedin } from "react-icons/si";

export default function Footer() {
  return (
    <div className="footer__container">
      <Container className="px-4">
        <Row>
          <SiLinkedin />
        </Row>
        <Row>
          <Col>
            <h5 className="mb-3">Audio and Subtitles</h5>
            <h5 className="mb-3">Media Center</h5>
            <h5 className="mb-3">Privacy</h5>
            <h5 className="mb-3">Contact Us</h5>
          </Col>
          <Col>
            <h5 className="mb-3">Audio Description</h5>
            <h5 className="mb-3">Investor Relations</h5>
            <h5 className="mb-3">Legal Notices</h5>
          </Col>
          <Col>
            <h5 className="mb-3">Help Center</h5>
            <h5 className="mb-3">Jobs</h5>
            <h5 className="mb-3">Cookie Preferences</h5>
          </Col>
          <Col>
            <h5 className="mb-3">Gift Cards</h5>
            <h5 className="mb-3">Terms of Use</h5>
            <h5 className="mb-3">Corporate Information</h5>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3 d-flex justify-content-left">
            <Button className="button">Service Code</Button>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            <h6>© 1997-2020 Netflix, Inc.</h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
