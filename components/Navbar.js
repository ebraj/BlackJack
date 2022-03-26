function Navbar() {
  return (
    <nav className="bg-primary-black text-primary-yellow font-bold">
      <div className="container-1200 flex justify-between items-center px-5 py-5">
        <div>
          <h2>BlackJack</h2>
        </div>
        <ul className="flex items-center justify-between space-x-5">
          <li>$100</li>
          <li>
            <button className="px-7 py-2 text-primary-black rounded-md bg-primary-yellow font-bold">
              Deposit
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
