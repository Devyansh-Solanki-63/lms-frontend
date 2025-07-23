import './App.css'

import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

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
import DisplayLectures from './Pages/Dashboard/DisplayLectures'
import AddLecture from './Pages/Dashboard/AddLecture'
import EditLecture from './Pages/Dashboard/EditLecture'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'
import HomePageSkeleton from './Skeletons/HomePageSkeleton'


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isAppLoading, setIsAppLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      await dispatch(getUserData(false))
      setTimeout(() => {
        setIsAppLoading(false)
      }, 1000);
    }

    loadUserData()
  }, [])


  return (
    <>
      <SkeletonTheme baseColor="#33383e" highlightColor="#414750">
        {!isAppLoading ? (
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/denied" element={<Denied />} />
            <Route path="/courses" element={<CourseList />}></Route>
            <Route path="/course/description" element={<CourseDescription />}></Route>
            <Route path="*" element={<NotFound />}></Route>

            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/course/create" element={<CreateCourse />} />
              <Route path="/course/addlecture" element={<AddLecture />} />
              <Route path="/course/editlecture" element={<EditLecture />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
              <Route path="/user/profile" element={<Profile />}></Route>
              <Route path="/user/editprofile" element={<EditProfile />}></Route>
              <Route path="/checkout" element={<Checkout />}></Route>
              <Route path="/checkout/success" element={<CheckoutSuccess />}></Route>
              <Route path="/checkout/fail" element={<CheckoutFail />}></Route>
              <Route path="/course/displaylectures" element={<DisplayLectures />} />
            </Route>
          </Routes>
        ) : (
          <HomePageSkeleton />
        )}
      </SkeletonTheme>
    </>
  )
}

export default App
