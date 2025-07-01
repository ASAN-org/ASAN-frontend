import { Box } from "@mui/material";
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
    <Box>
      <Filter
        category={category}
        subCategory={subCategory}
        label="H"
        type="T"
      />
    </Box>
  );
};

export default ProductsPage;
