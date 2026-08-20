import { useState } from "react";
import "./HeroSection.css";

const QUICK_PICKS = ["Pakistan", "Austria", "Japan"];

const HeroSection = ({ onSearch, countriesCount }) => {
  const [searchInput, setSearchInput] = useState("");

  const scrollToExplorer = () => {
    document
      .getElementById("explore")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const countryName = searchInput.trim();
    if (!countryName) return;

    onSearch(countryName);
    scrollToExplorer();
  };

  const handleQuickPick = (country) => {
    setSearchInput(country);
    onSearch(country);
    scrollToExplorer();
  };

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="hero-eyebrow">
          <span />
          Your world, beautifully mapped
        </div>

        <h1>
          Every country
          <br />
          has a <em>story.</em>
        </h1>

        <p>
          Wander across borders from your screen. Explore countries, capitals,
          languages and cultures—one destination at a time.
        </p>

        <form className="search-box" onSubmit={handleSubmit}>
          <span className="search-symbol" aria-hidden="true">
            ⌕
          </span>

          <input
            type="text"
            value={searchInput}
            aria-label="Search for a country"
            placeholder="Search a country…"
            onChange={(event) => setSearchInput(event.target.value)}
          />

          {searchInput && (
            <button
              type="button"
              className="clear-search"
              aria-label="Clear country search"
              onClick={() => setSearchInput("")}
            >
              ×
            </button>
          )}

          <button type="submit" className="search-button">
            Discover
          </button>
        </form>

        <div className="quick-picks">
          <span>Quick picks</span>

          {QUICK_PICKS.map((country) => (
            <button
              key={country}
              type="button"
              onClick={() => handleQuickPick(country)}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      <div className="world-visual" id="world" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />

        <div className="globe">
          <div className="globe-grid" />
          <div className="land land-one" />
          <div className="land land-two" />
          <div className="land land-three" />

          <span className="map-pin pin-one">
            <i /> Vienna
          </span>
          <span className="map-pin pin-two">
            <i /> Lahore
          </span>
          <span className="map-pin pin-three">
            <i /> Tokyo
          </span>
        </div>

        <div className="floating-card float-top">
          <span className="mini-flag">🇦🇹</span>
          <span>
            <small>Now exploring</small>
            <strong>Austria</strong>
          </span>
        </div>

        <div className="floating-card float-bottom">
          <span className="live-dot" />
          <span>
            <strong>{countriesCount || 0}</strong>
            <small>countries ready</small>
          </span>
        </div>
      </div>

      <div className="hero-stats">
        <div>
          <strong>{countriesCount || 0}</strong>
          <span>Countries</span>
        </div>
        <div>
          <strong>7</strong>
          <span>Continents</span>
        </div>
        <div>
          <strong>6.5K+</strong>
          <span>Languages</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;