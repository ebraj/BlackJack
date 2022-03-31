import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Score from "../components/Score";

// Components
export default function Play() {
  const [playBetAmt, setPlayBetAmt] = useState();
  const [playerDatass, setPlayerDatass] = useState({ decks: [] });
  //   const [betAmount, setBetAmount] = useState();
  const [dealerDatas, setDealersDatas] = useState({ decks: [] });
  const [play, setPlay] = useState(true);
  const [isBtnVis, setIsBtbVis] = useState(true);
  const handleBetAmountFun = (e) => {
    console.log(e.target.value);
    setPlayBetAmt(e.target.value);
  };
  const { name = "Player" } = playerDatass;

  const playGame = () => {
    axios
      .post("http://20.151.112.0:8080/v1/start", {
        betAmount: 1,
      })
      .then((response) => {
        if (!response.data.hasOwnProperty("message")) {
          setDealersDatas(response.data.Dealer);
          setPlayerDatass(response.data.Player);
        } else {
          setDealersDatas({ decks: [] });
          setPlayerDatass(response.data.player);
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message);
      });
    setPlay(false);
    setPlayBetAmt(0);
  };

  const rePlayGame = () => {
    setIsBtbVis(true);
    axios
      .get("http://20.151.112.0:8080/v1/start")
      .then((response) => {
        if (!response.data.hasOwnProperty("message")) {
          setDealersDatas(response.data.Dealer);
          setPlayerDatass(response.data.Player);
        } else {
          setDealersDatas({ decks: [] });
          setPlayerDatass(response.data.player);
        }
        // forceUpdate();
      })
      .catch((err) => {
        // console.log(err.response.data.message);
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
          setIsBtbVis(false);
        }
      })
      .catch((err) => {
        if (err.response.data.message === "Player Bust") {
          setPlayerDatass(err.response.data.player);
          setIsBtbVis(false);
        }
        console.log(err.response.data.message);
      });
  };

  const stand = () => {
    axios
      .get("http://20.151.112.0:8080/v1/stand")
      .then((response) => {
        if (!response.data.hasOwnProperty("message")) {
          setDealersDatas(response.data.Dealer);
          // setPlayerDatass(response.data.Player);
          setIsBtbVis(false);
          console.log("Player Won");
        } else if (response.data.message === "The result is Draw") {
          setDealersDatas(response.data.d.Dealer);
          setPlayerDatass(response.data.d.Player);
          console.log(response.data.message);
          setIsBtbVis(false);
        } else {
          setDealersDatas(response.data.dealer);
          console.log(response.data.message);
          setIsBtbVis(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setDealersDatas(err.response.data.dealer);
          console.log(err.response.data.message);
          setIsBtbVis(false);
        } else {
          console.log(err.response.data.message);
        }
      });
  };
  return (
    <>
      <div>
        <div className="flex flex-col w-full min-h-[100vh]">
          <Navbar />
          <main className="grow flex items-center bg-primary-green">
            <div className="container-1200 mx-auto px-5 py-5">
              <Score
                playerName={name}
                betAmount={playBetAmt}
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
                          min={0}
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
                      <button
                        className="dark-btn mt-2.5 mb-2"
                        onClick={rePlayGame}
                      >
                        Replay
                      </button>
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
                  {isBtnVis ? (
                    <div className="flex space-x-10">
                      <button className="dark-btn mt-2.5 mb-2" onClick={hit}>
                        Hit
                      </button>
                      <button className="dark-btn mt-2.5 mb-2" onClick={stand}>
                        Stand
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
