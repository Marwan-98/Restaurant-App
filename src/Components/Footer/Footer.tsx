import { Row, Col, Container } from "react-bootstrap";
import logo from "../../Assets/logo.png";
import "./Footer.css";

function Footer() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="text-center">
            <span className="footer-text">OBSD</span>
            <img
              src={logo}
              width="30"
              className="d-inline-block align-center logo"
              alt="Restaurant logo"
            />
          </Col>
          <Col className="text-start">
            <p>&copy; 2022 OBSD - All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
