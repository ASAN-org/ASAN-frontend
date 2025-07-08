import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { formatUrlSegment, normalizeCategoryName } from "./utils/urlUtils";

const queryClient = new QueryClient();

interface WebShopData {
  categories: Array<{
    name: string;
    children: string[];
  }>;
  title: string;
  products_page: {
    default_sort_option: string;
    items_per_row: number;
    sort_options: Array<{
      key: string;
      label: string;
      order: number;
    }>;
  };
}

function App() {
  const [webShopData, setWebShopData] = useState<WebShopData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://asanorg.liara.run/webshop")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWebShopData(data);
        document.title = data.title;
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch webshop data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!webShopData) {
    return <div>Failed to load data</div>;
  }

  // Generate dynamic routes based on fetched data
  const dynamicRoutes = webShopData.categories.flatMap((category) => [
    // Category main page
    <Route
      key={category.name}
      path={`/${formatUrlSegment(normalizeCategoryName(category.name))}`}
      element={
        <ProductsPage 
          category={normalizeCategoryName(category.name)} 
          itemsPerPage={webShopData.products_page.items_per_row}
          sortOptions={webShopData.products_page.sort_options}
          defaultSort={webShopData.products_page.default_sort_option}
        />
      }
    />,
    // Subcategory pages
    ...category.children.map((subCategory) => (
      <Route
        key={`${category.name}-${subCategory}`}
        path={`/${formatUrlSegment(
          normalizeCategoryName(category.name)
        )}/${formatUrlSegment(subCategory)}`}
        element={
          <ProductsPage
            category={normalizeCategoryName(category.name)}
            subCategory={subCategory}
            itemsPerPage={webShopData.products_page.items_per_row}
            sortOptions={webShopData.products_page.sort_options}
            defaultSort={webShopData.products_page.default_sort_option}
          />
        }
      />
    )),
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          {dynamicRoutes}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
