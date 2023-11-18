import React from "react";
import Carousel from "react-bootstrap/Carousel";
import planning from "../../assets/images/planning.jpg";
import strategy from "../../assets/images/strategy.avif";
import meeting from "../../assets/images/meeting.avif";

const CarouselItem = ({ src, alt }) => (
  <Carousel.Item>
    <img
      src={src}
      alt={alt}
      style={{
        maxWidth: "90%",
        height: "370px",
      }}
    />
  </Carousel.Item>
);

export default CarouselItem;
