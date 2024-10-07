import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Container, Alert, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      setLoading(true)

      const response = await axios.delete(`http://127.0.0.1:5000/products/${id}`)
      console.log(response)

      fetchProducts();
    
    } catch (error) {
      console.log(error)
      setError({"message": "Product is connected to order, cannot delete"});
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
    const response = await axios.get('http://127.0.0.1:5000/products');
    console.log(response)
    setProducts(response.data);
    } catch (error) {
    setError(error);
    } finally {
    setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>

    { error && <Alert variant='danger'>Error: {error.message}</Alert> }

    <h1>Product List</h1>

    <ListGroup>
      {products.map(product => (
        <ListGroup.Item key={product.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>

          <Link to={`/products/${product.id}`}>{product.product_name}</Link>

          <Button variant='outline-danger' size='sm'
            onClick={() => {handleDelete(product.id)}}
          >Delete</Button>

        </ListGroup.Item>
      ))}
    </ListGroup>

  </Container>
  )
}

export default ProductCatalog