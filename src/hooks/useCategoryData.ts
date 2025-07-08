import { useMemo, useState, useEffect } from 'react';
import { normalizeCategoryName, normalizeSubcategoryName } from '../utils/urlUtils';

export interface CategoryData {
  name: string;
  normalizedName: string;
  children: string[];
}

export interface SubcategoryData {
  name: string;
  normalizedName: string;
  category: string;
  normalizedCategoryName: string;
}

interface WebShopData {
  categories: Array<{
    name: string;
    children: string[];
  }>;
  filters: Array<{
    category: string;
    label: string;
    type: string;
    min?: number;
    max?: number;
    unit?: string;
    options?: string[];
  }>;
}

export const useCategoryData = () => {
  const [webShopData, setWebShopData] = useState<WebShopData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://asanorg.liara.run/webshop")
      .then((res) => res.json())
      .then((data) => {
        setWebShopData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch webshop data:", error);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    if (!webShopData) return [];
    return webShopData.categories.map(cat => ({
      name: cat.name,
      normalizedName: normalizeCategoryName(cat.name),
      children: cat.children
    }));
  }, [webShopData]);

  const subcategories = useMemo(() => {
    if (!webShopData) return [];
    return webShopData.categories.flatMap(cat =>
      cat.children.map(subCat => ({
        name: subCat,
        normalizedName: normalizeSubcategoryName(subCat),
        category: cat.name,
        normalizedCategoryName: normalizeCategoryName(cat.name)
      }))
    );
  }, [webShopData]);

  const findCategoryByName = (categoryName: string): CategoryData | undefined => {
    const normalizedSearchName = normalizeCategoryName(categoryName);
    return categories.find(cat => cat.normalizedName === normalizedSearchName || cat.name === categoryName);
  };

  const findSubcategoryByName = (categoryName: string, subcategoryName: string): SubcategoryData | undefined => {
    const normalizedCategoryName = normalizeCategoryName(categoryName);
    const normalizedSubcategoryName = normalizeSubcategoryName(subcategoryName);
    
    return subcategories.find(sub => 
      sub.normalizedCategoryName === normalizedCategoryName && 
      sub.normalizedName === normalizedSubcategoryName
    );
  };

  const getFiltersForCategory = (categoryName: string, subcategoryName?: string) => {
    if (!webShopData) return [];
    
    const normalizedCategoryName = normalizeCategoryName(categoryName);
    const normalizedSubcategoryName = subcategoryName ? normalizeSubcategoryName(subcategoryName) : undefined;
    
    return webShopData.filters.filter(filter => {
      const filterCategory = normalizeCategoryName(filter.category.split('/')[0]);
      const filterSubcategory = filter.category.includes('/') ? normalizeSubcategoryName(filter.category.split('/')[1]) : undefined;
      
      return filterCategory === normalizedCategoryName && 
             (!normalizedSubcategoryName || filterSubcategory === normalizedSubcategoryName);
    });
  };

  return {
    categories,
    subcategories,
    findCategoryByName,
    findSubcategoryByName,
    getFiltersForCategory,
    loading,
    webShopData
  };
};
