import React from "react";
import { ImageSlider } from "../components/ImageSlider";
import p1 from "../assets/01.jpg";
import p2 from "../assets/02.jpg";
import p3 from "../assets/03.jpg";
import p4 from "../assets/04.jpg";
import p5 from "../assets/05.jpg";
import Box from "@mui/material/Box";
import { mockProducts } from "../types/mockProducts";
import ProductSlider from "../components/ProductSlider";
import { MiniImageSlider } from "../components/MiniSlider";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const IMAGES = [
  { url: p1, alt: "Pic One" },
  { url: p2, alt: "Pic Two" },
  { url: p3, alt: "Pic Three" },
  { url: p4, alt: "Pic Four" },
  { url: p5, alt: "Pic Five" },
];

interface WebShopData {
  slider: Array<{
    image: string;
    link: string;
    order: number;
  }>;
  "home-page_lists": Array<{
    enabled: boolean;
    listName: string;
    order: number;
  }>;
  categories: Array<{
    name: string;
    children: string[];
  }>;
}

interface HomepageProps {
  webshopData: WebShopData;
}

const Homepage: React.FC<HomepageProps> = ({ webshopData }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Simulate loading time for homepage data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Function to get products based on list name
  const getProductsForList = (listName: string) => {
    switch (listName) {
      case "latest_products":
        return mockProducts
          .sort(
            (a, b) =>
              parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1])
          )
          .slice(0, 12);
      case "popular_products":
        return mockProducts
          .sort((a, b) => {
            const aScore = (a.discount || 0) * 10 + (a.price || 0);
            const bScore = (b.discount || 0) * 10 + (b.price || 0);
            return bScore - aScore;
          })
          .slice(0, 12);
      case "best_selling_products":
        return mockProducts
          .filter((p) => p.rating && p.rating >= 4.5)
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 12);
      default:
        return mockProducts.slice(0, 12);
    }
  };

  // Function to get title for list name
  const getListTitle = (listName: string) => {
    switch (listName) {
      case "latest_products":
        return "Latest Products";
      case "popular_products":
        return "Popular Products";
      case "best_selling_products":
        return "Best Selling Products";
      default:
        return "Products";
    }
  };

  // Convert backend slider data to ImageSlider format
  const getSliderImages = () => {
    return webshopData.slider
      .sort((a, b) => a.order - b.order)
      .map((slider) => ({
        url: slider.image,
        alt: `Slider ${slider.order}`,
        link: slider.link,
      }));
  };

  // Handle View All button clicks - navigate to random product page
  const handleViewAllClick = () => {
    // Get a random category from the backend data
    const randomCategory =
      webshopData.categories[
        Math.floor(Math.random() * webshopData.categories.length)
      ];

    // Navigate to the random category page
    navigate(`/${randomCategory.name.toLowerCase()}`);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <LoadingSpinner message="Loading homepage..." />
      </Box>
    );
  }

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Main Slider */}
      <Box>
        <ImageSlider images={getSliderImages()} />
      </Box>

      {/* Product Lists */}
      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          mb: { xs: 4, md: 6 },
          overflow: "hidden",
        }}
      >
        {/* Render enabled product lists from backend */}
        {webshopData["home-page_lists"]
          .filter((list) => list.enabled)
          .sort((a, b) => a.order - b.order)
          .map((list, index) => (
            <React.Fragment key={list.listName}>
              <ProductSlider
                products={getProductsForList(list.listName)}
                title={getListTitle(list.listName)}
                showViewAll={true}
                onViewAllClick={handleViewAllClick}
              />
              {/* Add second slider between second and third lists */}
              {index === 1 && (
                <Box sx={{ mt: { xs: 4, md: 6 }, mb: { xs: 4, md: 6 } }}>
                  <MiniImageSlider images={IMAGES} />
                </Box>
              )}
            </React.Fragment>
          ))}
      </Box>
    </Box>
  );
};

export default Homepage;
