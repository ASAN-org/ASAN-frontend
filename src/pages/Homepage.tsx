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

const IMAGES = [
  { url: p1, alt: "Pic One" },
  { url: p2, alt: "Pic Two" },
  { url: p3, alt: "Pic Three" },
  { url: p4, alt: "Pic Four" },
  { url: p5, alt: "Pic Five" },
];
const top12Products = mockProducts.slice(0, 12);
const secodn12Products = mockProducts.slice(12, 24);

function Homepage() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box>
          <ImageSlider images={IMAGES}/>
      </Box>
      <Box sx={{mt: 9, overflow: "hidden"}}>
        <ProductSlider products={top12Products} />
        <ProductSlider products={secodn12Products} />
        <MiniImageSlider images={IMAGES} />
        <ProductSlider products={top12Products} />
        <ProductSlider products={secodn12Products} />
      </Box>
    </Box>
  );
}

export default Homepage;
