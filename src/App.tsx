import { useEffect } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import appRoutes from "./routes";
import "./App.css";

function App() {
  //const [siteTitle, setSiteTitle] = useState("Loading...");

  useEffect(() => {
    fetch("https://asanorg.liara.run/webshop")
      .then((res) => res.json())
      .then((data) => {
        //setSiteTitle(data.title);
        console.log(data);
        document.title = data.title;
      });
  }, []);

  return (
    <Router>
      <Routes>{appRoutes}</Routes>
    </Router>
  );
}

export default App;
