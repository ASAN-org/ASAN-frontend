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
        display={"flex"}
        width={"100%"}
        sx={{ backgroundColor: "#f0f0f0" }}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          flexDirection={isMobile ? "column" : "row"}
          justifyContent={"space-between"}
          alignItems={isMobile ? "stretch" : "center"}
        >
          <Box
            display={"flex"}
            flexDirection={isMobile ? "column" : "row"}
            width={isMobile ? "100%" : "auto"}
            alignItems={isMobile ? "stretch" : "center"}
          >
            <Box
              component={"img"}
              src={logo}
              onClick={() => navigate("/")}
              margin={"0.5rem"}
              sx={{
                maxHeight: "40px",
                objectFit: "contain",
                cursor: "pointer"
                //alignSelf: isMobile ? "center" : "flex-start",
              }}
            />
            <Typography fontWeight={"bold"} fontSize={"1.7rem"}>
              {siteTitle}
            </Typography>
            <Box margin={"1rem"} width={isMobile ? "auto" : "300px"}>
              <SearchBox />
            </Box>
          </Box>

          <Box
            margin={"1rem"}
            display={"flex"}
            flexDirection={"row"}
            gap={"1rem"}
            alignItems={"center"}
            justifyContent={isMobile ? "center" : "flex-end"}
          >
            <Cart />
            <Button variant="contained" sx={{ height: "2rem" }}>
              Login
            </Button>
          </Box>
        </Box>
        <Box>
          <MegaMenu categories={categories} />
        </Box>
      </Box>
    </>
  );
}
