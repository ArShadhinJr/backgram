import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Singup from './Components/Singup/Singup.jsx'
import firebaseConfig from  './Auth/firebase'
import store from './Components/Store/Store' 
import { Provider } from 'react-redux'
import Home from './Components/Home/Home.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* set react router dom for routing */}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/singup' element={<Singup />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
