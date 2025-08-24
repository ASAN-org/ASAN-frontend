import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import SearchBox from "./SearchBox";
import Cart from "./Cart";
import MegaMenu from "./MegaMenu";
import { useEffect, useState } from "react";
import type { Categories } from "./MegaMenu";
import { useNavigate } from "react-router-dom";
import { useWebshopData } from "../hooks/UseWebshopData";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [logo, setLogo] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [categories, setCategories] = useState<Categories>([]);

  const { data } = useWebshopData();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setLogo(data.logo?.replace(/^"(.*)"$/, "$1"));
      setSiteTitle(data.title?.replace(/^"(.*)"$/, "$1"));
      setCategories(data.categories);
    }
  }, [data]);

  return (
    <>
      <Box
        display="flex"
        width="100%"
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          position: "relative",
          zIndex: 1,
        })}
        flexDirection="column"
        marginBottom={isMobile ? 1 : 3}
      >
        {isMobile ? (
          <Box
            display="flex"
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            px={1}
            py={0.5}
            width="100%"
            style={{ direction: "ltr" }}
          >
            {/* Left: Hamburger menu and logo */}
            <Box display="flex" alignItems="center" flexDirection="row" gap={0}>
              <MegaMenu categories={categories} siteTitle={siteTitle} />
              <Box
                component={"img"}
                src={logo}
                onClick={() => navigate("/")}
                margin={isMobile ? "0" : "0.3rem"}
                sx={{
                  maxHeight: "28px",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </Box>
            {/* Right: Search, login, cart */}
            <Box
              display="flex"
              alignItems="center"
              flexDirection="row"
              gap={1}
              pr={0.5}
            >
              <SearchBox />
              <Button
                variant="contained"
                sx={{
                  height: "1.7rem",
                  minWidth: 60,
                  fontSize: "0.85rem",
                  px: 1.5,
                }}
              >
                Login
              </Button>
              <Cart />
            </Box>
          </Box>
        ) : (
          <>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              p={2}
              sx={{ overflow: "hidden" }}
            >
              {/* Left: Logo and Title */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ minWidth: 0, flex: 1 }}
              >
                <Box
                  component={"img"}
                  src={logo}
                  onClick={() => navigate("/")}
                  margin={isMobile ? "0" : "0.3rem"}
                  sx={{
                    maxHeight: "40px",
                    objectFit: "contain",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  fontWeight={"bold"}
                  fontSize={"1.5rem"}
                  sx={(theme) => ({
                    ml: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: theme.palette.text.primary,
                  })}
                >
                  {siteTitle}
                </Typography>
              </Box>
              {/* Right: Search, Login, Cart */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{
                  flexShrink: 0,
                  ml: 2,
                  position: "relative",
                  zIndex: 9999,
                }}
              >
                <SearchBox />
                <Button variant="contained" sx={{ height: "2rem" }}>
                  Login
                </Button>
                <Cart />
              </Box>
            </Box>
            {/* MegaMenu below */}
            <Box width="100%" sx={{ overflow: "hidden" }}>
              <MegaMenu categories={categories} siteTitle={siteTitle} />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
