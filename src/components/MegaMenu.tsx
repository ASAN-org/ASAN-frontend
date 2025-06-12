import {
  Box,
  Button,
  Popper,
  Paper,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export type Categories = {
  [key: string]: string[];
};

type MegaMenuProps = {
  categories: Categories;
};

const MegaMenu: React.FC<MegaMenuProps> = ({ categories }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    category: string
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenCategory(category);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setOpenCategory(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryClick = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleNavigate = (category: string, subCategory?: string) => {
    if (subCategory) {
      navigate(`/${category}/${subCategory}`);
    } else {
      navigate(`/${category}`);
    }
  };

  const MobileMenu = (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={handleMobileMenuToggle}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {Object.entries(categories).map(([category, items]) => (
          <Box key={category}>
            <ListItem
              onClick={() => handleCategoryClick(category)}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText
                primary={category}
                onClick={() => handleNavigate(category)}
              />
              {expandedCategory === category ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={expandedCategory === category}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {items.map((subCategory) => (
                  <ListItem
                    key={subCategory}
                    sx={{ pl: 4, cursor: "pointer" }}
                    onClick={() => handleNavigate(category, subCategory)}
                  >
                    <ListItemText primary={subCategory} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Drawer>
  );

  const DesktopMenu = (
    <Box display="flex" justifyContent="center" onMouseLeave={handleMouseLeave}>
      {Object.entries(categories).map(([category, items]) => (
        <Box key={category}>
          <Button
            onMouseEnter={(e) => handleMouseEnter(e, category)}
            onClick={() => handleNavigate(category)}
            sx={{
              color: "white",
              textTransform: "none",
              px: 3,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {category}
          </Button>
          <Popper
            open={openCategory === category}
            anchorEl={anchorEl}
            placement="bottom-start"
            sx={{ zIndex: 1300 }}
          >
            <Paper
              sx={{
                p: 2,
                mt: 0.5,
                minWidth: 200,
                backgroundColor: "white",
                boxShadow: 3,
              }}
              onMouseEnter={() => setOpenCategory(category)}
              onMouseLeave={handleMouseLeave}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                {items.map((subCategory) => (
                  <Typography
                    onClick={() => handleNavigate(category, subCategory)}
                    key={subCategory}
                    sx={{
                      p: 1,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    {subCategory}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Popper>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "black",
        color: "white",
      }}
    >
      {isMobile ? (
        <Box px={2} py={1}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileMenuToggle}
          >
            <MenuIcon />
          </IconButton>
          {MobileMenu}
        </Box>
      ) : (
        DesktopMenu
      )}
    </Box>
  );
};

export default MegaMenu;
