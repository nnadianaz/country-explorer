import "./CountryCard.css";

const CountryCard = ({
  country,
  onSelectCountry,
  isSelected,
  style,
}) => {
  const flag = country.flags?.svg || country.flags?.png;

  return (
    <button
      type="button"
      style={style}
      className={`country-card ${isSelected ? "selected" : ""}`}
      aria-pressed={isSelected}
      onClick={() => onSelectCountry(country)}
    >
      <span className="flag-stage">
        {flag ? (
          <img
            src={flag}
            alt={`${country.name} flag`}
            loading="lazy"
          />
        ) : (
          <span className="flag-placeholder" aria-hidden="true">
            🌐
          </span>
        )}
      </span>

      <span className="card-topline">
        <span>{country.region || "Around the world"}</span>
      </span>

      <strong>{country.name}</strong>

      <span className="capital-line">
        <i aria-hidden="true" />
        {country.capital || "Capital not available"}
      </span>

      <span className="card-footer">
        <span>{country.population || "Not available"}</span>

        <b>
          View <span aria-hidden="true">→</span>
        </b>
      </span>
    </button>
  );
};

export default CountryCard;