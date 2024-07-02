// src/Pages/create/Create.jsx

import { useNavigate } from "react-router-dom";

import "./styles/create.scss";
import { useState } from "react";

export default function Create() {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [newTransaction, setNewTransactio] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });

  const handleSubmit = (event) => {};
  const handleChange = (event) => {};

  return (
    <div className="create">
      <form action="" className="create__form">
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
              type="numcuber"
              placeholder="Amount"
              name="amount"
              value={newTransaction.amount}
              onChange={handleChange}
            />
          </div>

          <div className="create__form-field">
            <label htmlFor="date">Date</label>
            <input
              type="date"
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
