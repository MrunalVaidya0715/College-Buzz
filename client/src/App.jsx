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
import Profile from './pages/profile/Profile';
import MyQuestions from './pages/myQuestions/MyQuestions';
import Explore from './pages/explore/Explore';
import Contribute from './pages/contribute/Contribute';

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
              <Route path='/explore' element={<Explore />} />
              <Route path='/contribute' element={<Contribute />} />
              <Route path='/posts/:id' element={<Post />} />
              <Route path='/profile/:userId' element={<Profile />} />
              <Route path='/my-questions/:userId' element={<MyQuestions/>} />
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
