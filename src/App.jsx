import './App.css'

import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import { getUserData } from './Redux/Slices/AuthSlice'


function App() {
  const dispatch = useDispatch()
  const [isAppLoading, setIsAppLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      const result = await dispatch(getUserData(false))
      setIsAppLoading(false)
    }

    loadUserData()
  }, [])
  

  return (
    <>
      {!isAppLoading ? (
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/denied" element={<Denied />} />

          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="/course/create" element={<CreateCourse />}></Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
            <Route path="/user/profile" element={<Profile />}></Route>
            <Route path="/user/editprofile" element={<EditProfile />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/checkout/success" element={<CheckoutSuccess />}></Route>
            <Route path="/checkout/fail" element={<CheckoutFail />}></Route>
          </Route>
          
          <Route path="/courses" element={<CourseList />}></Route>
          <Route path="/course/description" element={<CourseDescription />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      ) : (
        <>loading...</>
      )}
    </>
  )
}

export default App
