import { useState, useEffect } from "react";

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
          label: name,
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
