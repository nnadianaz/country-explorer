import { Box, Typography } from "@mui/material"
import CountryCard from "./CountryCard"

const CountryList = ({countries, onSelectCountry}) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography
        variant="h6"
        sx={{
          color: "white",
          marginBottom: 2,
        }}
      >
        Featured Destinations
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {countries.map((country) => (
          <CountryCard
            key={country.alpha3Code}
            country={country}
            onSelectCountry={onSelectCountry}
          />
        ))}
      </Box>
    </Box>
  )
}

export default CountryList
