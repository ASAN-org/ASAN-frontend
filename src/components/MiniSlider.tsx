import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type ImageSliderProps = {
  images: {
    url: string;
    alt: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
};

export function MiniImageSlider({
  images,
  autoPlay = true,
  interval = 3000,
}: ImageSliderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered, autoPlay, interval]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: { xs: "60vh", md: "80vh" }, // Responsive height
        width: "100%",
        p: { xs: 1, md: 2 }, // Responsive padding
        my: { xs: 2, md: 3 }, // Add vertical margin
      }}
    >
      <Box
        component="section"
        aria-label="Image Slider"
        sx={{
          width: isMobile ? "70%" : "90%", // Mini size - adjust as needed
          height: isMobile ? "50%" : "70%", // Mini size - adjust as needed
          position: "relative",
          overflow: "hidden",
          boxShadow: 1,
          border: `2px solid ${theme.palette.divider}`,
          borderRadius: "1rem",
          mx: "auto", // Horizontal centering fallback
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slide Images */}
        <Box
          sx={{
            display: "flex",
            height: "100%",
            transition: "transform 0.5s ease",
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Box
                component="img"
                src={image.url}
                alt={image.alt}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Navigation Arrows - made smaller */}
        <IconButton
          onClick={goToPrevious}
          sx={{
            position: "absolute",
            top: "50%",
            left: "8px",
            transform: "translateY(-50%)",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.5)",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : "white",
            borderRadius: "8px",
            padding: "4px",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={goToNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: "8px",
            transform: "translateY(-50%)",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.5)",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : "white",
            borderRadius: "8px",
            padding: "4px",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <NavigateNextIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
