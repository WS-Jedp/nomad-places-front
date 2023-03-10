import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "../../../../common/hooks/useIsMobile";
import { RecentActivity } from "../../../../models/multimedia";
import { StoryMultimediaCard } from "../../../multimedia/stories/cards";

const SLIDES_PER_VIEW_MOBILE = 1.4
const SLIDES_PER_VIEW_DESKTOP = 3

interface QuickPlaceDetailRecentActivitySliderPros {
  recentActivity: RecentActivity[];
}

export const QuickPlaceDetailRecentActivitySlider: React.FC<
  QuickPlaceDetailRecentActivitySliderPros
> = ({ recentActivity }) => {
  const swiperElRef = useRef<any>(null);


  const [slidesPerView, setSlidesPerView] = useState(SLIDES_PER_VIEW_MOBILE);
  const [isMobile] = useIsMobile();
  useEffect(() => {
    if (isMobile) setSlidesPerView(SLIDES_PER_VIEW_MOBILE);
    else setSlidesPerView(SLIDES_PER_VIEW_DESKTOP);
  }, [isMobile]);

  return (
    <swiper-container
      ref={swiperElRef}
      class="relative  mr-1 w-full h-full rounded-md"
      slides-per-view={slidesPerView}
      centered-slides="false"
      scrollbar="true"
    >
      {recentActivity &&
        recentActivity.length > 0 &&
        recentActivity.map((media, index) => (
          <swiper-slide
            key={index}
            class="relative w-full h-fulloverflow-hidden"
          >
            <StoryMultimediaCard />
          </swiper-slide>
        ))}
    </swiper-container>
  );
};
