import { Route } from "react-router-dom";
import Header from "./components/Header";
import { ImageSlider } from "./components/ImageSlider";
import Homepage from "./pages/Homepage";

const appRoutes = <Route path="/" element={<Homepage/>}></Route>;

export default appRoutes;
