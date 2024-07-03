// src/Pages/show/Show.jsx

import { useNavigate, useParams, Link } from "react-router-dom";
import "./styles/show.scss";
import { useEffect, useState } from "react";

export default function Show() {
  const { id } = useParams();
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((res) => {
        setTransaction({ ...res, date: new Date(res.date) });
      })
      .catch((err) => {
        err.json().then((err) => setError(err.error));
      });
  }, [id]);

  const handleDelete = () => {
    const options = {
      method: "DELETE",
    };
    fetch(`${API}/${id}`, options)
      .then((res) => res.json())
      .then((res) => {
        alert(`Transaction #${res.id} Deleted`);
        navigate("/transactions");
      })
      .catch((err) => console.error(err));
  };

  if (error) {
    return (
      <div className="show">
        <h1 className="show__message-error">{error}</h1>
      </div>
    );
  }
  if (!transaction) {
    return (
      <div className="show">
        <h1 className="show__message">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="show">
        <h1 className="show__title">Transaction</h1>
        <div className="show__details">
          <div className="show__details-item">
            Item: <span>{transaction.item_name}</span>
          </div>
          <div className="show__details-item">
            From: <span>{transaction.from}</span>
          </div>
          <div className="show__details-item">
            Category: <span>{transaction.category}</span>
          </div>
          <div className="show__details-item">
            Amount: <span>${transaction.amount}</span>
          </div>
          <div className="show__details-item">
            Date: <span>{transaction.date.toLocaleDateString()}</span>
          </div>
          <div className="show__details-item">
            Time: <span>{transaction.date.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="show__controls">
          <Link to="/transactions">
            <div className="show__controls-back">Back</div>
          </Link>
          <Link to={`/transactions/${id}/edit`}>
            <div className="show__controls-edit">Edit</div>
          </Link>
          <div className="show__controls-delete" onClick={handleDelete}>
            Delete
          </div>
        </div>
      </div>
    );
  }
}
