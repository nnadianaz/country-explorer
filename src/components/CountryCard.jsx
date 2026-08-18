import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const CountryCard = ({ country, onSelectCountry }) => {
  const handleClick = () => {
    onSelectCountry(country);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        backgroundColor: "#10263b",
        color: "white",
        border: "1px solid #29445b",
        borderRadius: 2,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          borderColor: "#20d8c7",
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={country.flags.svg}
          alt={`${country.name} flag`}
          sx={{
            objectFit: "cover",
          }}
        />

        <CardContent>
          <Typography variant="h5" fontWeight={700}>
            {country.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "#b5c5d4" }}>
            Capital: {country.capital}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
';'