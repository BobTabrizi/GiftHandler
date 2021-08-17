/**
 * @PageLocation FTUE
 * @Component Tutorial
 * @Description Modal instructions for the tutorial/FTUE process
 *
 */

import React, { useState } from "react";
import "../../../styles/PageStyles/FTUE.css";
import { PartArray } from "../ModalComponents/FTUEModal/TutorialParts";

export const Tutorial = () => {
  const [part, setPart] = useState(PartArray[0]);
  const [partIndex, setPartIndex] = useState(0);
  const stepChange = (Direction) => {
    if (Direction === "L") {
      if (partIndex > 0) {
        setPartIndex(partIndex - 1);
        setPart(PartArray[partIndex - 1]);
      }
    } else {
      if (partIndex < PartArray.length - 1) {
        setPartIndex(partIndex + 1);
        setPart(PartArray[partIndex + 1]);
      }
    }
  };

  return (
    <>
      <div className="StepOneContainer">
        <div className="MoveBack" onClick={() => stepChange("L")}>
          LEFT
        </div>
        <div className="FTUEModalContent">{part}</div>
        <div className="MoveForward" onClick={() => stepChange("R")}>
          RIGHT
        </div>
      </div>
    </>
  );
};
