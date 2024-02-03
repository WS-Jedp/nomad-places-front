import { useRef } from "react";
import { register } from "swiper/element/bundle";
import {
  handleCardColor,
  handleMindsetIcon,
  handleSpotTypeIcon,
} from "../../../common/utils/icons/icons";
import { PlaceMultimedia } from "../../../models/multimedia";
import { Place } from "../../../models/places";
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
  place: Place;
}> = ({ multimedia, place }) => {
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
            <div className="relative w-full h-full flex items-center justify-center">
              <HandleMultimediaCard type={media.type} url={media.url} />

              {place.knownFor && (
                <article className="absolute bottom-0 right-0 p-1">
                  {/* Mindsets of place */}
                  <div className={`opacity-90 rounded-full flex items-center justify-center p-1 ${handleCardColor(place.knownFor)}`}>
                    {place.knownFor && handleMindsetIcon(place.knownFor, 9)}
                  </div>
                </article>
              )}
            </div>
          </swiper-slide>
        ))}
    </swiper-container>
  );
};
