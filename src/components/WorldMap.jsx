const WorldMap = () => {
  return (
    <div
      role="img"
      aria-label="Map of the world"
      className="
          group relative isolate
          h-[300px] w-full
          overflow-hidden

          rounded-[22px]
          border border-white/10

          bg-[#071b30]
          bg-[url('/world-map.jpg')]
          bg-cover bg-center

          shadow-[inset_0_0_60px_rgba(0,0,0,0.25)]

          min-[900px]:h-[500px]
        "
    >
      {/* Dark map overlay */}
      <span
        aria-hidden="true"
        className="
            pointer-events-none
            absolute inset-0
            z-[1]

            bg-[linear-gradient(180deg,rgba(3,14,29,0.08)_0%,rgba(3,14,29,0.22)_45%,rgba(3,14,29,0.72)_100%)]
          "
      />

      {/* Cartographic grid */}
      <span
        aria-hidden="true"
        className="
            pointer-events-none
            absolute inset-0
            z-[2]

            opacity-25

            [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)]
            [background-size:48px_48px]

            [mask-image:linear-gradient(to_bottom,black,transparent_90%)]
          "
      />

      {/* Top-left map label */}
      <div
        className="
            absolute left-4 top-4
            z-10

            rounded-xl
            border border-white/10
            bg-[#17152e]/80
            px-4 py-3

            text-white
            shadow-lg
            backdrop-blur-md
          "
      >
        <span
          className="
      block text-[7px]
      font-extrabold
      uppercase
      tracking-[0.2em]
      text-[#71d5b4]
    "
        >
          Atlas map system
        </span>

        <strong
          className="
      mt-1 block
      text-[11px]
      tracking-[0.04em]
    "
        >
          Global overview
        </strong>
      </div>

      {/* Top-right live indicator */}
      <div
        className="
                absolute right-4 top-4
                z-10

                flex items-center gap-2

                rounded-full
                border border-white/10
                bg-[#17152e]/80
                px-3 py-2

                text-white
                backdrop-blur-md
              "
      >
        <span className="relative flex h-2 w-2">
          <span
            className="
        absolute inline-flex
        h-full w-full

        animate-ping
        rounded-full
        bg-[#71d5b4]
        opacity-60
      "
          />

          <span
            className="
        relative inline-flex
        h-2 w-2
        rounded-full
        bg-[#71d5b4]
      "
          />
        </span>

        <span
          className="
      text-[7px]
      font-extrabold
      uppercase
      tracking-[0.15em]
      text-white/[0.65]
    "
        >
          World map
        </span>
      </div>

      {/* Bottom map information */}
      <div
        className="
    absolute bottom-4
    left-4 right-4
    z-10

    flex items-end
    justify-between
    gap-4
  "
      >
        <div
          className="
      rounded-lg
      border border-white/10
      bg-[#17152e]/80
      px-3 py-2

      text-[7px]
      font-bold
      uppercase
      tracking-[0.15em]
      text-white/[0.55]

      backdrop-blur-md
    "
        >
          World view / 01
        </div>

        {/* Compass */}
        <div
          aria-label="North direction"
          className="
      relative grid
      h-14 w-14
      place-items-center

      rounded-full
      border border-white/20
      bg-[#17152e]/80

      text-[9px]
      font-black
      text-white

      shadow-lg
      backdrop-blur-md

      before:absolute
      before:h-9
      before:w-px
      before:bg-white/30
      before:content-['']

      after:absolute
      after:h-px
      after:w-9
      after:bg-white/30
      after:content-['']
    "
        >
          <span
            className="
        absolute top-1
        z-[2]
        text-[7px]
        text-[#ff7457]
      "
          >
            N
          </span>

          <span
            className="
        relative z-[2]
        h-2 w-2
        rotate-45
        bg-[#71d5b4]
      "
          />
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
