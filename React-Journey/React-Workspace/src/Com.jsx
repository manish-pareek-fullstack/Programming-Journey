import React, { useEffect, useState } from "react";
import "./Com.css";
import Loader from "./Loader";

const Com = () => {
  const [apidata, setapidata] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState("");
  const [selectedUser, setselectedUser] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      const data = await res.json();

      setapidata(data);
      setloading(false)

    } catch (err) {
      console.log(err);
    }

    setloading(false);
  };

  const filterdata = apidata.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase()) ||
      item.company.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {

    return <h1 className="loading"><Loader/></h1>;
  }

  return (
    <div className="">
      <h1 className="heading">Users Data</h1>

      <input
        type="search"
        placeholder="Search users..."
        className="search"
        onChange={(e) => setsearch(e.target.value)}
      />

      <div className="card-container">
        {filterdata.map((item) => (
          <div className="card" key={item.id}>
            <div className="profile">{item.name.charAt(0)}</div>

            <h2>{item.name}</h2>

            <p>
              <b>Username:</b> {item.username}
            </p>

            <p>
              <b>Email:</b> {item.email}
            </p>

            <p>
              <b>Phone:</b> {item.phone}
            </p>

            <p>
              <b>Website:</b> {item.website}
            </p>

            <p>
              <b>Company:</b> {item.company.name}
            </p>

            <p>
              <b>City:</b> {item.address.city}
            </p>

            <button onClick={() => setselectedUser(item)}>View Details</button>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h1>{selectedUser.name}</h1>

            <p>
              <b>Full Address:</b> {selectedUser.address.street},{" "}
              {selectedUser.address.suite}, {selectedUser.address.city}
            </p>

            <p>
              <b>Zipcode:</b> {selectedUser.address.zipcode}
            </p>

            <p>
              <b>Geo Location:</b> {selectedUser.address.geo.lat},{" "}
              {selectedUser.address.geo.lng}
            </p>

            <p>
              <b>Company Catch Phrase:</b> {selectedUser.company.catchPhrase}
            </p>

            <p>
              <b>Website:</b> {selectedUser.website}
            </p>

            <p>
              <b>Phone:</b> {selectedUser.phone}
            </p>

            <button onClick={() => setselectedUser(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Com;
