// this code is used for temporrary stored data
// does not save favorites after a browser refresh

// import { configureStore } from "@reduxjs/toolkit";
// import favoritesReducer from "../features/favorites/favoritesSlice";

// export const store = configureStore({
//   reducer: {
//     favorites: favoritesReducer,
//   },
// });

// this code is used for localStorage data for browser

// this process is called rehydration

import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "../features/favorites/favoritesSlice";

// key to identify a saved data
const FAVORITES_STORAGE_KEY = "atlas:favorites:v1";
// v1 gives the storage format a version

const loadFavoritesState = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const savedFavorites =
      // loading saved favorites
      window.localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!savedFavorites) {
      return undefined;
    }

    const parsedFavorites =
      // reads the saved JSON string from the browser
      JSON.parse(savedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return undefined;
    }

    const validFavorites = parsedFavorites.filter(
      (country) => country?.alpha3Code,
    );

    return {
      favorites: {
        items: validFavorites,
      },
    };
  } catch {
    return undefined;
  }
};

// register reducer
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  // put saved favorites into Redux when the application starts
  preloadedState: loadFavoritesState(),
});

let previousFavorites = store.getState().favorites.items;

store.subscribe(() => {
  const currentFavorites = store.getState().favorites.items;

  if (currentFavorites === previousFavorites) {
    return;
  }

  previousFavorites = currentFavorites;

  try {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(currentFavorites),
    );
  } catch {
    // The Redux state still works if browser storage is unavailable.
  }
});
