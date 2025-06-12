"use client";

export default function StockTable({ points }) {
  if (!points) return null;

  return (
    <div className="bg-white p-6 mt-6 rounded shadow border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">📊 Price Snapshot</h3>
      <table className="table-auto w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">Time Period</th>
            <th className="py-2 px-4">Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4">Current</td>
            <td className="py-2 px-4">${points.current.toFixed(2)}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4">1 Day Ago</td>
            <td className="py-2 px-4">${points["1d"].toFixed(2)}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4">1 Month Ago</td>
            <td className="py-2 px-4">${points["1m"].toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4">1 Year Ago</td>
            <td className="py-2 px-4">${points["1y"].toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}