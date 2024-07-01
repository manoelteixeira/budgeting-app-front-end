// src/Pages/home/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/home.scss";

export default function Home() {
  const API = import.meta.env.VITE_BASE_URL;
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        setTransactions([...res]);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!transactions)
    return (
      <div className="home">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="home">
      <h1 className="home__title">Transactions</h1>
      <h2 className="home__total">
        Total:
        <span>
          {" "}
          ${transactions.reduce((acc, item) => acc + item.amount, 0)}
        </span>
      </h2>
      <table className="home__table">
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => {
            return (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>
                  <Link to={`/transactions/${item.id}`}>{item.from}</Link>
                </td>
                <td>${item.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
