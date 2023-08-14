import React, { useEffect, useState } from "react";
import NavbarB from '../components/NavbarB';
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Cards from "../components/Cards";
import End from "../end/End";
// import '../styles/home.css'; // Import your custom CSS for further styling

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:8000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <NavbarB />
      <Container fluid>
        <Row className="carousel-row">
          <Col xs={12} className="carousel-col">
            <Carousel id="carousel" fade interval={3000}>
              <Carousel.Item key={'2'}>
                <img style={{height:'65vh',outerWidth:'100vh'}} src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" alt="..." />
                <Carousel.Caption style={{ zIndex: "10" }}>
                  <div className="d-flex w-100 justify-content-center">
                    <Form.Control className="mb-2 w-75" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.currentTarget.value) }} />
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item key={'1'}>
                <img style={{height:'65vh' ,outerWidth:'100vh'}} src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." />
                <Carousel.Caption style={{ zIndex: "10" }}>
                  <div className="d-flex w-100 justify-content-center">
                    <Form.Control className="mb-2 w-75" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.currentTarget.value) }} />
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              {/* Other carousel items */}
            </Carousel>
          </Col>
        </Row>
        {foodCat.map((data) => (
          <Row key={data._id} className="category-row">
            <Col xs={12}>
              <div className="fs-3 mb-3 category-heading">
                {data.CategoryName}
              </div>
              <hr />
            </Col>
            {foodItem
              .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
              .map(filterItems => (
                <Col key={filterItems._id} xs={12} sm={6} md={4} lg={3} className="m-4">
                  <Cards
                  foodItem = {filterItems}
                   options={filterItems.options[0]} 
                   >

                  {/* foodName={filterItems.name}  
                  options={filterItems.options[0]} 
                  imgSrc={filterItems.img} */}

                  </Cards>
                </Col>
              ))}
            {foodItem.length === 0 && (
              <Col xs={12}>
                <Alert variant="danger">
                  No such data found
                </Alert>
              </Col>
            )}
          </Row>
        ))}
      </Container>
      <End />
    </div>
  );
}
