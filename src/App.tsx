import { useEffect } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import appRoutes from "./routes";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    fetch("https://asanorg.liara.run/webshop")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.title = data.title;
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>{appRoutes}</Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
