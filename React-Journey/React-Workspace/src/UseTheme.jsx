import { useEffect, useState } from "react";

const useTheme = () => {
  const [themeuse, settheme] = useState(
    localStorage.getItem("theme") || "light",
  );

  function toggeluse() {
    settheme(themeuse === "light" ? "dark" : "light");
    }
    

  useEffect(() => {
    document.body.className = themeuse; 
    localStorage.setItem("theme", themeuse);
  }, [themeuse]);

  return {
    themeuse,
    toggeluse,
  };
};

export default useTheme;
