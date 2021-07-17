import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/NavBar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import PrivateRoute from "../../Routes/PrivateRoute";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";

/**
 *
 * @PageLocation All Pages aside from login/register
 * @Component NavBar
 * @Description Navigation Bar at the top of each page with sidebar.
 *              Title indicates the current page.
 *
 */
export default function NavBar({ title }) {
  const [sidebar, setSideBar] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const showSideBar = () => setSideBar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="navBar" style={{ color: "white" }}>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSideBar} />
          </Link>
          <div className="navText" style={{ fontSize: 25 }}>
            {title}
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle" onClick={showSideBar}>
              <AiIcons.AiOutlineClose style={{ cursor: "pointer" }} />
            </li>
            {SidebarData.map((item, index) => {
              return (
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <li key={index} className={item.cName} onClick={showSideBar}>
                    <div className="sidebarItem">{item.title}</div>
                  </li>
                </Link>
              );
            })}
            <hr />
            <li className="nav-text">
              <div className="sidebarItem">
                <Link
                  to="/login"
                  onClick={handleLogout}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Sign Out
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
