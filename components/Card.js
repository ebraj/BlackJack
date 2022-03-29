import React, { useEffect } from "react";
import Image from "next/image";
import CardImage from "./CardImage";

function Card({ title = "Player", cards }) { 

  const cardArray = cards.toString().replace('[', '').replace(']', '').replace(" ", '').split(',').map((data) => data.replace(" ", ''));
  return (
    <>
      <div className="px-5 py-3 rounded-md bg-background-green">
        <div className="flex items-center justify-start space-x-5 pb-3">
          <h2 className="text-primary-yellow font-bold">{title}</h2>
          <span className="w-20 bg-primary-yellow h-px"></span>
        </div>
        <div className="flex space-x-4">
          {cardArray.map((card, index) => {
            if(card != "null "){
            return (
              <CardImage key={card + "-" + index} imgSrc={`/images/cards-png/${card}.png`} />
            );
            }
            else{
              return (
                <CardImage key={card} imgSrc={`/images/cards-png/reverse.png`} />
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Card;
