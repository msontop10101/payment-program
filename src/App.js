import './App.css';
import { useState, useEffect } from 'react';
import PaymentForm from './components/Forms';


function App() {
  const [submittedValues, setSubmittedValues] = useState()

  const [payments, setPayments] = useState([
    { name: 'Kevin Macri', payments: 2050 },
    { name: 'Emanuel Diaz', payments: 300 },
    { name: 'Yao Cabrera', payments: 500 },
    { name: 'Laure y Juani ', payments: 530 },
    { name: 'Yamil DIB  ', payments: 600 },
    { name: 'Luciano Finozzi ', payments: 710 },
    { name: 'Martín Luna ', payments: 1050 },
    { name: 'Jonatan Correa ', payments: 744 },
    { name: 'Sol Chávez  ', payments: 730 },
    { name: 'Ivan Capdevilla ', payments: 987 },
    { name: 'Valentina Silveira ', payments: 555 },
    { name: 'Ezequiel Rodriguez  ', payments: 34 },
    { name: 'Ignacio Díaz  ', payments: 787 },
    { name: 'Matias Capdevila ', payments: 234 },
    { name: 'Ricardo Rocca ', payments: 1000 },
    { name: 'Agustín Rodriguez ', payments: 999 },
    { name: 'Leonel Nuñez ', payments: 330 },
    { name: 'Maximiliano Peralta ', payments: 430 },
  ])

  const totalPayments = payments.reduce((accumulator, payment) => accumulator + payment.payments, 0);
  // const [addupPayments, setAddupPayments] = useState([2050, 300, 730]);
  // console.log(addupPayments)
  console.log(totalPayments)
  // const totalPayments =  addupPayments.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  useEffect(() => {
    console.log(submittedValues)
    if (submittedValues) {
      const newData = { name: submittedValues.name, payments: parseInt(submittedValues.amount, 10) }
      setPayments([...payments, newData])
      // setAddupPayments([...addupPayments, parseInt(submittedValues.amount, 10)])
      const totalPayments =  payments.reduce((accumulator, payment) => accumulator + payment.payments, 0);
    }
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
              <div className='w-[45%] text-left py-2 px-1'><span className='text-[green] text-2xl'>$</span> {user.payments}</div>
            </div>
          ))}
          <div className='flex mx-3 mt-4 justify-between font-semibold text-2xl px-3 bg-slate-300 border rounded py-4'>
            <div className='w-[45%] text-left'><h2>TOTAL</h2></div>
            <div className='w-[45%] text-left'><h2><span className='text-[green] text-2xl'>$</span> {totalPayments}</h2></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
