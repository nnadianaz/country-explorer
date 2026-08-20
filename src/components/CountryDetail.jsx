import "./CountryDetail.css";

const makeArray = (value) => {
  if (Array.isArray(value)) return value;

  if (value && typeof value === "object") {
    return Object.values(value);
  }

  return [];
};

const CountryDetail = ({ country, onClose }) => {
  if (!country) {
    return (
      <div className="detail-card detail-empty">
        <span className="detail-empty-globe" aria-hidden="true">🌍</span>
        <h3>Select a country</h3>
        <p>Choose a country card to discover its information.</p>
      </div>
    );
  }

  const currencies = makeArray(country.currencies)
    .map((currency) => currency?.name || currency?.code)
    .filter(Boolean)
    .join(", ");

  const languages = makeArray(country.languages)
    .map((language) => language?.name || language)
    .filter(Boolean)
    .join(", ");

  const borders = country.borders || [];
  const flag = country.flags?.svg || country.flags?.png;
  const population = country.population
    ? new Intl.NumberFormat("en").format(country.population)
    : "Not available";

  const handleDiscoverAnother = () => {
    document
      .getElementById("top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="detail-card">
      <div className="detail-flag">
        {flag ? (
          <img src={flag} alt={`${country.name} flag`} />
        ) : (
          <span className="detail-flag-placeholder" aria-hidden="true">
            🌐
          </span>
        )}

        <button
          type="button"
          className="detail-close"
          aria-label="Close country details"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="detail-body">
        <div className="detail-heading">
          <div>
            <span>{country.region || "Country profile"}</span>
            <h3>{country.name}</h3>
          </div>

          <span className="country-code">{country.alpha3Code}</span>
        </div>

        <div className="detail-facts">
          <div>
            <span>Capital</span>
            <strong>{country.capital || "Not available"}</strong>
          </div>

          <div>
            <span>Population</span>
            <strong>{population}</strong>
          </div>

          <div>
            <span>Currency</span>
            <strong>{currencies || "Not available"}</strong>
          </div>

          <div>
            <span>Languages</span>
            <strong>{languages || "Not available"}</strong>
          </div>
        </div>

        <div className="neighbor-block">
          <span>Neighbouring countries</span>

          <div>
            {borders.length ? (
              borders.slice(0, 8).map((border) => (
                <i key={border}>{border}</i>
              ))
            ) : (
              <small>No land borders—an island story.</small>
            )}
          </div>
        </div>

        <button
          type="button"
          className="detail-cta"
          onClick={handleDiscoverAnother}
        >
          Discover another country <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
};

export default CountryDetail;