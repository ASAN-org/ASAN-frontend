import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [siteTitle, setSiteTitle] = useState("Loading...");

  useEffect(() => {
    fetch("https://asanorg.liara.run/webshop")
      .then((res) => res.json())
      .then((data) => {
        setSiteTitle(data.title);
        console.log(data);
        document.title = data.title;
      });
  }, []);

  return <>the title of webshop is {siteTitle}</>;
}

export default App;
