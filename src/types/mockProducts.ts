// MOCK PRODUCT DATA FOR DEVELOPMENT/TESTING ONLY. DO NOT USE IN PRODUCTION.
import type { Product } from "./Product";

// Example categories and subcategories that might match the real API
const categories = [
  { name: "Mobile", sub: ["iPhone", "Samsung", "Xiaomi", "Huawei"] },
  { name: "Laptop", sub: ["Gaming", "Business", "Student", "MacBook"] },
  { name: "Camera", sub: ["DSLR", "Mirrorless", "Action", "Compact"] },
  { name: "Fashion", sub: ["Men", "Women", "Kids", "Accessories"] },
  { name: "Home", sub: ["Furniture", "Kitchen", "Decor", "Garden"] },
  { name: "Sports", sub: ["Fitness", "Outdoor", "Team Sports", "Yoga"] },
  { name: "Books", sub: ["Fiction", "Non-Fiction", "Comics", "Academic"] },
  { name: "Electronics", sub: ["Audio", "Video", "Gaming", "Smart Home"] },
];

const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Nike",
  "Adidas",
  "IKEA",
  "Canon",
  "Nikon",
];
const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a simple colored square SVG
function generatePlaceholderImage(color: string): string {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="${color}"/>
      <text x="100" y="100" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Product</text>
    </svg>
  `)}`;
}

export const mockProducts: Product[] = Array.from({ length: 120 }, (_, i) => {
  // Distribute products across all categories and subcategories
  const catIdx = Math.floor(i / 15); // 8 categories
  const subIdx = Math.floor((i % 15) / 4); // 4 subcategories per category
  const category = categories[catIdx % categories.length];
  const subCategory = category.sub[subIdx % category.sub.length];
  const color = colors[i % colors.length];

  return {
    id: `prod-${i + 1}`,
    name: `${category.name} ${subCategory} Product ${i + 1}`,
    price: getRandomInt(10, 1000),
    brand: brands[getRandomInt(0, brands.length - 1)],
    imageUrl: generatePlaceholderImage(color),
    category: category.name,
    subCategory: subCategory,
    discount: Math.random() > 0.7 ? getRandomInt(5, 30) : undefined,
  };
});
