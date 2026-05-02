import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Schedule from './pages/Schedule/Schedule'
import Grades from './pages/Grades/Grades'
import Profile from './pages/Profile/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header /> 

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/grades' element={<Grades />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
