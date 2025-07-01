import { Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import webShopData from "../public/data/webshop.json";

const data = webShopData;

const dynamicRoutes = data.categories.flatMap((category) => [
  // Category main page
  <Route
    key={category.name}
    path={`/${encodeURIComponent(category.name.toLowerCase())}`}
    element={<ProductsPage category={category.name} />}
  />,
  // Subcategory pages
  ...category.children.map((subCategory) => (
    <Route
      key={`${category.name}-${subCategory}`}
      path={`/${encodeURIComponent(
        category.name.toLowerCase()
      )}/${encodeURIComponent(subCategory.toLowerCase())}`}
      element={
        <ProductsPage category={category.name} subCategory={subCategory} />
      }
    />
  )),
]);

const appRoutes = [
  <Route path="/" element={<Homepage />} key="home" />,
  ...dynamicRoutes,
];

export default appRoutes;
