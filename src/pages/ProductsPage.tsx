import { Box } from "@mui/material";
import Filter from "./../components/Filter";

type ProductsPageProps = {
  category: string;
  subCategory?: string;
};

const ProductsPage: React.FC<ProductsPageProps> = ({
  category,
  subCategory,
}) => {
  return (
    <Box>
      <Filter category={category} subCategory={subCategory} />
    </Box>
  );
};

export default ProductsPage;
