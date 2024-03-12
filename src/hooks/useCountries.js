import { useState, useEffect } from "react";
import { COUNTRY_MAX_LENGTH } from "../utils/constants";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://flagcdn.com/en/codes.json");
        const data = await response.json();
        const countryOptions = Object.entries(data).map(([code, name]) => ({
          value: code,
          label:
            name.slice(0, COUNTRY_MAX_LENGTH) +
            (name.length > COUNTRY_MAX_LENGTH ? "..." : ""),
          flagUrl: `https://flagcdn.com/${code}.svg`,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching country flags:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, isLoading };
}
