import { useState } from "react";

const QUICK_PICKS = ["Pakistan", "Austria", "Japan"];

const focusStyles =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[rgba(255,116,87,0.48)] focus-visible:outline-offset-[3px]";

const HeroSection = ({ onSearch, countriesCount }) => {
  const [searchInput, setSearchInput] = useState("");

  const totalCountries = countriesCount || 0;

  const scrollToExplorer = () => {
    document
      .getElementById("explore")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const countryName = searchInput.trim();
    if (!countryName) return;

    onSearch(countryName);
    scrollToExplorer();
  };

  const handleQuickPick = (country) => {
    setSearchInput(country);
    onSearch(country);
    scrollToExplorer();
  };

  return (
    <section
      id="top"
      className="
        relative z-[1] -mt-[76px] grid min-h-0 grid-cols-1
        grid-rows-[1fr_auto] overflow-hidden bg-[#242044]
        px-5 pb-[34px] pt-32 text-white

        before:absolute before:inset-0 before:content-['']
        before:opacity-[0.12]
        before:[background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)]
        before:[background-size:70px_70px]
        before:[mask-image:linear-gradient(to_bottom,black,transparent_85%)]
        before:[-webkit-mask-image:linear-gradient(to_bottom,black,transparent_85%)]

        after:absolute after:right-[-180px] after:top-[30px]
        after:h-[620px] after:w-[620px] after:rounded-full
        after:border after:border-white/[0.09] after:content-['']
        after:shadow-[0_0_0_80px_rgba(255,255,255,0.018),0_0_0_160px_rgba(255,255,255,0.014)]

        min-[581px]:px-[max(5vw,calc((100vw_-_1280px)/2))]
        min-[581px]:pb-[46px] min-[581px]:pt-[135px]

        min-[821px]:-mt-[86px] min-[821px]:min-h-[680px]
        min-[821px]:grid-cols-[1.05fr_0.95fr]
        min-[821px]:pt-40
      "
    >
      <div className="relative z-[5] max-w-[650px] self-center pb-[35px] min-[821px]:max-w-[680px]">
        <div className="flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#71d5b4]">
          <span className="h-px w-6 bg-current" />
          Your world, beautifully mapped
        </div>

        <h1
          className="
            my-6 font-[Georgia,'Times_New_Roman',serif]
            text-[clamp(51px,16vw,74px)] font-normal
            leading-[0.86] tracking-[-0.055em]
            min-[581px]:mb-7 min-[581px]:text-[clamp(58px,6.8vw,102px)]
          "
        >
          Every country
          <br />
          has a{" "}
          <em className="font-normal text-[#ff7457]">
            story.
          </em>
        </h1>

        <p className="mb-[30px] max-w-[570px] text-sm leading-[1.75] text-white/[0.62] min-[581px]:text-[15px]">
          Wander across borders from your screen. Explore countries, capitals,
          languages and cultures—one destination at a time.
        </p>

        <form
          onSubmit={handleSubmit}
          className="
            flex h-[58px] w-[min(100%,585px)] items-center
            rounded-[15px] bg-white py-[7px] pl-[18px] pr-[7px]
            shadow-[0_18px_55px_rgba(0,0,0,0.2)]
            min-[581px]:h-[62px]
          "
        >
          <span
            aria-hidden="true"
            className="mr-2.5 rotate-[-20deg] text-[25px] leading-none text-[#8d8997]"
          >
            ⌕
          </span>

          <input
            type="text"
            value={searchInput}
            aria-label="Search for a country"
            placeholder="Search a country…"
            onChange={(event) => setSearchInput(event.target.value)}
            className={`
              min-w-0 flex-1 border-0 bg-transparent
              text-[13px] text-[#17152e] outline-none
              placeholder:text-[#9c98a4]
              ${focusStyles}
            `}
          />

          {searchInput && (
            <button
              type="button"
              aria-label="Clear country search"
              onClick={() => setSearchInput("")}
              className={`
                cursor-pointer border-0 bg-transparent px-2.5 py-1
                text-[22px] text-[#9793a0]
                ${focusStyles}
              `}
            >
              ×
            </button>
          )}

          <button
            type="submit"
            className={`
              self-stretch rounded-[10px] border-0 bg-[#ff7457]
              px-3.5 text-xs font-extrabold text-white
              shadow-[0_7px_18px_rgba(255,116,87,0.28)]
              transition duration-200 ease-in-out
              hover:-translate-y-px hover:bg-[#ff6544]
              motion-reduce:transition-none
              min-[581px]:px-[25px]
              ${focusStyles}
            `}
          >
            Discover
          </button>
        </form>

        <div className="mt-4 hidden flex-wrap items-center gap-2 text-[10px] min-[581px]:flex">
          <span className="mr-[3px] uppercase tracking-[0.12em] text-white/[0.42]">
            Quick picks
          </span>

          {QUICK_PICKS.map((country) => (
            <button
              key={country}
              type="button"
              onClick={() => handleQuickPick(country)}
              className={`
                cursor-pointer rounded-full border
                border-white/[0.18] bg-transparent px-2.5 py-[5px]
                text-white/[0.72] transition duration-200 ease-in-out
                hover:border-[#71d5b4] hover:text-white
                motion-reduce:transition-none
                ${focusStyles}
              `}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      <div
        id="world"
        aria-hidden="true"
        className="
          relative z-[4] grid min-h-[360px] place-items-center
          min-[581px]:min-h-[440px]
          min-[821px]:min-h-[485px]
        "
      >
        <div className="absolute h-[48%] w-[90%] rotate-[-17deg] rounded-[50%] border border-white/[0.12]" />

        <div className="absolute h-[105%] w-[74%] rotate-[57deg] rounded-[50%] border border-white/[0.12]" />

        <div
          className="
            relative aspect-square w-[min(88vw,340px)] overflow-hidden
            rounded-full
            bg-[radial-gradient(circle_at_37%_31%,#4a4770,#2d294f_58%,#1d1939_100%)]
            shadow-[inset_-40px_-25px_70px_rgba(0,0,0,0.36),inset_15px_8px_28px_rgba(255,255,255,0.08),0_40px_80px_rgba(0,0,0,0.28)]
            motion-safe:animate-globe-float
            motion-reduce:animate-none

            before:absolute before:left-1/2 before:top-0
            before:h-full before:w-[42%] before:-translate-x-1/2
            before:rounded-[50%] before:border-x
            before:border-white/[0.14] before:content-['']

            after:absolute after:left-1/2 after:top-0
            after:h-full after:w-[76%] after:-translate-x-1/2
            after:rounded-[50%] after:border-x
            after:border-white/[0.14] after:content-['']

            min-[581px]:w-[min(78vw,410px)]
            min-[821px]:w-[min(39vw,410px)]
            min-[1101px]:w-[min(34vw,445px)]
          "
        >
          <div
            className="
              absolute inset-0 rounded-full opacity-25
              [background:repeating-radial-gradient(ellipse_at_center,transparent_0_34px,rgba(255,255,255,0.24)_35px_36px),linear-gradient(90deg,transparent_49.7%,rgba(255,255,255,0.3)_50%,transparent_50.3%)]
            "
          />

          <div
            className="
              absolute left-[17%] top-1/4 h-[31%] w-[35%]
              rotate-[18deg] rounded-[55%_30%_48%_28%]
              bg-[#76c9aa] opacity-[0.88]
              drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]
              [clip-path:polygon(9%_8%,68%_0,100%_29%,78%_47%,89%_76%,56%_100%,29%_71%,0_53%)]
            "
          />

          <div
            className="
              absolute left-[47%] top-[46%] h-[37%] w-[28%]
              rotate-[-13deg] rounded-[35%_60%_45%_40%]
              bg-[#76c9aa] opacity-[0.88]
              drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]
              [clip-path:polygon(20%_0,100%_15%,82%_54%,62%_100%,27%_80%,0_42%)]
            "
          />

          <div
            className="
              absolute right-[10%] top-[28%] h-[16%] w-[20%]
              rotate-[18deg] rounded-[50%]
              bg-[#76c9aa] opacity-[0.88]
              drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]
              [clip-path:polygon(0_22%,75%_0,100%_57%,63%_100%,20%_79%)]
            "
          />

          <MapPin className="left-1/2 top-[33%]" label="Vienna" />
          <MapPin className="left-[61%] top-[48%]" label="Lahore" />
          <MapPin className="right-[7%] top-[40%]" label="Tokyo" />
        </div>

        <div
          className="
            absolute right-[-5px] top-[13%] z-[8] flex
            animate-card-float items-center gap-2.5 rounded-[14px]
            bg-white/[0.94] px-3.5 py-[11px] text-[#17152e]
            shadow-[0_16px_40px_rgba(0,0,0,0.2)]
            backdrop-blur-[14px]
            motion-reduce:animate-none
            min-[581px]:right-[2%]
          "
        >
          <span className="text-2xl">🇦🇹</span>

          <span className="flex flex-col">
            <small className="text-[8px] uppercase tracking-[0.1em] text-[#888390]">
              Now exploring
            </small>

            <strong className="font-[Georgia,serif] text-[17px]">
              Austria
            </strong>
          </span>
        </div>

        <div
          className="
            absolute bottom-[5%] left-[-2px] z-[8] flex
            animate-card-float items-center gap-2.5 rounded-[14px]
            bg-white/[0.94] px-3.5 py-[11px] text-[#17152e]
            shadow-[0_16px_40px_rgba(0,0,0,0.2)]
            backdrop-blur-[14px]
            [animation-delay:-2.5s]
            motion-reduce:animate-none
            min-[581px]:bottom-[12%] min-[581px]:left-[4%]
          "
        >
          <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#71d5b4] shadow-[0_0_0_6px_rgba(113,213,180,0.18)]" />

          <span className="flex flex-col">
            <strong className="font-sans text-[17px]">
              {totalCountries}
            </strong>

            <small className="text-[8px] uppercase tracking-[0.1em] text-[#888390]">
              countries ready
            </small>
          </span>
        </div>
      </div>

      <div
        className="
          relative z-[4] col-span-full mt-2.5 flex
          justify-between gap-0 border-t border-white/10 pt-[25px]
          min-[581px]:gap-[54px]
          min-[581px]:justify-start
          min-[821px]:mt-0
        "
      >
        <HeroStat value={totalCountries} label="Countries" />
        <HeroStat value="7" label="Continents" />
        <HeroStat value="6.5K+" label="Languages" />
      </div>
    </section>
  );
};

const MapPin = ({ className, label }) => (
  <span
    className={`
      absolute z-[3] flex items-center gap-[5px]
      text-[9px] uppercase tracking-[0.09em] text-white/[0.85]
      [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]
      ${className}
    `}
  >
    <i className="h-2 w-2 rounded-full border-2 border-white bg-[#ff7457] shadow-[0_0_0_5px_rgba(255,116,87,0.25)]" />
    {label}
  </span>
);

const HeroStat = ({ value, label }) => (
  <div className="flex flex-col gap-[3px] min-[581px]:flex-row min-[581px]:items-baseline min-[581px]:gap-[9px]">
    <strong className="font-[Georgia,serif] text-[23px] font-normal min-[581px]:text-[27px]">
      {value}
    </strong>

    <span className="text-[9px] uppercase tracking-[0.13em] text-white/[0.44]">
      {label}
    </span>
  </div>
);

export default HeroSection;