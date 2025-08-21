/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Carousel.css";

interface CarouselProps {
  autoplay?: boolean;
  autoplayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  autoplay = true,
  autoplayInterval = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const slideRef = useRef<any>(null);

  // Static high-quality images for the carousel
  const images = [
    {
      url: "/public/mountain_lake.jpeg",
      alt: "Beautiful mountain landscape with lake",
      title: "Mountain Lake",
    },
    {
      url: "/public/tropicalLake.jpeg",
      alt: "Tropical beach with crystal clear water",
      title: "Tropical Paradise",
    },
    {
      url: "/public/sunlitForest.jpeg",
      alt: "Sunlit forest path with green trees",
      title: "Enchanted Forest",
    },
    {
      url: "/public/mordernCity.jpeg",
      alt: "Modern city skyline at golden hour",
      title: "Urban Sunset",
    },
    {
      url: "/public/desertDune.jpeg",
      alt: "Desert landscape with sand dunes",
      title: "Desert Dunes",
    },
  ];

  const properties = {
    duration: 5000,
    transitionDuration: 1000,
    infinite: true,
    indicators: false,
    arrows: false,
    autoplay: isPlaying,
    autoplayInterval: autoplayInterval,
    onChange: (_oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
    canSwipe: true,
    pauseOnHover: true,
  };

  useEffect(() => {
    const handleFocusIn = () => {
      if (isPlaying) {
        setIsPlaying(false);
      }
    };

    const handleFocusOut = () => {
      if (autoplay && !isPlaying) {
        setIsPlaying(true);
      }
    };

    const carouselElement = document.getElementById("carousel-slides");
    if (carouselElement) {
      carouselElement.addEventListener("focusin", handleFocusIn);
      carouselElement.addEventListener("focusout", handleFocusOut);

      return () => {
        carouselElement.removeEventListener("focusin", handleFocusIn);
        carouselElement.removeEventListener("focusout", handleFocusOut);
      };
    }
  }, [isPlaying, autoplay]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, autoplayInterval]);

  const goToSlide = (index: number) => {
    if (slideRef.current && slideRef.current.goTo) {
      slideRef.current.goTo(index);
    }
  };

  const goToNext = () => {
    if (slideRef.current && slideRef.current.goTo) {
      const nextIndex = (currentSlide + 1) % images.length;
      slideRef.current.goTo(nextIndex);
    }
  };

  const goToPrevious = () => {
    if (slideRef.current && slideRef.current.goTo) {
      const prevIndex =
        currentSlide === 0 ? images.length - 1 : currentSlide - 1;
      slideRef.current.goTo(prevIndex);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
        case "Space":
          event.preventDefault();
          togglePlayPause();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, images.length]);

  return (
    <div
      className="carousel-container"
      role="region"
      aria-label="Image carousel"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      {/* Main Slideshow */}
      <div
        className="slideshow-container"
        id="carousel-slides"
        role="region"
        aria-label="Image carousel with beautiful landscapes and cityscapes"
        aria-roledescription="carousel"
        aria-live={isPlaying ? "off" : "polite"}
      >
        <Slide ref={slideRef} {...properties}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`each-slide ${index === currentSlide ? "active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
            >
              <div
                className="slide-content"
                style={{ backgroundImage: `url(${image.url})` }}
                role="img"
                aria-label={image.alt}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "space") {
                    e.preventDefault();
                    goToSlide(index);
                  }
                }}
              >
                <div className="slide-overlay">
                  <h2 className="slide-title">{image.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </Slide>
      </div>

      {/* Navigation Buttons */}
      <div className="carousel-controls">
        <button
          className="nav-button prev-button"
          onClick={() => {
            goToPrevious();
          }}
          role="button"
          aria-label="Go to previous slide"
          aria-controls="carousel-slides"
        >
          <span aria-hidden="true">‹</span>
          <span className="sr-only">Previous</span>
        </button>

        <button
          className="nav-button next-button"
          onClick={() => {
            goToNext();
          }}
          role="button"
          aria-label="Go to next slide"
          aria-controls="carousel-slides"
        >
          <span aria-hidden="true">›</span>
          <span className="sr-only">Next</span>
        </button>
      </div>

      {/* Play/Pause Button - Following W3C accessibility guidelines */}
      <button
        className="play-pause-button"
        onClick={togglePlayPause}
        role="button"
        aria-label={
          isPlaying ? "Stop automatic slide show" : "Start automatic slide show"
        }
        aria-controls="carousel-slides"
      >
        <span aria-hidden="true">{isPlaying ? "⏸" : "▶"}</span>
        <span className="sr-only">
          {isPlaying
            ? "Stop automatic slide show"
            : "Start automatic slide show"}
        </span>
      </button>

      {/* Slide Indicators */}
      <div
        className="slide-indicators"
        role="tablist"
        aria-label="Slide navigation"
      >
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => {
              goToSlide(index);
            }}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
            aria-controls="carousel-slides"
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div
        className="slide-counter"
        role="status"
        aria-live="polite"
        aria-label={`Slide ${currentSlide + 1} of ${images.length}`}
      >
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  );
};

export default Carousel;
