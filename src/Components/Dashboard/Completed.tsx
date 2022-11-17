import moment from "moment";
import React, { useEffect } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../state/ordersSlice";
import { getDashboardOrders } from "../../API/api";
import "./Dashboard.css";

import type { RootState } from "../../store/store";

function Completed() {
  const orders = useSelector((state: RootState) => state.orders.orders);

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
            <Link to="/dashboard/pending">
              <li>Pending Orders</li>
            </Link>
            <Link to="/dashboard/completed">
              <li>
                Completed Orders
                <span className="counter">
                  {orders.filter((order) => order.completed).length}
                </span>
              </li>
            </Link>
          </ul>
        </Col>
        <Col className="text-start cards-section p-5" xs={10}>
          <Row className="pt-5">
            {orders.map(
              (order) =>
                order.completed && (
                  <Col xs={6} lg={4}>
                    <Card className="m-1 my-4">
                      <Card.Header className="text-end">
                        {moment(order.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
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
                )
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Completed;
