import { Outlet } from "react-router-dom";

import './Layout.css'

import SideNav from "../Components/SideNav/SideNav";
import TopNav from "../Components/TopNav/TopNav";

const Layout = () => {
  return (
    <div className="d-flex vh-100">
      <SideNav /> {/* Assume this is fixed width like w-100 or custom class */}

      <div className="flex-grow-1 d-flex flex-column">
        <TopNav /> {/* Fixed height inside right area */}

        <div className="flex-grow-1 overflow-auto p-3 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
};


export default Layout