import React, { useState } from 'react';

export default function MaxProfitApp() {
  const [timeUnit, setTimeUnit] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const calculateAllCombinations = (time) => {
    let maxEarnings = 0;
    let combinations = [];

    for (let t = 0; t <= Math.floor(time / 5); t++) {
      for (let p = 0; p <= Math.floor(time / 4); p++) {
        for (let c = 0; c <= Math.floor(time / 10); c++) {
          const totalTime = (t * 5) + (p * 4) + (c * 10);
          if (totalTime <= time) {
            const earnings = (t * 1500) + (p * 1000) + (c * 3000);
            if (earnings > maxEarnings) {
              maxEarnings = earnings;
              combinations = [{ T: t, P: p, C: c, earnings }];
            } else if (earnings === maxEarnings) {
              combinations.push({ T: t, P: p, C: c, earnings });
            }
          }
        }
      }
    }

    return combinations;
  };

  const handleCalculate = () => {
    const time = parseInt(timeUnit, 10);
    if (!isNaN(time) && time > 0) {
      if (time > 1000) {
        alert('Please enter a number ≤ 1000 to avoid slow performance.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        const combinations = calculateAllCombinations(time);
        setResults(combinations);
        setLoading(false);
      }, 100);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Max Profit Calculator</h2>
      <input
        type="number"
        value={timeUnit}
        onChange={(e) => setTimeUnit(e.target.value)}
        placeholder="Enter Time Unit"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {loading && <p className="text-center mt-4">Calculating...</p>}

      {!loading && results.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">Max Earnings: ${results[0].earnings}</p>
          <p className="mt-2 font-medium">All optimal combinations:</p>
          <ul className="mt-2 space-y-2">
            {results.map((res, idx) => (
              <li key={idx} className="border p-2 rounded shadow-sm">
                T: {res.T}, P: {res.P}, C: {res.C}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}