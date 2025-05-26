import { Box } from "@mui/material";
import WebshopData from "../../public/data/webshop.json";
import SearchBox from "./SearchBox";

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
        <Box component={"img"} src={WebshopData.logo} margin={"1rem"}></Box>
        <Box height={"3rem"} margin={"1rem"}>
          <SearchBox />
        </Box>
      </Box>
    </>
  );
}
