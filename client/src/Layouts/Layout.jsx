import { Outlet } from "react-router-dom";

import './Layout.css'

import SideNav from "../Components/SideNav/SideNav";
import TopNav from "../Components/TopNav/TopNav";

const Layout = () => {
  return (
    <div className="d-flex">
        <SideNav/>
        <div className="left-content">
            <TopNav/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout