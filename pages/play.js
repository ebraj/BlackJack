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
  const [dealerDatas, setDealersDatas] = useState(null);
  const {
    balance = "100",
    betAmount = "10",
    cardValue = "21",
    decks = [],
    name = "Player",
  } = playerDatas;

  const handleBet = () => {
    axios
      .get("http://20.151.112.0:8080/v1/start", {
        // betAmount: "1",
      })
      .then((response) => {
        setDealersDatas(response.data.Dealer);
        setPlayerDatass(response.data.Player);
        // forceUpdate();
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  console.log(playerDatass, dealerDatas);
  return (
    <>
      <div>
        <div className="flex flex-col w-full min-h-[100vh]">
          <Navbar totalAmount={balance} />
          <main className="grow flex items-center bg-primary-green">
            <div className="container-1200 mx-auto px-5 py-5">
              <Score playerName={name} betAmount={betAmount} />
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
                    <input
                      className="w-full rounded-md px-5 py-3 outline-none"
                      placeholder="Amount"
                    ></input>
                    <button
                      className="dark-btn mt-2.5 mb-2"
                      onClick={handleBet}
                    >
                      Play
                    </button>
                  </div>
                </div>
                {/* Right Portion */}
                <div className="flex flex-col space-y-5">
                  {/* <Card title="Dealer" cards={dealerDatas.decks} /> */}
                  {playerDatass.decks.length ? (
                    <Card title={name} cards={playerDatass.decks} />
                  ) : null}
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
