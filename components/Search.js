import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Search({ handleQueryChange }) {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery == "") {
        setSuggestions([]);
        return;
      }
      const result = await axios.get(
        `https://newsapi.org/v2/everything?language=en&q=${searchQuery}&sortBy=relevancy&pageSize=${4}&apiKey=${
          process.env.NEXT_PUBLIC_NEWS_API_KEY
        }`
      );

      const resultArticles = result.data.articles;
      if (resultArticles.length == 0) setSuggestions([]);
      setSuggestions(resultArticles);
    };
    fetchData();
  }, [searchQuery]);

  function debounce(func, delay = 1500) {
    let timeout;
    return (...args) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  const debounceChange = useCallback(debounce(setSearchQuery), []);

  const handleChange = (event) => {
    setQuery(event.target.value);
    debounceChange(event.target.value);
  };

  const handleSubmit = () => {
    setSuggestions([]);
    handleQueryChange(query);
  };

  const selectedSuggestion = (suggestion) => {
    setSuggestions([]);
    setQuery(suggestion?.title);
  };

  const renderSuggestions = () => {
    if (suggestions.length == 0) return null;
    return (
      <ul className="absolute z-1 p-5 pt-0 rounded-2xl bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        {suggestions?.map((suggestion) => {
          return (
            <li
              className="my-4 max-w-md bg-white p-1 cursor-pointer truncate"
              key={suggestion?.title}
              onClick={() => selectedSuggestion(suggestion)}
            >
              {suggestion?.title}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <div className="flex items-center md:border-2 py-2 rounded-full md:shadow-sm">
        <input
          value={query}
          onChange={handleChange}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={"Start your search"}
        />
        <MagnifyingGlassIcon
          onClick={handleSubmit}
          className="hidden md:inline-flex h-8 bg-teal-500 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </div>

      {renderSuggestions()}
    </div>
  );
}
