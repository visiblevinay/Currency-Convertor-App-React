import React, { useEffect, useState } from "react";

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setCurrency] = useState();
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState();
  const [result, setResult] = useState();
  const getCurrencies = async () => {
    const res = await fetch("https://api.frankfurter.dev/v1/currencies");
    const data = await res.json();
    // console.log(data)
    setCurrencies(Object.keys(data));
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  const handleFromCurrencies = (e) => {
    // console.log(e.target.value);
    setCurrency(e.target.value);
  };

  const handleToCurrencies = (e) => {
    // console.log(e.target.value)
    setToCurrency(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
    // console.log(e.target.value);
  };

  const convertCurrency = async () => {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${fromCurrency}&symbols=${toCurrency}`
    );
    const data = await res.json();
    console.log(data);
    setResult(
      "Converted Amount : " + data.rates[toCurrency] + " " + toCurrency
    );
  };

  return (
    <div className="container">
      <div className="select">
        <div>
          <p>From</p>
          <select value={fromCurrency} onChange={handleFromCurrencies}>
            {currencies.map((curVal, index) => {
              return <option value={curVal}>{curVal}</option>;
            })}
          </select>
        </div>

        <div>
          <p>To</p>
          <select value={toCurrency} onChange={handleToCurrencies}>
            {currencies.map((curVal, index) => {
              return <option value={curVal}>{curVal}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="amountContainer">
        <p>Ammount</p>
        <input type="text" placeholder="Enter Amount" onChange={handleAmount} />
      </div>

      <div className="convert-btn">
        <button onClick={convertCurrency}>Convert</button>

        <div className="result">
          <p>{result}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConvertor;

//https://api.frankfurter.dev/v1/currencies
//https://api.frankfurter.dev/v1/latest?ammount=1?