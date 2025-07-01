import { ImageSlider } from "../components/ImageSlider";
import MegaMenu from "../components/MegaMenu";
import { useCategoryData } from "../hooks/useCategoryData";
import p1 from "../assets/01.jpg";
import p2 from "../assets/02.jpg";
import p3 from "../assets/03.jpg";
import p4 from "../assets/04.jpg";
import p5 from "../assets/05.jpg";

const IMAGES = [
  { url: p1, alt: "Pic One" },
  { url: p2, alt: "Pic Two" },
  { url: p3, alt: "Pic Three" },
  { url: p4, alt: "Pic Four" },
  { url: p5, alt: "Pic Five" },
];

function Homepage() {
  const { categories, loading } = useCategoryData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MegaMenu categories={categories} />
      <ImageSlider images={IMAGES} />
    </div>
  );
}

export default Homepage;
