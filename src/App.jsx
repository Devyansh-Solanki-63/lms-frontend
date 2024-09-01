import './App.css'

import {Route, Routes} from 'react-router-dom'

// import HomeLayout from './Layouts/HomeLayout'
// import Footer from './components/Footer'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
      </Routes>
    </>
  )
}

export default App
