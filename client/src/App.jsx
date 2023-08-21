import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react';
import Admin from './pages/admin/Admin';
import AdminPosts from './pages/admin/adminPosts/AdminPosts';
import Dashboard from './pages/admin/dashboard/Dashboard';
import ReportedPosts from './pages/admin/reportedPosts/ReportedPosts';
import Users from './pages/admin/users/Users';


const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user) {
    return true;
  }
  return false;
};

const ProtectedRoutes = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const [ask, setAsk] = useState(false);
  const handleAsk = () => setAsk(prev => !prev)
  const queryClient = new QueryClient()
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <Router>
      <AskButtonContext.Provider value={{ ask, setAsk }}>
        <div className="min-h-screen flex w-full flex-col justify-between">
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
                  <Route element={<ProtectedRoutes />}>
                    <Route path='/profile/:userId' element={<Profile />} />
                    <Route path='/my-questions/:userId' element={<MyQuestions />} />
                  </Route>
                </Route>
                <Route element={<ProtectedRoutes />}>
                  <Route exact path='/admin' element={< Admin />}>
                    <Route path='' element={<Dashboard />} />
                    <Route path='admin-posts' element={<AdminPosts />} />
                    <Route path='users' element={<Users />} />
                    <Route path='reported-posts' element={<ReportedPosts />} />
                  </Route>
                </Route>

                <Route exact path='/login' element={< Login />}></Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </GoogleOAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </div>
      </AskButtonContext.Provider>

    </Router>
  )
}

export default App
