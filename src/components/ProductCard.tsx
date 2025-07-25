import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Product";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={(theme) => ({
        height: 240,
        width: 180,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s ease",
        mt: 1, // Top margin
        mb: 1,
        cursor: "pointer",
        boxShadow: theme.shadows[1],
        "&:hover": {
          boxShadow: theme.shadows[6],
          transform: "translateY(-2px)",
        },
      })}
    >
      {/* Image Section */}
      <Box
        sx={(theme) => ({
          height: 120,
          width: "100%",
          backgroundColor: theme.palette.background.default,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        })}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            objectFit: "contain",
          }}
        />
      </Box>
      {/* Info Section */}
      <CardContent
        sx={{
          flexGrow: 1,
          px: 1.2,
          pt: 1,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              fontFamily: "'Anjoman-FaNum-Bold'",
              lineHeight: 1.3,
              mb: 0.5,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              fontFamily: "'Anjoman-FaNum-Medium'",
              fontSize: "0.85rem",
            })}
          >
            {product.brand}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: "'Anjoman-FaNum-Bold'",
            fontSize: "1rem",
            mt: 1,
          }}
        >
          Rp {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
