import React from "react";
import Image from "next/image";

function Card({ title = "Player" }) {
  return (
    <div className="px-5 py-3 rounded-md bg-background-green">
      <div className="flex items-center justify-start space-x-5 pb-3">
        <h2 className="text-primary-yellow font-bold">{title}</h2>
        <span className="w-20 bg-primary-yellow h-px"></span>
      </div>
      <div className="flex space-x-4">
        <div>
          <Image src="/images/cards-png/reverse.png" width={120} height={180} />
        </div>
        <div>
          <Image src="/images/cards-png/reverse.png" width={120} height={180} />
        </div>
      </div>
    </div>
  );
}

export default Card;
