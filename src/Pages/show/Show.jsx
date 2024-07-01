// src/Pages/show/Show.jsx

import { useParams } from "react-router-dom";
import "./styles/show.scss";
import { useEffect, useState } from "react";

export default function Show() {
  const { id } = useParams();
  const API = import.meta.env.VITE_BASE_URL;
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTransaction({ ...res });
      })
      .catch((err) => console.error(err));
  }, [id]);

  return <div>Show Page Item ID: {id}</div>;
}
