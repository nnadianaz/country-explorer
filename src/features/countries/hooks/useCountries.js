// useCountries is a custom hook used to
// request one page of countries
// stores the returned countries
// manages loading / errors

import { useCallback, useEffect, useState } from "react";
// usecall keeps the same retry function between renders

import { fetchCountriesPage } from "../services/countriesApi";

const useCountries = ({ page = 1, pageSize = 10, sortOrder = "asc" } = {}) => {
  const [countries, setCountries] = useState([]);
  //creates custom hook and accept page, pagesize
  // means load page 1 and show 10 countries

  const [pagination, setPagination] = useState({
    page,
    pageSize,
    hasPreviousPage: page > 1,
    hasNextPage: false,
  });
  // stores the information required by the Previous and Next buttons

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [requestVersion, setRequestVersion] = useState(0);
  // state only used for the retry functionality

  const retry = useCallback(() => {
    setRequestVersion((currentVersion) => currentVersion + 1);
  }, []);
  // this function increases requestVersion
  // useCallback ask react to remember the same function

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
          sortOrder,
          signal: controller.signal,
        });
        // hook send three values to API service

        setCountries(result.items);

        setPagination(result.pagination);
        // if the request succeeds the service returns
        // items
        // pagination
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setCountries([]);
          setError(requestError);
          // removes the old country list and stores the error
        }
      } finally {
        // finally runs after success, error, cancellation
        // set loading false
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadCountries();
    // starting the function

    return () => {
      controller.abort();
    };
  }, [page, pageSize, requestVersion, sortOrder]);

  return {
    countries,
    pagination,
    loading,
    error,
    retry,
  };
};

export default useCountries;
