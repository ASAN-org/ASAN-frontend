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
//import { useWebshopData } from "../hooks/UseWebshopData";
import webShopData from "../../public/data/webshop.json";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [logo, setLogo] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [categories, setCategories] = useState<Categories>([]);

  //const { data } = useWebshopData();
  const data = webShopData;
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
        sx={{ backgroundColor: "#f0f0f0" }}
        flexDirection="column"
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
              justifyContent="flex-start"
              width="100%"
              position="relative"
              py={1}
            >
              {/* Left: Logo and Title */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
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
                  }}
                />
                <Typography fontWeight={"bold"} fontSize={"1.5rem"}>
                  {siteTitle}
                </Typography>
              </Box>
              {/* Right: Search, Login, Cart */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                position="absolute"
                right={24}
                top="50%"
                sx={{ transform: "translateY(-50%)" }}
              >
                <SearchBox />
                <Button variant="contained" sx={{ height: "2rem" }}>
                  Login
                </Button>
                <Cart />
              </Box>
            </Box>
            {/* MegaMenu below */}
            <Box width="100%">
              <MegaMenu categories={categories} siteTitle={siteTitle} />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
