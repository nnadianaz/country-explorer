import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchCountryByCode } from "../features/countries/services/countriesApi";
import CountryProfile from "../features/countries/components/CountryProfile";

const CountryPageStatus = ({
  label,
  symbol,
  title,
  message,
  actionLabel,
  onAction,
  onBack,
}) => (
  <main
    aria-live="polite"
    className="
      relative grid
      min-h-[calc(100vh-72px)]
      place-items-center
      overflow-hidden

      bg-[#f5f0e8]
      px-5 py-16
      text-[#17152e]
    "
  >
    <div
      aria-hidden="true"
      className="
        absolute -right-32 -top-32
        h-[420px] w-[420px]
        rounded-full
        border border-[#17152e]/10
      "
    />

    <div
      className="
        relative mx-auto
        max-w-[760px]
        text-center
      "
    >
      <span
        aria-hidden="true"
        className="
          mx-auto mb-7
          grid h-20 w-20
          place-items-center

          rounded-full
          border border-[#17152e]/15
          bg-[#fffdf8]

          font-[Georgia,serif]
                   text-4xl
          text-[#ff7457]

          shadow-[0_18px_50px_rgba(23,21,46,0.1)]
        "
      >
        {symbol}
      </span>

      <span
        className="
          mb-4 block
          text-[10px]
          font-black uppercase
          tracking-[0.2em]
          text-[#71a990]
        "
      >
        {label}
      </span>

      <h1
        className="
          m-0
          font-[Georgia,serif]
          text-[clamp(3rem,7vw,6rem)]
          font-normal
          leading-[0.92]
        "
      >
        {title}
      </h1>

      <p
        className="
          mx-auto mb-0 mt-7
          max-w-[540px]
          text-sm leading-7
          text-[#17152e]/60

          min-[700px]:text-base
        "
      >
        {message}
      </p>

      <div
        className="
          mt-9 flex flex-wrap
          justify-center gap-3
        "
      >
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="
              cursor-pointer rounded-full
              border border-[#ff7457]
              bg-[#ff7457]
              px-6 py-3

              text-[10px]
              font-black uppercase
              tracking-[0.1em]
              text-white

              transition duration-200
              hover:-translate-y-0.5
              hover:bg-[#17152e]
              hover:border-[#17152e]

              motion-reduce:transition-none
            "
          >
            {actionLabel}
          </button>
        )}

        <button
          type="button"
          onClick={onBack}
          className="
            cursor-pointer rounded-full
            border border-[#17152e]/15
            bg-[#fffdf8]
            px-6 py-3

            text-[10px]
            font-black uppercase
            tracking-[0.1em]
            text-[#17152e]

            transition duration-200
            hover:-translate-y-0.5
            hover:border-[#71d5b4]

            motion-reduce:transition-none
          "
        >
          Back to explorer
        </button>
      </div>
    </div>
  </main>
);

export default function CountryDetailsPage() {
  // reads info from URL
  const { countryCode } = useParams();

  // changes current route from js
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // This value exists only to trigger the API effect again
  const [requestVersion, setRequestVersion] = useState(0);

  // When this function runs, React Router navigates back to the Dashboard.
  const handleReturnToExplorer = () => {
    navigate("/");
  };

  const handleRetry = () => {
    setRequestVersion((currentVersion) => currentVersion + 1);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    const controller = new AbortController();

    const loadCountry = async () => {
      setLoading(true);
      setError(null);
      setCountry(null);

      try {
        const result = await fetchCountryByCode(countryCode, {
          signal: controller.signal,
        });

        setCountry(result);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadCountry();

    return () => {
      controller.abort();
    };
  }, [countryCode, requestVersion]);

  useEffect(() => {
    const previousTitle = document.title;

    if (country?.name) {
      document.title = `${country.name} | ATLAS Country Explorer`;
    }

    return () => {
      document.title = previousTitle;
    };
  }, [country]);

  if (loading) {
    return (
      <CountryPageStatus
        label="Loading profile"
        symbol="◎"
        title="Mapping the country..."
        message={`Retrieving information for ${
          countryCode?.toUpperCase() || "this destination"
        }.`}
        onBack={handleReturnToExplorer}
      />
    );
  }

  if (error) {
    return (
      <CountryPageStatus
        label="Connection interrupted"
        symbol="!"
        title="We lost the trail."
        message={error.message || "The country could not be loaded."}
        actionLabel="Try again"
        onAction={handleRetry}
        onBack={handleReturnToExplorer}
      />
    );
  }

  if (!country) {
    return (
      <CountryPageStatus
        label="Country not found"
        symbol="?"
        title="Beyond the map."
        message={`We could not find a country matching ${
          countryCode?.toUpperCase() || "this code"
        }.`}
        onBack={handleReturnToExplorer}
      />
    );
  }

  return <CountryProfile country={country} onBack={handleReturnToExplorer} />;
}
