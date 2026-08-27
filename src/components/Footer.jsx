const focusStyles = `
  focus-visible:outline
  focus-visible:outline-[3px]
  focus-visible:outline-[rgba(255,116,87,0.48)]
  focus-visible:outline-offset-[3px]
`;

const Footer = () => {
  return (
    <footer
      className="
              relative isolate
              flex min-h-[140px]
              flex-col
              items-center
              justify-between
              gap-[25px]
              overflow-hidden

              border-t
              border-white/10

              bg-[#111126]

              px-5 py-[40px]
              text-center
              text-white

              before:pointer-events-none
              before:absolute
              before:inset-0
              before:z-0
              before:content-['']
              before:opacity-[0.08]
              before:[background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)]
              before:[background-size:55px_55px]

              min-[581px]:flex-row
              min-[581px]:px-[max(5vw,calc((100vw_-_1280px)/2))]
              min-[581px]:text-left
            "
    >
      <a
        href="#top"
        aria-label="Atlas home"
        className={`
          relative z-[2]
          inline-flex w-max items-center gap-2.5
          text-inherit no-underline
          ${focusStyles}
        `}
      >
        <span
          aria-hidden="true"
          className="
            relative grid h-[30px] w-[30px]
            place-items-center rounded-full
            border border-white/[0.46] text-white

            before:absolute before:h-5 before:w-px
            before:bg-current before:opacity-55 before:content-['']

            after:absolute after:h-px after:w-5
            after:bg-current after:opacity-55 after:content-['']
          "
        >
          <span className="relative z-[1] h-2 w-2 rotate-45 bg-[#ff7457]" />
        </span>

        <span className="text-[15px] font-black tracking-[0.16em]">ATLAS</span>
      </a>

      <p
        className="
          relative z-[2]
          m-0
          font-[Georgia,serif]
          text-[13px]
          italic
          text-white/[0.48]
        "
      >
        Made for curious minds and restless passports.
      </p>

      <a
        href="#top"
        className={`
            relative z-[2]

            inline-flex
            items-center
            gap-2

            rounded-full
            border border-white/15
            bg-white/[0.05]

            px-4 py-2.5

            text-[9px]
            font-bold
            uppercase
            tracking-[0.1em]
            text-white/[0.62]
            no-underline

            transition-all
            duration-200
            ease-out

            hover:-translate-y-0.5
            hover:border-[#71d5b4]/50
            hover:bg-white
            hover:text-[#17152e]

            motion-reduce:transition-none

            ${focusStyles}
          `}
      >
        Back to the top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
};

export default Footer;
