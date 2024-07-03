// src/Pages/edit/Edit.jsx

import { useEffect, useState } from "react";
import "./styles/edit.scss";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit() {
  const API = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
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
        setTransaction(res);
      })
      .catch((err) => {
        err.json().then((err) => setError(err.error));
      });
  }, [id]);

  const handleChange = (event) => {
    setTransaction((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "PUT",
      body: JSON.stringify({
        ...transaction,
        amount: Number(transaction.amount),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${API}/${id}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((res) => {
        alert(`Transactons #${res.id} Updated.`);
        navigate("/transactions");
      })
      .catch((err) => {
        err.json().then((errJSON) => alert(errJSON.error));
      });
  };

  if (error) {
    return (
      <div className="edit">
        <h1 className="edit__message-error">{error}</h1>
      </div>
    );
  } else if (!transaction) {
    return (
      <div className="edit__message">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="edit">
        <h1 className="edit__title">Edit Transition</h1>
        <form action="" className="edit__form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Edit Transaction</legend>
            <div className="edit__form-field">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={transaction.category}
                onChange={handleChange}
              />
            </div>
            <div className="edit__form-field">
              <label htmlFor="item_name">Item Name</label>
              <input
                type="text"
                placeholder="Item Name"
                name="item_name"
                value={transaction.item_name}
                onChange={handleChange}
              />
            </div>

            <div className="edit__form-field">
              <label htmlFor="from">From</label>
              <input
                type="text"
                placeholder="From"
                name="from"
                value={transaction.from}
                onChange={handleChange}
              />
            </div>

            <div className="edit__form-field">
              <label htmlFor="amount">Amount</label>
              <input
                type="numuber"
                placeholder="Amount"
                name="amount"
                value={transaction.amount}
                onChange={handleChange}
              />
            </div>
            <div className="edit__form-field">
              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                placeholder="Date"
                name="date"
                value={transaction.date}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="edit__form-submit">
              Edit Transaction
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
