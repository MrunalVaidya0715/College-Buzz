import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from "./pages/Home/Home"
import Login from './pages/login/Login';
import Register from './pages/register/Register';


function App() {


  return (
    <Router>
      <div className="App border-2 min-h-screen flex w-full flex-col justify-between">
        <Navbar />
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/login' element={< Login />}></Route>
          <Route exact path='/register' element={< Register />}></Route>
        </Routes>
      </div>


    </Router>
  )
}

export default App
