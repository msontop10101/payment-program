import './App.css';
import { useState, useEffect } from 'react';
import PaymentForm from './components/Forms';
import moneySound from './sound/moneysound.mp3'


function App() {
  const [submittedValues, setSubmittedValues] = useState()

  const [payments, setPayments] = useState([
    { name: 'Kevin Macri', payments: 2050 },
    { name: 'Emanuel Diaz', payments: 300 },
    { name: 'Yao Cabrera', payments: 500 },
    { name: 'Laure y Juani', payments: 530 },
    { name: 'Yamil DIB', payments: 600 },
    { name: 'Luciano Finozzi', payments: 710 },
    { name: 'Martín Luna', payments: 1050 },
    { name: 'Jonatan Correa', payments: 744 },
    { name: 'Sol Chávez', payments: 730 },
    { name: 'Ivan Capdevilla', payments: 987 },
    { name: 'Valentina Silveira', payments: 555 },
    { name: 'Ezequiel Rodriguez', payments: 34 },
    { name: 'Ignacio Díaz', payments: 787 },
    { name: 'Matias Capdevila', payments: 234 },
    { name: 'Ricardo Rocca', payments: 1000 },
    { name: 'Agustín Rodriguez', payments: 999 },
    { name: 'Leonel Nuñez', payments: 330 },
    { name: 'Maximiliano Peralta', payments: 430 },
  ])
  const [audio] = useState(new Audio(moneySound));
  const [newPaymentIndex, setNewPaymentIndex] = useState(null)
  console.log('payment index: ', newPaymentIndex)


  useEffect(() => {
    if (newPaymentIndex !== null) {
      let parent = document.getElementById('list-container')
      let children = parent.children[newPaymentIndex]
      children.classList.add('new-payment')
      const timer = setTimeout(() => {
        setNewPaymentIndex(null);
      }, 3000); // Adjust the duration (in milliseconds) as per your requirement

      return () => {
        clearTimeout(timer);
      };
    }
  }, [newPaymentIndex]);

  

  const sortedByPayments = [...payments].sort((a, b) => b.payments - a.payments);

  const totalPayments = payments.reduce((accumulator, payment) => accumulator + payment.payments, 0);
  useEffect(() => {
    if (submittedValues) {
      console.log('submitted')
      const newData = { name: submittedValues.name, payments: parseInt(submittedValues.amount, 10) }
      const existingPayment = payments.find(payment => payment.name === newData.name);
      if (existingPayment) {
        // update the payments property of the existing object
        const updatedPayments = sortedByPayments.map(payment => {
          if (payment.name === newData.name) {
            return { ...payment, payments: payment.payments + newData.payments };
          } else {
            return payment;
          }
        });
        setPayments(updatedPayments);
        const sortedUpdatedPayments = [...updatedPayments].sort((a, b) => b.payments - a.payments);
        const updatedIndex = sortedUpdatedPayments.findIndex(payment => payment.name === newData.name);
        console.log('Updated_Index:', updatedIndex);
        setNewPaymentIndex(updatedIndex)
      } else {
        const updatedPayments = [...payments, newData];
        setPayments(updatedPayments);
        const sortedUpdatedPayments = [...updatedPayments].sort((a, b) => b.payments - a.payments);
        const newIndex = sortedUpdatedPayments.findIndex(payment => payment.name === newData.name);
        console.log('Index:', newIndex);
        setNewPaymentIndex(newIndex)
      }

      audio.play();
    }
  }, [submittedValues]);








  return (
    <div className="App">
      <PaymentForm setSubmittedValues={setSubmittedValues} />
      <div className='flex justify-center'>

        <div className='my-2 w-[60%] background-image' style={{ fontFamily: 'Bebas Neue' }}>
          <h2 className='font-normal'>Visualización de la base de datos de pagos</h2>
          <div className='flex mx-3 mt-4 justify-between font-semibold text-2xl px-3 bg-slate-300 border rounded py-4'>
            <div className='w-[45%] text-left'><h2>Nombre</h2></div>
            <div className='w-[45%] text-left'><h2>VENTAS</h2></div>
          </div>
          <div id='list-container'>
            {sortedByPayments.map((user, index) => (
              
              <div key={index}  className={`flex mx-3 mt-1 bg-slate-50 opacity-75 even:bg-slate-300 even:opacity-100 italic px-3 text-2xl justify-between border rounded items-center ${newPaymentIndex === index ? 'my-payment' : ''}`}>
                <div>{index + 1}</div>
                <div className='w-[45%] text-left py-2 px-1'>{user.name}</div>
                <div className='w-[45%] text-left py-2 px-1'><span className='text-[green] text-2xl'>$</span> {user.payments}</div>
              </div>
            ))}
          </div>
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
