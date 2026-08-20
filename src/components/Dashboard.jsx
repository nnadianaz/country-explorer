import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import WorldMap from "./WorldMap";
import CountryList from "./CountryList";
import CountryDetail from "./CountryDetail";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import "./Dashboard.css";

const countriesPerPage = 10;

const Dashboard = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleSearch = (searchInput) => {
    const foundCountry = countries.find(
      (country) =>
        country.name.toLowerCase() === searchInput.trim().toLowerCase(),
    );

    setSelectedCountry(foundCountry || null);
  };

  const handlePageChange = (_event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetch("https://countries.dev/countries")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }

        return response.json();
      })
      .then((data) => {
        const allCountries = data.map((country) => ({
          alpha3Code: country.alpha3Code,
          name: country.name,
          capital: country.capital,
          region: country.region,
          flags: country.flags,
          population: country.population,
          currencies: country.currencies,
          languages: country.languages,
          borders: country.borders,
        }));

        setCountries(allCountries);
      })
      .catch((error) => {
        console.error("API error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const firstCountryIndex = (currentPage - 1) * countriesPerPage;
  const paginatedCountries = countries.slice(
    firstCountryIndex,
    firstCountryIndex + countriesPerPage,
  );
  const totalPages = Math.ceil(countries.length / countriesPerPage);

  return (
    <>
      <HeroSection
        onSearch={handleSearch}
        countriesCount={countries.length}
      />

      <main id="explore" className="dashboard-section">
        <div className="dashboard-container">
          <header className="section-heading">
            <div>
              <div className="dashboard-eyebrow">
                <span />
                Curated discoveries
              </div>

              <h2>
                Find your next <em>fascination.</em>
              </h2>
            </div>

            <p>
              Browse the globe at your own pace. Every country is a doorway
              into a different culture, language and story.
            </p>
          </header>

          <div className="dashboard-content">
            <section className="dashboard-main" aria-label="Country explorer">
              <div className="world-map-wrapper">
                <WorldMap />
              </div>

              <CountryList
                countries={paginatedCountries}
                onSelectCountry={setSelectedCountry}
                selectedCountryCode={selectedCountry?.alpha3Code}
                loading={loading}
              />

              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <Pagination
                    className="dashboard-pagination"
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                  />
                </div>
              )}
            </section>

            <aside id="country-detail" className="country-detail-aside">
              <CountryDetail
                country={selectedCountry}
                onClose={() => setSelectedCountry(null)}
              />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Dashboard;