import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PageNotFound from "./pages/Error/PageNotFound";
import Messenger from "./pages/messenger/Messenger";
import PostPage from "./pages/postPage/PostPage";

function App() {

  const pages = createBrowserRouter([
    {
      path: '/',
      element : <Home/> 
    },
    {
      path: '/profile',
      element : <Profile/> 
    },
    {
      path: '/login',
      element : <Login/> 
    },
    {
      path: '/register',
      element : <Register/> 
    },
    {
      path: '/forgot-password',
      element : <ForgotPassword/> 
    },
    {
      path: '/messenger',
      element : <Messenger/> 
    },
    {
      path: '/post',
      element : <PostPage/> 
    },
    {
      path: '*',
      element : <PageNotFound /> 
    }

  ])

  return (
    <div className="app">
      <RouterProvider router={pages} />
    </div>
  );
}

export default App;
