import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders, modifyOrders } from "../../actions/orders.action";
import { checkOrders, getDashboardOrders } from "../../API/api";
import { orders } from "../../utils/types";
import "./Dashboard.css";
import moment from "moment";

import Clock from "react-live-clock";

function Pending() {
  const orders = useSelector(
    (state: { orders: orders[] }) => state.orders
  ).filter((order) => !order.completed)

  const dispatch = useDispatch();
  console.log(orders);

  const addCheck = (orderId: number, itemId: number) => {
      return dispatch(modifyOrders(orderId, itemId));
  };

  useEffect(() => {
    getDashboardOrders().then((res) => {
      dispatch(getOrders(res.data));
    });
  }, []);

  useEffect(() => {
    orders.map((item) => {
      let allChecked = item.orderLine.every((product) => product.completed);
      if (allChecked) {
        checkOrders(item.id).then(() =>
          getDashboardOrders().then((res) => {
            dispatch(getOrders(res.data));
          })
        );
      }
    });
  }, [orders]);

  const timeLapsed = (createdAt: string) => {
    return +moment(moment(moment().format()).diff(moment(createdAt))) - 7200000
  };

  return (
    <div className="dashboard-page">
      <Row>
        <Col xs={2} className="p-0">
          <div className="title">
            <h2>Dashboard</h2>
          </div>
          <ul>
            <li>
              <Link to="/dashboard/pending">Pending Orders</Link>
              <span className="counter">{orders.length}</span>
            </li>
            <li>
              <Link to="/dashboard/completed">Completed Orders</Link>
            </li>
          </ul>
        </Col>
        <Col className="text-start cards-section p-5" xs={10}>
          <Row className="pt-5">
            {orders.map((order) => (
              <Col xs={6} lg={4}>
                <Card className="m-1 my-4">
                  <Card.Header
                    className={`text-end ${
                      +timeLapsed(order.createdAt) < 900000
                        ? "bg-success text-white"
                        : +timeLapsed(order.createdAt) > 900000 &&
                          +timeLapsed(order.createdAt) < 1800000
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                <Clock format={'HH:mm:ss'} ticking={true} date={moment(moment(timeLapsed(order.createdAt)).format()).format()} />

                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {order.orderLine.map((item, itemIndex) => {
                        return (
                          <Form.Check
                            label={`${item.productName}`}
                            onClick={() => {
                              addCheck(order.id, item.id);
                            }}
                              defaultChecked={false}
                          ></Form.Check>
                        );
                      })}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Pending;
