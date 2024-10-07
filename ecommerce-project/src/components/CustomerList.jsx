import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Button, ListGroup, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/customers');
        setCustomers(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
        setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
        
        setModalMessage('Customer has been successfully deleted.');
        setShowSuccessModal(true);
        
      } catch (error) {
        setError(error);
        setModalMessage('Customer has not been deleted.');
        setShowFailModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowFailModal (false)
  };

  if (loading) {
    return <Container><Alert variant='info'>Loading...</Alert></Container>;
  }

  return (
    <Container>
      { error && <Alert variant='danger'>Error: {error.message}</Alert> }

      <h1>Customer List</h1>

      <ListGroup>
        {customers.map(customer => (
          <ListGroup.Item key={customer.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
            <Link to={`/customers/${customer.id}`}>{customer.customer_name}</Link>

            <Button variant='outline-danger' size='sm'
              onClick={() => deleteCustomer(customer.id)}
            >Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFailModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CustomerList;