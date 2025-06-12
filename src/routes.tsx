import { Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";

const categoriesData = {
  headphone: ["Anker", "HTC", "TSCO"],
  laptop: ["Lenovo", "Asus", "HP"],
  mobile: ["IPhone", "Samsung", "Xiaomi"],
};

const dynamicRoutes = [
  // Category main pages
  ...Object.entries(categoriesData).map(([category]) => (
    <Route
      key={category}
      path={`/${category}`}
      element={<ProductsPage category={category} />}
    />
  )),
  // Subcategory pages
  ...Object.entries(categoriesData).flatMap(([category, items]) =>
    items.map((subCategory) => (
      <Route
        key={`${category}-${subCategory}`}
        path={`/${category}/${subCategory}`}
        element={<ProductsPage category={category} subCategory={subCategory} />}
      />
    ))
  ),
];

const appRoutes = [
  <Route path="/" element={<Homepage />} key="home" />,
  ...dynamicRoutes,
];

export default appRoutes;
