import Navbar from "../Pages/Shared/Navbar";
import { Outlet } from "react-router-dom";
import CanvasCursorDemo from "./CanvasCursorDemo";
// import { ToastContainer } from 'react-toastify';

const Main = () => {
  return (
    <div className="">
      <CanvasCursorDemo />
      <Navbar />
      <div className="pt-16">
        {" "}
        <Outlet />
      </div>
      {/* <ToastContainer /> */}
      {/* <Footer/> */}
    </div>
  );
};

export default Main;
