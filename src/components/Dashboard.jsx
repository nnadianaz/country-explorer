import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import WorldMap from "./WorldMap";
import CountryList from "./CountryList";
import CountryDetail from "./CountryDetail";
import HeroSection from "./HeroSection";
import Footer from "./Footer";

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

      <main
        id="explore"
        className="bg-[#f7f3eb] px-4 py-14 min-[581px]:px-6 min-[821px]:px-10 min-[821px]:py-20"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <header className="grid grid-cols-1 items-end gap-5 min-[821px]:grid-cols-[1.4fr_0.6fr] min-[821px]:gap-[60px]">
            <div>
              <div className="flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#847d72]">
                <span className="h-px w-6 bg-current" />
                Curated discoveries
              </div>

              <h2 className="mt-[15px] font-serif text-[45px] font-normal leading-[0.95] tracking-[-0.055em] min-[581px]:text-[clamp(44px,5vw,70px)]">
                Find your next{" "}
                <em className="font-normal text-[#ff7457]">
                  fascination.
                </em>
              </h2>
            </div>

            <p className="mb-[5px] max-w-[600px] text-[13px] leading-[1.8] text-[#6f6b7a] min-[821px]:max-w-[380px]">
              Browse the globe at your own pace. Every country is a doorway
              into a different culture, language and story.
            </p>
          </header>

          <div className="mt-9 grid grid-cols-1 items-start gap-6 min-[581px]:mt-12 min-[1200px]:grid-cols-[minmax(0,1fr)_340px]">
            <section
              className="min-w-0"
              aria-label="Country explorer"
            >
              <div className="mb-8 overflow-hidden rounded-2xl bg-[#17152e] p-2 shadow-[0_20px_50px_rgba(23,21,46,0.14)] min-[821px]:p-4">
                <WorldMap />
              </div>

              <CountryList
                countries={paginatedCountries}
                onSelectCountry={setSelectedCountry}
                selectedCountryCode={selectedCountry?.alpha3Code}
                loading={loading}
              />

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    className="
                      [&_.MuiPaginationItem-root]:!border
                      [&_.MuiPaginationItem-root]:!border-[rgba(36,32,68,0.12)]
                      [&_.MuiPaginationItem-root]:!bg-[#fffdf8]
                      [&_.MuiPaginationItem-root]:!font-bold
                      [&_.MuiPaginationItem-root]:!text-[#17152e]
                      [&_.MuiPaginationItem-root:hover]:!bg-[rgba(36,32,68,0.08)]
                      [&_.MuiPaginationItem-root.Mui-selected]:!bg-[#17152e]
                      [&_.MuiPaginationItem-root.Mui-selected]:!text-white
                      [&_.MuiPaginationItem-root.Mui-selected:hover]:!bg-[#242044]
                    "
                  />
                </div>
              )}
            </section>

            <aside
              id="country-detail"
              className="relative min-[1200px]:sticky min-[1200px]:top-5"
            >
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