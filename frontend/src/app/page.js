"use client";

import { useState } from "react";
import axios from "axios";
import StockSearch from "./components/StockSearch";
import StockGraph from "./components/StockGraph";
import StockTable from "./components/StockTable";

export default function Home() {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState([]);
  const [points, setPoints] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async (symbol) => {
    try {
      const res = await axios.get(`http://localhost:8000/stock-data?symbol=${symbol}`);
      if (res.data.error) {
        setError(res.data.error);
        setStockData([]);
        setPoints(null);
        setSymbol("");
        return;
      }
      setError("");
      setStockData(res.data.history);
      setPoints(res.data.points);
      setSymbol(symbol);
      console.log("Fetched stock data:", res.data); // ✅ log for debugging
    } catch (err) {
      setError("Something went wrong while fetching stock data.");
      console.error(err);
    }
  };

  return (
<main className="max-w-4xl mx-auto p-6 bg-white rounded shadow border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-6">📈 Stock Insight Dashboard</h1>

      <StockSearch onSelect={fetchData} />

      {error && <p className="text-center text-red-600">{error}</p>}

      {symbol && stockData.length > 0 && (
        <>
          <div className="bg-white p-6 rounded shadow mb-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">Stock: {symbol}</h2>
          </div>

          <StockGraph data={stockData} />
          <StockTable points={points} />
        </>
      )}
    </main>
  );
}