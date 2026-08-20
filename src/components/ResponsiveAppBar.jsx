import { useState } from "react";
import "./ResponsiveAppBar.css";

const pages = [
  { name: "Explore", link: "#explore" },
  { name: "World Map", link: "#world" },
  { name: "Discover", link: "#country-detail" },
];

const CompassMark = () => (
  <span className="compass-mark" aria-hidden="true">
    <span />
  </span>
);

const ResponsiveAppBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExplore = () => {
    document
      .getElementById("explore")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="topbar">
      <a href="#top" className="brand" aria-label="Atlas home">
        <CompassMark />
        <span>ATLAS</span>
        <small>Country Explorer</small>
      </a>

      <nav
        id="primary-navigation"
        className={`nav-links ${mobileMenuOpen ? "nav-open" : ""}`}
        aria-label="Primary navigation"
      >
        {pages.map((page) => (
          <a
            key={page.name}
            href={page.link}
            onClick={() => setMobileMenuOpen(false)}
          >
            {page.name}
          </a>
        ))}
      </nav>

      <button type="button" className="journey-button" onClick={handleExplore}>
        Start exploring <span aria-hidden="true">↗</span>
      </button>

      <button
        type="button"
        className={`menu-button ${mobileMenuOpen ? "menu-open" : ""}`}
        aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
        aria-controls="primary-navigation"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
      </button>
    </header>
  );
};

export default ResponsiveAppBar;