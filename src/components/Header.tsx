import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import SearchBox from "./SearchBox";
import Cart from "./Cart";
import MegaMenu from "./MegaMenu";
import { useEffect, useState } from "react";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [logo, setLogo] = useState("");

  useEffect(() => {
    fetch("https://asanorg.liara.run/webshop")
      .then((res) => res.json())
      .then((data) => {
        setLogo(data.logo.replace(/^"(.*)"$/, "$1"));
      });
  }, []);

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
              margin={"1rem"}
              sx={{
                maxHeight: "40px",
                objectFit: "contain",
                alignSelf: isMobile ? "center" : "flex-start",
              }}
            />
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
          <MegaMenu />
        </Box>
      </Box>
    </>
  );
}
