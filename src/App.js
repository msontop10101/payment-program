import React from 'react';
import { Routes, Route } from "react-router-dom"
import PaymentForm from './components/Forms';
import Home from './components/Home';

import { save as saveData} from './utils/store';
import './App.css';

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path='/admin' element={<PaymentForm onSubmit={(data) => saveData(data)}/>} />
        </Routes>
    </div>
  );
}

export default App;