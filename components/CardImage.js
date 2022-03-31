import Image from "next/image";

function CardImage({ imgSrc }) {
  // console.log(imgSrc);
  return (
    <div>
      <Image src={imgSrc} width={120} height={180} />
    </div>
  );
}

export default CardImage;
