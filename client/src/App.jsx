import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from "./pages/Home/Home"
import Login from './pages/login/Login';
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
import { GoogleOAuthProvider } from '@react-oauth/google'
import NotFound from './pages/notFound/NotFound';
import AskButton from './components/AskButton';
import { AskButtonContext } from './context/AskButtonContext';
import { useState } from 'react';
function App() {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const [ask, setAsk] = useState(false);
  const handleAsk = () => setAsk(prev => !prev)
  const queryClient = new QueryClient()
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <Router>
      <AskButtonContext.Provider value={{ ask, setAsk }}>
        <div className=" min-h-screen flex w-full flex-col justify-between">
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId={clientId}>
              <Navbar ask={ask} setAsk={setAsk} />
              <AskButton />
              <Routes>
                <Route exact path='/' element={< Home />}>
                  <Route path='' element={<Posts />} />
                  <Route path='/explore' element={<Explore />} />
                  <Route path='/contribute' element={<Contribute />} />
                  <Route path='/posts/:id' element={<Post />} />
                  <Route path='/profile/:userId' element={<Profile />} />
                  <Route path='/my-questions/:userId' element={<MyQuestions />} />
                </Route>

                <Route exact path='/login' element={< Login />}></Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </div>
      </AskButtonContext.Provider>

    </Router>
  )
}

export default App
