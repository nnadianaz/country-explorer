const makeArray = (value) => {
  if (Array.isArray(value)) return value;

  if (value && typeof value === "object") {
    return Object.values(value);
  }

  return [];
};

const cardStyles = `
  relative top-auto overflow-hidden rounded-[21px]
  bg-[#17152e] text-white
  shadow-[0_25px_60px_rgba(25,22,47,0.18)]
  scroll-mt-6
  min-[821px]:sticky min-[821px]:top-5
`;

const focusStyles = `
  focus-visible:outline
  focus-visible:outline-[3px]
  focus-visible:outline-[rgba(255,116,87,0.48)]
  focus-visible:outline-offset-[3px]
`;

const CountryDetail = ({ country, onClose }) => {
  if (!country) {
    return (
      <div
        className={`
          ${cardStyles}
          flex min-h-[460px] flex-col items-center
          justify-center p-10 text-center
        `}
      >
        <span
          aria-hidden="true"
          className="
            inline-block origin-center text-[64px] leading-none
            will-change-transform
            motion-safe:animate-detail-globe
            motion-reduce:animate-none
          "
        >
          🌍
        </span>

        <h3 className="mb-2 mt-[18px] font-[Georgia,serif] text-[30px] font-normal">
          Select a country
        </h3>

        <p className="m-0 max-w-[220px] text-xs leading-[1.7] text-white/60">
          Choose a country card to discover its information.
        </p>
      </div>
    );
  }

  const currencies = makeArray(country.currencies)
    .map((currency) => currency?.name || currency?.code)
    .filter(Boolean)
    .join(", ");

  const languages = makeArray(country.languages)
    .map((language) => language?.name || language)
    .filter(Boolean)
    .join(", ");

  const borders = country.borders || [];
  const flag = country.flags?.svg || country.flags?.png;

  const population = country.population
    ? new Intl.NumberFormat("en").format(country.population)
    : "Not available";

  const handleDiscoverAnother = () => {
    document
      .getElementById("top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`
        ${cardStyles}
        block
        min-[581px]:grid
        min-[581px]:grid-cols-[0.8fr_1.2fr]
        min-[821px]:block
      `}
    >
      <div
        className="
          relative grid h-[220px] min-h-0
          place-items-center overflow-hidden
          bg-[linear-gradient(145deg,#efe9df,#fff)]

          after:absolute after:inset-0 after:content-['']
          after:shadow-[inset_0_-40px_50px_rgba(23,21,46,0.2)]

          min-[581px]:h-full min-[581px]:min-h-[390px]
          min-[821px]:h-[205px] min-[821px]:min-h-0
        "
      >
        {flag ? (
          <img
            src={flag}
            alt={`${country.name} flag`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="text-[5rem]"
          >
            🌐
          </span>
        )}

        <button
          type="button"
          aria-label="Close country details"
          onClick={onClose}
          className={`
            absolute right-3.5 top-3.5 z-[5]
            grid h-[34px] w-[34px] cursor-pointer
            place-items-center rounded-full
            border border-white/35 bg-[rgba(23,21,46,0.75)]
            p-0 text-xl leading-none text-white
            backdrop-blur-lg
            transition duration-200 ease-[ease]
            hover:border-[#ff7457] hover:bg-[#ff7457]
            motion-reduce:transition-none
            ${focusStyles}
          `}
        >
          ×
        </button>
      </div>

      <div className="p-[23px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#71d5b4]">
              {country.region || "Country profile"}
            </span>

            <h3 className="mb-5 mt-[5px] font-[Georgia,serif] text-[34px] font-normal leading-none">
              {country.name}
            </h3>
          </div>

          <span className="rounded-[7px] border border-white/[0.18] px-2 py-[7px] text-[8px] tracking-[0.1em] text-white/[0.62]">
            {country.alpha3Code}
          </span>
        </div>

        <div className="grid grid-cols-2 border-t border-white/[0.11]">
          <CountryFact
            label="Capital"
            value={country.capital || "Not available"}
          />

          <CountryFact
            label="Population"
            value={population}
            right
          />

          <CountryFact
            label="Currency"
            value={currencies || "Not available"}
          />

          <CountryFact
            label="Languages"
            value={languages || "Not available"}
            right
          />
        </div>

        <div className="pb-5 pt-[17px]">
          <span className="mb-1.5 block text-[8px] uppercase tracking-[0.13em] text-white/[0.42]">
            Neighbouring countries
          </span>

          <div className="flex flex-wrap gap-1.5">
            {borders.length ? (
              borders.slice(0, 8).map((border) => (
                <i
                  key={border}
                  className="
                    rounded-[5px] bg-white/[0.08]
                    px-[7px] py-1.5 text-[8px] not-italic
                    tracking-[0.08em] text-white/[0.76]
                  "
                >
                  {border}
                </i>
              ))
            ) : (
              <small className="text-[11px] text-white/65">
                No land borders—an island story.
              </small>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleDiscoverAnother}
          className={`
            flex w-full cursor-pointer justify-between
            rounded-[10px] border-0 bg-[#ff7457]
            px-4 py-3.5 text-[11px] font-extrabold text-white
            transition duration-200 ease-[ease]
            hover:-translate-y-0.5 hover:bg-[#ff6544]
            motion-reduce:transition-none
            ${focusStyles}
          `}
        >
          Discover another country
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
};

const CountryFact = ({ label, value, right = false }) => (
  <div
    className={`
      min-w-0 border-b border-white/[0.11]
      pb-3.5 pr-2 pt-4
      ${right ? "border-l border-white/[0.11] pl-3.5" : ""}
    `}
  >
    <span className="mb-1.5 block text-[8px] uppercase tracking-[0.13em] text-white/[0.42]">
      {label}
    </span>

    <strong className="block text-[11px] leading-[1.45] [overflow-wrap:anywhere]">
      {value}
    </strong>
  </div>
);

export default CountryDetail;