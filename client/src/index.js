import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';
import Success from './routes/Success';
// import Cancel from './routes/Cancel';
// import Contact from './routes/Contact';

ReactDOM.render( 
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/success' element={<Success />} />
        {/* <Route path='/cancel' element={<Cancel />} />
        <Route path='/contact' element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  </ChakraProvider>, 
document.querySelector('#root'));