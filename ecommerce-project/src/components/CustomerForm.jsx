import { useState } from 'react'
import axios from 'axios'
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap'

const CustomerForm = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [modalName, setModalName] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [error, setError] = useState(null)

  const [errors, setErrors] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const errors = validateForm()
    if (Object.keys(errors).length > 0){
      setErrors(errors)
      return
    }

    setIsLoading(true)
    setError(null)

    const customer = {
      "customer_name": name, 
      "email": email, 
      "phone": phone
    }
    console.log(customer)

    try {
      const response = await axios.post("http://127.0.0.1:5000/customers", customer, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = response.data;
      console.log("Customer Created:", data)

      setShowSuccessModal(true)
      setModalName(name)

      setName('')
      setEmail('')
      setPhone('')

    } catch (error) {
	    console.log("Error", error)
	    setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!name) errors.name = "Name is required"
    if (!email) errors.email = "Email is required"
    if (!phone) errors.phone = "Phone is required"
    return errors
  }

  return (
    <Container>

      { isLoading && <Alert variant='info'>Submitting customer data...</Alert> }
      { error && <Alert variant='danger'>Error: {error}</Alert> }

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId='formGroupName'>
          <Form.Label>Name:</Form.Label>
          <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value) }/>
          { errors?.name && <Alert variant='danger'>{errors.name}</Alert> }
        </Form.Group>

        <br />

        <Form.Group controlId='formGroupEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value) }/>
          { errors?.email && <Alert>Email is required</Alert> }
        </Form.Group>

        <br />

        <Form.Group controlId='formGroupPhone'>
          <Form.Label>Phone:</Form.Label>
          <Form.Control type='phone' value={phone} onChange={(e) => setPhone(e.target.value) }/>
          { errors?.phone && <Alert>Phone is required</Alert> }
        </Form.Group>

        <br />

        <Button type='submit' disabled={isLoading}>
          { isLoading ? 'Creating Customer...' : 'Create Customer' }
        </Button>
      </Form>

       <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{modalName} created successfully!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={() => setShowSuccessModal(false)}>Close</Button>
          </Modal.Footer>
       </Modal>

    </Container>
  )
}

export default CustomerForm