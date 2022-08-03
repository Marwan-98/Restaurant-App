import { Col, Container, Modal, Navbar, Row } from "react-bootstrap";
import logo from "../../Assets/logo.png";
import deliveryTruck from "../../Assets/delivery-truck.png";
import "./Nav.css";
import { useState } from "react";
import { items, order } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as NegativeSign } from "../../Assets/negative-sign.svg";
import { ReactComponent as PositiveSign } from "../../Assets/positive-sign.svg";
import { ReactComponent as BinSign } from "../../Assets/bin-sign.svg";
import { cart } from "../../actions/cart.action";
import { Link } from "react-router-dom";
import {
  addOrderItem,
  deleteOrderItem,
  removeOrderItem,
} from "../../actions/order.action";
import { removeQuantity } from "../../actions/products.action";

import {
  addQuantity,
  subtractQuantity,
} from "../../actions/products.action";


import pizza from "../../Assets/Pizza.png";
import burger from "../../Assets/Burger.png";
import crepe from "../../Assets/Crepe.png";
import drink from "../../Assets/Drink.png";

import * as Yup from "yup";


function Nav() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state: { order: items[] }) => state.order).filter(
    (item) => item.orderQty > 0
  );
  const total = useSelector((state: { cart: number }) => state.cart);
  console.log(total);

  function orderMaker(type: string, product: items) {
    if (type === "add") {
      dispatch(addOrderItem(product));
      dispatch(addQuantity(product.id));
      dispatch(cart(product.price));
    } else if (type === "remove") {
      dispatch(removeOrderItem(product));
      dispatch(subtractQuantity(product.id));
      dispatch(cart(-product.price));
    } else {
      dispatch(deleteOrderItem(product));
      dispatch(cart(-product.price * product.orderQty));
      dispatch(removeQuantity(product.id));
    }
  }

  const itemsImages = [pizza, burger, crepe, drink]

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
      >
        <Modal.Body>
          <div className="cart-body">
            {orders.map((order) => {
              return (
                <Row key={Math.random()}>
                  <Col className="text-center" xs={12} md={6}>
                    <img className="nav-item-img" src={itemsImages[order.category.name === "pizza" ? 0 : (order.category.name === "Burgers") ? 1 : (order.category.name === "Crepes") ? 2 : 3]} />
                  </Col>
                  <Col xs={12} md={6} className="text-center">
                    <p>{order.itemName}</p>
                    <p>
                      Qty: {order.orderQty}
                      <NegativeSign
                        className="cart-icon"
                        onClick={() =>
                          orderMaker("remove", {
                            itemName: order.itemName,
                            description: order.description,
                            id: order.id,
                            price: order.price,
                            orderQty: order.orderQty,
                            category: order.category,
                            popular: order.popular,
                          })
                        }
                      />
                      <PositiveSign
                        className="cart-icon"
                        onClick={() =>
                          orderMaker("add", {
                            itemName: order.itemName,
                            description: order.description,
                            id: order.id,
                            price: order.price,
                            orderQty: order.orderQty,
                            category: order.category,
                            popular: order.popular,
                          })
                        }
                      />
                    </p>
                    <p>
                      Total: LE {order.price * order.orderQty}{" "}
                      <BinSign
                        className="bin-icon"
                        onClick={() =>
                          orderMaker("delete", {
                            itemName: order.itemName,
                            description: order.description,
                            id: order.id,
                            price: order.price,
                            orderQty: order.orderQty,
                            category: order.category,
                            popular: order.popular,
                          })
                        }
                      />
                    </p>
                  </Col>
                </Row>
              );
            })}
          </div>
          <hr />
          <p>Subtotal: LE {total}</p>
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
