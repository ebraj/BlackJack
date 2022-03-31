import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Popup from "./Popup";
import axios from "axios";

function Navbar() {
  const [isPopDisplay, setIsPopDisplay] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const handleDepositMain = () => {
    setIsPopDisplay(false);
  };
  const router = useRouter();
  useEffect(() => {
    axios.get("http://20.151.112.0:8080/v1/start").then((res) => {
      setCurrentBalance(res.data.Player.balance);
    });
  }, []);
  console.log(currentBalance);

  return (
    <nav className="bg-primary-black text-primary-yellow font-bold">
      {isPopDisplay ? <Popup handleDepositMain={handleDepositMain} /> : null}
      <div className="container-1200 flex justify-between items-center px-5 py-5">
        <div>
          <Link href="/" passHref>
            <h2 className="cursor-pointer">BlackJack</h2>
          </Link>
        </div>
        <ul className="flex items-center justify-between space-x-5">
          <li>Current - {`$${currentBalance}`}</li>
          <li>
            {router.pathname === "/" ? (
              <button className="yellow-btn disabled:opacity-50" disabled>
                Deposit
              </button>
            ) : (
              <button
                className="yellow-btn"
                onClick={() => {
                  setIsPopDisplay(true);
                }}
              >
                Deposit
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
