import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePages/HomePage'
import Header from './components/Headers/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header /> 

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  )
}

export default App
