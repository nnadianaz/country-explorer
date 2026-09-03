import { useSelector } from "react-redux";

const FavoritesCounter = () => {
  // Read the favorites array from Redux
  const favoriteCountries = useSelector((state) => state.favorites.items);

  // Count the countries
  const favoriteCount = favoriteCountries.length;

  const label = favoriteCount === 1 ? "favourite" : "favourites";

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border border-[#17152e]/15
        bg-[#fffdf8]
        px-4 py-2
        text-[10px]
        font-extrabold
        uppercase
        tracking-[0.08em]
        text-[#17152e]
        shadow-sm
      "
    >
      <span aria-hidden="true" className="text-base text-[#f0c76c]">
        ★
      </span>

      <span>{favoriteCount}</span>
      <span>{label}</span>
    </div>
  );
};

export default FavoritesCounter;
