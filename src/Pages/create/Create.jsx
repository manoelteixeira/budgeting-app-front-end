// src/Pages/create/Create.jsx

import { useNavigate } from "react-router-dom";

import "./styles/create.scss";
import { useState } from "react";

export default function Create() {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [newTransaction, setNewTransaction] = useState({
    item_name: "",
    amount: 0,
    date: new Date().toISOString().slice(0, -5),
    from: "",
    category: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      body: JSON.stringify({
        ...newTransaction,
        amount: Number(newTransaction.amount),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(API, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((res) => {
        alert(`New transaction added!\nTransaction ID: #${res.id}`);
        navigate("/transactions");
      })
      .catch((err) => {
        err.json().then((err) => {
          alert(`Error: ${err.error}`);
        });
      });
  };

  const handleChange = (event) => {
    setNewTransaction((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  return (
    <div className="create">
      <h1 className="create__title">Add New Transition</h1>
      <form action="" className="create__form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Transactions</legend>
          <div className="create__form-field">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={newTransaction.category}
              onChange={handleChange}
            />
          </div>
          <div className="create__form-field">
            <label htmlFor="item_name">Item Name</label>
            <input
              type="text"
              placeholder="Item Name"
              name="item_name"
              value={newTransaction.item_name}
              onChange={handleChange}
            />
          </div>

          <div className="create__form-field">
            <label htmlFor="from">From</label>
            <input
              type="text"
              placeholder="From"
              name="from"
              value={newTransaction.from}
              onChange={handleChange}
            />
          </div>

          <div className="create__form-field">
            <label htmlFor="amount">Amount</label>
            <input
              type="numuber"
              placeholder="Amount"
              name="amount"
              value={newTransaction.amount}
              onChange={handleChange}
            />
          </div>

          <div className="create__form-field">
            <label htmlFor="date">Date</label>
            <input
              type="datetime-local"
              placeholder="Date"
              name="date"
              value={newTransaction.date}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="create__form-submit">
            Add Transaction
          </button>
        </fieldset>
      </form>
    </div>
  );
}
