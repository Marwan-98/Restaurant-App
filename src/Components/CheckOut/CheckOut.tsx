import React from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import pizza from "../../Assets/Pizza.png";
import burger from "../../Assets/Burger.png";
import crepe from "../../Assets/Crepe.png";
import drink from "../../Assets/Drink.png";

import * as Yup from "yup";


import { items } from "../../utils/types";
import "./CheckOut.css";

import { ReactComponent as NegativeSign } from "../../Assets/negative-sign.svg";
import { ReactComponent as PositiveSign } from "../../Assets/positive-sign.svg";
import { ReactComponent as BinSign } from "../../Assets/bin-sign.svg";

import { addTotal } from "../../actions/total.action";
import { Link } from "react-router-dom";
import {
    addOrderItem,
    deleteOrderItem,
    removeOrderItem,
} from "../../actions/order.action";
import { useFormik } from "formik";
import { sendOrder } from "../../API/api";
import { removeQuantity } from "../../actions/products.action";

import { resetOrderItems } from "../../actions/order.action"
import { resetTotal } from "../../actions/total.action"

function CheckOut() {
    const dispatch = useDispatch();
    const orders = useSelector((state: { order: items[] }) => state.order).filter(
        (item) => item.orderQty > 0
    );
    const total = useSelector((state: { total: number }) => state.total);

    const navigate = useNavigate();

    const itemsImages = [pizza, burger, crepe, drink]

    function orderMaker(type: string, product: items) {
        if (type === "add") {
            dispatch(addOrderItem(product));
            dispatch(addTotal(product.price));
        } else if (type === "remove") {
            dispatch(removeOrderItem(product));
            dispatch(addTotal(-product.price));
        } else {
            dispatch(deleteOrderItem(product));
            dispatch(addTotal(-product.price * product.orderQty));
            dispatch(removeQuantity(product.id));
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            mobile: "",
            address: "",
            city: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required")
                .max(20, "limit passed")
                .min(3, "Please write 3 characters or more")
                .matches(/[a-zA-Z]+\s[a-zA-Z]+/, "please put your first name and last name"),
            mobile: Yup.string()
                .required("mobile is required")
                .min(10, "something's wrong with your phone number"),
        }),
        onSubmit: (values) => {
            sendOrder(orders, values).then((res) => {
                let orderNum = res.data.client.orderNumber
                navigate("/success", { state: { orderNumber: orderNum } });
            });
            dispatch(resetOrderItems());
            dispatch(resetTotal());
        },
    });

    return (
        <div className="checkout-body">
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} xs={12}>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3 checkout-input">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  id="name-input"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name && (
              <Alert variant="danger">{formik.errors.name}</Alert>
            )}
              </Form.Group>

              <Form.Group className="mb-3 checkout-input">
                <Form.Control
                  type="number"
                  name="mobile"
                  placeholder="Mobile"
                  id="mobile-input"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                />
                {formik.touched.mobile && formik.errors.mobile && (
              <Alert variant="danger">{formik.errors.mobile}</Alert>
            )}
              </Form.Group>

              <Form.Group className="mb-3 checkout-input">
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Adress"
                  id="address-input"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 checkout-input">
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="City"
                  id="city-input"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Button variant="danger" type="submit" className="w-25">
                Order Now
              </Button>
              <Link to="/">
                <Button variant="light">Cancel</Button>
              </Link>
            </Form>
          </Col>
          <Col md={4} xs={12}>
            <div className="cart-body">
              {orders.map((order) => {
                return (
                  <Row>
                    <Col className="text-center" xs={12} lg={6}>
                      <img className="check-item-img" src={itemsImages[order.category.name === "pizza" ? 0 : (order.category.name === "Burgers") ? 1 : (order.category.name === "Crepes") ? 2 : 3]} />
                    </Col>
                    <Col xs={12}  lg={6} className="text-center">
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
                        Total: LE {order.price * order.orderQty}
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
            <p>Subtotal: LE {total.toLocaleString()}</p>
          </Col>
        </Row>
      </Container>
    </div>
    );
}

export default CheckOut;