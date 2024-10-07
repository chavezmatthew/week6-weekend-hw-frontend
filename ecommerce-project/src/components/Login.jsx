import { useState } from 'react'
import axios from 'axios'
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap'

const Login = () => {

  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modalMessage, setModalMessage] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [error, setError] = useState(null)
  const [errors, setErrors] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }

    setIsLoading(true)
    setError(null)

    const credentials = {
      "username_or_email": usernameOrEmail,
      "password": password
    }
    console.log(credentials)

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = response.data;
      console.log("User Logged In:", data)

      setShowSuccessModal(true)
      setModalMessage(`Welcome back, ${data.username || data.email}!`)

      setUsernameOrEmail('')
      setPassword('')

    } catch (error) {
      console.log("Error", error)
      setError(error.response ? error.response.data.error : "An unexpected error occurred");
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!usernameOrEmail) errors.usernameOrEmail = "Username or Email is required"
    if (!password) errors.password = "Password is required"
    return errors
  }

  return (
    <Container>

      { isLoading && <Alert variant='info'>Logging in...</Alert> }
      { error && <Alert variant='danger'>Error: {error}</Alert> }

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId='formGroupUsernameOrEmail'>
          <Form.Label>Username or Email:</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter your username or email' 
            value={usernameOrEmail} 
            onChange={(e) => setUsernameOrEmail(e.target.value) }
          />
          { errors?.usernameOrEmail && <Alert variant='danger'>{errors.usernameOrEmail}</Alert> }
        </Form.Group>

        <br />

        <Form.Group controlId='formGroupPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='Enter your password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value) }
          />
          { errors?.password && <Alert variant='danger'>{errors.password}</Alert> }
        </Form.Group>

        <br />

        <Button type='submit' disabled={isLoading}>
          { isLoading ? 'Logging in...' : 'Log In' }
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

export default Login