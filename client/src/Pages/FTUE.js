import React from "react";
import "../styles/PageStyles/FTUE.css";
import NavBar from "../components/Navigation/NavBar";
import { Tutorial } from "../components/Modals/FTUEModals/Tutorial";
/**
 *
 * @Page First time upon login or help button
 * @Description First time user experience. Upon first login, give user instructions on how to use the application
 *
 * @route /welcome
 *
 */
export const FTUE = () => {
  return (
    <>
      <div className="FTUEContainer">
        <NavBar title="Welcome to Gift Handler" />
        <div className="FTUEBody">
          <h1> Here is a quick rundown on how to get started</h1>

          <div className="FTUEModalContainer">
            <Tutorial />
          </div>
          <button>LEFT</button>
          <button>RIGHT</button>
        </div>
      </div>
    </>
  );
};
