import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCuzt, setToCur] = useState("USD");
  const [conveted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);

        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCuzt}`
        );
        const data = await res.json();

        setConverted(data.rates[toCuzt]);
        setIsLoading(false);
      }

      if(fromCur === toCuzt) return setConverted(amount)
      convert();
    },
    [amount, fromCur, toCuzt]
  );
  return (
    <>
      <div className="p-8 flex gap-3">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={isLoading}
          className="border-2 border-black active:outline-blue-500"
        />
        <select
          name=""
          id=""
          value={fromCur}
          onChange={(e) => setFromCur(e.target.value)}
          className="border border-black"
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          name=""
          id=""
          value={toCuzt}
          onChange={(e) => setToCur(e.target.value)}
          className="border border-black"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p className="ml-8 ">
        {conveted} {toCuzt}
      </p>
    </>
  );
}
