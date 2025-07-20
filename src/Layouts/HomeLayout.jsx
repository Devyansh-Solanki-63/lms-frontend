import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../Redux/Slices/AuthSlice'


const HomeLayout = ({children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking is user is logged in or not
    const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn);

    // for displaying content according to the roles
    const role = useSelector(state => state?.auth?.role);

    const changeWidth = () => {
        const drawerSide = document.querySelector('.drawer-side')
        drawerSide.style.width = 'auto'
    }

    const hideDrawer = () => {
        const ele = document.querySelector('.drawer-toggle')
        ele.checked = false

        const drawerSide = document.querySelector('.drawer-side')
        drawerSide.style.width = '0px'
    }

    const handleLogout = async (e) => {
        e.preventDefault();

        const response = await dispatch(logoutUser());
        if(response?.payload?.success){
            navigate('/')
        }
    }

  return (
    <>
        <div>
            <div className="drawer absolute left-0 z-50 w-fit">
                <input type="checkbox" className="drawer-toggle" id='my-drawer' />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"}
                            className="font-bold text-white m-4"
                        />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className='drawer-overlay'>
                    </label>
                    <ul className="menu p-4 w-80 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
                        <li className='w-fit absolute right-2 z-50'>
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li><Link to="/">Home</Link></li>
                        {isLoggedIn && role === "ADMIN" && (
                            <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                        )}
                        <li><Link to="/courses">All courses</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        {!isLoggedIn && (
                            <div className='w-[90%] absolute bottom-4 flex justify-center items-center py-2'>
                                <button className='bg-primary text-white px-4 py-1 font-semibold rounded-s-md w-full'>
                                    <Link to="/login">Login</Link>
                                </button>
                                <button className='bg-secondary text-white px-4 py-1 font-semibold rounded-e-md w-full'>
                                    <Link to="/signup">Signup</Link>
                                </button>
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className='w-[90%] absolute bottom-4 flex justify-center items-center py-2'>
                                <button className='bg-primary text-white px-4 py-1 font-semibold rounded-s-md w-full'>
                                    <Link to="/user/profile">Profile</Link>
                                </button>
                                <button className='bg-secondary text-white px-4 py-1 font-semibold rounded-e-md w-full'>
                                    <Link onClick={handleLogout}>Logout</Link>
                                </button>
                            </div>
                        )}
                    </ul>
                </div>
            </div>

            <div className='min-h-[82vh] sm:min-h-[90vh]'>
                {children}
            </div>

            <Footer />
        </div>
    </>
  )
}

export default HomeLayout