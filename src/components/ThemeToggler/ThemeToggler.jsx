import { useState, useEffect } from "react";
import { daisyThemes } from "../../common/constants";

const ThemeToggle = () => {
  const [selectedTheme, setSelectedTheme] = useState('cupcake');

  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme) {
      setSelectedTheme(storedTheme);
      applyTheme(storedTheme);
    }
  }, []);

  const applyTheme = (theme) => {
    const themeName = theme.split(" ")[1];
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("selectedTheme", theme);
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    applyTheme(theme);
  };

  return (
    <div className="dropdown justify-center">
      <label tabIndex={0} className="btn m-1 btn-circle">
        <i className="fa-solid fa-paint-roller text-primary text-xl" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu menu-md  md:p-2 shadow bg-base-100 rounded-box w-52"
      >
        {daisyThemes.map((t) => (
          <li key={t}>
            <h5
              onClick={() => handleThemeChange(t)}
              className={t === selectedTheme ? "font-bold bg-base-300" : ""}
            >
              {t}
            </h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeToggle;
