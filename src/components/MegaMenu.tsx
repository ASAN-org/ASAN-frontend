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
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { createCategoryUrl, createSubcategoryUrl } from "../utils/urlUtils";

export type Categories = Array<{
  name: string;
  children: string[];
}>;

type MegaMenuProps = {
  categories: Categories;
  siteTitle?: string;
};

const MegaMenu: React.FC<MegaMenuProps> = ({ categories, siteTitle }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    categoryName: string
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenCategory(categoryName);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setOpenCategory(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };

  const handleNavigate = (categoryName: string, subCategory?: string) => {
    if (subCategory) {
      navigate(createSubcategoryUrl(categoryName, subCategory));
    } else {
      navigate(createCategoryUrl(categoryName));
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        borderBottom={1}
        borderColor="divider"
      >
        <Typography variant="h6">{siteTitle || "Menu"}</Typography>
        <IconButton onClick={handleMobileMenuToggle} aria-label="close menu">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {categories.map((category) => (
          <Box key={category.name}>
            <ListItem
              onClick={() => handleCategoryClick(category.name)}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText
                primary={category.name}
                onClick={() => handleNavigate(category.name)}
              />
              {expandedCategory === category.name ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={expandedCategory === category.name}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {category.children.map((subCategory) => (
                  <ListItem
                    key={subCategory}
                    sx={{ pl: 4, cursor: "pointer" }}
                    onClick={() => handleNavigate(category.name, subCategory)}
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
    <Box
      display="flex"
      justifyContent="center"
      onMouseLeave={handleMouseLeave}
      sx={{
        overflow: "hidden",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {categories.map((category) => (
        <Box key={category.name} sx={{ flexShrink: 0 }}>
          <Button
            onMouseEnter={(e) => handleMouseEnter(e, category.name)}
            onClick={() => handleNavigate(category.name)}
            sx={(theme) => ({
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.primary
                  : "white",
              textTransform: "none",
              px: 2,
              minWidth: "auto",
              fontSize: "0.9rem",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            })}
          >
            {category.name}
          </Button>
          <Popper
            open={openCategory === category.name}
            anchorEl={anchorEl}
            placement="bottom-start"
            sx={{ zIndex: 1300 }}
          >
            <Paper
              sx={(theme) => ({
                p: 2,
                mt: 0.5,
                minWidth: 200,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: 3,
              })}
              onMouseEnter={() => setOpenCategory(category.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                {category.children.map((subCategory) => (
                  <Typography
                    onClick={() => handleNavigate(category.name, subCategory)}
                    key={subCategory}
                    sx={(theme) => ({
                      p: 1,
                      cursor: "pointer",
                      color: theme.palette.text.primary,
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    })}
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
        backgroundColor: isMobile
          ? "transparent"
          : theme.palette.mode === "dark"
          ? theme.palette.background.paper
          : "black",
        color: isMobile
          ? theme.palette.text.primary
          : theme.palette.mode === "dark"
          ? theme.palette.text.primary
          : "white",
      }}
    >
      {isMobile ? (
        <Box px={1} py={1}>
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
