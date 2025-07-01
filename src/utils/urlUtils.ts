/**
 * Utility functions for URL formatting
 */

/**
 * Converts a string to a URL-friendly format by:
 * - Converting to lowercase
 * - Replacing spaces with hyphens
 * - Removing special characters
 */
export const formatUrlSegment = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove special characters except hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

/**
 * Normalizes category names to handle backend inconsistencies
 * Converts "Mobile/IPhone" format to separate category and subcategory
 */
export const normalizeCategoryName = (categoryName: string): string => {
  // Handle backend format like "Mobile/IPhone" -> "mobile"
  if (categoryName.includes("/")) {
    return categoryName.split("/")[0].toLowerCase();
  }
  return categoryName.toLowerCase();
};

/**
 * Normalizes subcategory names to handle backend inconsistencies
 * Converts "Mobile/IPhone" format to extract subcategory
 */
export const normalizeSubcategoryName = (categoryPath: string): string => {
  // Handle backend format like "Mobile/IPhone" -> "iphone"
  if (categoryPath.includes("/")) {
    return categoryPath.split("/")[1].toLowerCase();
  }
  return categoryPath.toLowerCase();
};

/**
 * Creates a category URL path
 */
export const createCategoryUrl = (categoryName: string): string => {
  return `/${formatUrlSegment(normalizeCategoryName(categoryName))}`;
};

/**
 * Creates a subcategory URL path
 */
export const createSubcategoryUrl = (
  categoryName: string,
  subCategoryName: string
): string => {
  return `/${formatUrlSegment(
    normalizeCategoryName(categoryName)
  )}/${formatUrlSegment(subCategoryName)}`;
};

/**
 * Parses a category path from backend format (e.g., "Mobile/IPhone")
 * Returns { category: "mobile", subCategory: "iphone" }
 */
export const parseCategoryPath = (
  categoryPath: string
): { category: string; subCategory?: string } => {
  if (categoryPath.includes("/")) {
    const [category, subCategory] = categoryPath.split("/");
    return {
      category: normalizeCategoryName(category),
      subCategory: normalizeSubcategoryName(subCategory),
    };
  }
  return {
    category: normalizeCategoryName(categoryPath),
  };
};
