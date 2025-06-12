import Filter from "./../components/Filter";
import webShopData from "./../../public/data/webshop.json";

type ProductsPageProps = {
  category: string;
  subCategory?: string;
};

const ProductsPage: React.FC<ProductsPageProps> = ({
  category,
  subCategory,
}) => {
  return (
    <div>
      <h1>{category}</h1>
      {subCategory && <h2>{subCategory}</h2>}

      <Filter filters={webShopData.filters} />
    </div>
  );
};

export default ProductsPage;
