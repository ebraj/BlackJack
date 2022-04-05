import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// Components
export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const inputHandler = (e) => {
    setPlayerName(e.target.value);
  };
  const startHandler = () => {
    axios.post("http://20.151.112.0:8080/v1/player", {
      name: playerName,
    });
    axios.post("http://20.151.112.0:8080/v1/bet", {
      betAmount: "0",
    });
  };
  return (
    <div>
      <Head>
        <title>BlackJack | Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col w-full min-h-[100vh]">
        <Navbar />
        <main className="grow flex items-center bg-primary-green">
          <div className="container-400 mx-auto px-5 py-10">
            <div className="bg-background-green p-8 rounded-md">
              {/* Image Portion */}
              <div className="pb-5">
                <Image
                  src="/images/cards-png/reverse.png"
                  width={300}
                  height={400}
                />
              </div>
              <div>
                <input
                  className="mb-2 w-full rounded-md px-5 py-3 outline-none"
                  placeholder="Name"
                  value={playerName}
                  onChange={inputHandler}
                ></input>
                <Link
                  href={{
                    pathname: "play",
                    query: {
                      playerName,
                    },
                  }}
                >
                  <button className="dark-btn" onClick={startHandler}>
                    Start
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
