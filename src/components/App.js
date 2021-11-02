import React from 'react'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/GlobalStyle.css'
import Login from './users/Login';

function App() {

  return (
    <Navbar />,
    <Login/>
 );
}

export default App;