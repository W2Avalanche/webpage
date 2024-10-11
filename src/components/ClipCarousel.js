import React, { useState } from 'react';

const ClipCarousel = ({ clips, animationDuration = 300 }) => {
  const [currentClipIndex, setCurrentClipIndex] = useState(0);

  const handleNextClip = () => {
    setCurrentClipIndex((prevIndex) => (prevIndex + 1) % clips.length);
  };

  const handlePrevClip = () => {
    setCurrentClipIndex((prevIndex) => (prevIndex - 1 + clips.length) % clips.length);
  };

  return (
    <div id="animation-carousel" className="relative w-full h-96 overflow-hidden" data-carousel="static">
      <div
        className="flex transition-transform ease-in-out duration-200"
        style={{
          transform: `translateX(-${currentClipIndex * 100}%)`,
          width: `${clips.length * 100}%`,
        }}
      >
        {clips.map((clip_id, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
            style={{ flexBasis: '100%' }}
          >
            <iframe
              title={`clip-${index}`}
              src={`https://clips.twitch.tv/embed?clip=${clip_id}&parent=localhost`}
              allowFullScreen
              className="w-1/5 h-96 rounded-lg border-2 border-gray-200 center"
            ></iframe>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrevClip}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNextClip}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default ClipCarousel;
