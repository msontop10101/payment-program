import './App.css';
import Home from './components/Home';
import PaymentForm from './components/Forms';
import { Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from 'react';



function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    console.log('Data', data);
    setSubmittedData(data);
  };

  console.log('Submitted Data: ', submittedData);

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home submittedData={submittedData}/>} />
          <Route path="/admin" element={<PaymentForm onSubmit={handleFormSubmit} />} />
        </Routes>
    </div>
  );
}

export default App;