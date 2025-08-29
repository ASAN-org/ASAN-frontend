import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Divider,
  Box,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Add,
  DeleteOutline,
  LocalMall,
  Remove,
  ShoppingCart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const CartManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();

  const handleQuantityChange = (productId: string, delta: number) => {
    const currentItem = cartItems.find((item) => item.product.id === productId);
    if (currentItem) {
      const newQuantity = Math.max(1, currentItem.quantity + delta);
      updateQuantity(productId, newQuantity);
    }
  };

  const totalPrice = getCartTotal();
  const totalOriginal = cartItems.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  const handleDeleteItem = (productId: string) => {
    removeFromCart(productId);
  };

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          p: 3,
          backgroundColor: "rgba(249,249,255,1)",
        }}
      >
        <ShoppingCart
          sx={{ fontSize: 80, color: "primary.main", mb: 2, opacity: 0.5 }}
        />
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "primary.main" }}
        >
          Your cart is empty
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
          textAlign="center"
        >
          Looks like you haven't added any products to your cart yet.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            borderRadius: "8px",
            py: 1.5,
            px: 4,
          }}
        >
          Start Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "space-between",
        gap: { xs: 2, md: 4 },
        p: { xs: 1, md: 3 },
        backgroundColor: "rgba(249,249,255,1)",
      }}
    >
      {/* LEFT: Items List */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          width: "100%",
          order: { xs: 2, lg: 1 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "primary.main",
            }}
          >
            <LocalMall sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" } }} />
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Your Shopping Bag
            </Typography>
            <Chip
              label={`${cartItems.length} items`}
              color="primary"
              size="small"
            />
          </Box>

          <Button
            variant="outlined"
            color="error"
            onClick={clearCart}
            sx={{ borderRadius: "8px" }}
          >
            Clear Cart
          </Button>
        </Box>

        <Stack spacing={3} sx={{ ml: { xs: 0, lg: 10 } }}>
          {cartItems.map((item) => (
            <Card
              key={item.product.id}
              elevation={1}
              sx={{
                width: { xs: "100%", lg: "30rem" },
                borderRadius: "12px",
                overflow: "visible",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                position: "relative",
                "&:hover": {
                  boxShadow: "0 6px 24px rgba(25, 118, 210, 0.15)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  display: "flex",
                  gap: 1,
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: "white",
                    boxShadow: 1,
                    "&:hover": {
                      bgcolor: "#e3f2fd",
                      color: "primary.main",
                    },
                  }}
                  onClick={() => handleDeleteItem(item.product.id)}
                  aria-label="Delete item"
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Box>

              <CardContent>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  alignItems="center"
                >
                  <Avatar
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    sx={{
                      width: { xs: 80, sm: 120 },
                      height: { xs: 80, sm: 120 },
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    variant="rounded"
                  />
                  <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      noWrap={false}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: { xs: 2, sm: 1 },
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Brand: {item.product.brand}
                    </Typography>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt={2}
                    >
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item.product.id, -1)
                        }
                        sx={{
                          width: 32,
                          height: 32,
                          border: "1px solid #e0e0e0",
                          "&:hover": {
                            backgroundColor: "#e3f2fd",
                          },
                        }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>

                      <Typography
                        variant="body1"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          border: "1px solid #e0e0e0",
                          borderRadius: "4px",
                        }}
                      >
                        {item.quantity}
                      </Typography>

                      <IconButton
                        onClick={() => handleQuantityChange(item.product.id, 1)}
                        sx={{
                          width: 32,
                          height: 32,
                          border: "1px solid #e0e0e0",
                          "&:hover": {
                            backgroundColor: "#e3f2fd",
                          },
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Stack>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <Typography
                        variant="h6"
                        color="text.primary"
                        fontWeight="bold"
                      >
                        {item.product.discount ? (
                          <>
                            <span
                              style={{
                                textDecoration: "line-through",
                                color: "#999",
                                marginRight: "8px",
                              }}
                            >
                              {item.product.price?.toLocaleString()} Toman
                            </span>
                            <span style={{ color: "primary.main" }}>
                              {Math.round(
                                (item.product.price || 0) *
                                  (1 - item.product.discount / 100)
                              ).toLocaleString()}{" "}
                              Toman
                            </span>
                          </>
                        ) : (
                          `${item.product.price?.toLocaleString()} Toman`
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* RIGHT: Summary */}
      <Box
        sx={{
          width: { xs: "100%", lg: "380px" },
          alignSelf: { xs: "center", lg: "flex-start" },
          order: { xs: 1, lg: 2 },
          mr: { xs: 0, lg: 15 },
          mb: { xs: 3, lg: 0 },
        }}
      >
        <Card
          sx={{
            p: 3,
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(25, 118, 210, 0.1)",
            border: "none",
            background: "linear-gradient(to bottom, #fff, #f8fbff)",
            marginTop: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
            sx={{ color: "primary.main" }}
          >
            Order Summary
          </Typography>

          <Stack spacing={1} mb={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">
                Subtotal ({cartItems.length} items)
              </Typography>
              <Typography variant="body2">
                {totalOriginal.toLocaleString()} Toman
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2" color="success.main">
                Free
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2, borderColor: "rgba(0,0,0,0.08)" }} />

          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              Total
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              {totalPrice.toLocaleString()} Toman
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              borderRadius: "8px",
              py: 1.5,
            }}
          >
            Proceed to Checkout
          </Button>

          <Typography
            variant="caption"
            display="block"
            mt={2}
            textAlign="center"
            color="text.secondary"
          >
            or{" "}
            <Button
              onClick={() => navigate("/")}
              variant="text"
              size="small"
              sx={{ color: "primary.main" }}
            >
              Continue Shopping
            </Button>
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default CartManagementPage;
