import './App.css';
import Home from './components/Home';
import PaymentForm from './components/Forms';
import { Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from 'react';


function App() {
  const [submittedData, setSubmittedData] = useState()
  const [paymentData, setPaymentData] = useState({})

  const handleFormSubmit = (data) => {
    console.log('Data',data)
    setSubmittedData(data);
  };
  console.log('submitted:',submittedData)

  useEffect(() => {
    if (submittedData) {
      // Update paymentData with the new object
      const newData = {
        ...paymentData,
        name: submittedData.name,
        amount: submittedData.amount,
      };
      setPaymentData(newData);
    }
  }, [submittedData]);

  console.log(submittedData)


  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home submittedValues={submittedData}/>} />
          <Route path='/admin' element={<PaymentForm onSubmit={handleFormSubmit}/>} />
        </Routes>
    </div>
  );
}

export default App;