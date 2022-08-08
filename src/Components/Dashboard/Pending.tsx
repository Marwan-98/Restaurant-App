import React, { useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders, check } from "../../state/ordersSlice";
import { checkOrders, getDashboardOrders } from "../../API/api";
import "./Dashboard.css";
import moment from "moment";

import Clock from "react-live-clock";

import type { RootState } from '../../store/store'

function Pending() {
  const orders = useSelector(
    (state: RootState) => state.orders.orders
  ).filter((order) => !order.completed)

  const dispatch = useDispatch();

  const addCheck = (orderId: number, itemId: number) => {
    return dispatch(check({ orderId, itemId }));
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
          <Link to="/dashboard/pending">
            <li>
              Pending Orders
              <span className="counter">{orders.length}</span>
            </li>
            </Link>
            <Link to="/dashboard/completed">
            <li>
              Completed Orders
            </li>
            </Link>
          </ul>
        </Col>
        <Col className="text-start cards-section pt-5" xs={10}>
          <Row className="pt-5">
            {orders.map((order) => (
              <Col xs={6} lg={4} key={order.id}>
                <Card className="m-1 my-4">
                  <Card.Header
                    className={`text-end ${
                        +moment(timeLapsed(order.createdAt)).minutes() < 15 && 
                        +moment(timeLapsed(order.createdAt)).hours() < 1
                        ? "bg-success text-white"
                        : +moment(timeLapsed(order.createdAt)).minutes() < 30 && 
                          +moment(timeLapsed(order.createdAt)).hours() < 1
                        ? "bg-warning"
                        : "bg-danger text-white"
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
                            key={item.id}
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