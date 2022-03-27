import React from "react";

function ScoreNum({ reqNum = "X", playerName = "Player" }) {
  return (
    <div className="px-6 py-3 bg-primary-black rounded-md">
      <p className="text-primary-yellow pb-2">{playerName}</p>
      <h1 className="text-center font-bold text-3xl text-primary-yellow">
        {reqNum}
      </h1>
    </div>
  );
}

export default ScoreNum;
