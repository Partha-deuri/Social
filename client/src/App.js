import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PageNotFound from "./pages/Error/PageNotFound";
import Messenger from "./pages/messenger/Messenger";
import PostPage from "./pages/postPage/PostPage";
import axios from "axios";
import { useUserStore } from "./zustand";
import Redirect from "./components/Redirect";
import EditProfile from "./pages/editProfile/EditProfile";
import Conversation from "./components/Conversation";
import { useEffect, useRef} from "react";
import { io } from "socket.io-client";
import ChangePassword from "./components/ChangePassword";


function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL
  const user = useUserStore(s => s.user);
  const socket = useRef();
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
  }, [user])

  const pages = createBrowserRouter([
    {
      path: '/',
      element: user ? <Home socket={socket} /> : <Redirect to={'/login'} />
    },
    {
      path: '/profile/:uid',
      element: user ? <Profile /> : <Redirect to={'/login'} />
    },
    {
      path: '/editprofile',
      element: user ? <EditProfile /> : <Redirect to={'/'} />
    },
    {
      path: '/login',
      element: user ? <Redirect to={'/'} /> : <Login />
    },
    {
      path: '/register',
      element: user ? <Redirect to={'/editprofile'} /> : <Register />
    },
    {
      path: '/forgot-password',
      element: user ? <Redirect to={'/'} /> : <ForgotPassword />
    },
    {
      path: '/change-password',
      element: user ? <ChangePassword /> : <Redirect to={'/'} />
    },
    {
      path: '/messenger',
      element: user ? <Messenger socket={socket} /> : <Redirect to={'/login'} />,
      children: [
        {
          path: '',
          element: user ?
            <div className="hidden md:flex border-2 shadow h-full w-full rounded-lg items-center justify-center">
              <div className="text-3xl font-bold text-slate-400 cursor-default">
                <span>Open a Conversation to start Chat</span>
              </div>
            </div>
            :
            <Redirect to={'/login'} />,
        },
        {
          path: ':convid',
          element: user ? <Conversation /> : <Redirect to={'/login'} />,
        }]
    },
    {
      path: '/post/:postid',
      element: user ? <PostPage /> : <Redirect to={'/login'} />
    },
    {
      path: '*',
      element: <PageNotFound />
    }

  ])

  return (
    <div className="app">
      <RouterProvider router={pages} />
    </div>
  );
}

export default App;
