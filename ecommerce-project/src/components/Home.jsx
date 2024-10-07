import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-4">
      <Card className="text-center bg-light">
        <Card.Body>
          <Card.Title className="display-4">Welcome to the eCommerce Store!</Card.Title>
          <Card.Text>
            Find the best products just for you.
          </Card.Text>
          <Card.Text>
            Explore our product catalog, track your orders, and manage your account easily.
          </Card.Text>
          <Button variant="primary" href="/product-catalog">Shop Now</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;