import React, { useState, useEffect, ChangeEvent } from "react";

interface Country {
  name: string;
}

interface AutocompleteProps {}

type AutocompleteState = {
  query: string;
  countries: Country[];
  filteredCountries: Country[];
  error: string | null;
};

const Autocomplete: React.FC<AutocompleteProps> = () => {
  const [state, setState] = useState<AutocompleteState>({
    query: "",
    countries: [],
    filteredCountries: [],
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const countriesData = data.map((country: any) => ({
          name: country.name.common,
        })); // Limit the response to just 10 countries

        setState((prevState) => ({
          ...prevState,
          countries: countriesData,
          // filteredCountries: countriesData,
          error: null,
        }));
      } catch (error) {
        console.error("An error occurred:", error);
        setState((prevState) => ({
          ...prevState,
          error: "error",
        }));
      }
    };

    fetchData();
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length<3) {
      setState((prevState) => ({
        ...prevState,
        query: value,
        filteredCountries: []
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        query: value,
        filteredCountries: prevState.countries
          .filter((country) =>
            country.name.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 10), // Limit the results to the first 10 countries
      }));
    }
  };

  const highlightMatch = (text: string, query: string) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return (
      <span>
        {text.substring(0, index)}
        <strong>{text.substring(index, index + query.length)}</strong>
        {text.substring(index + query.length)}
      </span>
    );
  };
  console.log("check", state.query.length);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter country name here..."
        onChange={handleInput}
        className="autocomplete-input"
        aria-label="Autocomplete"
      />
      {state.error && <div className="error-message">{state.error}</div>}{" "}
      {!state.error && state.filteredCountries.length > 0 && (
        <ul className="autocomplete-suggestions" role="list">
          {state.filteredCountries.map((country, index) => (
            <li key={index} className="autocomplete-suggestion">
              {highlightMatch(country.name, state.query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
