import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { FC } from "react";
import s from "./Carousel.module.scss";

interface ICarouselProps {
  images: string[];
}

const settings: Settings = {
  dots: true,

  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const Carousel: FC<ICarouselProps> = ({ images }) => {
  return (
    <div className={s.container}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={s.imageContainer}>
            <img src={image} alt={image} className={s.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
