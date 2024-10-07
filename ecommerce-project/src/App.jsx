import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import ProductCatalog from './components/ProductCatalog';
import TrackOrder from './components/TrackOrder';
import CustomerDetails from './components/CustomerDetails';
import EditCustomer from './components/EditCustomer';
import ProductDetails from './components/ProductDetails';
import EditProduct from './components/EditProduct';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <div>

    <NavigationBar/>
      
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/customers' element={<CustomerList/>} />
      <Route path='/add-customers' element={<CustomerForm/>} />
      <Route path='/customers/:id' element={<CustomerDetails />} />
      <Route path='/edit-customer/:id' element={<EditCustomer />} />

      <Route path='/products/:id' element={<ProductDetails />} />
      <Route path='/product-catalog' element={<ProductCatalog/>} />
      <Route path='/edit-product/:id' element={<EditProduct />} />
      <Route path='/add-product' element={<AddProduct/>} />


      <Route path='/track-order-status' element={<TrackOrder/>} />

      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />

    </Routes>

    </div>
  )
}

export default App