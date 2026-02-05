import "./slider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import type { FeedType } from "@/features/feed/types/feed.js";
import SliderItem from "./SliderItem";

interface SimpleSliderProps {
  feedData: FeedType[];
  type?: "bias" | "default";
  className: string;
}

export default function FeedSlider({
  feedData,
  type,
  className,
}: SimpleSliderProps) {
  const [isSliding, setIsSliding] = useState(false);
  const showMaxCnt = 1;

  const settings = {
    className: "slider-items",
    dots: true,
    infinite: feedData.length > showMaxCnt,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000,
    beforeChange: () => setIsSliding(true),
    afterChange: () => setIsSliding(false),
  };

  // style안붙은 것은 slider.css에서 수정
  let navigate = useNavigate();

  function handleClick(fid: string) {
    if (isSliding) return;

    navigate(`/feed/${fid}`, { state: { commentClick: false } });
  }

  // ${brightMode === "dark" ? "dark-mode" : "bright-mode"}
  return (
    <div className={`slider-container ${className || ""}`}>
      <Slider {...settings}>
        {feedData.slice(0, 5).map((feed) => (
          <SliderItem
            key={feed.fid}
            type={type}
            feed={feed}
            onClick={handleClick}
          />
        ))}
      </Slider>
    </div>
  );
}
