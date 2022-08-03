import { Container } from "react-bootstrap";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <Container>
        <h1>
          Enjoy Our <br />{" "}
          <span style={{ color: "#ff9200" }}>Delicious Food</span>
        </h1>
      </Container>
    </div>
  );
}

export default Header;
