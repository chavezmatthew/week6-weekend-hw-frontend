import { useState } from 'react'
import axios from 'axios'
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap'

const AddProduct = () => {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
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

    const product = {
      "product_name": name, 
      "price": price, 
    }
    console.log(product)

    try {
      const response = await axios.post("http://127.0.0.1:5000/products", product, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = response.data;
      console.log("Product Created:", data)

      setShowSuccessModal(true)
      setModalName(name)

      setName('')
      setPrice('')

    } catch (error) {
	    console.log("Error", error)
	    setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!name) errors.name = "Product Name is required"
    if (!price) errors.price = "Price is required"
    return errors
  }

  return (
    <Container>

      { isLoading && <Alert variant='info'>Submitting product data...</Alert> }
      { error && <Alert variant='danger'>Error: {error}</Alert> }

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId='formGroupName'>
          <Form.Label>Name:</Form.Label>
          <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value) }/>
          { errors?.name && <Alert variant='danger'>{errors.name}</Alert> }
        </Form.Group>

        <br />

        <Form.Group controlId='formGroupPrice'>
          <Form.Label>Price:</Form.Label>
          <Form.Control type='text' value={price} onChange={(e) => setPrice(e.target.value) }/>
          { errors?.price && <Alert>Price is required</Alert> }
        </Form.Group>

        <br />

        <Button type='submit' disabled={isLoading}>
          { isLoading ? 'Creating Product...' : 'Create Product' }
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

export default AddProduct