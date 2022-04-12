import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Score from "../components/Score";
import Winner from "../components/Winner";

// Components
export default function Play() {
  const [playerDetails, setPlayerDetails] = useState([
    { name: "Player", betAmount: "0", balance: "XXX" },
  ]);
  const [isWinnerDisplay, setIsWinnerDisplay] = useState(false);
  const [winnerMsg, setWinnerMsg] = useState("");
  const [playBetAmt, setPlayBetAmt] = useState("");
  const [playerDatass, setPlayerDatass] = useState({ decks: [] });
  const [dealerDatas, setDealersDatas] = useState({ decks: [] });
  const [play, setPlay] = useState(true);
  const handleBetAmountFun = (e) => {
    setPlayBetAmt(e.target.value);
  };
  const playAgainFun = () => {
    setPlay(true);
    setPlayerDatass({ decks: [] });
    setDealersDatas({ decks: [] });
    setPlayBetAmt("");
  };
  const winnerModalHandler = () => {
    setIsWinnerDisplay(false);
  };
  const { name = "Player" } = playerDatass;

  const playGame = () => {
    axios
      .post("http://20.151.112.0:8080/v1/bet", {
        betAmount: playBetAmt,
      })
      .then((res) => {
        console.log(res);
        axios.get("http://20.151.112.0:8080/v1/start").then((response) => {
          if (!response.data.hasOwnProperty("message")) {
            setDealersDatas(response.data.Dealer);
            setPlayerDatass(response.data.Player);
          } else {
            setDealersDatas({ decks: [] });
            setPlayerDatass(response.data.player);
            setWinnerMsg(response.data.message);
            setIsWinnerDisplay(true);
            console.log(response.data.message);
          }
        });
        axios.get("http://20.151.112.0:8080/v1/player").then((res) => {
          setPlayerDetails(res.data);
        });
        setPlay(false);
      })
      .catch((err) => {
        if (err.response.data.message.includes("For input")) {
          setWinnerMsg("Please enter the balance");
          setIsWinnerDisplay(true);
        } else {
          setWinnerMsg("Can't bet more than balance");
          setIsWinnerDisplay(true);
        }
      });
  };

  const hit = () => {
    axios
      .get("http://20.151.112.0:8080/v1/hit")
      .then((response) => {
        if (!response.data.hasOwnProperty("message")) {
          // console.log("Hit" + response.data);
          setPlayerDatass(response.data);
        } else {
          setPlayerDatass(response.data.player);
          console.log(response.data.message);
          setWinnerMsg(response.data.message);
          setIsWinnerDisplay(true);
        }
      })
      .catch((err) => {
        if (err.response.data.message === "Player Bust") {
          setPlayerDatass(err.response.data.player);
          setWinnerMsg(err.response.data.message);
          setIsWinnerDisplay(true);
        }
        console.log(err.response.data.message);
        setWinnerMsg(err.response.data.message);
        setIsWinnerDisplay(true);
      });
  };

  const stand = () => {
    axios
      .get("http://20.151.112.0:8080/v1/stand")
      .then((response) => {
        if (!response.data.hasOwnProperty("message")) {
          setDealersDatas(response.data.Dealer);
          // setPlayerDatass(response.data.Player);
          setWinnerMsg("Player Won");
          setIsWinnerDisplay(true);
        } else if (response.data.message === "The result is Draw") {
          setDealersDatas(response.data.d.Dealer);
          setPlayerDatass(response.data.d.Player);
          console.log(response.data.message);
          setWinnerMsg(response.data.message);
          setIsWinnerDisplay(true);
        } else {
          setDealersDatas(response.data.dealer);
          console.log(response.data.message);
          setWinnerMsg(response.data.message);
          setIsWinnerDisplay(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setDealersDatas(err.response.data.dealer);
          console.log(err.response.data.message);
          setWinnerMsg(err.response.data.message);
          setIsWinnerDisplay(true);
        } else {
          console.log(err.response.data.message);
          setWinnerMsg(response.data.message);
          setIsWinnerDisplay(true);
        }
      });
  };

  useEffect(() => {
    axios
      .get("http://20.151.112.0:8080/v1/player")
      .then((res) => {
        if (res.data.hasOwnProperty("message")) {
          setPlayerDetails(res.data.player);
        } else {
          setPlayerDetails(res.data);
        }
      })
      .catch((err) => {
        console.log("error?");
        setPlayerDetails(err.response.data.player);
      });
  }, []);
  return (
    <>
      {isWinnerDisplay && playerDetails ? (
        <Winner
          playAgainFun={playAgainFun}
          winnerModalHandler={winnerModalHandler}
          winnerMsg={winnerMsg}
        />
      ) : null}
      <div>
        <div className="flex flex-col w-full min-h-[100vh]">
          <Navbar playerDetails={playerDetails} />
          <main className="grow flex items-center bg-primary-green">
            <div className="container-1200 mx-auto px-5 py-5">
              <Score
                playerName={playerDetails.name}
                betAmount={playerDetails.betAmount}
                cardValue={playerDatass.cardValue}
                dealerValue={dealerDatas.cardValue}
              />
              <div className="grid grid-cols-[240px_minmax(300px,2fr)] gap-5">
                {/* Left Portion */}
                <div className="bg-background-green rounded-md p-5">
                  <div className="pb-5">
                    <Image
                      src="/images/cards-png/reverse.png"
                      width={300}
                      height={400}
                    />
                  </div>
                  <div>
                    {play ? (
                      <>
                        <input
                          className="w-full rounded-md px-5 py-3 outline-none"
                          placeholder="Bet Amount"
                          type="number"
                          min="0"
                          max=""
                          value={playBetAmt}
                          onChange={handleBetAmountFun}
                        />
                        <button
                          className="dark-btn mt-2.5 mb-2"
                          onClick={playGame}
                        >
                          Play
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col">
                        <button className="dark-btn mb-2" onClick={hit}>
                          Hit
                        </button>
                        <button className="dark-btn" onClick={stand}>
                          Stand
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* Right Portion */}
                <div className="flex flex-col space-y-5">
                  {dealerDatas.decks.length ? (
                    <Card title="Dealer" cards={dealerDatas.decks} />
                  ) : (
                    <Card title="Dealer" cards="[reverse,reverse]" />
                  )}
                  {playerDatass.decks.length ? (
                    <Card title={name} cards={playerDatass.decks} />
                  ) : (
                    <Card title={name} cards="[reverse,reverse]" />
                  )}
                  {/* {isBtnVis ? (
                    <div className="flex space-x-10">
                      <button className="dark-btn mt-2.5 mb-2" onClick={hit}>
                        Hit
                      </button>
                      <button className="dark-btn mt-2.5 mb-2" onClick={stand}>
                        Stand
                      </button>
                    </div>
                  ) : null} */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
