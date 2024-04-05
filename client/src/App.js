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
import { Navigate } from "react-router-dom";
import EditProfile from "./pages/editProfile/EditProfile";
import Conversation from "./components/Conversation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChangePassword from "./pages/auth/ChangePassword";
import SearchPage from "./components/SearchPage";
import WakeUp from "./pages/loading/WakeUp";
import TopBar from "./components/TopBar";
import About from "./pages/about/About";
import ConfirmDeleteUser from "./components/ConfirmDeleteUser";


export const socket = io(process.env.REACT_APP_SOCKET_URL);
function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL
  const user = useUserStore(s => s.user);
  // const socket = useRef();
  const [serverAlive, setServerAlive] = useState(false);

  const wakeup = async () => {
    const res = await axios.get('/');
    if (res.status === 200) {
      setServerAlive(true);
    } else {
      setServerAlive(false);
    }
  }
  useEffect(() => {
    wakeup();
  }, [])

  useEffect(() => {
  }, [])

  const pages = createBrowserRouter([
    {
      path: '/',
      element: user ? <TopBar /> : <Navigate to={'/login'} />,

      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/profile/:uid',
          element: <Profile />
        },
        {
          path: '/editprofile',
          element: <EditProfile />
        },
        {
          path: '/post/:postid',
          element: <PostPage />
        },
        {
          path: '/search/users/',
          element: <SearchPage />
        },

        {
          path: '/messenger',
          element: <Messenger />,
          children: [
            {
              path: '',
              element:
                <div className="hidden md:flex border-2 shadow h-full w-full rounded-lg items-center justify-center">
                  <div className="text-3xl font-bold text-slate-400 cursor-default">
                    <span>Open a Conversation to start Chat</span>
                  </div>
                </div>

            },
            {
              path: ':convid',
              element: <Conversation />,
            }]
        },

      ]
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/login',
      element: user ? <Navigate to={'/'} /> : <Login />
    },
    {
      path: '/register',
      element: user ? <Navigate to={'/editprofile'} /> : <Register />
    },
    {
      path: '/forgot-password',
      element: user ? <Navigate to={'/'} /> : <ForgotPassword />
    },
    {
      path: '/change-password',
      element: user ? <ChangePassword /> : <Navigate to={'/'} />
    },
    {
      path: '/confirm-delete',
      element: user ? <ConfirmDeleteUser /> : <Navigate to={'/'} />
    },
    {
      path: '*',
      element: <PageNotFound />
    }

  ])

  return (
    <div className="app">
      {
        !serverAlive && <WakeUp wakeup={wakeup} />
      }
      {
        serverAlive &&
        <RouterProvider router={pages} />
      }
    </div>
  );
}

export default App;
