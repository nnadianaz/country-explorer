import { useCallback, useEffect, useState } from "react";

import { fetchCountriesPage } from "../services/countriesApi";

const useCountries = ({ page = 1, pageSize = 10 } = {}) => {
  const [countries, setCountries] = useState([]);

  const [pagination, setPagination] = useState({
    page,
    pageSize,
    hasPreviousPage: page > 1,
    hasNextPage: false,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [requestVersion, setRequestVersion] = useState(0);

  const retry = useCallback(() => {
    setRequestVersion((currentVersion) => currentVersion + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    // Cancels outdated requests

    const loadCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchCountriesPage({
          page,
          pageSize,
          signal: controller.signal,
        });

        setCountries(result.items);

        setPagination(result.pagination);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setCountries([]);
          setError(requestError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadCountries();

    return () => {
      controller.abort();
    };
  }, [page, pageSize, requestVersion]);

  return {
    countries,
    pagination,
    loading,
    error,
    retry,
  };
};

export default useCountries;
