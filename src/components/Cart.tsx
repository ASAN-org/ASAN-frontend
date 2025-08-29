import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function Cart() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  const handleCartClick = () => {
    navigate("/cart-management");
  };

  return (
    <IconButton
      sx={{ marginRight: "10px" }}
      onClick={handleCartClick}
      aria-label="Shopping cart"
    >
      <ShoppingCartIcon
        fontSize="small"
        style={{ color: theme.palette.text.primary }}
      />
      <CartBadge
        badgeContent={cartItemCount}
        color="primary"
        overlap="circular"
        invisible={cartItemCount === 0}
      />
    </IconButton>
  );
}
