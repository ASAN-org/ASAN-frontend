import { Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import webShopData from "../public/data/webshop.json";
import { formatUrlSegment, normalizeCategoryName } from "./utils/urlUtils";

const data = webShopData;

const dynamicRoutes = data.categories.flatMap((category) => [
  // Category main page
  <Route
    key={category.name}
    path={`/${formatUrlSegment(normalizeCategoryName(category.name))}`}
    element={<ProductsPage category={normalizeCategoryName(category.name)} />}
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
        />
      }
    />
  )),
]);

const appRoutes = [
  <Route path="/" element={<Homepage />} key="home" />,
  ...dynamicRoutes,
];

export default appRoutes;
