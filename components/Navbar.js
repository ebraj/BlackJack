import Link from "next/link";
import { useRouter } from "next/router";

function Navbar({ totalAmount = "100" }) {
  const router = useRouter();
  return (
    <nav className="bg-primary-black text-primary-yellow font-bold">
      <div className="container-1200 flex justify-between items-center px-5 py-5">
        <div>
          <Link href="/" passHref>
            <h2 className="cursor-pointer">BlackJack</h2>
          </Link>
        </div>
        <ul className="flex items-center justify-between space-x-5">
          <li>Current - {`$${totalAmount}`}</li>
          <li>
            {router.pathname === "/" ? (
              <button className="yellow-btn disabled:opacity-50" disabled>
                Deposit
              </button>
            ) : (
              <button className="yellow-btn">Deposit</button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
