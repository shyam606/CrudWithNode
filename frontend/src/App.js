import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainForm from './component/MainForm'
import View from './component/View'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <BrowserRouter>
   

        <Routes>
         <Route path='/' element={<MainForm/>} />
          <Route path='/view' element={<View/>} />
        
        </Routes>
        </BrowserRouter>
        <ToastContainer />
      </>
  )
}

export default App