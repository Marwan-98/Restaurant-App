import moment from "moment";
import React, { useEffect } from "react";
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
import { getOrders } from "../../actions/orders.action";
import { getDashboardOrders } from "../../API/api";
import { orders } from "../../utils/types";
import "./Dashboard.css";

function Completed() {
  const orders = useSelector(
    (state: { orders: orders[] }) => state.orders
  ).filter((order) => order.completed);

  const dispatch = useDispatch();

  useEffect(() => {
    getDashboardOrders().then((res) => {
      dispatch(getOrders(res.data));
    });
  }, []);

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
            </li>
            <li>
              <Link to="/dashboard/completed">Completed Orders</Link>
              <span className="counter">{orders.length}</span>
            </li>
          </ul>
        </Col>
        <Col className="text-start cards-section p-5" xs={10}>
          <Row className="pt-5">
            {orders.map((order) => (
              <Col xs={6} lg={4}>
                <Card className="m-1 my-4">
                  <Card.Header className="text-end">
                    {moment().format("MMMM Do YYYY, h:mm:ss a")}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {order.orderLine.map((item) => {
                        return (
                          <Form.Check
                            label={`${item.productName}`}
                            checked
                            readOnly
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

export default Completed;
