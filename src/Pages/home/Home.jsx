// src/Pages/home/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/home.scss";

export default function Home() {
  const API = import.meta.env.VITE_BASE_URL;
  const [transactions, setTransactions] = useState();
  const [sortDate, setSortDate] = useState(false);
  const [sortFrom, setSortFrom] = useState(false);
  const [sortAmount, setSortAmount] = useState(false);

  const sortByDate = () => {
    const sorted = transactions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) return -1;
      else if (dateA > dateB) return 1;
      else 0;
    });
    if (sortDate) {
      setTransactions([...sorted]);
    } else {
      setTransactions([...sorted.reverse()]);
    }
    setSortDate(!sortDate);
    setSortFrom(false);
    setSortAmount(false);
  };

  const sortByFrom = () => {
    const sorted = transactions.sort((a, b) => {
      if (a.from < b.from) return -1;
      else if (a.from > b.from) return 1;
      else return 0;
    });
    if (sortFrom) {
      setTransactions([...sorted]);
    } else {
      setTransactions([...sorted.reverse()]);
    }
    setSortFrom(!sortFrom);
    setSortDate(false);
    setSortAmount(false);
  };

  const sortByAmount = () => {
    const sorted = transactions.sort((a, b) => {
      if (a.amount < b.amount) return -1;
      else if (a.amount > b.amount) return 1;
      else return 0;
    });
    if (sortAmount) {
      setTransactions([...sorted]);
    } else {
      setTransactions([...sorted.reverse()]);
    }
    setSortAmount(!sortAmount);
    setSortFrom(false);
    setSortDate(false);
  };

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
          ${transactions.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}
        </span>
      </h2>
      <div className="home__data">
        <div className="home__data__header">
          <div className="home__data__header-item" onClick={sortByDate}>
            Date
          </div>
          <div className="home__data__header-item" onClick={sortByFrom}>
            From
          </div>
          <div className="home__data__header-item" onClick={sortByAmount}>
            Amount
          </div>
        </div>
        <div className="home__data__body">
          {transactions.map((item) => {
            return (
              <div key={item.id} className="home__data__body__item">
                <div
                  className={`home__data__body__item-date ${
                    sortDate && "sorted"
                  }`}
                >
                  {new Date(item.date).toDateString()}
                </div>
                <div
                  className={`home__data__body__item-from && ${
                    sortFrom && "sorted"
                  }`}
                >
                  <Link to={`/transactions/${item.id}`}>{item.from}</Link>
                </div>
                <div
                  className={`home__data__body__item-amount ${
                    sortAmount && "sorted"
                  }`}
                >
                  ${item.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
