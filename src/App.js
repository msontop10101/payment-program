import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import PaymentForm from './components/Forms';
import Lists from './components/Lists';

import { JSONtoString, collectionName, database, save as saveData, strorageKey} from './utils/store';

import { collection, onSnapshot, query } from 'firebase/firestore';


function App() {


  useEffect(() => {

    const q = query(collection(database, collectionName));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {

      if (querySnapshot.empty) {
        // clear localstorage
        localStorage.removeItem(strorageKey);
      }

      const entry = {};

      querySnapshot.forEach((doc) => {
        // cities.push(doc.data().name);
        const { payId, ...rest } = doc.data();

        entry[payId] = {
          id: doc.id,
          ...rest
        }
      });

      localStorage.setItem(strorageKey, JSONtoString(entry));
    });

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Lists />} />
        <Route path='/admin' element={<PaymentForm onSubmit={(data) => saveData(data)}/>} />
        </Routes>
    </div>
  );
}

export default App;

