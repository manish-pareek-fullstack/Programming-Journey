import React, { useEffect, useState } from 'react'

const UseTheme = () => {
    const [theme, settheme] = useState(localStorage.getItem('theme') || 'light');
    function toggeltheme() {
      // line change karo:
      settheme(theme === "light" ? "dark" : "light");
      //                             ^^^^^ 'drak' tha, 'dark' karo
    }
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    return { theme, toggeltheme };
}

export default UseTheme
