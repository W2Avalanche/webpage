import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/carousel.css';

const ClipCarousel = ({ clips, selectedGame }) => {
  const [startPosition, setStartPosition] = useState(0);

  // Reinicia la posición al cambiar de juego o cuando los clips cambian
  useEffect(() => {
    setStartPosition(0);
  }, [selectedGame, clips]);

  return (
    <Carousel selectedItem={startPosition} onChange={() => setStartPosition(null)}>
      {clips.map((clip, index) => {
        const { source, media } = clip;
        let srcUrl = '';

        // Definir el URL del embed en función del origen del clip
        if (source === 'twitch') {
          srcUrl = `https://clips.twitch.tv/embed?clip=${media}&parent=localhost`;
        } else if (source === 'youtube') {
          srcUrl = `https://www.youtube.com/embed/${media}`;
        }

        return (
          <div key={index}>
            <iframe
              title={`clip-${index}`}
              src={srcUrl}
              allowFullScreen
              className="rounded-lg border-0 border-gray-300 h-96 w-5/6"
            ></iframe>
          </div>
        );
      })}
    </Carousel>
  );
};

export default ClipCarousel;
