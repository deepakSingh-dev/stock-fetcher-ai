"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function StockGraph({ data }) {
  const formatted = data.map(d => ({
    date: new Date(d.Date).toLocaleDateString(),
    price: d.Close
  }));

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Price History</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}