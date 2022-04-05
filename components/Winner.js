import React, { useState } from "react";

function Winner({ playAgainFun, winnerModalHandler, winnerMsg }) {
  const handlePlayFun = () => {
    playAgainFun();
    winnerModalHandler();
  };
  return (
    <div className="custom-background w-full h-full fixed z-50 flex items-center justify-center">
      <div className="container-400 mx-auto">
        <div className="bg-primary-green rounded-md overflow-hidden">
          <h2 className="text-xl text-center font-bold text-primary-yellow bg-primary-black px-10 py-5">
            Results !
          </h2>
          <div className="px-10 pb-10">
            <div className="py-10 px-2">
              <h2 className="text-3xl text-center text-primary-yellow font-black">
                {winnerMsg}
              </h2>
            </div>
            <button className="dark-btn" onClick={handlePlayFun}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Winner;
