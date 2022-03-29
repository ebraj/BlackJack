import React, { useEffect } from "react";
import Image from "next/image";
import CardImage from "./CardImage";

function Card({ title = "Player", cards }) {
  console.log(cards);
  return (
    <>
      {cards.length ? (
        <div className="px-5 py-3 rounded-md bg-background-green">
          <div className="flex items-center justify-start space-x-5 pb-3">
            <h2 className="text-primary-yellow font-bold">{title}</h2>
            <span className="w-20 bg-primary-yellow h-px"></span>
          </div>
          <div className="flex space-x-4">
            {cards.map((card) => {
              return (
                <CardImage
                  key={card}
                  imgSrc={`/images/cards-png/${card}.png`}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="px-5 py-3 rounded-md bg-background-green">
            <div className="flex items-center justify-start space-x-5 pb-3">
              <h2 className="text-primary-yellow font-bold">{title}</h2>
              <span className="w-20 bg-primary-yellow h-px"></span>
            </div>
            <div className="flex space-x-4">
              <CardImage imgSrc={`/images/cards-png/reverse.png`} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Card;
