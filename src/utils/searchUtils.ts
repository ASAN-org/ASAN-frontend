import { mockProducts } from "../types/mockProducts";
import type { Product } from "../types/Product";

export interface SearchResult {
  type: "product" | "category" | "subcategory" | "brand";
  id: string;
  name: string;
  score: number;
  data?: Product;
  url: string;
}

export interface SearchSuggestion {
  type: "product" | "category" | "subcategory" | "brand";
  id: string;
  name: string;
  score: number;
  data?: Product;
  url: string;
}

// Get unique categories, subcategories, and brands
const getUniqueCategories = () => {
  const categories = new Set<string>();
  const subcategories = new Set<string>();
  const brands = new Set<string>();

  mockProducts.forEach((product) => {
    categories.add(product.category);
    subcategories.add(product.subCategory);
    brands.add(product.brand);
  });

  return {
    categories: Array.from(categories),
    subcategories: Array.from(subcategories),
    brands: Array.from(brands),
  };
};

// Calculate similarity score between two strings
const calculateStringSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  // Exact match
  if (s1 === s2) return 1.0;

  // Contains match
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;

  // Word-based similarity
  const words1 = s1.split(" ").filter((w) => w.length > 2);
  const words2 = s2.split(" ").filter((w) => w.length > 2);

  const commonWords = words1.filter((word) =>
    words2.some((w) => w.includes(word) || word.includes(w))
  );

  if (commonWords.length > 0) {
    return 0.6 + commonWords.length * 0.1;
  }

  // Character-based similarity (simple)
  let matches = 0;
  const minLength = Math.min(s1.length, s2.length);
  for (let i = 0; i < minLength; i++) {
    if (s1[i] === s2[i]) matches++;
  }

  return matches / Math.max(s1.length, s2.length);
};

// Search products with priority-based scoring
const searchProducts = (query: string): SearchResult[] => {
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();

  mockProducts.forEach((product) => {
    let score = 0;

    // Priority 1: Exact name match
    if (product.name.toLowerCase() === queryLower) {
      score += 100;
    }
    // Priority 2: Name contains query
    else if (product.name.toLowerCase().includes(queryLower)) {
      score += 80;
    }
    // Priority 3: Brand exact match
    else if (product.brand.toLowerCase() === queryLower) {
      score += 70;
    }
    // Priority 4: Brand contains query
    else if (product.brand.toLowerCase().includes(queryLower)) {
      score += 60;
    }
    // Priority 5: Category exact match
    else if (product.category.toLowerCase() === queryLower) {
      score += 50;
    }
    // Priority 6: Subcategory exact match
    else if (product.subCategory.toLowerCase() === queryLower) {
      score += 45;
    }
    // Priority 7: Description contains query
    else if (product.description?.toLowerCase().includes(queryLower)) {
      score += 30;
    }
    // Priority 8: Tags contain query
    else if (
      product.tags?.some((tag) => tag.toLowerCase().includes(queryLower))
    ) {
      score += 25;
    }
    // Priority 9: Color match
    else if (product.color?.toLowerCase().includes(queryLower)) {
      score += 20;
    }
    // Priority 10: Material match
    else if (product.material?.toLowerCase().includes(queryLower)) {
      score += 15;
    }
    // Priority 11: Fuzzy matching for name
    else {
      const nameSimilarity = calculateStringSimilarity(product.name, query);
      if (nameSimilarity > 0.3) {
        score += nameSimilarity * 40;
      }
    }

    if (score > 0) {
      results.push({
        type: "product",
        id: product.id,
        name: product.name,
        score,
        data: product,
        url: `/product/${product.id}`,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
};

// Search categories and subcategories
const searchCategories = (query: string): SearchResult[] => {
  const results: SearchResult[] = [];
  const { categories, subcategories } = getUniqueCategories();
  const queryLower = query.toLowerCase();

  // Search categories
  categories.forEach((category) => {
    let score = 0;

    if (category.toLowerCase() === queryLower) {
      score = 100;
    } else if (category.toLowerCase().includes(queryLower)) {
      score = 80;
    } else {
      const similarity = calculateStringSimilarity(category, query);
      if (similarity > 0.3) {
        score = similarity * 60;
      }
    }

    if (score > 0) {
      results.push({
        type: "category",
        id: `cat-${category}`,
        name: category,
        score,
        url: `/${category.toLowerCase().replace(/\s+/g, "-")}`,
      });
    }
  });

  // Search subcategories
  subcategories.forEach((subcategory) => {
    let score = 0;

    if (subcategory.toLowerCase() === queryLower) {
      score = 90;
    } else if (subcategory.toLowerCase().includes(queryLower)) {
      score = 70;
    } else {
      const similarity = calculateStringSimilarity(subcategory, query);
      if (similarity > 0.3) {
        score = similarity * 50;
      }
    }

    if (score > 0) {
      // Find the parent category for this subcategory
      const parentCategory = mockProducts.find(
        (p) => p.subCategory === subcategory
      )?.category;
      const url = parentCategory
        ? `/${parentCategory.toLowerCase().replace(/\s+/g, "-")}/${subcategory
            .toLowerCase()
            .replace(/\s+/g, "-")}`
        : `/${subcategory.toLowerCase().replace(/\s+/g, "-")}`;

      results.push({
        type: "subcategory",
        id: `subcat-${subcategory}`,
        name: subcategory,
        score,
        url,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
};

// Search brands
const searchBrands = (query: string): SearchResult[] => {
  const results: SearchResult[] = [];
  const { brands } = getUniqueCategories();
  const queryLower = query.toLowerCase();

  brands.forEach((brand) => {
    let score = 0;

    if (brand.toLowerCase() === queryLower) {
      score = 100;
    } else if (brand.toLowerCase().includes(queryLower)) {
      score = 80;
    } else {
      const similarity = calculateStringSimilarity(brand, query);
      if (similarity > 0.3) {
        score = similarity * 60;
      }
    }

    if (score > 0) {
      results.push({
        type: "brand",
        id: `brand-${brand}`,
        name: brand,
        score,
        url: `/search?brand=${encodeURIComponent(brand)}`,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
};

// Main search function
export const searchAll = (query: string): SearchSuggestion[] => {
  if (!query.trim()) return [];

  const productResults = searchProducts(query);
  const categoryResults = searchCategories(query);
  const brandResults = searchBrands(query);

  // Combine and sort all results
  const allResults = [...productResults, ...categoryResults, ...brandResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Limit to top 10 suggestions

  return allResults;
};

// Search products for search results page
export const searchProductsForPage = (query: string): Product[] => {
  if (!query.trim()) return [];

  const results = searchProducts(query);
  return results.map((result) => result.data!).filter(Boolean);
};

// Get price range for search results
export const getPriceRange = (
  products: Product[]
): { min: number; max: number } => {
  if (products.length === 0) return { min: 0, max: 1000 };

  const prices = products.map((p) => p.price || 0).filter((p) => p > 0);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};
