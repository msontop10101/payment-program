import { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import moneySound from '../sound/moneysound.mp3'
// import cheer from '../sound/cheer.mp3'
import { load as loadData } from '../utils/store';


function Home() {
    // const [audio] = useState(new Audio(moneySound));
    const [play, {isPlaying, stop}] = useSound(moneySound, {playbackRate: 0.9});
    // const [cheerAudio] = useState(new Audio(cheer))
    const [payments, setPayments] = useState(() => loadData());
    // const newPaymentIndex = null;
    const previousTotal = useRef(null);

    useEffect(() => {

        const intervalId = setInterval(()=>{
            const data = loadData();
            // console.log("Loaded:", data);

            setPayments(()=>data);
        }, 1500)

      return () => {
        clearInterval(intervalId);
      };
    }, [])

    useEffect(()=>{
        console.log("Updated!");
    },[payments])

    // Sort by amount
    const sortedByPayments = [...payments].sort((a, b) => Number(b.amount) - Number(a.amount));
    // Calculate total
    const totalPayments = payments.reduce((accumulator, payment) => accumulator + Number(payment.amount), 0);

    if (previousTotal.current === null){
        previousTotal.current = totalPayments;
    }
    else if ((previousTotal.current !== null) && (previousTotal.current !== totalPayments)){
        // console.log("Total changed!")

        if (isPlaying){
            stop();
        }

        play()
        previousTotal.current = totalPayments;
    }


    return (
        <div className="leaderboard">
            <header>

                <div className='logo'>
                    <img
                        src="/assets/icons/money-bag.svg"
                        alt="Money"
                        // className="leaderboard__picture"
                    />
                </div>

                <h1 className="leaderboard__title">
                    <span className="leaderboard__title--top">
                        Pagos
                    </span>
                    <span className="leaderboard__title--bottom">Vista en vivo de los pagos <br/> desde la base de datos</span>
                </h1>
            </header>

            <main className="leaderboard__profiles">
                {sortedByPayments.map((user, index) => (
                    <article className="leaderboard__profile" key={index}>
                        <div>
                            <img
                                src="/assets/icons/user.svg"
                                alt="user"
                                className="leaderboard__picture"
                            />
                            <span className="leaderboard__name">{user.name.toLowerCase()}</span>
                        </div>

                        <span className="leaderboard__value">
                            <img
                                src="/assets/icons/money-1.svg"
                                alt="cash"
                            // className="leaderboard__picture"
                            />
                            <span>{user.amount}</span>
                        </span>
                    </article>  
                ))}


                <div className='flex mx-3 mt-4 foot justify-between font-semibold text-2xl px-3 bg-slate-100 border rounded py-4'>
                    <div className='w-[45%] text-center'>
                        <h2>TOTAL</h2>
                    </div>
                    <div className='w-[45%] text-center'>
                        <div className="fin">
                            <img
                                src="/assets/icons/money.svg"
                                alt="user"
                                className="leaderboard__picture"
                            />
                            <span className='text-[green] text-2xl'>
                                {totalPayments}
                            </span>
                            
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Home;
