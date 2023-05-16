import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PaymentProvider } from './components/PaymentContext';
import Dashboard from './components/Dashboard';
import PaymentForm from './components/Forms';

function App() {
  return (
    <PaymentProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path="/form" element={<PaymentForm />}></Route>
        </Routes>
      </Router>
    </PaymentProvider>
  );
}

export default App;