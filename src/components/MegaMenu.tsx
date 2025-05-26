import { Box, Button, Popper, Paper, Typography } from "@mui/material";
import { useState } from "react";
import webShopData from "../../public/data/webshop.json";

interface CategoryProps {
  name: string;
  children: string[];
}

export default function MegaMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

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

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        onMouseLeave={handleMouseLeave}
      >
        {webShopData.categories.map((category: CategoryProps) => (
          <Box key={category.name}>
            <Button
              onMouseEnter={(e) => handleMouseEnter(e, category.name)}
              sx={{
                color: "white",
                textTransform: "none",
                px: 3,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
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
                sx={{
                  p: 2,
                  mt: 0.5,
                  minWidth: 200,
                  backgroundColor: "white",
                  boxShadow: 3,
                }}
                onMouseEnter={() => setOpenCategory(category.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Box display="flex" flexDirection="column" gap={1}>
                  {category.children.map((subCategory: string) => (
                    <Typography
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
    </Box>
  );
}
