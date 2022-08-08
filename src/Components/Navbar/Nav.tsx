import { Col, Container, Modal, Navbar, Row } from "react-bootstrap";
import logo from "../../Assets/logo.png";
import deliveryTruck from "../../Assets/delivery-truck.png";
import "./Nav.css";
import { useState } from "react";
import { items } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as NegativeSign } from "../../Assets/negative-sign.svg";
import { ReactComponent as PositiveSign } from "../../Assets/positive-sign.svg";
import { ReactComponent as BinSign } from "../../Assets/bin-sign.svg";
import { addToTotal } from "../../state/totalSlice";
import { Link } from "react-router-dom";
import {
  addToCart, removeFromCart, deleteFromCart
} from "../../state/cartSlice";

import type { RootState } from '../../store/store'

import {
  addQuantity,
  subtractQuantity,
  removeQuantity
} from "../../state/menuSlice";

function Nav() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.cart.cart);
  const total = useSelector((state: RootState) => state.total.total);

  function orderMaker(type: string, product: items) {
    if (type === "add") {
      dispatch(addToCart(product));
      dispatch(addQuantity(product.id));
      dispatch(addToTotal(product.price));
    } else if (type === "remove") {
      dispatch(removeFromCart(product));
      dispatch(subtractQuantity(product.id));
      dispatch(addToTotal(-product.price));
    } else {
      dispatch(deleteFromCart(product));
      dispatch(addToTotal(-product.price * product.orderQty));
      dispatch(removeQuantity(product.id));
    }
  }

  return (
    <Navbar fixed="top" className="navbar-style">
      <Container>
        <Navbar.Brand href="/">
          <Navbar.Text className="logo-text">OBSD</Navbar.Text>
          <img
            src={logo}
            width="30"
            className="d-inline-block align-top logo"
            alt="Restaurant logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end nav-menu">
          <Navbar.Text className="mx-1">
            <a href="#menu">Menu</a>
          </Navbar.Text>
          <Navbar.Text className="mx-1">
            <a href="#most-popular">Most Popular</a>
          </Navbar.Text>
          <div className="notification">
            <div
              className="notification-lamp"
              style={{ display: orders.length > 0 ? "block" : "none" }}
            ></div>
            <img
              src={deliveryTruck}
              className="d-inline-block align-top delivery-truck-icon mx-1"
              alt="delivery bike Icon"
              onClick={() => setShow(true)}
            />
          </div>
        </Navbar.Collapse>
      </Container>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        fullscreen={'md-down'}
      >
       <Modal.Header closeButton>
    </Modal.Header>
        <Modal.Body>
          <div className="cart-body">
            {orders.map((order) => {
              return (
                <Row key={Math.random()}>
                  <Col className="text-center" xs={12} md={6}>
                    <img className="nav-item-img" src={order.url} alt={order.itemName}/>
                  </Col>
                  <Col xs={12} md={6} className="text-center">
                    <p>{order.itemName}</p>
                    <p>
                      Qty: {order.orderQty}
                      <NegativeSign
                        className="cart-icon"
                        onClick={() =>
                          orderMaker("remove", order)
                        }
                      />
                      <PositiveSign
                        className="cart-icon"
                        onClick={() =>
                          orderMaker("add", order)
                        }
                      />
                    </p>
                  </Col>
                    <p className="text-md-end text-center">
                      Total: LE {order.price * order.orderQty}{" "}
                      <BinSign
                        className="bin-icon"
                        onClick={() =>
                          orderMaker("delete", order)
                        }
                      />
                    </p>
                </Row>
              );
            })}
          </div>
          <hr />
          <p>Subtotal: LE {total.toLocaleString()}</p>
          <Link to="/checkout">
            <button className="cart-button" onClick={() => setShow(false)}>
              CHECKOUT
            </button>
          </Link>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default Nav;