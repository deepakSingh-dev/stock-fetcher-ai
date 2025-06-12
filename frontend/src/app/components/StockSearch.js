"use client";

import { useState } from "react";
import axios from "axios";

export default function StockSearch({ onSelect }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInput = async (e) => {
    const val = e.target.value;
    setInput(val);
    if (val.length > 1) {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/autocomplete?query=${val}`);
      setSuggestions(res.data.results.slice(0, 5));
      setLoading(false);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (symbol) => {
    setInput(symbol);
    setSuggestions([]);
    onSelect(symbol);
  };

  const handleSearch = () => {
    if (input.trim()) {
      onSelect(input.trim().toUpperCase());
      setSuggestions([]);
    }
  };

  return (
    <div className="w-full flex justify-center my-6">
      <div className="relative w-full max-w-xl">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            placeholder="Search stock (e.g., AAPL)"
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-center"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="absolute z-10 w-full mt-1 bg-white text-center p-2 text-gray-500 rounded shadow">
            Loading...
          </div>
        )}

        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow">
            {suggestions.map((item) => (
              <li
                key={item.symbol}
                className="p-2 hover:bg-gray-100 cursor-pointer text-center"
                onClick={() => handleSelect(item.symbol)}
              >
                {item.symbol} - {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}