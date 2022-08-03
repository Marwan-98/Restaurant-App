import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import check from "../../Assets/checked.png";
import { useNavigate } from "react-router-dom";
import "./Success.css";

function Success() {
    const navigate = useNavigate();
  setTimeout(() => {
      navigate("/");
  }, 3000)
  return (
    <div className="success-page d-flex justify-content-center align-items-center text-center">
      <Container>
        <Row>
          <Col>
            <img src={check} id="check-img" />
            <h2>Order Placed</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Success;
