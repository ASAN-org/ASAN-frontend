import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import type { Product } from "../types/Product";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      sx={{
        height: 240,
        width: 180,
        background: "linear-gradient(to bottom, #cbd5e1, #e2e8f0)", // light gray/blue gradient
        color: "#0f172a", // dark text for readability
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow:
            "0 4px 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.5)",
          cursor: "pointer",
        },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          height: 120,
          width: "100%",
          backgroundColor: "#f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
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
            sx={{
              color: "#334155",
              fontFamily: "'Anjoman-FaNum-Medium'",
              fontSize: "0.85rem",
            }}
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
