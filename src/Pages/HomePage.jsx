import React from 'react'
import { Link } from 'react-router-dom'

import HomeLayout from '../Layouts/HomeLayout'
import HomePageImg from '../Assets/Images/homePageMainImage.png'

const HomePage = () => {
    return (
        <HomeLayout>
            <div className='flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-10 text-white pt-10 pb-10 md:pb-0 mx-3 sm:mx-16'>
                <div className='w-full md:w-1/2 space-y-6 text-center md:text-left'>
                    <h1 className='text-5xl font-semibold'>
                        Find out best
                        <span>&nbsp;</span>
                        <span className='text-yellow-500 font-bold'>
                            Online Courses
                        </span>
                    </h1>
                    <p className='text-xl text-gray-200'>
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>
                    <div className='flex flex-wrap gap-[20px] justify-center md:justify-start'>
                        <Link to="/courses">
                            <button className='bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                                Explore courses
                            </button>
                        </Link>
                        <Link to="/contact">
                            <button className='border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='w-[70%] md:w-1/2 flex items-center justify-center'>
                    <img src={HomePageImg} alt="homepage image" />
                </div>
            </div>
        </HomeLayout>
    );
}

export default HomePage