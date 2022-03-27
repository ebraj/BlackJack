import React from "react";
import ScoreNum from "./ScoreNum";

function Score({ playerName = "Player" }) {
  return (
    <div className="container-1200 flex items-center justify-center pb-5">
      <div className="flex space-x-2">
        <ScoreNum playerName={playerName} />
        <ScoreNum playerName="Dealer" />
      </div>
    </div>
  );
}

export default Score;
