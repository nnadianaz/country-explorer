import { useDispatch, useSelector } from "react-redux";

import {
  selectIsFavorite,
  toggleFavorite,
} from "../favoritesSlice";

const focusStyles = `
  focus-visible:outline
  focus-visible:outline-[3px]
  focus-visible:outline-[rgba(255,116,87,0.48)]
  focus-visible:outline-offset-[3px]
`;

const FavoriteButton = ({ country }) => {
  // Dispatch sends an action to Redux
  const dispatch = useDispatch();

  // useSelector reads the latest favorite state
  const isFavorite = useSelector((state) =>
    selectIsFavorite(state, country?.alpha3Code),
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(country));
  };

  if (!country) {
    return null;
  }

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? `Remove ${country.name} from favourites`
          : `Add ${country.name} to favourites`
      }
      onClick={handleToggleFavorite}
      className={`
        mb-2.5
        flex w-full cursor-pointer
        items-center justify-between

        rounded-[10px]
        border
        px-4 py-3

        text-[10px]
        font-extrabold

        transition
        duration-200
        ease-out

        motion-reduce:transition-none

        ${
          isFavorite
            ? `
              border-[#f0c76c]
              bg-[#f0c76c]
              text-[#17152e]
            `
            : `
              border-white/20
              bg-white/[0.07]
              text-white
              hover:border-[#f0c76c]
              hover:bg-white/[0.12]
            `
        }

        ${focusStyles}
      `}
    >
      <span>{isFavorite ? "Saved to favourites" : "Add to favourites"}</span>

      <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
    </button>
  );
};

export default FavoriteButton;
