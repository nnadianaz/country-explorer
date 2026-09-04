const populationFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const CountryCard = ({ country, onSelectCountry, isSelected, style }) => {
  const flag = country.flags?.svg || country.flags?.png;

  const population = country.population
    ? populationFormatter.format(country.population)
    : "Not available";

  const selectedStyles = isSelected
    ? `
      -translate-y-[7px]
      border-[#ff7457]
      ring-4
      ring-[#ff7457]/15
      shadow-[0_10px_0_rgba(255,116,87,0.14),0_28px_60px_rgba(23,21,46,0.18)]
    `
    : "";

  return (
    <button
      type="button"
      style={style}
      aria-pressed={isSelected}
      onClick={() => onSelectCountry(country)}
      className={`
            group relative
            w-full cursor-pointer
            overflow-hidden

            rounded-[22px]

            border-2
            border-[#17152e]/[0.18]

            bg-[#fffdf8]
            p-0

            text-left
            text-[#17152e]

            ring-1
            ring-inset
            ring-white/70

            shadow-[0_8px_0_rgba(23,21,46,0.06),0_20px_45px_rgba(23,21,46,0.10)]

            animate-reveal-card

            transition-[transform,box-shadow,border-color]
            duration-300
            ease-out

            hover:-translate-y-[7px]
            hover:border-[#ff7457]
            hover:shadow-[0_10px_0_rgba(255,116,87,0.12),0_28px_60px_rgba(23,21,46,0.16)]

            focus-visible:outline
            focus-visible:outline-[3px]
            focus-visible:outline-[#ff7457]/50
            focus-visible:outline-offset-[3px]

            motion-reduce:animate-none
            motion-reduce:transition-none

            ${selectedStyles}
          `}
    >
      <span
        className="
            relative grid
            h-[165px]
            place-items-center
            overflow-hidden

            border-b-2 border-[#17152e]/15

            bg-[linear-gradient(145deg,#e9e3d9,#faf7f0)]
            p-3

            before:pointer-events-none
            before:absolute
            before:inset-0
            before:content-['']
            before:opacity-40
            before:[background-image:linear-gradient(rgba(36,32,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(36,32,68,0.05)_1px,transparent_1px)]
            before:[background-size:28px_28px]

            min-[581px]:h-[165px]
          "
      >
        {flag ? (
          <img
            src={flag}
            alt={`${country.name} flag`}
            loading="lazy"
            className="
                relative z-[2]
                block
              h-full
              max-h-[145px]
              w-[92%]
              object-contain

                drop-shadow-[0_14px_16px_rgba(23,21,46,0.18)]

                transition-transform
                duration-500
                ease-out

                group-hover:scale-[1.05]

                motion-reduce:transition-none
              "
          />
        ) : (
          <span className="text-5xl" aria-hidden="true">
            🌐
          </span>
        )}
        <span
          className="
                absolute right-3 top-3
                z-[3]

                grid h-9 min-w-9
                place-items-center

                rounded-full
                border border-[#17152e]/10
                bg-[#fffdf8]/90
                px-2

                text-[8px]
                font-black
                tracking-[0.1em]
                text-[#17152e]

                shadow-sm
                backdrop-blur-md
              "
        >
          {country.alpha3Code}
        </span>
      </span>

      <span className="flex items-center justify-between px-[17px] pt-4 text-[8px] uppercase tracking-[0.12em] text-[#918b82]">
        <span>{country.region || "Around the world"}</span>
      </span>

      <strong
        className="
            block
            px-[17px]
            pb-[6px]
            pt-[9px]

            font-[Georgia,serif]
            text-[28px]
            font-normal
            leading-none
            tracking-[-0.035em]
          "
      >
        {country.name}
      </strong>

      <span className="flex items-center gap-[7px] px-[17px] pb-[17px] text-[11px] text-[#6f6b7a]">
        <i
          aria-hidden="true"
          className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#71d5b4]"
        />

        {country.capital || "Capital not available"}
      </span>

      <span
        className="
            mx-[17px]
            flex items-center
            justify-between

            border-t border-[#17152e]/15
            pb-[15px]
            pt-3
          "
      >
        {/* Population */}
        <span>
          <small
            className="
        block
        text-[7px]
        font-bold
        uppercase
        tracking-[0.14em]
        text-[#99938a]
      "
          >
            Population
          </small>

          <strong
            className="
        mt-1 block
        text-[10px]
        font-extrabold
        text-[#17152e]
      "
          >
            {population}
          </strong>
        </span>

        {/* View button appearance */}
        <span
          className="
      inline-flex
      items-center
      gap-2

      text-[8px]
      font-extrabold
      uppercase
      tracking-[0.08em]
      text-[#17152e]
    "
        >
          View
          <span
            aria-hidden="true"
            className="
              text-[14px]
              font-normal
              text-[#ff7457]

              transition-transform
              duration-200

              group-hover:translate-x-1
            "
          >
            →
          </span>
        </span>
      </span>
    </button>
  );
};

export default CountryCard;
