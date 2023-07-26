import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from "./pages/Home/Home"
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Post from './pages/post/Post';
import Posts from './pages/posts/Posts';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()
  return (
    <Router>
      <div className=" min-h-screen flex w-full flex-col justify-between">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>
            <Route exact path='/' element={< Home />}>
              <Route path='' element={<Posts />} />
              <Route path='/posts/:id' element={<Post />} />
            </Route>

            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/register' element={< Register />}></Route>
          </Routes>
        </QueryClientProvider>
      </div>


    </Router>
  )
}

export default App
