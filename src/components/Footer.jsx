import React from 'react'
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX } from 'react-icons/bs'

const Footer = () => {

    const currentDate = new Date()
    const year = currentDate.getFullYear()

    return (
        <footer className='h-[18vh] sm:h-[10vh] py-5 flex sm:flex-row flex-col gap-[10px] items-center justify-between text-white bg-gray-800 sm:px-20'>
            <section className='text-lg'>
                Copyright {year} | All rights reserved
            </section>
            <section className='flex items-center justify-center gap-5 text-2xl text-white'>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsFacebook />
                </a>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsInstagram />
                </a>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsLinkedin />
                </a>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsTwitterX />
                </a>
            </section>
        </footer>
    )
}

export default Footer