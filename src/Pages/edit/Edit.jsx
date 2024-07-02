// src/Pages/edit/Edit.jsx

import { useEffect, useState } from "react";
import "./styles/edit.scss";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit() {
  const API = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setTransaction((preState) => res);
      });
  }, [id]);

  const handleChange = (event) => {
    setTransaction((prevState) => {
      return { ...transaction, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = Number(transaction.amount);
    const options = {
      method: "PUT",
      body: JSON.stringify({
        ...transaction,
        amount: amount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${API}/${id}`, options)
      .then((res) => res.json())
      .then((res) => {
        alert(`Transactons #${res.id} Updated.`);
        navigate("/transactions");
      })
      .catch((err) => console.error(err));
  };

  if (!transaction) {
    return (
      <div className="create">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="create">
      <h1 className="create__title">Edit Transition</h1>
      <form action="" className="create__form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit Transaction</legend>
          <div className="create__form-field">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={transaction.category}
              onChange={handleChange}
            />
          </div>
          <div className="create__form-field">
            <label htmlFor="item_name">Item Name</label>
            <input
              type="text"
              placeholder="Item Name"
              name="item_name"
              value={transaction.item_name}
              onChange={handleChange}
            />
          </div>

          <div className="create__form-field">
            <label htmlFor="from">From</label>
            <input
              type="text"
              placeholder="From"
              name="from"
              value={transaction.from}
              onChange={handleChange}
            />
          </div>

          <div className="create__form-field">
            <label htmlFor="amount">Amount</label>
            <input
              type="numuber"
              placeholder="Amount"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="create__form-submit">
            Edit Transaction
          </button>
        </fieldset>
      </form>
    </div>
  );
}
