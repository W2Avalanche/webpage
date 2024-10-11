import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/carousel.css';

const ClipCarousel = ({ clips }) => {
  return (
    <Carousel>
      {clips.map((clipId, index) => (
        <div key={index}>
          <iframe
            title={`clip-${index}`}
            src={`https://clips.twitch.tv/embed?clip=${clipId}&parent=localhost`}
            allowFullScreen
            className="rounded-lg border-0 border-gray-300 h-96 w-5/6"
          ></iframe>
        </div>
      ))}
    </Carousel>
  );
};

export default ClipCarousel;
