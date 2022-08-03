import { Row, Col, Container } from "react-bootstrap";
import logo from "../../Assets/logo.png";
import "./Footer.css";

function Footer() {
  return (
    <div>
      <Container>
        <Row className="p-1 d-flex align-items-center">
          <Col className="text-center" xs={12} md={6}>
            <span className="footer-text">OBSD</span>
            <img
              src={logo}
              width="30"
              className="d-inline-block logo"
              alt="Restaurant logo"
            />
          </Col>
          <Col className="text-center" xs={12} md={6}>
            <span>&copy; 2022 OBSD - All Rights Reserved.</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
