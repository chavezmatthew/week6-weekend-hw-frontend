import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Alert, Button, ListGroup, Modal } from 'react-bootstrap';

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const deleteCustomer = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
        setModalMessage('Customer has been successfully deleted.');
        setShowSuccessModal(true);
      } catch (error) {
        setError(error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/customers');
  };

  const handleEditCustomer = () => {
    navigate(`/edit-customer/${id}`);
  };

  if (loading) {
    return <Container><Alert variant='info'>Loading...</Alert></Container>;
  }

  if (!customer) {
    return <Container><Alert variant='warning'>No customer data found</Alert></Container>;
  }

  return (
    <Container>
      { error && <Alert variant='danger'>Error: {error.message}</Alert> }

      <h1>Customer Details</h1>

      <ListGroup>
        <ListGroup.Item className='d-flex-col justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
          <h5>Customer Name:</h5>
          <p>{customer.customer_name}</p>
          <h5>Customer Email:</h5>
          <p>{customer.email}</p>
          <h5>Customer Phone:</h5>
          <p>{customer.phone}</p>
          <h5>Customer ID:</h5>
          <p>{customer.id}</p>
          <h5>Orders List:</h5>
          {customer.orders.map((order) => (
            <p key={order.id}>Order ID: {order.id}</p>
          ))}
        </ListGroup.Item>
      </ListGroup>

      <Button variant='outline-primary' size='sm' onClick={handleEditCustomer}>Edit</Button>
      <Button variant='outline-danger' size='sm' onClick={deleteCustomer}>Delete</Button>

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
    </Container>
  );
};

export default CustomerDetails;