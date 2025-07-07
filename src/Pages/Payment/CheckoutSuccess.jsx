import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUserData } from '../../Redux/Slices/AuthSlice';
import successImg from '../../Assets/Images/successThumbsUp.webp';
import HomeLayout from '../../Layouts/HomeLayout';
import confetti from 'canvas-confetti';


const CheckoutSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    })

    useEffect(() => {
        // Simple burst animation
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
        });

        // Optional: Repeated bursts for celebration feel
        const interval = setInterval(() => {
            confetti({
                particleCount: 100,
                spread: 60,
                origin: {
                    x: Math.random(),
                    y: Math.random() - 0.2,
                },
            });
        }, 800);

        // Cleanup
        setTimeout(() => clearInterval(interval), 4000); // run for 4s
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center text-white">
                <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-[#3fab76] absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Payment Successfull</h1>

                    <div className="px-4 flex flex-col items-center justify-center">
                        <div className="text-center space-y-2">
                            <h2 className="text-lg font-semibold">
                                Welcome to the pro bundle
                            </h2>
                            <p className="text-left">
                                Now you can enjoy all the courses.
                            </p>

                        </div>
                        <div className='mt-[25px] w-[60px] h-[60px]'>
                            <img src={successImg} alt="" className='w-full h-full' />
                        </div>
                    </div>

                    <Link to="/" className="bg-[#3fab76] hover:bg-[#2a7852] transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg">
                        <button>Go to dashboard</button>
                    </Link>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CheckoutSuccess