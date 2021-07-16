import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

/**
 *
 * @PageLocation All Pages aside from login/register
 * @Component SideBarData
 * @Description Content for Nav sidebar, links to pages and potentially icons
 *
 */
export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Groups",
    path: "/managegroups",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
];
