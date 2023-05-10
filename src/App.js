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
  const [totalPayments, setTotalPayments] = useState()


  useEffect(() => {
    console.log(submittedValues)
    if (submittedValues) {
      const newData = { name: submittedValues.name, payments: submittedValues.amount }
      setPayments([...payments, newData])
    }
    const totalPayments = payments.reduce((accumulator, payment) => accumulator + payment.payments, 0);
    setTotalPayments(totalPayments)
  }, [submittedValues])

  return (
    <div className="App">
      <PaymentForm setSubmittedValues={setSubmittedValues} />
      <div className='flex justify-center'>
        <div className='my-2 w-[60%]' style={{fontFamily:'Bebas Neue' }}>
          <h2 className='font-normal'>Visualización de la base de datos de pagos</h2>
          <div className='flex mx-3 mt-4 justify-between font-semibold text-2xl px-3 bg-slate-300 border rounded py-4'>
            <div className='w-[45%] text-left'><h2>Nombre</h2></div>
            <div className='w-[45%] text-left'><h2>VENTAS</h2></div>
          </div>
          {payments.map((user, index) => (
            <div key={index} className='flex mx-3 mt-1 even:bg-slate-300 italic px-3 text-xl justify-between border rounded'>
              <div className='w-[45%] text-left py-2 px-1'>{user.name}</div>
              <div className='w-[45%] text-left py-2 px-1'><span className='text-[green] text-2xl'>$</span>{user.payments}</div>
            </div>
          ))}
          <div className='flex mx-3 mt-4 justify-between font-semibold text-2xl px-3 bg-slate-300 border rounded py-4'>
            <div className='w-[45%] text-left'><h2>TOTAL</h2></div>
            <div className='w-[45%] text-left'><h2><span className='text-[green] text-2xl'>$</span>{totalPayments}</h2></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
