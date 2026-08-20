const CountryCard = ({
  country,
  onSelectCountry,
  isSelected,
  style,
}) => {
  const flag = country.flags?.svg || country.flags?.png;

  const selectedStyles = isSelected
    ? "-translate-y-[5px] border-[rgba(255,116,87,0.6)] shadow-[0_17px_40px_rgba(32,28,55,0.1)]"
    : "";

  return (
    <button
      type="button"
      style={style}
      aria-pressed={isSelected}
      onClick={() => onSelectCountry(country)}
      className={`
        group w-full cursor-pointer overflow-hidden rounded-[17px]
        border border-[rgba(36,32,68,0.12)] bg-[#fffdf8]
        p-0 text-left text-[#17152e]

        animate-reveal-card
        transition-[transform,box-shadow,border-color]
        duration-[250ms] ease-[ease]

        hover:-translate-y-[5px]
        hover:border-[rgba(255,116,87,0.6)]
        hover:shadow-[0_17px_40px_rgba(32,28,55,0.1)]

        focus-visible:outline
        focus-visible:outline-[3px]
        focus-visible:outline-[rgba(255,116,87,0.48)]
        focus-visible:outline-offset-[3px]

        motion-reduce:animate-none
        motion-reduce:transition-none

        ${selectedStyles}
      `}
    >
      <span
        className="
          grid h-[165px] place-items-center overflow-hidden
          border-b border-[rgba(36,32,68,0.12)]
          bg-[linear-gradient(145deg,#ebe5db,#f8f5ee)]
          min-[581px]:h-[130px]
        "
      >
        {flag ? (
          <img
            src={flag}
            alt={`${country.name} flag`}
            loading="lazy"
            className="
              block h-full w-full object-cover
              transition-transform duration-[450ms] ease-[ease]
              group-hover:scale-[1.04]
              motion-reduce:transition-none
            "
          />
        ) : (
          <span
            className="text-5xl"
            aria-hidden="true"
          >
            🌐
          </span>
        )}
      </span>

      <span className="flex items-center justify-between px-[17px] pt-4 text-[8px] uppercase tracking-[0.12em] text-[#918b82]">
        <span>{country.region || "Around the world"}</span>
      </span>

      <strong className="block px-[17px] pb-[5px] pt-[7px] font-[Georgia,serif] text-[25px] font-normal tracking-[-0.025em]">
        {country.name}
      </strong>

      <span className="flex items-center gap-[7px] px-[17px] pb-[17px] text-[11px] text-[#6f6b7a]">
        <i
          aria-hidden="true"
          className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#71d5b4]"
        />

        {country.capital || "Capital not available"}
      </span>

      <span className="mx-[17px] flex items-center justify-between border-t border-[rgba(36,32,68,0.12)] pb-[14px] pt-3 text-[9px] text-[#99938a]">
        <span>{country.population || "Not available"}</span>

        <b className="text-[8px] uppercase tracking-[0.07em] text-[#17152e]">
          View
          <span
            aria-hidden="true"
            className="ml-[3px] text-[13px] text-[#ff7457]"
          >
            →
          </span>
        </b>
      </span>
    </button>
  );
};

export default CountryCard;