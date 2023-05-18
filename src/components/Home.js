import '../App.css';
import { useEffect, useState } from 'react';
// import moneySound from '../sound/moneysound.mp3'
// import cheer from '../sound/cheer.mp3'
import { load as loadData } from '../utils/store';


function Home() {
    // const [audio] = useState(new Audio(moneySound));
    // const [cheerAudio] = useState(new Audio(cheer))
    const [payments, setPayments] = useState(()=>loadData());
    const newPaymentIndex = null;

    useEffect(() => {

        window.addEventListener('storage', () => {
            setPayments(()=>loadData());
        })

      return () => {
          window.removeEventListener('storage', ()=>{console.log("Stoped!")});
      };
    }, [])


    // Sort by amount
    const sortedByPayments = [...payments].sort((a, b) => Number(b.amount) - Number(a.amount));
    // Calculate total
    const totalPayments = payments.reduce((accumulator, payment) => accumulator + Number(payment.amount), 0);

    return (
        <div className="App">
            <div className='flex justify-center'>

                <div className='my-2 w-[90%] background-image' style={{ fontFamily: 'Poppins' }}>
                    <div className='md:w-[70%] mx-auto'>
                        <h2 className='font-normal'>Visualización de la base de datos de pagos</h2>
                        <div className='flex mx-3 mt-4 justify-between font-semibold text-2xl px-3 bg-slate-300 border rounded py-4'>
                            <div className='w-[45%] text-center'><h2>Nombre</h2></div>
                            <div className='w-[45%] text-center'><h2>VENTAS</h2></div>
                        </div>
                        <div id='list-container'>
                            {sortedByPayments.map((user, index) => (

                                <div key={index} className={`flex mx-3 mt-1 bg-slate-50 opacity-75 even:bg-slate-300 even:opacity-100 italic px-3 text-2xl justify-between border rounded items-center ${newPaymentIndex === index ? 'my-payment' : ''}`}>
                                    <div>{index + 1}</div>
                                    <div className='w-[45%] text-center py-2 px-1'>{user.name}</div>
                                    <div className='w-[45%] text-center py-2 px-1'><span className='text-[green] text-2xl'>$</span> {user.amount}</div>
                                </div>
                            ))}
                        </div>
                        <div className='flex mx-3 mt-4 justify-between font-semibold text-2xl px-3 bg-slate-300 border rounded py-4'>
                            <div className='w-[45%] text-center'><h2>TOTAL</h2></div>
                            <div className='w-[45%] text-center'><h2><span className='text-[green] text-2xl'>$</span> {totalPayments}</h2></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
