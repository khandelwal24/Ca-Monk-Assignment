import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogContent from './Components/BlogContent.jsx';
import Layout from './Components/Layout.jsx';
import Login from './Components/auth/Login.jsx';
import Signup from './Components/auth/signup.jsx';


const App = () => {
  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path="/" element={<Layout/>}>
          <Route index element={<BlogContent />} />
          <Route path="blog/:id" element={<BlogContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
};

export default App