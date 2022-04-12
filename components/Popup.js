import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

function Popup({ handleDepositMain }) {
  const [depositAmount, setDepositAmount] = useState("");
  const inputHandler = (e) => {
    setDepositAmount(e.target.value);
  };
  const handleDeposit = () => {
    // handleDepositMain();
    axios
      .post("http://20.151.112.0:8080/v1/deposit", {
        amount: depositAmount,
      })
      .then((res) => {
        console.log(res);
        axios.get("http://20.151.112.0:8080/v1/player").then((res) => {
          handleDepositMain(res.data.player);
        });
      });
  };
  return (
    <div className="custom-background w-full h-full fixed z-50 flex items-center justify-center">
      <div className="container-400 mx-auto">
        <div className="bg-primary-green rounded-md overflow-hidden">
          <h2 className="text-xl text-center font-bold text-primary-yellow bg-primary-black px-10 py-5">
            Deposit Amount
          </h2>
          <div className="px-10 py-10">
            <div>
              <input
                min={0}
                type="number"
                className="mb-2 w-full rounded-md px-5 py-3 outline-none text-gray-900"
                placeholder="Amount"
                value={depositAmount}
                onChange={inputHandler}
              ></input>
            </div>
            <button className="dark-btn" onClick={handleDeposit}>
              Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
