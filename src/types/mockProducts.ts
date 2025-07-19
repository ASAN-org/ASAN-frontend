// MOCK PRODUCT DATA FOR DEVELOPMENT/TESTING ONLY. DO NOT USE IN PRODUCTION.
import type { Product } from "./Product";

// Categories and subcategories from backend data
const categories = [
  { name: "mobile", sub: ["IPhone", "Samsung", "Xiaomi"] },
  { name: "laptop", sub: ["Lenovo", "Asus", "HP"] },
  { name: "headphone", sub: ["Anker", "HTC", "TSCO"] },
];

const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Lenovo",
  "Asus",
  "HP",
  "Anker",
  "HTC",
  "TSCO",
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

const materials = [
  "Plastic",
  "Aluminum",
  "Steel",
  "Glass",
  "Carbon Fiber",
  "Leather",
];
const productColors = [
  "Black",
  "White",
  "Silver",
  "Gold",
  "Blue",
  "Red",
  "Green",
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

// Generate multiple images for product gallery
function generateProductImages(color: string): string[] {
  const baseImage = generatePlaceholderImage(color);
  const images = [baseImage];

  // Generate 3 additional images with different shades
  for (let i = 1; i < 4; i++) {
    const shade = Math.max(
      0,
      Math.min(255, parseInt(color.slice(1, 3), 16) + i * 20)
    );
    const newColor = `#${shade.toString(16).padStart(2, "0")}${color.slice(
      3,
      5
    )}${color.slice(5, 7)}`;
    images.push(generatePlaceholderImage(newColor));
  }

  return images;
}

const productDescriptions = [
  "High-quality product with premium features and excellent performance. Perfect for daily use and professional applications.",
  "Advanced technology meets elegant design. This product offers superior functionality and durability for long-term use.",
  "Innovative design with cutting-edge features. Built to last and provide exceptional user experience.",
  "Professional-grade equipment with industry-leading specifications. Ideal for demanding environments and heavy usage.",
  "Modern design with smart features and intuitive controls. Perfect balance of style and functionality.",
  "Premium quality with attention to detail. Crafted for performance and reliability in any situation.",
];

const productFeatures = [
  [
    "Wireless Connectivity",
    "Fast Charging",
    "Water Resistant",
    "Long Battery Life",
  ],
  ["High Performance", "Advanced Cooling", "Premium Display", "Fast Storage"],
  [
    "Noise Cancellation",
    "Comfortable Fit",
    "Crystal Clear Sound",
    "Durable Build",
  ],
  ["Ergonomic Design", "Adjustable Settings", "Portable", "Easy Setup"],
  ["Smart Features", "Voice Control", "App Integration", "Cloud Sync"],
  ["Premium Materials", "Customizable", "Energy Efficient", "Eco-Friendly"],
];

export const mockProducts: Product[] = Array.from({ length: 120 }, (_, i) => {
  // Distribute products across all categories and subcategories
  const catIdx = Math.floor(i / 40); // 3 categories
  const subIdx = Math.floor((i % 40) / 14); // ~14 products per subcategory
  const category = categories[catIdx % categories.length];
  const subCategory = category.sub[subIdx % category.sub.length];
  const color = colors[i % colors.length];
  const productName = `${category.name} ${subCategory} Product ${i + 1}`;
  const brand = brands[getRandomInt(0, brands.length - 1)];
  const price = getRandomInt(10, 1000);
  const discount = Math.random() > 0.7 ? getRandomInt(5, 30) : undefined;
  const rating = 3.5 + Math.random() * 1.5; // 3.5 to 5.0
  const reviewCount = getRandomInt(10, 500);
  const stock = getRandomInt(0, 100);

  return {
    id: `prod-${i + 1}`,
    name: productName,
    price: price,
    brand: brand,
    imageUrl: generatePlaceholderImage(color),
    category: category.name,
    subCategory: subCategory,
    discount: discount,
    // New detailed fields
    description: productDescriptions[i % productDescriptions.length],
    specifications: {
      Brand: brand,
      Model: `${category.name.toUpperCase()}-${i + 1}`,
      Color: productColors[i % productColors.length],
      Material: materials[i % materials.length],
      Weight: `${getRandomInt(100, 2000)}g`,
      Dimensions: `${getRandomInt(10, 50)}cm x ${getRandomInt(
        5,
        30
      )}cm x ${getRandomInt(1, 10)}cm`,
      Warranty: `${getRandomInt(1, 3)} Year${
        getRandomInt(1, 3) > 1 ? "s" : ""
      }`,
      Connectivity: Math.random() > 0.5 ? "Wireless" : "Wired",
      "Battery Life":
        Math.random() > 0.5 ? `${getRandomInt(8, 24)} hours` : "N/A",
    },
    images: generateProductImages(color),
    stock: stock,
    rating: Math.round(rating * 10) / 10,
    reviewCount: reviewCount,
    weight: `${getRandomInt(100, 2000)}g`,
    dimensions: `${getRandomInt(10, 50)}cm x ${getRandomInt(
      5,
      30
    )}cm x ${getRandomInt(1, 10)}cm`,
    warranty: `${getRandomInt(1, 3)} Year${getRandomInt(1, 3) > 1 ? "s" : ""}`,
    color: productColors[i % productColors.length],
    material: materials[i % materials.length],
    features: productFeatures[i % productFeatures.length],
    tags: [
      category.name,
      subCategory,
      brand,
      productColors[i % productColors.length],
    ],
  };
});
