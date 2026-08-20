import CountryCard from "./CountryCard";
import "./CountryList.css";

const CountryList = ({
  countries,
  onSelectCountry,
  selectedCountryCode,
  loading,
}) => {
  if (loading) {
    return (
      <div className="loading-state" role="status" aria-live="polite">
        <span className="loading-spinner" aria-hidden="true" />
        Loading countries...
      </div>
    );
  }

  if (!countries.length) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">⌕</span>
        <h3>No countries found</h3>
        <p>Try searching with another country name.</p>
      </div>
    );
  }

  return (
    <div className="country-grid">
      {countries.map((country, index) => (
        <CountryCard
          key={country.alpha3Code}
          country={country}
          onSelectCountry={onSelectCountry}
          isSelected={selectedCountryCode === country.alpha3Code}
          style={{ animationDelay: `${index * 50}ms` }}
        />
      ))}
    </div>
  );
};

export default CountryList;