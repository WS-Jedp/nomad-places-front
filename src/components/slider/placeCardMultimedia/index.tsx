import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { PlaceMultimedia } from "../../../models/multimedia";
import { HandleMultimediaCard } from "../../multimedia/cards/helpers/handleMultimediaCard";

import "./styles.css";

// Swiper library
register();

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": any;
      "swiper-slide": any;
      "swiper-button-prev": any;
    }
  }
}

export const PlaceCardMultimediaSlider: React.FC<{
  children?: JSX.Element;
  multimedia?: PlaceMultimedia[];
}> = ({ multimedia }) => {
  const swiperElRef = useRef<any>(null);

  return (
    <swiper-container
      ref={swiperElRef}
      class="relative bg-gray-200 mr-1 w-full h-32 rounded-md"
      slides-per-view="1"
      navigation="true"
      pagination="true"
      centered-slides="true"
      scrollbar="false"
      style={{
        "--swiper-navigation-color": "#383838",
        "--swiper-navigation-size": "15px",
        "--swiper-pagination-color": "#383838",
      }}
    >
      {multimedia &&
        multimedia.length > 0 &&
        multimedia.map((media, index) => (
          <swiper-slide
            key={index}
            class="relative w-full h-full bg-gray-200 overflow-hidden"
          >
            <div className="w-full h-full flex items-center justify-center">
              <HandleMultimediaCard type={media.type} url={media.url} />
            </div>
          </swiper-slide>
        ))}
    </swiper-container>
  );
};
