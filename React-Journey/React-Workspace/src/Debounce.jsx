import React, { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const Debounce = () => {
  const [dummy, setDummy] = useState([]);
  const [search, setSearch] = useState("");

  //  custom hook use
  const debouncedSearch = useDebounce(search, 2000);
  

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setDummy(data.users));
  }, []);

  const filterData = dummy.filter((item) =>
    item.firstName.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div>
      <h1>Users Data</h1>

      <input
        type="search"
        placeholder="user name"
        onChange={(e) => setSearch(e.target.value)}
      />

      {filterData.map((item) => (
        <div key={item.id}>
          <h2>
            {item.firstName} {item.lastName}
          </h2>
          <p>{item.email}</p>
          <p>Age: {item.age}</p> <p>Gender: {item.gender}</p>{" "}
          <p>Blood Group: {item.bloodGroup}</p>{" "}
          <p>University: {item.university}</p> <p>Username: {item.username}</p>{" "}
          <p>Birth Date: {item.birthDate}</p> <h3>Address</h3>{" "}
          <p>Address: {item.address.address}</p>{" "}
          <p>City: {item.address.city}</p> <p>State: {item.address.state}</p>{" "}
          <p>Postal Code: {item.address.postalCode}</p> <h3>Company</h3>{" "}
          <p>Company Name: {item.company.name}</p>{" "}
          <p>Department: {item.company.department}</p>{" "}
          <p>Title: {item.company.title}</p> <h3>Bank Details</h3>{" "}
          <p>Card Type: {item.bank.cardType}</p>{" "}
          <p>Card Number: {item.bank.cardNumber}</p>{" "}
          <p>Currency: {item.bank.currency}</p> <h3>Hair</h3>{" "}
          <p>Hair Color: {item.hair.color}</p>{" "}
          <p>Hair Type: {item.hair.type}</p> <h3>Crypto</h3>{" "}
          <p>Coin: {item.crypto.coin}</p>{" "}
          <p>Network: {item.crypto.network}</p>{" "}
        </div>
      ))}
    </div>
  );
};

export default Debounce;