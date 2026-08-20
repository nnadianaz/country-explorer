const WorldMap = () => {
  return (
    <div
      role="img"
      aria-label="Map of the world"
      className="
        relative h-[300px] w-full overflow-hidden
        rounded-lg border border-[#19364e]
        bg-[#071b30] bg-[url('/world-map.jpg')]
        bg-cover bg-center
        min-[900px]:h-[500px]
      "
    >
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_bottom,rgba(2,15,31,0.1),rgba(2,15,31,0.4))]
        "
      />
    </div>
  );
};

export default WorldMap;