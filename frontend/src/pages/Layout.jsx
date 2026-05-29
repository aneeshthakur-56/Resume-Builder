import { Outlet } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar";

export const Layout = () => {
  return <>
    <div className="min-h-screen bg-gray-100" >
    <Navbar />
    <Outlet />
    </div>
  </>;
};
