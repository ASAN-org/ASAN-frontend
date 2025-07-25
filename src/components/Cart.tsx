import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function IconButtonWithBadge({ color }: { color?: string }) {
  const theme = useTheme();
  return (
    <IconButton sx={{ marginRight: "10px" }}>
      <ShoppingCartIcon
        fontSize="small"
        style={{ color: color || theme.palette.text.primary }}
      />
      <CartBadge badgeContent={2} color="primary" overlap="circular" />
    </IconButton>
  );
}
