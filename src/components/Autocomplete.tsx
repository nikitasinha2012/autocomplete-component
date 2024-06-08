import React, { useState, useEffect, ChangeEvent } from "react";

interface Country {
  name: string;
}

type AutocompleteState = {
  query: string;
  countries: Country[];
  filteredCountries: Country[];
  loading: boolean; // Loading state to handle fetching status
  error: string | null;
};

const Autocomplete: React.FC = () => {
  const [state, setState] = useState<AutocompleteState>({
    query: "",
    countries: [],
    filteredCountries: [],
    loading: false, // Initialize loading state to false
    error: null,
  });

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when fetching data
        setState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Extract country names from the response data
        const data: { name: { common: string } }[] = await response.json();
        const countriesData: Country[] = data.map((country) => ({
          name: country.name.common,
        }));

        // Update state with the fetched countries and set loading back to false
        setState((prevState) => ({
          ...prevState,
          countries: countriesData,
          loading: false,
          error: null,
        }));
      } catch (error) {
        // Set loading back to false and display error message on failure
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: "Failed to fetch countries.",
        }));
      }
    };

    fetchData();
  }, []);

  // Asynchronous function to filter data based on the query string
  const filterDataAsync = async (query: string): Promise<Country[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter countries based on the query and limit the results to 10
        const filtered = state.countries
          .filter((country) =>
            country.name.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 10);
        resolve(filtered);
      }, 300);
    });
  };

  // Function to handle the input changes
  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      query: value,
    }));

    if (value.length >= 3) {
      // Set loading to true while filtering data
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const filteredCountries = await filterDataAsync(value);

      // Update state with the filtered countries and set loading back to false
      setState((prevState) => ({
        ...prevState,
        filteredCountries: filteredCountries,
        loading: false,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        filteredCountries: [],
      }));
    }
  };

  // Function to highlight the matching part of the text
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

  return (
    <div>
      <input
        type="text"
        placeholder="Enter country name here..."
        onChange={handleInput}
        value={state.query}
        className="autocomplete-input"
        aria-label="Autocomplete"
      />

      {state.loading && <div>Loading...</div>}

      {state.error && <div className="error-message">{state.error}</div>}

      {state.query.length >= 3 && !state.loading && (
        <ul className="autocomplete-suggestions" role="list">
          {state.filteredCountries.length > 0 ? (
            // Map through filtered countries and display each one
            state.filteredCountries.map((country, index) => (
              <li key={index} className="autocomplete-suggestion">
                {highlightMatch(country.name, state.query)}
              </li>
            ))
          ) : (
            // Display message if no matches found
            <li className="no-suggestions">No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
