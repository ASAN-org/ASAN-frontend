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

// Memory options for mobile devices
const memoryOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];

// Processor options for laptops
const processorOptions = [
  "Intel Core i3",
  "Intel Core i5",
  "Intel Core i7",
  "Intel Core i9",
  "AMD Ryzen 3",
  "AMD Ryzen 5",
  "AMD Ryzen 7",
  "AMD Ryzen 9",
];

// Connection types for headphones
const connectionTypes = [
  "Wired",
  "Bluetooth",
  "USB-C",
  "3.5mm Jack",
  "Wireless",
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

export const mockProducts: Product[] = Array.from({ length: 120 }, (_, i) => {
  // Distribute products across all categories and subcategories
  const catIdx = Math.floor(i / 40); // 3 categories
  const subIdx = Math.floor((i % 40) / 14); // ~14 products per subcategory
  const category = categories[catIdx % categories.length];
  const subCategory = category.sub[subIdx % category.sub.length];
  const color = colors[i % colors.length];
  const productName = `${category.name} ${subCategory} Product ${i + 1}`;
  const brand = brands[getRandomInt(0, brands.length - 1)];

  // Category-specific pricing and features
  let price: number;
  let features: string[];
  let specifications: Record<string, string>;

  if (category.name === "mobile") {
    // Mobile devices: 10M-100M toman for iPhone, 5M-50M for others
    if (subCategory === "IPhone") {
      price = getRandomInt(10000000, 100000000);
    } else {
      price = getRandomInt(5000000, 50000000);
    }

    // Mobile-specific features
    features = [
      "5G Support",
      "Fast Charging",
      "Wireless Charging",
      "Water Resistant",
      "Long Battery Life",
    ];

    // Mobile-specific specifications
    specifications = {
      Brand: brand,
      Model: `${category.name.toUpperCase()}-${i + 1}`,
      Color: productColors[i % productColors.length],
      "Internal Memory": memoryOptions[i % memoryOptions.length],
      "Supports 5G": Math.random() > 0.3 ? "Yes" : "No", // 70% support 5G
      Weight: `${getRandomInt(150, 250)}g`,
      Dimensions: `${getRandomInt(14, 17)}cm x ${getRandomInt(
        7,
        9
      )}cm x ${getRandomInt(7, 10)}mm`,
      Warranty: `${getRandomInt(1, 2)} Year${
        getRandomInt(1, 2) > 1 ? "s" : ""
      }`,
      "Battery Life": `${getRandomInt(8, 24)} hours`,
    };
  } else if (category.name === "laptop") {
    // Laptops: 20M-200M toman
    price = getRandomInt(20000000, 200000000);

    // Laptop-specific features
    features = [
      "High Performance",
      "Advanced Cooling",
      "Premium Display",
      "Fast Storage",
      "Backlit Keyboard",
    ];

    // Laptop-specific specifications
    specifications = {
      Brand: brand,
      Model: `${category.name.toUpperCase()}-${i + 1}`,
      Color: productColors[i % productColors.length],
      Processor: processorOptions[i % processorOptions.length],
      "Internal Memory": memoryOptions[i % memoryOptions.length],
      Weight: `${getRandomInt(1000, 3000)}g`,
      Dimensions: `${getRandomInt(30, 40)}cm x ${getRandomInt(
        20,
        30
      )}cm x ${getRandomInt(15, 25)}mm`,
      Warranty: `${getRandomInt(1, 3)} Year${
        getRandomInt(1, 3) > 1 ? "s" : ""
      }`,
      "Battery Life": `${getRandomInt(4, 12)} hours`,
    };
  } else {
    // Headphones: 500K-5M toman
    price = getRandomInt(500000, 5000000);

    // Headphone-specific features
    features = [
      "Noise Cancellation",
      "Comfortable Fit",
      "Crystal Clear Sound",
      "Durable Build",
      "Wireless Connectivity",
    ];

    // Headphone-specific specifications
    specifications = {
      Brand: brand,
      Model: `${category.name.toUpperCase()}-${i + 1}`,
      Color: productColors[i % productColors.length],
      "Connection Type": connectionTypes[i % connectionTypes.length],
      Weight: `${getRandomInt(200, 500)}g`,
      Dimensions: `${getRandomInt(15, 25)}cm x ${getRandomInt(
        15,
        25
      )}cm x ${getRandomInt(5, 10)}cm`,
      Warranty: `${getRandomInt(1, 2)} Year${
        getRandomInt(1, 2) > 1 ? "s" : ""
      }`,
      "Battery Life":
        Math.random() > 0.5 ? `${getRandomInt(8, 30)} hours` : "N/A",
    };
  }

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
    // Category-specific detailed fields
    description: productDescriptions[i % productDescriptions.length],
    specifications: specifications,
    images: generateProductImages(color),
    stock: stock,
    rating: Math.round(rating * 10) / 10,
    reviewCount: reviewCount,
    weight: specifications.Weight,
    dimensions: specifications.Dimensions,
    warranty: specifications.Warranty,
    color: productColors[i % productColors.length],
    material: materials[i % materials.length],
    features: features,
    tags: [
      category.name,
      subCategory,
      brand,
      productColors[i % productColors.length],
    ],
  };
});
