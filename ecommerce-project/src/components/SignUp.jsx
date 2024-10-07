import { useState } from 'react'
import axios from 'axios'
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap'

const SignUp = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [modalMessage, setModalMessage] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    setError(null)
    setErrors({})

    const signupData = {
      customer_name: name,
      email: email,
      phone: phone,
      username: username,
      password: password
    }

    console.log(signupData)

    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", signupData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = response.data;
      console.log("User Signed Up:", data)

      setShowSuccessModal(true)
      setModalMessage(`Welcome, ${data.username}! Your account has been created successfully.`)

      setName('')
      setEmail('')
      setPhone('')
      setUsername('')
      setPassword('')

    } catch (error) {
      console.log("Error", error)
      if (error.response && error.response.data) {
        const responseData = error.response.data
        const newErrors = {}

        if (responseData.customer_errors) {
          Object.assign(newErrors, responseData.customer_errors)
        }
        if (responseData.account_errors) {
          Object.assign(newErrors, responseData.account_errors)
        }
        if (responseData.error) {
          setError(responseData.error)
        }

        setErrors(newErrors)
      } else {
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!name.trim()) errors.name = "Name is required"
    if (!email.trim()) errors.email = "Email is required"
    if (!phone.trim()) errors.phone = "Phone is required"
    if (!username.trim()) errors.username = "Username is required"
    if (!password.trim()) errors.password = "Password is required"
    return errors
  }

  return (
    <Container>

      { isLoading && <Alert variant='info'>Submitting user data...</Alert> }
      { error && <Alert variant='danger'>Error: {error}</Alert> }

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId='formGroupName'>
          <Form.Label>Name:</Form.Label>
          <Form.Control 
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder='Enter your name'
          />
          { errors.name && <Alert variant='danger' className='mt-2'>{errors.name}</Alert> }
        </Form.Group>

        <br />

        <Form.Group controlId='formGroupEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control 
            type='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter your email'
          />
          { errors.email && <Alert variant='danger' className='mt-2'>{errors.email}</Alert> }
        </Form.Group>

        <br />

        <Form.Group controlId='formGroupPhone'>
          <Form.Label>Phone:</Form.Label>
          <Form.Control 
            type='text' 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder='Enter your phone number'
          />
          { errors.phone && <Alert variant='danger' className='mt-2'>{errors.phone}</Alert> }
        </Form.Group>

        <br />

        <Form.Group controlId='formGroupUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            type='text' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder='Choose a username'
          />
          { errors.username && <Alert variant='danger' className='mt-2'>{errors.username}</Alert> }
        </Form.Group>

        <br />

        <Form.Group controlId='formGroupPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Create a password'
          />
          { errors.password && <Alert variant='danger' className='mt-2'>{errors.password}</Alert> }
        </Form.Group>

        <br />

        <Button type='submit' disabled={isLoading} variant='primary'>
          { isLoading ? 'Signing Up...' : 'Sign Up' }
        </Button>
      </Form>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={() => setShowSuccessModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}

export default SignUp