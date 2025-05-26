import { Box, Button } from "@mui/material";
import WebshopData from "../../public/data/webshop.json";
import SearchBox from "./SearchBox";
import Cart from "./Cart";
import CategoryTabs from "./CategoryTabs";

export default function Header() {
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
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"row"}>
            <Box component={"img"} src={WebshopData.logo} margin={"1rem"}></Box>
            <Box height={"3rem"} margin={"1rem"}>
              <SearchBox />
            </Box>
          </Box>

          <Box
            margin={"1rem"}
            display={"flex"}
            flexDirection={"row"}
            gap={"1rem"}
            alignItems={"center"}
          >
            <Cart />
            <Button variant="contained" sx={{ height: "2rem" }}>
              Login
            </Button>
          </Box>
        </Box>
        <Box>
          <CategoryTabs />
        </Box>
      </Box>
    </>
  );
}
