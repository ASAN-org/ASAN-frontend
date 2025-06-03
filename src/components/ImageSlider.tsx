import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import  { useState, useEffect } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

type ImageSliderProps = {
  images: {
    url: string;
    alt: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
};

export function ImageSlider({ images, autoPlay = true, interval = 3000 }: ImageSliderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered, autoPlay, interval]);

  return (
    <Box
      component="section"
      aria-label="Image Slider"
      sx={{
        width: '100%',
        height: isMobile ? '50vh' : '70vh',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 3,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slide Images */}
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          transition: 'transform 0.5s ease',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              minWidth: '100%',
              height: '100%',
            }}
          >
            <Box
              component="img"
              src={image.url}
              alt={image.alt}
              sx={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={goToPrevious}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '16px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <NavigateBeforeIcon />
      </IconButton>

      <IconButton
        onClick={goToNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '16px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <NavigateNextIcon />
      </IconButton>

    {/* Pagination Dots */}
    <Box
    sx={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        backgroundColor: 'rgba(128, 128, 128, 0.5)', // Gray background with 50% opacity
        borderRadius: '16px', // Rounded corners
        padding: '4px 8px', // Some padding around the dots
    }}
    >
    {images.map((_, index) => (
        <IconButton
        key={index}
        size="small"
        onClick={() => goToSlide(index)}
        sx={{ 
            p: 0,
            '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light hover effect
            }
        }}
        >
        {index === currentIndex ? (
            <CircleIcon sx={{ color: 'white', fontSize: '12px' }} />
        ) : (
            <CircleOutlinedIcon sx={{ color: 'white', fontSize: '12px' }} />
        )}
        </IconButton>
    ))}
        </Box>
    </Box>
  );
}