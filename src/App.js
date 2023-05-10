import './App.css';
import { useState, useEffect } from 'react';
import PaymentForm from './components/Forms';


function App() {
  const [submittedValues, setSubmittedValues] = useState()
  const [payments, setPayments] = useState([
    { name: 'John', payments: [100] },
    { name: 'Jane', payments: [150, 250, 350] },
    { name: 'Bob', payments: [200, 300, 400] },
  ])
  useEffect(() => {
    console.log(submittedValues)
    if (submittedValues) {
      const newData = { name: submittedValues.name, payments: [submittedValues.amount]  }
      setPayments([...payments, newData])
    }
  }, [submittedValues])

  return (
    <div className="App">
      <PaymentForm setSubmittedValues={setSubmittedValues} />
      <div className='my-2'>
        <h2 className='font-semibold'>Payment Database Display</h2>
        <div className='flex mx-3 mt-4 justify-between font-semibold bg-slate-300 border rounded py-4'>
          <div className='w-[30%]'><h2>Name</h2></div>
          <div className='w-[30%]'><h2>Payment</h2></div>
          <div className='w-[30%]'><h2>Date</h2></div>
        </div>
        {payments.map((user, index) => (
          <div key={index} className='flex mx-3 mt-1 even:bg-slate-300 justify-between border rounded'>
            <div className='w-[30%] '>{user.name}</div>
            <div className='w-[30%]'>
              <ul>
                {user.payments.map((payment, index) => (
                  <li key={index}>${payment}</li>
                ))}
              </ul>
            </div>
            <div className='w-[30%]'>
              Date..
            </div>
          </div>
        ))}
      </div>
      {/* <h2>Payment Database Display</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Payments</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>
                  <ul>
                    {user.payments.map((payment, index) => (
                      <li key={index}>${payment}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div> */}
    </div>
  );
}

export default App;
