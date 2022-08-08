import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import { ReactComponent as NegativeSign } from "../../../Assets/negative-sign.svg";
import { ReactComponent as PositiveSign } from "../../../Assets/positive-sign.svg";
import { items } from "../../../utils/types";
import { useDispatch } from "react-redux";
import { addToTotal } from "../../../state/totalSlice";
import {
  addToCart, removeFromCart
} from "../../../state/cartSlice";
import {
  addQuantity,
  subtractQuantity,
} from "../../../state/menuSlice";



function Item({item}: {item: items}) {
  const dispatch = useDispatch();

  function orderMaker(type: string, product: items) {
    if (type === "add") {
      dispatch(addToCart(product));
      dispatch(addQuantity(product.id));
      dispatch(addToTotal(product.price));
    } else if (type === "remove") {
      dispatch(removeFromCart(product));
      dispatch(subtractQuantity(product.id));
      dispatch(addToTotal(-product.price));
    }
  }
  return (
    <Col xs={12}  md={6} lg={4}>
      <Card className="h-100 border-0">
        <Row>
          <Col className="img-container" xs={12} lg={5}>
            <Card.Img className="item-img" src={item.url} />
          </Col>
          <Col xs={12} lg={7}>
            <Card.Body>
              <Card.Title className="item-title fw-bold">{item.itemName}</Card.Title>
              <Card.Text className="item-description fw-lighter">{item.description}</Card.Text>
              <Card.Text className="fw-bold">Price: LE {item.price}</Card.Text>
              <Card.Text>
              <Row>
              <Col className="text-center">
                <NegativeSign
                  className="item-icon"
                  onClick={() =>
                    orderMaker("remove", item)
                  }
                />
                </Col>
                <Col className="text-center" xs={3}>
                {item.orderQty ? item.orderQty : 0}
                </Col>
                <Col className="text-center">
                <PositiveSign
                  className="item-icon"
                  onClick={() =>
                    orderMaker("add", item)
                  }
                />
                </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

export default Item;
