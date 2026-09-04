const COUNTRIES_API_BASE_URL = "https://countries.dev";

// array contains the country fields
const COUNTRY_FIELDS = [
  "alpha3Code",
  "name",
  "capital",
  "region",
  "subregion",
  "flag",
  "flags",
  "population",
  "area",
  "currencies",
  "languages",
  "borders",
].join(",");

const getCountryName = (name) => {
  if (typeof name === "string") {
    return name;
  }

  return name?.common || name?.official || "Unknown country";
};

const getCapital = (capital) => {
  if (Array.isArray(capital)) {
    return capital[0] || "";
  }

  return capital || "";
};

const getFlags = (country) => {
  if (country.flags && typeof country.flags === "object") {
    return country.flags;
  }

  if (typeof country.flag === "string" && country.flag.startsWith("http")) {
    return {
      svg: country.flag,
      png: country.flag,
    };
  }

  return {};
};

// converts every raw API country into the exact structure your React components expect
const normalizeCountry = (country) => ({
  alpha3Code: country.alpha3Code || country.cca3 || "",

  name: getCountryName(country.name),

  capital: getCapital(country.capital),

  region: country.region || "",

  subregion: country.subregion || "",

  flags: getFlags(country),

  population: Number(country.population) || 0,

  area: Number(country.area) || 0,

  currencies: country.currencies || {},

  languages: country.languages || {},

  borders: Array.isArray(country.borders) ? country.borders : [],
});

// validating page numbers
// fallback is the default value

const getPositiveInteger = (value, fallback) => {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    return fallback;
  }

  return number;
};

// custom API error
// stores: error message, name, HTTP status
export class CountriesApiError extends Error {
  // extends Error extends JavaScript’s normal Error class
  constructor(message, status = null) {
    super(message);

    this.name = "CountriesApiError";
    this.status = status;
  }
}

const requestJson = async (url, { signal, allowNotFound = false } = {}) => {
  let response;

  try {
    response = await fetch(url, {
      signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    throw new CountriesApiError(
      "The countries service could not be reached. Check your connection and try again.",
    );
  }

  if (allowNotFound && response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new CountriesApiError(
      "The countries service returned an unexpected response.",
      response.status,
    );
  }

  try {
    return await response.json();
  } catch {
    throw new CountriesApiError(
      "The countries service returned unreadable data.",
      response.status,
    );
  }
};

// function responsible for API-level pagination
export const fetchCountriesPage = async ({
  page = 1,
  pageSize = 10,
  sortOrder = "asc",
  signal,
} = {}) => {
  const safePage = getPositiveInteger(page, 1);

  const safePageSize = Math.min(getPositiveInteger(pageSize, 10), 100);

  const safeSorttOrder = sortOrder === "desc" ? "desc" : "asc";

  const offset = (safePage - 1) * safePageSize;
  // offset tells the Api how many records to skip

  /*
   * We request one extra country.
   *
   * If pageSize is 10, the API sends a maximum
   * of 11. We display only 10.
   *
   * The extra country tells us whether another
   * page exists.
   */
  const requestLimit = safePageSize + 1;

  const url = new URL("/countries", COUNTRIES_API_BASE_URL);

  url.searchParams.set("limit", String(requestLimit));

  url.searchParams.set("offset", String(offset));

  url.searchParams.set("sort", "name");
  url.searchParams.set("order", safeSorttOrder);

  url.searchParams.set("fields", COUNTRY_FIELDS);

  const data = await requestJson(url, {
    signal,
  });

  if (!Array.isArray(data)) {
    throw new CountriesApiError(
      "The countries service returned an unsupported data format.",
    );
  }

  const normalizedCountries = data
    .map(normalizeCountry)
    .filter((country) => country.alpha3Code && country.name);

  const hasNextPage = data.length > safePageSize;

  const items = normalizedCountries.slice(0, safePageSize);

  return {
    items,

    pagination: {
      page: safePage,
      pageSize: safePageSize,
      hasPreviousPage: safePage > 1,
      hasNextPage,
    },
  };
};

// fetch country by name
// import into useCountries
export const fetchCountryByName = async (countryName, { signal } = {}) => {
  const cleanName = countryName.trim();

  if (!cleanName) {
    return null;
  }

  const url = new URL(
    `/name/${encodeURIComponent(cleanName)}`,
    // encodeURIComponent() safely prepares the name for use inside a URL.
    // https://countries.dev/name/Pakistan
    COUNTRIES_API_BASE_URL,
  );
  // search request asks for the same country information used by your components
  url.searchParams.set("fields", COUNTRY_FIELDS);

  // sending the search request
  const data = await requestJson(url, {
    signal,
    allowNotFound: true,
  });

  if (!data) {
    return null;
  }

  // converting result into array
  const countries = Array.isArray(data) ? data : [data];

  // .find() searches for a country whose name exactly matches the user’s search
  const exactCountry =
    countries.find(
      (country) =>
        getCountryName(country.name).toLowerCase() === cleanName.toLowerCase(),
    ) || countries[0];

  if (!exactCountry) {
    return null;
  }

  return normalizeCountry(exactCountry);
};
