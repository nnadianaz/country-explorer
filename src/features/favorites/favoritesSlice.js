import { createSlice } from "@reduxjs/toolkit";

// Starting value of the favorites state
const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    toggleFavorite: (state, action) => {
      // The clicked country arrives in action.payload
      const clickedCountry = action.payload;

      // Stop if the country does not have a code
      if (!clickedCountry?.alpha3Code) {
        return;
      }

      // Check whether the country is already a favorite
      const isAlreadyFavorite = state.items.some(
        (country) => country.alpha3Code === clickedCountry.alpha3Code,
      );

      if (isAlreadyFavorite) {
        // Remove the country
        state.items = state.items.filter(
          (country) => country.alpha3Code !== clickedCountry.alpha3Code,
        );
      } else {
        // Add the country
        state.items.push(clickedCountry);
      }
    },

    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

// Export actions for dispatching
export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;

// Select and return the complete favorites array
export const selectFavorites = (state) => state.favorites.items;

// Select the number of favorites
export const selectFavoriteCount = (state) => state.favorites.items.length;

// Check whether one country is a favorite
export const selectIsFavorite = (state, countryCode) =>
  state.favorites.items.some((country) => country.alpha3Code === countryCode);

// Export reducer for the store
export default favoritesSlice.reducer;
