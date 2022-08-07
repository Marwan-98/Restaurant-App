import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import { ReactComponent as NegativeSign } from "../../../Assets/negative-sign.svg";
import { ReactComponent as PositiveSign } from "../../../Assets/positive-sign.svg";
import pizza from "../../../Assets/Pizza.png";
import burger from "../../../Assets/Burger.png";
import crepe from "../../../Assets/Crepe.png";
import drink from "../../../Assets/Drink.png";
import { items } from "../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { addTotal } from "../../../actions/total.action";
import { addOrderItem, removeOrderItem } from "../../../actions/order.action";
import {
  addQuantity,
  subtractQuantity,
} from "../../../actions/products.action";

const itemsImages = [pizza, burger, crepe, drink]

function Item({
  itemName,
  description,
  id,
  price,
  orderQty,
  category,
  popular,
}: items) {
  const dispatch = useDispatch();

  const total = useSelector((state: { total: number }) => state.total);

  function orderMaker(type: string, product: items) {
    if (type === "add") {
      dispatch(addOrderItem(product));
      dispatch(addQuantity(product.id));
      dispatch(addTotal(product.price));
    } else if (type === "remove") {
      dispatch(removeOrderItem(product));
      dispatch(subtractQuantity(product.id));
      dispatch(addTotal(-product.price));
    }
  }
  return (
    <Col xs={12}  md={6} lg={4}>
      <Card className="h-100 border-0">
        <Row>
          <Col className="img-container" xs={12} lg={5}>
            <Card.Img className="item-img" src={itemsImages[category.name === "pizza" ? 0 : (category.name === "Burgers") ? 1 : (category.name === "Crepes") ? 2 : 3]} />
          </Col>
          <Col xs={12} lg={7}>
            <Card.Body>
              <Card.Title className="item-title fw-bold">{itemName}</Card.Title>
              <Card.Text className="item-description fw-lighter">{description}</Card.Text>
              <Card.Text className="fw-bold">Price: LE {price}</Card.Text>
              <Card.Text>
              <Row>
              <Col className="text-center">
                <NegativeSign
                  className="item-icon"
                  onClick={() =>
                    orderMaker("remove", {
                      itemName,
                      description,
                      id,
                      price,
                      orderQty,
                      category,
                      popular,
                    })
                  }
                />
                </Col>
                <Col className="text-center" xs={3}>
                {orderQty}
                </Col>
                <Col className="text-center">
                <PositiveSign
                  className="item-icon"
                  onClick={() =>
                    orderMaker("add", {
                      itemName,
                      description,
                      id,
                      price,
                      orderQty,
                      category,
                      popular,
                    })
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
