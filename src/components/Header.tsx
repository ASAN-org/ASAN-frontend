import { Box, Button } from "@mui/material";
import WebshopData from "../../public/data/webshop.json";
import SearchBox from "./SearchBox";
import Cart from "./Cart";

export default function Header() {
  return (
    <>
      <Box
        display={"flex"}
        width={"100%"}
        sx={{ backgroundColor: "#f0f0f0" }}
        alignItems={"center"}
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
        >
          <Cart />
          <Button variant="contained">Login</Button>
        </Box>
      </Box>
    </>
  );
}
