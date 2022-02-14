import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './banner.css';
import './App.css';
import './navbar.css';
import App, { TestApp } from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coinpage from './routes/coinpage';
import Dashboard from './components/dashboard';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TestApp/>}/>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route path=":coinid" element={<Coinpage/>}/>
      </Route>
      <Route 
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }      
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
