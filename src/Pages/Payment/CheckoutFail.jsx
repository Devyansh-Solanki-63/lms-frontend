import React from 'react'
import { Link } from 'react-router-dom';

import errorImg from '../../Assets/Images/paymentError.webp';
import HomeLayout from '../../Layouts/HomeLayout';

const CheckoutFail = () => {
  return (
    <HomeLayout>
      <div className="flex-1 flex items-center justify-center text-white">
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-[#d72828] absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Payment Failed</h1>

          <div className="px-4 flex flex-col items-center justify-center">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">
                Oops! Something Went Wrong
              </h2>
              <p>
                Please try again later
              </p>

            </div>
            <div className='mt-[25px] w-[60px] h-[60px]'>
              <img src={errorImg} alt="" className='w-full h-full' />
            </div>
          </div>

          <Link to="/" className="bg-[#d72828] hover:bg-[#8c1212] transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg">
            <button>Go to dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  )
}

export default CheckoutFail