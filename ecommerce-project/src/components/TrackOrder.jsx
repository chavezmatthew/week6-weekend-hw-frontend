import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { ProgressBar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const TrackOrder = () => {
  const [orderID, setOrderID] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [resetCounter, setResetCounter] = useState(0);
  
  const navigate = useNavigate();

  const [orderStatus, setOrderStatus] = useState({
    "variant": "danger", 
    "message": "In Progress",
    "value": 50
  })


  const trackOrder = async (e) => {
    e.preventDefault(); 

    try {
      setIsLoading(true)

      const response = await axios.get(`http://127.0.0.1:5000/orders/${orderID}`)
      console.log(response)
      setOrder(response.data)

        const currentDate = new Date(); 
        const delivery = new Date(response.data.expected_delivery_date)
        const isLate = currentDate > delivery 

        if (isLate) {
          setOrderStatus({
            "variant": "success", 
            "message": "Complete",
            "value": 100
          })
        } else {
          setOrderStatus({
            "variant": "danger", 
            "message": "In Progress",
            "value": 50
          })
        }

      setOrderID('')

    } catch (error){
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetAndNavigate = () => {
    setOrder(null)
    setOrderID('')
    setOrderStatus({
      "variant": "danger", 
      "message": "In Progress",
      "value": 50
    })
    navigate('/track-order-status')
    setResetCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <Container>

      <Form onSubmit={trackOrder}>
        <Form.Group controlId='formBasicOrderID'>
          <Form.Label>What order would you like to track?</Form.Label>
          <Form.Control type='number' value={orderID} onChange={(e) => setOrderID(e.target.value)}/>
        </Form.Group>

        <br />

        <Button type="submit">Submit</Button>
      </Form>

      <br />

      <div className='order-details-container'>
        { order && 
          <div>
            <h5>Expected Delivery Date:</h5>
            <p>{order.expected_delivery_date}</p>
            <h5>Order Date:</h5>
            <p>{order.order_date}</p>
            <h5>Order ID:</h5>
            <p>{order.id}</p>
            <h5>Shipment Details:</h5>
            <p>{order.shipment_details}</p>
            <h5>Order Status:</h5>
            <p>{order.status}</p>
            <h5>Products:</h5>
              {order.products.map((product) => (
                <div key={product.product_id}>
                  <h6>Product Name:</h6>
                  <p>{product.product_name}</p>
                  <h6>Quantity:</h6>
                  <p>{product.quantity}</p>
                </div>
              ))}
            <h5>Total Price:</h5>
            <p>{order.total_price}</p>

            <h3>Order Status:</h3>
            <p>{orderStatus.message}</p>
            <ProgressBar variant={orderStatus.variant} now={orderStatus.value} />
            <br/>
            <div className="d-flex justify-content-center">
              <Button onClick={resetAndNavigate} className='btn btn-success'>Track Another Order</Button>
            </div>
            <br/>
          </div>
        }
      </div>

    </Container>
  )
}

export default TrackOrder