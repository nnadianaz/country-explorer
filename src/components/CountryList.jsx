import CountryCard from "./CountryCard";

const stateStyles = `
              relative
              min-h-[300px]
              overflow-hidden

              rounded-[24px]
              border-2
              border-dashed
              border-[#17152e]/15

              bg-[#fffdf8]
              px-5 py-[60px]
              text-center

              shadow-[0_12px_35px_rgba(23,21,46,0.06)]

              min-[581px]:min-h-[340px]
              min-[581px]:px-6
              min-[581px]:py-20
            `;

const CountryList = ({
  countries,
  onSelectCountry,
  selectedCountryCode,
  loading,
  error,
  onRetry,
}) => {
  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`
          ${stateStyles}
          flex flex-col items-center justify-center gap-3.5
          text-xs font-bold uppercase tracking-[0.08em]
          text-[#6f6b7a]
        `}
      >
        <span
          aria-hidden="true"
          className="
              h-11 w-11

              animate-spin
              rounded-full

              border-[3px]
              border-[#17152e]/10
              border-r-[#71d5b4]
              border-t-[#ff7457]

              shadow-[0_6px_18px_rgba(23,21,46,0.08)]

              motion-reduce:animate-none
            "
        />
        Loading countries...
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className={`
          ${stateStyles}
          flex flex-col items-center justify-center
        `}
      >
        <span aria-hidden="true" className="text-[42px]">
          🧭
        </span>

        <h3 className="mb-2 mt-3 font-[Georgia,serif] text-[28px] font-normal text-[#17152e]">
          We lost the signal
        </h3>

        <p className="m-0 max-w-[460px] text-xs leading-6 text-[#6f6b7a]">
          {error.message}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="
            mt-5 cursor-pointer rounded-[10px]
            border-0 bg-[#ff7457]
            px-5 py-3 text-xs font-extrabold text-white
            transition duration-200
            hover:-translate-y-0.5 hover:bg-[#ff6544]
            focus-visible:outline
            focus-visible:outline-[3px]
            focus-visible:outline-[rgba(255,116,87,0.48)]
            focus-visible:outline-offset-[3px]
            motion-reduce:transition-none
          "
        >
          Try again
        </button>
      </div>
    );
  }

  if (!countries.length) {
    return (
      <div className={stateStyles}>
        <span aria-hidden="true" className="block text-[38px] text-[#ff7457]">
          ⌕
        </span>

        <h3 className="mb-1.5 mt-2.5 font-[Georgia,serif] text-[28px] font-normal text-[#17152e]">
          No countries found
        </h3>

        <p className="m-0 text-xs text-[#6f6b7a]">
          Try searching with another country name.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
    grid
    grid-cols-1
    items-stretch
    gap-6

    min-[581px]:grid-cols-2
    min-[1101px]:grid-cols-3
  "
    >
      {countries.map((country, index) => (
        <CountryCard
          key={country.alpha3Code}
          country={country}
          onSelectCountry={onSelectCountry}
          isSelected={selectedCountryCode === country.alpha3Code}
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default CountryList;
