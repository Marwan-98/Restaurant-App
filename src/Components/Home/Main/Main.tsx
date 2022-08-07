import { Container, Tab, Tabs, Card, Col, Row } from "react-bootstrap";
import "./MainStyles.css";
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import { items, menu } from "../../../utils/types";
import { useEffect } from "react";
import { getMenu } from "../../../API/api";
import { getProducts } from "../../../actions/products.action";

function Main() {
  const dispatch = useDispatch();

  const products = useSelector(
    (state: { products: items[] }) => state.products
  );
  const orders = useSelector((state: { order: items[] }) => state.order);

  useEffect(() => {
    getMenu().then((res) => {
      dispatch(getProducts(res.data));
    });
  }, []);


  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <div className="main" id="menu">
      <Container className="py-5">
        <Tabs
          defaultActiveKey="Popular"
          id="uncontrolled-tab-example"
          className="mb-3 nav-fill"
        >
          <Tab eventKey="Popular" title="Popular">
            <Row className="g-4">
              {products.map((product) => {
                return (
                  <Item
                    itemName={product.itemName}
                    description={product.description}
                    id={product.id}
                    price={product.price}
                    orderQty={product.orderQty ? product.orderQty : 0}
                    category={product.category}
                    popular={product.popular}
                    key={product.id}
                  />
                );
              })}
            </Row>
          </Tab>
          <Tab eventKey="Pizza" title="Pizza">
                        <Row className="g-4">
              {products.map((product) => {
                if(product.category.name === "pizza") {
                return (
                  <Item
                    itemName={product.itemName}
                    description={product.description}
                    id={product.id}
                    price={product.price}
                    orderQty={product.orderQty ? product.orderQty : 0}
                    category={product.category}
                    popular={product.popular}
                    key={product.id}
                  />
                );
                }
              })}
            </Row>
          </Tab>
          <Tab eventKey="Burger" title="Burger">
                                              <Row className="g-4">
              {products.map((product) => {
                if(product.category.name === "Burgers") {
                return (
                  <Item
                    itemName={product.itemName}
                    description={product.description}
                    id={product.id}
                    price={product.price}
                    orderQty={product.orderQty ? product.orderQty : 0}
                    category={product.category}
                    popular={product.popular}
                    key={product.id}
                  />
                );
                }
              })}
            </Row>
          </Tab>
          <Tab eventKey="Crepe" title="Crepe">
                                    <Row className="g-4">
              {products.map((product) => {
                if(product.category.name === "Crepes") {
                return (
                  <Item
                    itemName={product.itemName}
                    description={product.description}
                    id={product.id}
                    price={product.price}
                    orderQty={product.orderQty ? product.orderQty : 0}
                    category={product.category}
                    popular={product.popular}
                    key={product.id}
                  />
                );
                }
              })}
            </Row>
          </Tab>
          <Tab eventKey="Drinks" title="Drinks">
                                    <Row className="g-4">
              {products.map((product) => {
                if(product.category.name === "Drinks") {
                return (
                  <Item
                    itemName={product.itemName}
                    description={product.description}
                    id={product.id}
                    price={product.price}
                    orderQty={product.orderQty ? product.orderQty : 0}
                    category={product.category}
                    popular={product.popular}
                    key={product.id}
                  />
                );
                }
              })}
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default Main;