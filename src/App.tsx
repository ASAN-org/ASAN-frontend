import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import FAQ from "./pages/FAQ";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import LoadingSpinner from "./components/LoadingSpinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { formatUrlSegment, normalizeCategoryName } from "./utils/urlUtils";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./utils/theme";
import AboutUs from "./pages/AboutUsPage";
import CartManagementPage from "./pages/CartManagementPage";
import Footer from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";

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
  theme: "dark" | "light";
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
    return <LoadingSpinner message="Loading application..." fullScreen />;
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

  // Get theme mode from backend data (default to 'light')
  const themeMode = (webShopData.theme === "dark" ? "dark" : "light") as
    | "light"
    | "dark";
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Router>
            <Box sx={{ overflowX: "hidden", minHeight: "100vh" }}>
              <Header />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route
                  path="/about-us"
                  element={<AboutUs webshopData={webShopData} />}
                />
                <Route
                  path="/cart-management"
                  element={<CartManagementPage />}
                />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/faq" element={<FAQ />} />
                {dynamicRoutes}
              </Routes>
              <Footer webshopName={webShopData.title} />
            </Box>
          </Router>
        </CartProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
