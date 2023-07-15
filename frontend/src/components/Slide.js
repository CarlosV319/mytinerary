import React from "react";

import { Carousel, Col, Card, Row,Container } from "react-bootstrap";

export default class Slide extends React.Component {
  Cities = [
    [
      {
        title: "Amsterdams",
        src: "./assets/Amsterdams.jpg",
      },

      {
        title: "Barcelona",
        src: "./assets/Barcelona.jpg",
      },

      {
        title: "Bruges",
        src: "./assets/Bruges.jpg",
      },

      {
        title: "Budapest",
        src: "./assets/Budapest.jpg",
      },
    ],

    [
      {
        title: "Cape Town",
        src: "./assets/CapeTown.jpg",
      },

      {
        title: "Lisbon",
        src: "./assets/Lisbon.jpg",
      },

      {
        title: "London",
        src: "./assets/London.jpg",
      },

      {
        title: "Madrid",
        src: "./assets/Madrid.jpg",
      },
    ],

    [
      {
        title: "New York",
        src: "./assets/NewYork.jpg",
      },

      {
        title: "Paris",
        src: "./assets/paris.jpg",
      },

      {
        title: "Prague",
        src: "./assets/Prague.jpg",
      },

      {
        title: "Rome",
        src: "./assets/Rome.jpg",
      },
    ],
  ];
 
  render() {
    return (
     <>
      <div className="container-carousel">
        <Carousel interval={5000} pause="false">
          {this.Cities.map((packs) => {
            return (
              <Carousel.Item>
                <Container>
                  <Row>
                    {packs.map((pack) => {
                      return (
                        <Col xs={12} sm={5}>
                          <Card>
                            <Card.Img  variant="top" src={pack.src} />
                            <Card.Body>
                              <Card.Title>{pack.title}</Card.Title>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      </>
    )
  }
}



