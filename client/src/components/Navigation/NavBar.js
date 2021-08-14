import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/NavigationStyles/NavBar.css";
import { NavData } from "./NavData";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";
import { IoIosMenu } from "react-icons/io";

/**
 *
 * @PageLocation All Pages aside from login/register
 * @Component NavBar
 * @Description Navigation Bar at the top of each page with sidebar.
 *              Title indicates the current page.
 *
 */
export default function NavBar() {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const showMenu = () => setMenu(!menu);
  return (
    <>
      <div className="navBar" style={{ color: "white" }}>
        <div
          className="menu-bars"
          style={{ visibility: menu ? "hidden" : "visible" }}
        >
          <IoIosMenu color="black" onClick={showMenu} />
        </div>
        <div
          className="navBarMenu"
          style={{ display: menu ? "block" : "none" }}
        >
          <button className="CloseMenuBtn" onClick={showMenu}>
            X
          </button>
          <ul className="MenuList">
            {NavData.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    style={{ textDecoration: "none", color: "black" }}
                    key={index}
                  >
                    <div onClick={showMenu}>
                      <div className="sidebarItem">{item.title}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
            <hr />
            <li>
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div onClick={handleLogout}>
                  <div className="sidebarItem">Sign Out</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
