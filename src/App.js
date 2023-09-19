import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import { Dashboard, Service, Skill,Projet, NotFound } from './pages';
import Navbar from './components/navbar/Navbar';
import Leftbar from './components/leftbar/Leftbar';
import {AuthContext } from './context/AuContext';
import { useContext } from 'react';
import Login from './pages/login/Login';

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Leftbar/>
    <Outlet/>
    </>
  );
}








function App() {

  const context = useContext(AuthContext);
  const currentUser = context?.user;

  const RouteProtector = ({ children }) => {
    console.log("NAV")
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RouteProtector>
          <Layout/>
        </RouteProtector>
      ),
      children: [
        {
          path: "/",
          element: <Dashboard/>,
        },
        {
          path: "service",
          element: <Service/>,
        },
        {
          path: "skill",
          element: <Skill/>,
        },
        {
          path: "projet",
          element: <Projet/>,
        },
        {
          path: "*",
          element: <NotFound/>,
        },
      ],
      
    },
    {
      path: '/login',
      element: <Login />,
      default: true
    }
  ]);
  return (
        <div className="app">
            <RouterProvider router={router}/>
        </div>
  );
}

export default App;
