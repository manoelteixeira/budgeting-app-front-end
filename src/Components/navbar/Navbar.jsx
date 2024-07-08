// import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./styles/navbar.scss";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [search, setSearch] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search && search.length > 0) {
      setSearchParams({ search: search });
    } else {
      setSearchParams({});
    }
  }, [search]);

  return (
    <nav className="navbar">
      <Link to={"/transactions"}>
        <h1 className="navbar__title">Budget App</h1>
      </Link>
      <div className="navbar__search">
        <input
          type="text"
          placeholder="Search"
          name="search"
          onChange={handleSearch}
        />
        <img src="./magnifying-glass-solid.svg" alt="" />
      </div>

      <Link to="/transactions/new">
        <div className="navbar__new">New Transaction</div>
      </Link>
    </nav>
  );
}
