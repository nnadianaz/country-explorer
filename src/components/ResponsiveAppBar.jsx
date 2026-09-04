import { useState } from "react";
import { Link } from "react-router-dom";

const pages = [
  {
    name: "Explore",
    link: "/#explore",
  },
  {
    name: "World Map",
    link: "/#world",
  },
  {
    name: "Discover",
    link: "/#country-detail",
  },
];

const CompassIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-[22px] w-[22px]"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />

      <path
        d="
          M15.8 8.2
          L13.7 13.7
          L8.2 15.8
          L10.3 10.3
          L15.8 8.2
          Z
        "
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
};

const ResponsiveAppBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-white/10
        bg-[#17152e]/90
        text-white
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto flex h-[72px]
          max-w-[1440px]
          items-center justify-between
          px-5

          min-[700px]:px-8
          min-[1100px]:px-12
        "
      >
        <Link
          to="/"
          aria-label="Atlas home"
          className="
            group inline-flex
            items-center gap-3
            text-white no-underline
          "
        >
          <span
            className="
              grid h-10 w-10
              place-items-center
              rounded-full
              border border-white/25
              text-[#71d5b4]

              transition-transform
              duration-500

              group-hover:rotate-45
              motion-reduce:transition-none
            "
          >
            <CompassIcon />
          </span>

          <span>
            <strong
              className="
                block
                text-[14px]
                font-black
                tracking-[0.23em]
              "
            >
              ATLAS
            </strong>

            <small
              className="
                block
                text-[8px]
                uppercase
                tracking-[0.17em]
                text-white/[0.45]
              "
            >
              Country Explorer
            </small>
          </span>
        </Link>

        {/* Navigation */}
        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={`
            absolute
            left-5 right-5
            top-[62px]
            rounded-2xl
            border border-white/10
            bg-[#17152e]
            p-3
            shadow-2xl

            ${mobileMenuOpen ? "grid" : "hidden"}

            min-[760px]:static
            min-[760px]:flex
            min-[760px]:items-center
            min-[760px]:gap-8
            min-[760px]:border-0
            min-[760px]:bg-transparent
            min-[760px]:p-0
            min-[760px]:shadow-none
          `}
        >
          {pages.map((page) => (
            <a
              key={page.name}
              href={page.link}
              onClick={closeMobileMenu}
              className="
                rounded-lg
                px-3 py-3

                text-[11px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-white/[0.58]
                no-underline

                transition-colors
                duration-200

                hover:bg-white/5
                hover:text-white

                motion-reduce:transition-none

                min-[760px]:px-0
                min-[760px]:py-1
                min-[760px]:hover:bg-transparent
              "
            >
              {page.name}
            </a>
          ))}
          <Link
              to="/plans/new"
              onClick={closeMobileMenu}
              className="
                mt-2 inline-flex items-center
                justify-between rounded-xl
                bg-[#ff7457] px-4 py-3

                text-[11px] font-black
                uppercase tracking-[0.1em]
                text-white no-underline

                transition-colors duration-200
                hover:bg-white
                hover:text-[#17152e]

                motion-reduce:transition-none
                min-[760px]:hidden
              "
            >
              Plan a trip
              <span aria-hidden="true">↗</span>
            </Link>
        </nav>

        {/* Desktop travel-plan button */}
            <Link
              to="/plans/new"
              className="
                hidden
                items-center gap-2
                rounded-full
                border border-[#ff7457]/60
                bg-[#ff7457]
                px-4 py-2.5

                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.08em]
                text-white
                no-underline

                shadow-[0_5px_18px_rgba(255,116,87,0.22)]

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:border-white
                hover:bg-white
                hover:text-[#17152e]

                motion-reduce:transition-none

                min-[760px]:inline-flex
              "
            >
              Plan a trip

              <span
                aria-hidden="true"
                className="text-[15px]"
              >
                ↗
              </span>
            </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="primary-navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((currentValue) => !currentValue)}
          className="
            grid h-10 w-10
            place-items-center
            rounded-full
            border border-white/20
            bg-white/5
            p-0
            text-white

            min-[760px]:hidden
          "
        >
          <span className="sr-only">Navigation menu</span>

          <span className="grid gap-[5px]">
            <i
              aria-hidden="true"
              className={`
                block h-px w-4
                bg-current
                transition-transform
                duration-200

                ${mobileMenuOpen ? "translate-y-[3px] rotate-45" : ""}

                motion-reduce:transition-none
              `}
            />

            <i
              aria-hidden="true"
              className={`
                block h-px w-4
                bg-current
                transition-transform
                duration-200

                ${mobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""}

                motion-reduce:transition-none
              `}
            />
          </span>
        </button>
      </div>
    </header>
  );
};

export default ResponsiveAppBar;
