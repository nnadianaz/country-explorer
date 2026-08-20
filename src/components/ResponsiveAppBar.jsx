import { useState } from "react";

const pages = [
  { name: "Explore", link: "#explore" },
  { name: "World Map", link: "#world" },
  { name: "Discover", link: "#country-detail" },
];

const focusStyles = `
  focus-visible:outline
  focus-visible:outline-[3px]
  focus-visible:outline-[rgba(255,116,87,0.48)]
  focus-visible:outline-offset-[3px]
`;

const CompassMark = () => (
  <span
    aria-hidden="true"
    className="
      relative grid h-[35px] w-[35px]
      place-items-center rounded-full
      border border-white/[0.46]

      before:absolute before:h-[22px] before:w-px
      before:bg-current before:opacity-55 before:content-['']

      after:absolute after:h-px after:w-[22px]
      after:bg-current after:opacity-55 after:content-['']
    "
  >
    <span className="relative z-[1] h-2 w-2 rotate-45 bg-[#ff7457]" />
  </span>
);

const ResponsiveAppBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExplore = () => {
    document
      .getElementById("explore")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="
        relative z-20 m-0 grid h-[76px] w-full
        grid-cols-[1fr_auto] items-center
        border-b border-white/10 bg-[#242044]
        px-5 text-white

        min-[581px]:px-[5vw]

        min-[821px]:h-[86px]
        min-[821px]:grid-cols-[1fr_auto_1fr]
      "
    >
      <a
        href="#top"
        aria-label="Atlas home"
        className={`
          inline-flex w-max items-center gap-2.5
          text-inherit no-underline
          ${focusStyles}
        `}
      >
        <CompassMark />

        <span className="text-[15px] font-black tracking-[0.16em]">
          ATLAS
        </span>

        <small className="ml-px hidden text-[10px] uppercase tracking-[0.08em] opacity-55 min-[1101px]:inline">
          Country Explorer
        </small>
      </a>

      <nav
        id="primary-navigation"
        aria-label="Primary navigation"
        className={`
          absolute left-[5vw] right-[5vw] top-[68px]
          z-30 flex-col items-stretch gap-0
          rounded-[14px] bg-[rgba(23,21,46,0.97)]
          p-[15px]
          shadow-[0_18px_45px_rgba(0,0,0,0.25)]

          ${mobileMenuOpen ? "flex" : "hidden"}

          min-[821px]:static min-[821px]:z-auto
          min-[821px]:flex min-[821px]:flex-row
          min-[821px]:items-center min-[821px]:gap-[34px]
          min-[821px]:rounded-none min-[821px]:bg-transparent
          min-[821px]:p-0 min-[821px]:shadow-none
        `}
      >
        {pages.map((page, index) => (
          <a
            key={page.name}
            href={page.link}
            onClick={() => setMobileMenuOpen(false)}
            className={`
              p-3 text-[13px] font-bold no-underline
              transition-colors duration-200 ease-[ease]
              hover:text-white
              motion-reduce:transition-none
              min-[821px]:p-0

              ${index === 0 ? "text-white" : "text-white/[0.67]"}
              ${focusStyles}
            `}
          >
            {page.name}
          </a>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleExplore}
        className={`
          hidden cursor-pointer justify-self-end
          rounded-full border border-white/25
          bg-white/[0.08] px-[17px] py-[11px]
          text-xs font-extrabold text-white
          transition duration-200 ease-[ease]
          hover:-translate-y-0.5 hover:bg-white hover:text-[#242044]
          motion-reduce:transition-none
          min-[821px]:block
          ${focusStyles}
        `}
      >
        Start exploring

        <span
          aria-hidden="true"
          className="ml-1.5 text-[#ff7457]"
        >
          ↗
        </span>
      </button>

      <button
        type="button"
        aria-label={
          mobileMenuOpen ? "Close navigation" : "Open navigation"
        }
        aria-controls="primary-navigation"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
        className={`
          flex h-[42px] w-[42px] cursor-pointer
          flex-col items-center justify-center gap-1.5
          rounded-full border border-white/[0.22]
          bg-white/[0.06] p-0 text-white
          min-[821px]:hidden
          ${focusStyles}
        `}
      >
        <span
          className={`
            h-px w-[17px] bg-current
            transition-transform duration-200 ease-[ease]
            motion-reduce:transition-none
            ${
              mobileMenuOpen
                ? "translate-y-[3.5px] rotate-45"
                : ""
            }
          `}
        />

        <span
          className={`
            h-px w-[17px] bg-current
            transition-transform duration-200 ease-[ease]
            motion-reduce:transition-none
            ${
              mobileMenuOpen
                ? "-translate-y-[3.5px] -rotate-45"
                : ""
            }
          `}
        />
      </button>
    </header>
  );
};

export default ResponsiveAppBar;