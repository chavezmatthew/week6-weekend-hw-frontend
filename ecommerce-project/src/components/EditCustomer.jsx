import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [modalName, setModalName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [error, setError] = useState(null);

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
        const customerData = response.data;

        setName(customerData.customer_name);
        setEmail(customerData.email);
        setPhone(customerData.phone);
      } catch (error) {
        setError('Error fetching customer data');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
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

    const updatedCustomer = {
      "customer_name": name, 
      "email": email, 
      "phone": phone
    };
    console.log(updatedCustomer);

    try {
      const response = await axios.put(`http://127.0.0.1:5000/customers/${id}`, updatedCustomer, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;
      console.log("Customer Updated:", data);

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
    navigate(`/customers/${id}`);
  };

  const validateForm = () => {
    const formErrors = {};
    if (!name) formErrors.name = "Name is required";
    if (!email) formErrors.email = "Email is required";
    if (!phone) formErrors.phone = "Phone is required";
    return formErrors; 
  };

  return (
    <Container>
      { isLoading && <Alert variant='info'>Submitting customer data...</Alert> }
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

        <Form.Group controlId='formGroupEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control 
            type='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          { errors?.email && <Alert>Email is required</Alert> }
        </Form.Group>

        <br />

        <Form.Group controlId='formGroupPhone'>
          <Form.Label>Phone:</Form.Label>
          <Form.Control 
            type='phone' 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
          { errors?.phone && <Alert>Phone is required</Alert> }
        </Form.Group>

        <br />

        <Button type='submit' disabled={isLoading}>
          { isLoading ? 'Updating Customer...' : 'Update Customer' }
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

export default EditCustomer;