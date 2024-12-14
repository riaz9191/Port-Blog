import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Blog from "../Pages/Blog/Blog";
import BlogDetails from "../Pages/Blog/BLogDetails";
import CreateBlog from "../Pages/Blog/CreateBlog";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path:'/about',
        element:<About />
      },
      
      {
        path:'/blog',
        element:<Blog />
      },
      {
        path:'/blog/:id',
        element:<BlogDetails />
      },
      {
        path:'/createBlog',
        element:<CreateBlog />
      },
      
      
    ]
  },
]);
