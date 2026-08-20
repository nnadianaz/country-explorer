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
        flex min-h-[120px] flex-col items-center
        justify-between gap-[25px] bg-[#17152e]
        px-5 py-[35px] text-center text-white

        min-[581px]:flex-row
        min-[581px]:px-[max(5vw,calc((100vw_-_1280px)/2))]
        min-[581px]:text-left
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

        <span className="text-[15px] font-black tracking-[0.16em]">
          ATLAS
        </span>
      </a>

      <p className="m-0 font-[Georgia,serif] text-[13px] italic text-white/[0.48]">
        Made for curious minds and restless passports.
      </p>

      <a
        href="#top"
        className={`
          text-[10px] uppercase tracking-[0.09em]
          text-white/[0.62] no-underline
          transition-[color,transform] duration-200 ease-[ease]
          hover:-translate-y-0.5 hover:text-white
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