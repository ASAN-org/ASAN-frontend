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
    </div>
  );
};

export default ProductsPage;
