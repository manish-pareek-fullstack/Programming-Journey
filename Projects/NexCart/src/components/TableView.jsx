const TableView = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div className="table-container">
      <h2 className="table-title">User Table</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Eye Color</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                {u.firstName} {u.lastName}
              </td>
              <td>{u.gender}</td>
              <td>{u.age}</td>
              <td>{u.phone}</td>
              <td>{u.email}</td>
              <td>{u.eyeColor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
