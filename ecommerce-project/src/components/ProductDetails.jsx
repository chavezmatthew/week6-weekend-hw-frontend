import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Alert, Button, ListGroup } from 'react-bootstrap';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const deleteProduct = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/products/${id}`);
        navigate('/product-catalog');
      } catch (error) {
        setError(error);
      }
    }
  };

  const handleEditProduct = () => {
    navigate(`/edit-product/${id}`);
  };

  if (loading) {
    return <Container><Alert variant='info'>Loading...</Alert></Container>;
  }

  if (!product) {
    return <Container><Alert variant='warning'>No product data found</Alert></Container>;
  }

  return (
    <Container>
      { error && <Alert variant='danger'>Error: {error.message}</Alert> }

      <h1>Product Details</h1>

      <ListGroup>
        <ListGroup.Item className='d-flex-col justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
          <h5>Product Name:</h5>
          <p>{product.product_name}</p>
          <h5>Product Price:</h5>
          <p>{product.price}</p>
          <h5>Product ID:</h5>
          <p>{product.id}</p>

          <Button variant='outline-primary' size='sm' onClick={handleEditProduct}>Edit</Button>

          <Button variant='outline-danger' size='sm' onClick={deleteProduct}>Delete</Button>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default ProductDetails;