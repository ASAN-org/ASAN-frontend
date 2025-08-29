import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ProductCard from "./ProductCard.tsx";
import type { Product } from "../types/Product.ts";

type ProductSliderProps = {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
};

const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  title = "Bestsellers",
  showViewAll = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Responsive settings
  const CARD_WIDTH = isMobile ? 160 : isTablet ? 180 : 220;
  const GAP = isMobile ? 30 : 16;
  const ITEMS_TO_SHOW = isMobile ? 2 : isTablet ? 3 : 6;
  const CONTAINER_WIDTH = ITEMS_TO_SHOW * (CARD_WIDTH + GAP) * 1.01;

  const totalSlides = Math.ceil(products.length / ITEMS_TO_SHOW);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex >= totalSlides - 1;

  const goToPrevious = () =>
    !isFirstSlide && setCurrentIndex((prev) => prev - 1);
  const goToNext = () => !isLastSlide && setCurrentIndex((prev) => prev + 1);
  const handleViewAll = () => console.log("View All clicked");

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        px: { xs: 1, md: 4 }, // Reduce mobile padding
        py: { xs: 1, md: 0 }, // Add vertical padding on mobile
        mb: { xs: 3, md: 4 }, // Add bottom margin for spacing between sliders
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: { xs: "100%", md: CONTAINER_WIDTH },
          mx: "auto",
          mt: { xs: 2, md: 3 },
          mb: { xs: 2, md: 1 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        {showViewAll && (
          <Button
            onClick={handleViewAll}
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                  : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              color: "white",
              px: 1.5,
              py: 0.6,
              borderRadius: "2rem",
              textTransform: "none",
              fontSize: "0.95rem",
              "&:hover": {
                background:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.dark})`
                    : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              },
            }}
          >
            View All
          </Button>
        )}
      </Box>

      {/* Slider Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: { xs: "100%", md: CONTAINER_WIDTH },
          mx: "auto",
          overflow: "hidden",
        }}
      >
        {/* Navigation Arrows */}
        <IconButton
          onClick={goToPrevious}
          disabled={isFirstSlide}
          sx={(theme) => ({
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
            color: theme.palette.text.primary,
            width: 40,
            height: 40,
            "&:hover": { backgroundColor: theme.palette.action.hover },
            "&:disabled": { opacity: 0.3 },
          })}
        >
          <NavigateBeforeIcon />
        </IconButton>

        {/* Cards Container */}
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: `${GAP}px`,
              transition: "transform 0.3s ease",
              transform: `translateX(-${
                currentIndex * ITEMS_TO_SHOW * (CARD_WIDTH + GAP)
              }px)`,
              width: "max-content",
              px: `${GAP}px`,
            }}
          >
            {products.map((product) => (
              <Box
                key={product.id}
                sx={{
                  width: CARD_WIDTH,
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        </Box>

        <IconButton
          onClick={goToNext}
          disabled={isLastSlide}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
            color: theme.palette.text.primary,
            width: 40,
            height: 40,
            "&:hover": { backgroundColor: theme.palette.action.hover },
            "&:disabled": { opacity: 0.3 },
          })}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProductSlider;
