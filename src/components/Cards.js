import React from "react";
import { Card, Button } from "react-bootstrap";
import image from "../logo.svg";
import analytics from "../analytics.svg";
import database from "../database-storage.svg";
import register from "../register.svg";

function Cards(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={require(`../${props.name}.svg`)}
        style={{
          width: "12rem",
          height: "8rem",
          alignItems: "center",
          justifySelf: true,
          margin: 20,
        }}
        class="mx-auto"
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.brief}</Card.Text>
        <Button variant="primary">Have a look</Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;
