import CountryCard from "./CountryCard";

const stateStyles = `
  min-h-[260px] rounded-[20px]
  border border-dashed border-[rgba(36,32,68,0.24)]
  bg-white/[0.38] px-5 py-[60px] text-center
  min-[581px]:min-h-[320px]
  min-[581px]:px-6 min-[581px]:py-20
`;

const CountryList = ({
  countries,
  onSelectCountry,
  selectedCountryCode,
  loading,
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
            h-[34px] w-[34px] animate-spin rounded-full
            border-[3px] border-[rgba(36,32,68,0.14)]
            border-t-[#ff7457]
            motion-reduce:animate-none
          "
        />

        Loading countries...
      </div>
    );
  }

  if (!countries.length) {
    return (
      <div className={stateStyles}>
        <span
          aria-hidden="true"
          className="block text-[38px] text-[#ff7457]"
        >
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
        grid grid-cols-1 gap-[15px]
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
          style={{ animationDelay: `${index * 50}ms` }}
        />
      ))}
    </div>
  );
};

export default CountryList;