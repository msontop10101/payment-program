import React from 'react';
import { Routes, Route } from "react-router-dom"
import PaymentForm from './components/Forms';
import Home from './components/Home';

import { JSONtoString, collection, database, save as saveData, strorageKey} from './utils/store';
import { onValue, ref } from 'firebase/database';
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


const paymentRef = ref(database, collection);

onValue(paymentRef, (snapshot) => {
  const data = snapshot.val() || {};
  const entry = {};

  Object.entries(data).forEach(([remoteId, remoteData]) => {
    const { payId, ...rest } = remoteData;

    entry[payId] = {
      id: remoteId,
      ...rest
    }
  })

  localStorage.setItem(strorageKey, JSONtoString(entry));
});
