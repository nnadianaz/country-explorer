import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import WorldMap from "./WorldMap";
import CountryList from "./CountryList";
import CountryDetail from "./CountryDetail";

const Dashboard = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearch = (searchInput) => {
  const foundCountry = countries.find(
    (country) =>
      country.name.toLowerCase() === searchInput.toLowerCase()
  );

  setSelectedCountry(foundCountry);
};

 useEffect(() => {
  fetch("https://countries.dev/countries")
    .then((response) => {
      if (!response.ok) {
        throw new Error("API request failed");
      }

      return response.json();
    })
    .then((data) => {
      console.log("API data:", data);

      const featuredCodes = ["PAK", "AUT", "JPN", "MAR"];

      const featuredCountries = data
        .filter((country) =>
          featuredCodes.includes(country.alpha3Code)
        )
        .map((country) => ({
          alpha3Code: country.alpha3Code,
          name: country.name,
          capital: country.capital,
          flags: country.flags,
          population: country.population,
          currencies: country.currencies,
          languages: country.languages,
          borders: country.borders,
        }));

      console.log("Featured countries:", featuredCountries);

      setCountries(featuredCountries);
    })
    .catch((error) => {
      console.log("API error:", error);
    });
}, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#020f1f",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",  // mobile layout for extra small screen
            md: "2.5fr 1fr", // desktop layout on medium and large screen
            // 2.5 is left section 1 is right section
          },
          gap: 2,
        }}
      >
        {/* Left section */}
        <Box
          sx={{
            backgroundColor: "#071b30",
            border: "1px solid #19364e",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <WorldMap onSearch={handleSearch}/>

          <CountryList countries={countries}
          onSelectCountry={setSelectedCountry}
          />
        </Box>

        {/* Right section */}
        <Box
          sx={{
            minHeight: 600,
            backgroundColor: "#10263b",
            border: "1px solid #29445b",
            borderRadius: 2,
            padding: 2,
          }}
        >
            <CountryDetail
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
            />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;