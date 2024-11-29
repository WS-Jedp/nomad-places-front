import { useRef, useState } from "react";

type RecentActivityCardProps = {
  callback: () => void;
  isImage: boolean;
  checked?: boolean;
};

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  callback,
  isImage,
  checked
}) => {
  return (
    <article
      className={`
            relative
            w-[42px] h-[42px]
            overflow-hidden
            inline-flex items-center justify-center
            rounded-full
            bg-gray-200
            ring-2 ring-offset-2 ${!checked ? 'ring-green-500' : 'ring-gray-200' }
            cursor-pointer
            transition ease-in-out
            mr-3
        `}
      onClick={callback}
    >
      {isImage ? (
        <img
          src="https://spots-co.s3.us-east-2.amazonaws.com/multimedia/spots/66940d265aa03752cbedc1d6/images/66940d265aa03752cbedc1d6-multimedia-image-1.png"
          alt=""
          className="object-cover w-[42px] h-[42px] rounded-full"
        />
      ) : (
        <video controls={false} autoPlay={false}>
          <source
            src="https://spots-co.s3.us-east-2.amazonaws.com/multimedia/spots/66940d265aa03752cbedc1d6/videos/mjbc.mp4"
            type="video/mp4"
          />
        </video>
      )}
    </article>
  );
};
