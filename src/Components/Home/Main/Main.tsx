import { Container, Tab, Tabs, Row } from "react-bootstrap";
import "./MainStyles.css";
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import { useEffect } from "react";
import { getMenu } from "../../../API/api";

import type { RootState } from '../../../store/store'
import { getProducts } from "../../../state/menuSlice"

function Main() {
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.menu.menu)

  const orders = useSelector((state: RootState) => state.cart.cart);

  const total = useSelector((state: RootState) => state.total.total);

  useEffect(() => {
    getMenu().then((res) => {
      dispatch(getProducts(res.data));
    });
  }, []);


  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("total", JSON.stringify(total));
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
                  <Item item={product}/>
                );
              })}
            </Row>
          </Tab>
          <Tab eventKey="Pizza" title="Pizza">
                        <Row className="g-4">
              {products.map((product) => {
                if(product.category.name === "pizza") {
                  return (
                    <Item item={product}/>
                  );
                } else {
                  return null
                }
              })}
            </Row>
          </Tab>
          <Tab eventKey="Burger" title="Burger">
                                              <Row className="g-4">
              {products.map((product) => {
                if(product.category.name === "Burgers") {
                return (
                  <Item item={product}/>

                );
                } else {
                  return null
                }
              })}
            </Row>
          </Tab>
          <Tab eventKey="Crepe" title="Crepe">
                                    <Row className="g-4">
              {products.map((product) => {
                if(product.category.name === "Crepes") {
                return (
                  <Item item={product}/>

                );
                } else {
                  return null
                }
              })}
            </Row>
          </Tab>
          <Tab eventKey="Drinks" title="Drinks">
                                    <Row className="g-4">
              {products.map((product) => {
                if(product.category.name === "Drinks") {
                return (
                  <Item item={product}/>

                );
                } else {
                  return null
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