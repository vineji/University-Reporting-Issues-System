import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import StudentMain from './StudentMain';
import ServiceAdmin from './ServiceAdmin';
import ECAdmin from './ECAdmin';
import IssuesAdmin from './IssuesAdmin';
import ServiceStatus from './ServiceStatus';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path='/' element={<App />}/>
      <Route path='/Login' element={<Login />}/>
      <Route path='/StudentMain/:uid' element={<StudentMain/>}/>
      <Route path='/ServiceAdmin' element={<ServiceAdmin/>}/>
      <Route path='/ECAdmin' element={<ECAdmin/>}/>
      <Route path='/IssuesAdmin' element={<IssuesAdmin/>}/>
      <Route path='/ServiceStatus' element={<ServiceStatus/>}/>
    </Routes>
  </Router>,
  document.getElementById('root')
  );


