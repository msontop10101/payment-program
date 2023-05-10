import './App.css';
import { useState, useEffect } from 'react';
import PaymentForm from './components/Forms';


function App() {
  const [submittedValues, setSubmittedValues] = useState()
  const [payments, setPayments] = useState([
    { name: 'Kevin Macri', payments: 2050 },
    { name: 'Emanuel Diaz', payments: 300 },
    { name: 'Cristian Fernandez ', payments: 730 },
  ])
  useEffect(() => {
    console.log(submittedValues)
    if (submittedValues) {
      const newData = { name: submittedValues.name, payments: submittedValues.amount }
      setPayments([...payments, newData])
    }
  }, [submittedValues])

  return (
    <div className="App">
      <PaymentForm setSubmittedValues={setSubmittedValues} />
      <div className='flex justify-center'>
        <div className='my-2 w-[60%]'>
          <h2 className='font-semibold'>Visualización de la base de datos de pagos</h2>
          <div className='flex mx-3 mt-4 justify-between font-semibold bg-slate-300 border rounded py-4'>
            <div className='w-[45%] text-left'><h2>Nombre</h2></div>
            <div className='w-[45%] text-left'><h2>Pago</h2></div>
          </div>
          {payments.map((user, index) => (
            <div key={index} className='flex mx-3 mt-1 even:bg-slate-300 justify-between border rounded'>
              <div className='w-[45%] text-left py-2 px-1'>{user.name}</div>
              <div className='w-[45%] text-left py-2 px-1'>${user.payments}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
