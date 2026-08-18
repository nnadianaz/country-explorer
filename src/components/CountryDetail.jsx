import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const CountryDetail = ({ country, onClose }) => {
  if (!country) {
    return (
      <Typography sx={{ color: "#b5c5d4", textAlign: "center", mt: 4 }}>
        Select a country card to see its details.
      </Typography>
    );
  }

  const currencies =
    country.currencies
      ?.map((currency) => currency.name)
      .join(", ") || "Not available";

  const languages =
    country.languages
      ?.map((language) => language.name)
      .join(", ") || "Not available";

  const borders =
    country.borders?.length > 0
      ? country.borders.join(", ")
      : "No neighboring countries";

  return (
    <Box>
      {/* Heading */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
          {country.name}
        </Typography>

        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Flag */}
      <Box
        component="img"
        src={country.flags.svg}
        alt={`${country.name} flag`}
        sx={{
          width: "100%",
          height: 180,
          objectFit: "contain",
          backgroundColor: "white",
          borderRadius: 2,
          mb: 2,
        }}
      />

      <Divider sx={{ borderColor: "#29445b", mb: 2 }} />

      {/* Information */}
      <Stack spacing={2}>
        <Typography sx={{ color: "white" }}>
          <strong>Capital:</strong>{" "}
          {country.capital}
        </Typography>

        <Typography sx={{ color: "white" }}>
          <strong>Population:</strong>{" "}
          {country.population}
        </Typography>

        <Typography sx={{ color: "white" }}>
          <strong>Currency:</strong> {currencies}
        </Typography>

        <Typography sx={{ color: "white" }}>
          <strong>Languages:</strong> {languages}
        </Typography>

        <Typography sx={{ color: "white" }}>
          <strong>Neighbors:</strong> {borders}
        </Typography>
      </Stack>
    </Box>
  );
};

export default CountryDetail;