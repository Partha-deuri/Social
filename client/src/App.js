import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
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

function App() {

  axios.defaults.baseURL = "http://localhost:5000/api"
  const user = useUserStore(s => s.user);
  const pages = createBrowserRouter([
    {
      path: '/',
      element: user ? <Home /> : <Redirect to={'/login'} />
    },
    {
      path: '/profile/:uid',
      element: user ? <Profile /> : <Redirect to={'/login'} />
    },
    {
      path: '/login',
      element: user ? <Redirect to={'/'} /> : <Login />
    },
    {
      path: '/register',
      element: user ? <Redirect to={'/'} /> : <Register />
    },
    {
      path: '/forgot-password',
      element: user ? <Redirect to={'/'} /> : <ForgotPassword />
    },
    {
      path: '/messenger',
      element: user ? <Messenger /> : <Redirect to={'/login'} />
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
