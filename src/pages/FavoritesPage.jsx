import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FavoriteButton from "../features/favorites/components/FavoriteButton";
import {
  clearFavorites,
  selectFavorites,
} from "../features/favorites/favoritesSlice";

const populationFormatter = new Intl.NumberFormat("en");

const FavoritesPage = () => {
  const dispatch = useDispatch();

  const favoriteCountries = useSelector(selectFavorites);

  const handleClearFavorites = () => {
    const shouldClear = window.confirm("Remove all favourite countries?");

    if (shouldClear) {
      dispatch(clearFavorites());
    }
  };

  return (
    <main
      className="
        min-h-[calc(100vh-72px)]
        bg-[#f7f3eb]
        px-5 py-12
        text-[#17152e]

        min-[700px]:px-8
        min-[1100px]:px-12
      "
    >
      <section className="mx-auto max-w-[1280px]">
        <Link
          to="/#explore"
          className="
            inline-flex items-center gap-2
            text-xs font-extrabold
            uppercase tracking-[0.1em]
            text-[#6f6b7a]
            no-underline

            transition-colors
            hover:text-[#ff7457]
          "
        >
          <span aria-hidden="true">←</span>
          Back to explorer
        </Link>

        <header
          className="
            mb-10 mt-6
            flex flex-col
            items-start
            justify-between
            gap-5

            min-[700px]:flex-row
            min-[700px]:items-end
          "
        >
          <div>
            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.18em]
                text-[#ff7457]
              "
            >
              Your saved destinations
            </span>

            <h1
              className="
                mb-0 mt-2
                font-[Georgia,serif]
                text-[42px]
                font-normal
                leading-none
                tracking-[-0.04em]

                min-[700px]:text-[56px]
              "
            >
              Favourite countries
            </h1>

            <p className="mb-0 mt-4 max-w-[560px] text-sm leading-7 text-[#6f6b7a]">
              Keep inspiring destinations together and return to them whenever
              you are ready to plan your next journey.
            </p>
          </div>

          {favoriteCountries.length > 0 && (
            <button
              type="button"
              onClick={handleClearFavorites}
              className="
                cursor-pointer
                rounded-full
                border-2
                border-[#17152e]/15
                bg-transparent
                px-5 py-3

                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.1em]
                text-[#17152e]

                transition-all
                duration-200

                hover:border-[#ff7457]
                hover:bg-[#ff7457]
                hover:text-white

                focus-visible:outline
                focus-visible:outline-[3px]
                focus-visible:outline-[#ff7457]/40
                focus-visible:outline-offset-[3px]
              "
            >
              Clear all favourites
            </button>
          )}
        </header>

        {favoriteCountries.length === 0 ? (
          <div
            className="
              grid min-h-[380px]
              place-items-center
              rounded-[28px]
              border-2
              border-dashed
              border-[#17152e]/15
              bg-[#fffdf8]
              px-6 py-14
              text-center
            "
          >
            <div>
              <span aria-hidden="true" className="text-6xl">
                ☆
              </span>

              <h2 className="mb-0 mt-5 font-[Georgia,serif] text-3xl font-normal">
                No favourites yet
              </h2>

              <p className="mx-auto mb-0 mt-3 max-w-[420px] text-sm leading-7 text-[#6f6b7a]">
                Explore the country collection and save destinations that you
                would like to visit.
              </p>

              <Link
                to="/#explore"
                className="
                  mt-6 inline-flex
                  items-center gap-2
                  rounded-full
                  bg-[#ff7457]
                  px-6 py-3.5

                  text-xs font-extrabold
                  text-white
                  no-underline

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-[#17152e]
                "
              >
                Explore countries
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="
              grid gap-6

              min-[600px]:grid-cols-2
              min-[1000px]:grid-cols-3
            "
          >
            {favoriteCountries.map((country) => {
              const flag = country.flags?.svg || country.flags?.png;

              const population = country.population
                ? populationFormatter.format(country.population)
                : "Not available";

              return (
                <article
                  key={country.alpha3Code}
                  className="
                      overflow-hidden
                      rounded-[24px]
                      border-2
                      border-[#17152e]/15
                      bg-[#17152e]
                      shadow-[0_8px_0_rgba(23,21,46,0.08),0_24px_55px_rgba(23,21,46,0.12)]
                    "
                >
                  <div
                    className="
                        relative grid
                        h-[210px]
                        place-items-center
                        overflow-hidden
                        bg-[linear-gradient(145deg,#e9e3d9,#fffdf8)]
                        p-7
                      "
                  >
                    {flag ? (
                      <img
                        src={flag}
                        alt={`${country.name} flag`}
                        loading="lazy"
                        className="
                            block
                            max-h-full
                            max-w-full
                            object-contain
                            drop-shadow-[0_14px_18px_rgba(23,21,46,0.18)]
                          "
                      />
                    ) : (
                      <span aria-hidden="true" className="text-6xl">
                        🌐
                      </span>
                    )}

                    <span
                      className="
                          absolute
                          right-4 top-4

                          rounded-full
                          border
                          border-[#17152e]/10
                          bg-[#fffdf8]/90
                          px-3 py-2

                          text-[9px]
                          font-black
                          tracking-[0.12em]
                        "
                    >
                      {country.alpha3Code}
                    </span>
                  </div>

                  <div className="p-5 text-white">
                    <span
                      className="
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.15em]
                          text-[#71d5b4]
                        "
                    >
                      {country.region || "Around the world"}
                    </span>

                    <h2
                      className="
                          mb-0 mt-2
                          font-[Georgia,serif]
                          text-[30px]
                          font-normal
                          leading-none
                        "
                    >
                      {country.name}
                    </h2>

                    <div
                      className="
                          my-5 grid
                          grid-cols-2
                          border-y
                          border-white/10
                        "
                    >
                      <div className="py-4 pr-3">
                        <span className="block text-[8px] uppercase tracking-[0.12em] text-white/45">
                          Capital
                        </span>

                        <strong className="mt-1.5 block text-xs">
                          {country.capital || "Not available"}
                        </strong>
                      </div>

                      <div className="border-l border-white/10 py-4 pl-4">
                        <span className="block text-[8px] uppercase tracking-[0.12em] text-white/45">
                          Population
                        </span>

                        <strong className="mt-1.5 block text-xs">
                          {population}
                        </strong>
                      </div>
                    </div>

                    <FavoriteButton
                      country={country}
                      favoriteLabel="Remove from favorites"
                    />
                    <Link
                      to={`/countries/${encodeURIComponent(
                        country.alpha3Code,
                      )}`}
                      aria-label={`View full profile for ${country.name}`}
                      className="
    mb-2.5 flex w-full
    items-center justify-between

    rounded-[10px]
    border border-[#17152e]
    bg-[#17152e]
    px-4 py-3

    text-[10px]
    font-extrabold
    uppercase
    tracking-[0.08em]
    text-white
    no-underline

    transition duration-200
    hover:-translate-y-0.5
    hover:border-[#ff7457]
    hover:bg-[#ff7457]

    motion-reduce:transition-none
  "
                    >
                      <span>View full profile</span>

                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default FavoritesPage;
