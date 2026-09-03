import { useEffect, useRef, useState } from "react";

import useCountries from "../hooks/useCountries";

import { fetchCountryByName } from "../services/countriesApi";

import WorldMap from "./WorldMap";
import CountryList from "./CountryList";
import CountryDetail from "./CountryDetail";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import FavoritesCounter from "./FavoritesCounter";

// for display 10 countries per page
// const countriesPerPage = 10;

const Dashboard = () => {
  // for page size selector / 10, 20, 30 countries per page
  const [countriesPerPage, setCountriesPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  // Stores the current API page

  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedCountry, setSelectedCountry] = useState(null);
  // Stores the country shown in CountryDetail
  const [searching, setSearching] = useState(false);
  // Shows whether a search request is currently running

  const [searchError, setSearchError] = useState("");

  // search controller ref
  const searchControllerRef = useRef(null);
  // useRef used because changing it should not cause the component to render again

  // calling the pagination hook
  // Dashboard gives the hook Current page and Ten records per page
  const { countries, pagination, loading, error, retry } = useCountries({
    page: currentPage,
    pageSize: countriesPerPage,
    sortOrder,
  });

  const scrollToCountryDetail = () => {
    window.requestAnimationFrame(() => {
      document.getElementById("country-detail")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  useEffect(() => {
    return () => {
      searchControllerRef.current?.abort();
      // when dashboard ie removed
      // any running country search is cancelled
    };
  }, []);

  // runs when user search in hero section
  const handleSearch = async (searchInput) => {
    // cancel previous search
    searchControllerRef.current?.abort();

    // new controller
    // belongs to the latest search
    const controller = new AbortController();

    searchControllerRef.current = controller;

    setSearching(true);
    setSearchError("");

    try {
      // request the country
      const foundCountry = await fetchCountryByName(searchInput, {
        signal: controller.signal,
      });

      // country not found
      if (!foundCountry) {
        setSelectedCountry(null);

        setSearchError(`No country was found for "${searchInput}".`);

        return;
      }

      setSelectedCountry(foundCountry);
      scrollToCountryDetail();
    } catch (requestError) {
      if (requestError.name !== "AbortError") {
        setSelectedCountry(null);

        setSearchError(requestError.message);
      }
    } finally {
      if (searchControllerRef.current === controller) {
        setSearching(false);
      }
    }
  };

  const handleCountrySelect = (country) => {
    searchControllerRef.current?.abort();

    setSearching(false);
    setSearchError("");
    setSelectedCountry(country);

    const isSmallScreen = window.matchMedia("(max-width: 820px)").matches;

    if (isSmallScreen) {
      scrollToCountryDetail();
    }
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = Number(event.target.value);
    // event.target.value gets the selected option

    setCountriesPerPage(newPageSize);
    // change page size
    setCurrentPage(1);
    setSelectedCountry(null);
    // clears previously selected country
    setSearchError("");
  };

  const handlesortOrderChange = (event) => {
    const newSortOrder = event.target.value;

    searchControllerRef.current?.abort();

    setSearching(false);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
    setSelectedCountry(null);
    setSearchError("");
  };

  const changePage = (newPage) => {
    // reject invalid pages
    if (newPage < 1 || loading) {
      return;
    }

    searchControllerRef.current?.abort();

    // clear old selections
    setSearching(false);
    setSelectedCountry(null);
    setSearchError("");
    setCurrentPage(newPage);

    // scroll back to country cards
    document.getElementById("explore")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <HeroSection onSearch={handleSearch} countriesCount={countries.length} />

      <main
        id="explore"
        className="
          bg-[#f7f3eb]
          px-4 py-14
          min-[581px]:px-6
          min-[821px]:px-10
          min-[821px]:py-20
        "
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <header
            className="
              grid grid-cols-1
              items-end gap-5
              min-[821px]:grid-cols-[1.4fr_0.6fr]
              min-[821px]:gap-[60px]
            "
          >
            <div>
              <div className="flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#847d72]">
                <span className="h-px w-6 bg-current" />
                Curated discoveries
              </div>

              <h2 className="mt-[15px] font-serif text-[45px] font-normal leading-[0.95] tracking-[-0.055em] min-[581px]:text-[clamp(44px,5vw,70px)]">
                Find your next{" "}
                <em className="font-normal text-[#ff7457]">fascination.</em>
              </h2>
            </div>

            <p className="mb-[5px] max-w-[600px] text-[13px] leading-[1.8] text-[#6f6b7a] min-[821px]:max-w-[380px]">
              Browse the globe at your own pace. Every country is a doorway into
              a different culture, language and story.
            </p>
          </header>

          <div
            className="
              mt-9 grid grid-cols-1
              items-start gap-6
              min-[581px]:mt-12
              min-[1200px]:grid-cols-[minmax(0,1fr)_340px]
            "
          >
            <section className="min-w-0" aria-label="Country explorer">
              <div
                className="
                  mb-8
                  overflow-hidden

                  rounded-[26px]
                  border-2
                  border-[#17152e]/15

                  bg-[#17152e]
                  p-2.5

                  shadow-[0_9px_0_rgba(23,21,46,0.07),0_24px_55px_rgba(23,21,46,0.14)]

                  min-[821px]:p-3.5
                "
              >
                <WorldMap />
              </div>

              <div className="mb-5 flex justify-end">
                <FavoritesCounter />
              </div>

              <CountryList
                countries={countries}
                onSelectCountry={handleCountrySelect}
                selectedCountryCode={selectedCountry?.alpha3Code}
                loading={loading}
                error={error}
                onRetry={retry}
              />

              {!error && (
                <nav
                  aria-label="Country pages"
                  className="
                        mx-auto mt-9

                        flex w-full
                        max-w-[920px]
                        flex-wrap
                        items-center
                        justify-center
                        gap-3

                        rounded-[18px]
                        border-2
                        border-[#17152e]/15

                        bg-[#fffdf8]
                        p-3

                        shadow-[0_7px_0_rgba(23,21,46,0.06),0_18px_40px_rgba(23,21,46,0.08)]

                        min-[760px]:justify-between
                      "
                >
                  <label
                    htmlFor="page-size"
                    className="
                            inline-flex
                            items-center
                            gap-2

                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.1em]
                            text-[#6f6b7a]
                          "
                  >
                    Show
                    <select
                      id="page-size"
                      value={countriesPerPage}
                      onChange={handlePageSizeChange}
                      disabled={loading}
                      className="
                              cursor-pointer
                              rounded-full

                              border-2
                              border-[#17152e]/15
                              bg-[#fffdf8]

                              px-3 py-2

                              text-[11px]
                              font-bold
                              text-[#17152e]

                              outline-none

                              transition-colors

                              hover:border-[#ff7457]

                              focus:border-[#ff7457]
                              focus:ring-4
                              focus:ring-[#ff7457]/15

                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                    >
                      <option value={10}>10 per page</option>
                      <option value={20}>20 per page</option>
                      <option value={30}>30 per page</option>
                    </select>
                  </label>

                  <label
                    htmlFor="sort-order"
                    className="
                            inline-flex
                            items-center
                            gap-2

                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.1em]
                            text-[#6f6b7a]
                          "
                  >
                    Sort
                    <select
                      id="sort-order"
                      value={sortOrder}
                      onChange={handlesortOrderChange}
                      disabled={loading}
                      className="
                              cursor-pointer
                              rounded-full

                              border-2
                              border-[#17152e]/15
                              bg-[#fffdf8]

                              px-3 py-2

                              text-[11px]
                              font-bold
                              text-[#17152e]

                              outline-none

                              transition-colors

                              hover:border-[#ff7457]

                              focus:border-[#ff7457]
                              focus:ring-4
                              focus:ring-[#ff7457]/15

                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                    >
                      <option value="asc">Name: A–Z</option>
                      <option value="desc">Name: Z–A</option>
                    </select>
                  </label>

                  <button
                    type="button"
                    disabled={loading || !pagination.hasPreviousPage}
                    onClick={() => changePage(currentPage - 1)}
                    className="
                    inline-flex
                    min-w-[120px]
                    items-center
                    justify-center
                    gap-2

                    rounded-[11px]
                    border border-[#17152e]/15
                    bg-transparent

                    px-4 py-3

                    text-[10px]
                    font-extrabold
                    text-[#17152e]

                    transition-all
                    duration-200

                    hover:border-[#17152e]
                    hover:bg-[#17152e]
                    hover:text-white

                    disabled:cursor-not-allowed
                    disabled:opacity-35
                    disabled:hover:border-[#17152e]/15
                    disabled:hover:bg-transparent
                    disabled:hover:text-[#17152e]
                  "
                  >
                    ← Previous
                  </button>

                  <span
                    aria-live="polite"
                    className="
                        grid h-12
                        min-w-[78px]
                        place-items-center

                        rounded-[11px]
                        bg-[#17152e]/[0.05]

                        px-3

                        text-center
                        text-[10px]
                        font-extrabold
                        text-[#6f6b7a]
                      "
                  >
                    Page {pagination.page}
                  </span>

                  <button
                    type="button"
                    disabled={loading || !pagination.hasNextPage}
                    onClick={() => changePage(currentPage + 1)}
                    className="
                    inline-flex
                    min-w-[120px]
                    items-center
                    justify-center
                    gap-2

                    rounded-[11px]
                    border border-[#ff7457]
                    bg-[#ff7457]

                    px-4 py-3

                    text-[10px]
                    font-extrabold
                    text-white

                    shadow-[0_7px_18px_rgba(255,116,87,0.20)]

                    transition-all
                    duration-200

                    hover:-translate-y-0.5
                    hover:border-[#17152e]
                    hover:bg-[#17152e]

                    disabled:cursor-not-allowed
                    disabled:opacity-35
                    disabled:hover:translate-y-0
                    disabled:hover:border-[#ff7457]
                    disabled:hover:bg-[#ff7457]
                  "
                  >
                    Next →
                  </button>
                </nav>
              )}
            </section>

            <aside
              id="country-detail"
              className="
                relative
                  scroll-mt-[96px]

                  min-[1200px]:sticky
                  min-[1200px]:top-[92px]
                              "
            >
              {searching && (
                <p
                  role="status"
                  className="
                    mb-3 rounded-[10px]
                    bg-[#fffdf8]
                    px-4 py-3
                    text-xs
                    font-bold
                    text-[#6f6b7a]
                  "
                >
                  Searching for country...
                </p>
              )}

              {searchError && (
                <p
                  role="alert"
                  className="
                    mb-3 rounded-[10px]
                    border
                    border-[#ff7457]/30
                    bg-[#fffdf8]
                    px-4 py-3
                    text-xs
                    font-bold
                    text-[#b14332]
                  "
                >
                  {searchError}
                </p>
              )}

              <CountryDetail
                country={selectedCountry}
                onClose={() => {
                  setSelectedCountry(null);

                  setSearchError("");
                }}
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
