import {BrowserRouter, Routes , Route} from 'react-router-dom'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ComplaintRegister from './pages/ComplaintRegister';
import Complaints from './pages/Complaints';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefenseTutorials from './pages/DefenseTutorials';
import NewsArticles from './pages/NewsArticles';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/register-complaint' element={<ComplaintRegister/>} />
          <Route path='/show-complaints' element={<Complaints/>} />
          <Route path='/tutorials' element={<DefenseTutorials/>} />
          <Route path='/getnews' element={<NewsArticles/>} />

        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
