import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [modalName, setModalName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [error, setError] = useState(null);

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
        const productData = response.data;

        setName(productData.product_name);
        setPrice(productData.price);
      } catch (error) {
        setError('Error fetching product data');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setError(null);

    const updatedProduct = {
      "product_name": name, 
      "price": price, 
    };
    console.log(updatedProduct);

    try {
      const response = await axios.put(`http://127.0.0.1:5000/products/${id}`, updatedProduct, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;
      console.log("Product Updated:", data);

      setShowSuccessModal(true);
      setModalName(name);

    } catch (error) {
      console.log("Error", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate(`/products/${id}`);
  };

  const validateForm = () => {
    const formErrors = {};
    if (!name) formErrors.name = "Product Name is required";
    if (!price) formErrors.price = "Price is required";
    return formErrors; 
  };

  return (
    <Container>
      { isLoading && <Alert variant='info'>Submitting product data...</Alert> }
      { error && <Alert variant='danger'>Error: {error}</Alert> }

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formGroupName'>
          <Form.Label>Name:</Form.Label>
          <Form.Control 
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          { errors?.name && <Alert variant='danger'>{errors.name}</Alert> }
        </Form.Group>

        <br />

        <Form.Group controlId='formGroupPrice'>
          <Form.Label>Price:</Form.Label>
          <Form.Control 
            type='text' 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
          { errors?.email && <Alert>Price is required</Alert> }
        </Form.Group>


        <br />

        <Button type='submit' disabled={isLoading}>
          { isLoading ? 'Updating Product...' : 'Update Product' }
        </Button>
      </Form>

      <Modal show={showSuccessModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalName} updated successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditProduct;