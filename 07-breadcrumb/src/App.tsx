import { Link, Outlet, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "./components";
import { useContext, useEffect } from "react";
import UiContext from "./context/UI/UiContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

type NavItem = {
  url: string;
  title: string;
};

const NavItems: NavItem[] = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "products",
    title: "Products",
  },
  {
    url: "categories",
    title: "Categories",
  },
];

const App = () => {
  const navigate = useNavigate();
  const { changeIsSmallerDisplay, theme, changeTheme } = useContext(UiContext);

  const resizeHandler = () => {
    if (window.innerWidth < 640) {
      changeIsSmallerDisplay && changeIsSmallerDisplay(true);
    } else {
      changeIsSmallerDisplay && changeIsSmallerDisplay(false);
    }
  };

  useEffect(() => {
    resizeHandler();

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");

    if (html) {
      html.removeAttribute("data-theme");
      html.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div className="app-container">
      <div
        style={{
          borderBottom: "1px solid #ceaf24",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 onClick={() => navigate("/")}>My Dummy Store</h2>

        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          {NavItems.map((navItem) => (
            <Link key={`nav-item-${navItem.url}`} to={navItem.url}>
              <button>{navItem.title}</button>
            </Link>
          ))}

          {theme === "dark" && (
            <button onClick={() => changeTheme && changeTheme("light")}>
              <MdLightMode size={16} />
            </button>
          )}
          {theme === "light" && (
            <button onClick={() => changeTheme && changeTheme("dark")}>
              <MdDarkMode size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="bottom-container">
        <Breadcrumbs />

        <div className="page-container-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
