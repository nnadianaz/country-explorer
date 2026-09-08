import FavoriteButton from "../../favorites/components/FavoriteButton";
import { Link } from "react-router-dom";
// use this because API might provide currencies as an array
// or as an object
const makeArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    return Object.values(value);
  }

  return [];
};

const formatNumber = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) {
    return "Not available";
  }

  return new Intl.NumberFormat("en").format(number);
};

const CountryProfile = ({ country, onBack }) => {
  const flag = country.flags?.svg || country.flags?.png;

  const population = formatNumber(country.population);

  const formattedArea = formatNumber(country.area);

  const area =
    formattedArea === "Not available" ? formattedArea : `${formattedArea} km²`;

  const currencies = makeArray(country.currencies)
    .map((currency) => {
      if (typeof currency === "string") {
        return currency;
      }

      return currency?.name || currency?.code;
    })
    .filter(Boolean);

  const languages = makeArray(country.languages)
    .map((language) => {
      if (typeof language === "string") {
        return language;
      }

      return language?.name;
    })
    .filter(Boolean);

  const borders = Array.isArray(country.borders) ? country.borders : [];

  return (
    <article
      className="
        min-h-[calc(100vh-72px)]
        bg-[#f5f0e8]
      "
    >
      <header
        className="
          relative overflow-hidden
          bg-[#17152e]
          text-white
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute -right-24 -top-40
            h-[420px] w-[420px]
            rounded-full
            border border-white/10
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute -right-5 top-10
            h-[260px] w-[260px]
            rounded-full
            border border-[#71d5b4]/15
          "
        />

        <div
          className="
            relative mx-auto
            max-w-[1200px]
            px-5 py-10

            min-[700px]:px-8
            min-[700px]:py-14

            min-[1100px]:px-12
            min-[1100px]:py-20
          "
        >
          <button
            type="button"
            onClick={onBack}
            className="
              mb-10 inline-flex
              cursor-pointer
              items-center gap-2

              rounded-full
              border border-white/20
              bg-white/[0.06]
              px-4 py-2.5

              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.1em]
              text-white

              transition duration-200
              hover:-translate-y-0.5
              hover:border-[#71d5b4]
              hover:text-[#71d5b4]

              motion-reduce:transition-none
            "
          >
            <span aria-hidden="true">←</span>
            Back to explorer
          </button>

          <div
            className="
    grid items-center gap-10

    min-[800px]:grid-cols-[1fr_1.1fr]

    min-[1000px]:gap-16
  "
          >
            <div
              className="
                relative grid
                min-h-[260px]
                place-items-center

                overflow-hidden
                rounded-[28px]

                border border-white/10
                bg-[#fffdf8]
                p-8

                shadow-[0_30px_80px_rgba(0,0,0,0.28)]

                min-[700px]:min-h-[360px]
                min-[1000px]:min-h-[420px]
              "
            >
              {flag ? (
                <img
                  src={flag}
                  alt={`${country.name} flag`}
                  className="
                    max-h-[300px]
                    h-auto w-full
                    object-contain
                  "
                />
              ) : (
                <span aria-hidden="true" className="text-[7rem]">
                  🌐
                </span>
              )}
            </div>

            <div>
              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-[#71d5b4]
                "
              >
                {country.region || "Country profile"}
              </span>

              <h1
                className="
    mb-5 mt-3
    font-[Georgia,serif]
    text-[clamp(3.2rem,8vw,7rem)]
    font-normal
    leading-[0.88]
    [overflow-wrap:anywhere]
  "
              >
                {country.name}
              </h1>

              <div
                className="
                  mb-8 flex
                  flex-wrap items-center
                  gap-3
                "
              >
                <span
                  className="
                    rounded-full
                    border border-white/20
                    px-3 py-2

                    text-[10px]
                    font-bold
                    tracking-[0.12em]
                    text-white/70
                  "
                >
                  {country.alpha3Code}
                </span>

                <span
                  className="
                    text-sm
                    text-white/55
                  "
                >
                  {country.subregion ||
                    country.region ||
                    "Region not available"}
                </span>
              </div>

              <p
                className="
                  mb-8 max-w-[520px]
                  text-sm leading-7
                  text-white/60

                  min-[700px]:text-base
                "
              >
                Explore essential facts, geography and cultural information
                about {country.name}.
              </p>

              <div className="max-w-[360px]">
                <FavoriteButton country={country} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section
        className="
    bg-[#f5f0e8]
    text-[#17152e]
  "
      >
        <div
          className="
      mx-auto max-w-[1200px]
      px-5 py-14

      min-[700px]:px-8
      min-[700px]:py-20

      min-[1100px]:px-12
      min-[1100px]:py-24
    "
        >
          <div
            className="
    mb-12 grid gap-6

    min-[800px]:grid-cols-[0.75fr_1.25fr]
    min-[800px]:items-end
  "
          >
            <div>
              <span
                className="
            mb-4 block
            text-[10px]
            font-black
            uppercase
            tracking-[0.2em]
            text-[#ff7457]
          "
              >
                01 — Essentials
              </span>

              <h2
                className="
            m-0
            max-w-[520px]
            font-[Georgia,serif]
            text-[clamp(2.7rem,6vw,5.5rem)]
            font-normal
            leading-[0.95]
          "
              >
                Country at
                <br />a glance.
              </h2>
            </div>

            <p
              className="
          m-0 max-w-[520px]
          text-sm leading-7
          text-[#17152e]/60

          min-[800px]:justify-self-end
          min-[800px]:text-base
        "
            >
              A concise overview of the location, population and geography of{" "}
              {country.name}.
            </p>
          </div>

          <dl
            className="
        grid gap-x-8 gap-y-10
        border-y
        border-[#17152e]/15
        py-10

        min-[600px]:grid-cols-2
        min-[1000px]:grid-cols-4
      "
          >
            <div
              className="
          border-l-2
          border-[#71d5b4]
          pl-5
        "
            >
              <dt
                className="
            mb-3 text-[9px]
            font-black uppercase
            tracking-[0.15em]
            text-[#17152e]/45
          "
              >
                Capital
              </dt>

              <dd
                className="
            m-0 text-xl
            font-extrabold
            leading-tight
          "
              >
                {country.capital || "Not available"}
              </dd>
            </div>

            <div
              className="
          border-l-2
          border-[#f0c76c]
          pl-5
        "
            >
              <dt
                className="
            mb-3 text-[9px]
            font-black uppercase
            tracking-[0.15em]
            text-[#17152e]/45
          "
              >
                Population
              </dt>

              <dd
                className="
            m-0 text-xl
            font-extrabold
            leading-tight
          "
              >
                {population}
              </dd>
            </div>

            <div
              className="
          border-l-2
          border-[#ff7457]
          pl-5
        "
            >
              <dt
                className="
            mb-3 text-[9px]
            font-black uppercase
            tracking-[0.15em]
            text-[#17152e]/45
          "
              >
                Area
              </dt>

              <dd
                className="
            m-0 text-xl
            font-extrabold
            leading-tight
          "
              >
                {area}
              </dd>
            </div>

            <div
              className="
          border-l-2
          border-[#17152e]
          pl-5
        "
            >
              <dt
                className="
            mb-3 text-[9px]
            font-black uppercase
            tracking-[0.15em]
            text-[#17152e]/45
          "
              >
                Subregion
              </dt>

              <dd
                className="
            m-0 text-xl
            font-extrabold
            leading-tight
          "
              >
                {country.subregion || "Not available"}
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section
        className="
    bg-[#fffdf8]
    text-[#17152e]
  "
      >
        <div
          className="
      mx-auto max-w-[1200px]
      px-5 py-14

      min-[700px]:px-16
      min-[700px]:py-20

      min-[1100px]:px-12
      min-[1100px]:py-24
    "
        >
          <div
            className="
    mb-10 grid gap-8

    min-[800px]:grid-cols-[1.15fr_0.85fr]
    min-[800px]:items-end
  "
          >
            <div>
              <span
                className="
        mb-4 block
        text-[10px]
        font-black uppercase
        tracking-[0.2em]
        text-[#71d5b4]
      "
              >
                02 — Culture
              </span>

              <h2
                className="
    m-0
    max-w-[620px]
    font-[Georgia,serif]
    text-[clamp(2.6rem,4.5vw,4.6rem)]
    font-normal
    leading-[0.95]
  "
              >
                Culture in every
                <span className="block text-[#ff7457]">exchange.</span>
              </h2>
            </div>

            <p
              className="
      m-0 max-w-[460px]
      text-sm leading-7
      text-[#17152e]/60

      min-[800px]:justify-self-end
      min-[800px]:text-base
    "
            >
              Discover how people communicate and which currencies are used
              throughout {country.name}.
            </p>
          </div>

          <div
            className="
        grid gap-10
        border-y
        border-[#17152e]/15
        py-10

        min-[750px]:grid-cols-2
        min-[750px]:gap-0
      "
          >
            <section
              aria-labelledby="currency-heading"
              className="
          min-[750px]:border-r
          min-[750px]:border-[#17152e]/15
          min-[750px]:pr-10
        "
            >
              <span
                aria-hidden="true"
                className="
            mb-8 block
            font-[Georgia,serif]
            text-6xl
            text-[#ff7457]
          "
              >
                ¤
              </span>

              <h3
                id="currency-heading"
                className="
            mb-5 text-[11px]
            font-black uppercase
            tracking-[0.17em]
          "
              >
                Currencies
              </h3>

              {currencies.length ? (
                <ul
                  className="
              m-0 flex list-none
              flex-wrap gap-2 p-0
            "
                >
                  {currencies.map((currency) => (
                    <li
                      key={currency}
                      className="
                    rounded-full
                    border
                    border-[#17152e]/15
                    bg-[#f5f0e8]
                    px-4 py-2.5

                    text-sm
                    font-extrabold
                  "
                    >
                      {currency}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#17152e]/55">
                  Currency information is not available.
                </p>
              )}
            </section>

            <section
              aria-labelledby="language-heading"
              className="
          min-[750px]:pl-10
        "
            >
              <span
                aria-hidden="true"
                className="
            mb-8 block
            font-[Georgia,serif]
            text-6xl
            text-[#71d5b4]
          "
              >
                Aa
              </span>

              <h3
                id="language-heading"
                className="
            mb-5 text-[11px]
            font-black uppercase
            tracking-[0.17em]
          "
              >
                Languages
              </h3>

              {languages.length ? (
                <ul
                  className="
              m-0 flex list-none
              flex-wrap gap-2 p-0
            "
                >
                  {languages.map((language) => (
                    <li
                      key={language}
                      className="
                    rounded-full
                    border
                    border-[#17152e]/15
                    bg-[#f5f0e8]
                    px-4 py-2.5

                    text-sm
                    font-extrabold
                  "
                    >
                      {language}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#17152e]/55">
                  Language information is not available.
                </p>
              )}
            </section>
          </div>
        </div>
      </section>
      <section
        className="
    relative overflow-hidden
    bg-[#17152e]
    text-white
  "
      >
        <span
          aria-hidden="true"
          className="
      pointer-events-none
      absolute -bottom-16
      right-4

      font-[Georgia,serif]
      text-[14rem]
      leading-none
      text-white/[0.025]

      min-[800px]:text-[20rem]
    "
        >
          03
        </span>

        <div
          className="
      relative mx-auto
      max-w-[1200px]
      px-5 py-16

      min-[700px]:px-8
      min-[700px]:py-20

      min-[1100px]:px-12
    "
        >
          <span
            className="
        mb-5 block
        text-[10px]
        font-black uppercase
        tracking-[0.2em]
        text-[#ff7457]
      "
          >
            03 — Connections
          </span>

          <div
            className="
        grid gap-10

        min-[800px]:grid-cols-[1fr_1fr]
        min-[800px]:items-end
      "
          >
            <div>
              <h2
                className="
            m-0 max-w-[650px]
            font-[Georgia,serif]
            text-[clamp(2.8rem,5vw,5rem)]
            font-normal
            leading-[0.95]
          "
              >
                Across every
                <span
                  className="
              block text-[#71d5b4]
            "
                >
                  border.
                </span>
              </h2>

              <p
                className="
            mb-0 mt-6 max-w-[520px]
            text-sm leading-7
            text-white/55

            min-[700px]:text-base
          "
              >
                Explore the countries that share a land border with{" "}
                {country.name}.
              </p>
            </div>

            <div className="min-[800px]:justify-self-end">
              {borders.length ? (
                <ul
                  className="
              m-0 flex max-w-[500px]
              list-none flex-wrap
              gap-3 p-0
            "
                >
                  {borders.map((border) => (
                    <li key={border}>
                      <Link
                        to={`/countries/${encodeURIComponent(border)}`}
                        aria-label={`View country ${border}`}
                        className="
                    inline-flex
                    min-h-12 min-w-16
                    items-center justify-center

                    rounded-full
                    border border-white/20
                    bg-white/[0.06]
                    px-5 py-3

                    text-xs font-black
                    tracking-[0.13em]
                    text-white
                    no-underline

                    transition duration-200

                    hover:-translate-y-1
                    hover:border-[#71d5b4]
                    hover:bg-[#71d5b4]
                    hover:text-[#17152e]

                    motion-reduce:transition-none
                  "
                      >
                        {border}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className="
              m-0 max-w-[420px]
              border-l-2
              border-[#f0c76c]
              pl-5
              text-base leading-7
              text-white/65
            "
                >
                  No land borders—an island story of its own.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default CountryProfile;
