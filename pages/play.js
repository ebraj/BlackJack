import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
// import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Score from "../components/Score";

// Components
export default function Play({ playerDatas }) {
  console.log(playerDatas);
  const [playerDatass, setPlayerDatass] = useState({ decks: [] });
  //   const [betAmount, setBetAmount] = useState();
  const [dealerDatas, setDealersDatas] = useState({decks: []});
  const [play, setPlay] = useState(true);

  const {
    balance = "100",
    betAmount = "10",
    cardValue = "21",
    decks = [],
    name = "Player",
  } = playerDatas;

  const playGame = () => {
    axios
      .post("http://20.151.112.0:8080/v1/start", {
         betAmount: "1",
      })
      .then((response) => {
        if(!(response.data.hasOwnProperty("message"))){
          setDealersDatas(response.data.Dealer);
          setPlayerDatass(response.data.Player);
        }
        else{
          setDealersDatas({decks: []});
          setPlayerDatass(response.data.player);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
      setPlay(false);
  };

  const rePlayGame = () => {
    axios
      .get("http://20.151.112.0:8080/v1/start")
      .then((response) => {
        if(!(response.data.hasOwnProperty("message"))){
          setDealersDatas(response.data.Dealer);
          setPlayerDatass(response.data.Player);
        }
        else{
          setDealersDatas({decks: []});
          setPlayerDatass(response.data.player);
        }
        // forceUpdate();
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const hit = () => {
    axios
      .get("http://20.151.112.0:8080/v1/hit")
      .then((response) => {
        if(!(response.data.hasOwnProperty("message"))){
          console.log("Hit" + response.data);
          setPlayerDatass(response.data);
        }
        else{
          setPlayerDatass(response.data.player);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const stand = () => {
    axios
      .get("http://20.151.112.0:8080/v1/stand")
      .then((response) => {
        if(!(response.data.hasOwnProperty("message"))){
          setDealersDatas(response.data.Dealer);
          setPlayerDatass(response.data.Player);
        }
        else if(response.data.message === "The result is Draw"){
          setDealersDatas(response.data.d.Dealer);
          setPlayerDatass(response.data.d.Player);
        }
        else{
          setDealersDatas(response.data.dealer);
        }
        // forceUpdate();
      })
      .catch((err) => {
        err.response.status === 400 ? setDealersDatas(err.response.data.dealer) : console.log(err.response.data.message);
      });
  };
  return (
    <>
      <div>
        <div className="flex flex-col w-full min-h-[100vh]">
          <Navbar totalAmount={playerDatass.balance} />
          <main className="grow flex items-center bg-primary-green">
            <div className="container-1200 mx-auto px-5 py-5">
              <Score playerName={name} betAmount={playerDatass.betAmount} cardValue={playerDatass.cardValue} dealerValue={dealerDatas.cardValue}/>
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
                    {play ? <>
                    <input
                      className="w-full rounded-md px-5 py-3 outline-none"
                      placeholder="Bet Amount"
                    ></input>
                    <button
                      className="dark-btn mt-2.5 mb-2"
                      onClick={playGame}
                    >
                      Play
                    </button>
                    </> : 
                    <button
                      className="dark-btn mt-2.5 mb-2"
                      onClick={rePlayGame}
                    >
                      Replay
                    </button>}
                  </div>
                </div>
                {/* Right Portion */}
                <div className="flex flex-col space-y-5">
                {dealerDatas.decks.length ? (
                    <Card title={name} cards={dealerDatas.decks} />
                  ) : <Card title={name} cards='[reverse,reverse]' />}
                  {playerDatass.decks.length ? (
                    <Card title={name} cards={playerDatass.decks} />
                  ) : <Card title={name} cards='[reverse,reverse]' />}
                  <div className="flex flex-row space-x-10">
                  <button
                      className="dark-btn mt-2.5 mb-2"
                      onClick={hit}
                    >
                      Hit
                    </button>
                    <button
                      className="dark-btn mt-2.5 mb-2"
                      onClick={stand}
                    >
                      Stand
                    </button>

                  </div>
                  
                </div>
              </div>
            </div>
          </main>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://20.151.112.0:8080/v1/player");
  const playerDatas = await response.json();
  return {
    props: { playerDatas },
    revalidate: 1,
  };
}
