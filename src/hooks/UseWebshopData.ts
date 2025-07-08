import { useQuery } from "@tanstack/react-query";

const fetchWebshopData = async () => {
  const res = await fetch("https://asanorg.liara.run/webshop");
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  console.log(data);
  return data;
};

export const useWebshopData = () => {
  return useQuery({
    queryKey: ["webshop"],
    queryFn: fetchWebshopData,
  });
};
