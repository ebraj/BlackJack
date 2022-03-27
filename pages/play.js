import Image from "next/image";
import { useRouter } from "next/router";
// import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Score from "../components/Score";

// Components
export default function Play() {
  const router = useRouter();
  const { playerName } = router.query;
  console.log(playerName);
  return (
    <div>
      <div className="flex flex-col w-full min-h-[100vh]">
        <Navbar />
        <main className="grow flex items-center bg-primary-green">
          <div className="container-1200 mx-auto px-5 py-5">
            <Score playerName={playerName} />
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
                  <button className="dark-btn mt-2.5 mb-2">Play</button>
                  <button className="dark-btn">Suffle</button>
                </div>
              </div>
              {/* Right Portion */}
              <div className="flex flex-col space-y-5">
                <Card title="Dealer" />
                <Card />
              </div>
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
