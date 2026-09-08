import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectFavoriteCount } from "../favoritesSlice";

const FavoritesCounter = () => {
  const favoriteCount = useSelector(selectFavoriteCount);

  const label = favoriteCount === 1 ? "favourite" : "favourites";

  return (
    <Link
      to="/favorites"
      aria-label={`View ${favoriteCount} ${label}`}
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#17152e]/15
        bg-[#fffdf8]
        px-4 py-2

        text-[10px]
        font-extrabold
        uppercase
        tracking-[0.08em]
        text-[#17152e]
        no-underline

        shadow-sm
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:border-[#f0c76c]
        hover:bg-[#f0c76c]

        focus-visible:outline
        focus-visible:outline-[3px]
        focus-visible:outline-[#ff7457]/40
        focus-visible:outline-offset-[3px]
      "
    >
      <span aria-hidden="true" className="text-base text-[#f0c76c]">
        ★
      </span>

      <span aria-live="polite">{favoriteCount}</span>

      <span>{label}</span>
    </Link>
  );
};

export default FavoritesCounter;
