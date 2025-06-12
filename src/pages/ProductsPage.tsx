import Filter from "./../components/Filter";
//import webShopData from "./../../public/data/webshop.json";
//import { useWebshopData } from "../hooks/UseWebshopData";

type ProductsPageProps = {
  category: string;
  subCategory?: string;
};

const ProductsPage: React.FC<ProductsPageProps> = ({
  category,
  subCategory,
}) => {
  //const { data } = useWebshopData();
  //const data = webShopData;

  return (
    <div>
      <h1>{category}</h1>
      {subCategory && <h2>{subCategory}</h2>}

      <Filter category={category} label="H" type="T" />
    </div>
  );
};

export default ProductsPage;
