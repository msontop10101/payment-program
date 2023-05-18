import '../App.css';
// import { useState, useEffect } from 'react';
// import moneySound from '../sound/moneysound.mp3'
// import cheer from '../sound/cheer.mp3'
import { load as loadData } from '../utils/store';



// const defaultPayments = [
//     { name: 'Kevin Macri', payments: 2050 },
//     { name: 'Emanuel Diaz', payments: 300 },
//     { name: 'Yao Cabrera', payments: 500 },
//     { name: 'Laure y Juani', payments: 530 },
//     { name: 'Yamil DIB', payments: 600 },
//     { name: 'Luciano Finozzi', payments: 710 },
//     { name: 'Martín Luna', payments: 1050 },
//     { name: 'Jonatan Correa', payments: 744 },
//     { name: 'Sol Chávez', payments: 730 },
//     { name: 'Ivan Capdevilla', payments: 987 },
//     { name: 'Valentina Silveira', payments: 555 },
//     { name: 'Ezequiel Rodriguez', payments: 34 },
//     { name: 'Ignacio Díaz', payments: 787 },
//     { name: 'Matias Capdevila', payments: 234 },
//     { name: 'Ricardo Rocca', payments: 1000 },
//     { name: 'Agustín Rodriguez', payments: 999 },
//     { name: 'Leonel Nuñez', payments: 330 },
//     { name: 'Maximiliano Peralta', payments: 430 },
// ]



function Home() {
    // const [submittedValues, setSubmittedValues] = useState({})    

    // const [payments, setPayments] = useState(defaultPayments);
    // const [audio] = useState(new Audio(moneySound));
    // const [cheerAudio] = useState(new Audio(cheer))
    // const [newPaymentIndex, setNewPaymentIndex] = useState(null)
    const payments = loadData();
    const newPaymentIndex = null


    // Sort by amount
    const sortedByPayments = [...payments].sort((a, b) => Number(b.amount) - Number(a.amount));
    // Calculate total
    const totalPayments = payments.reduce((accumulator, payment) => accumulator + Number(payment.amount), 0);

    console.log(totalPayments)


    return (
        <div className="App">
            
            <div className='flex justify-center'>

                <div className='my-2 w-[60%] background-image' style={{ fontFamily: 'Poppins' }}>
                    <h2 className='font-normal'>Visualización de la base de datos de pagos</h2>
                    <div className='flex mx-3 mt-4 justify-between font-semibold text-2xl px-3 bg-slate-300 border rounded py-4'>
                        <div className='w-[45%] text-left'><h2>Nombre</h2></div>
                        <div className='w-[45%] text-left'><h2>VENTAS</h2></div>
                    </div>
                    <div id='list-container'>
                        {sortedByPayments.map((user, index) => (

                            <div key={index} className={`flex mx-3 mt-1 bg-slate-50 opacity-75 even:bg-slate-300 even:opacity-100 italic px-3 text-2xl justify-between border rounded items-center ${newPaymentIndex === index ? 'my-payment' : ''}`}>
                                <div>{index + 1}</div>
                                <div className='w-[45%] text-left py-2 px-1'>{user.name}</div>
                                <div className='w-[45%] text-left py-2 px-1'><span className='text-[green] text-2xl'>$</span> {user.amount}</div>
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

export default Home;
