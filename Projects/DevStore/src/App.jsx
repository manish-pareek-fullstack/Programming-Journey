import { useState } from "react";
import StudentForm from "./StudentForm";

const App = () => {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);

  const handleSubmit = (student) => {
    if (editData) {
      const updated = students.map((s) =>
        s.id === editData.id ? { ...student, id: s.id } : s,
      );
      setStudents(updated);
      setEditData(null); 
    } else {
     
      const newStudent = { ...student, id: Date.now() };
      setStudents([...students, newStudent]);
    }
  };

  const handleDelete = (id) => {
    const filtered = students.filter((s) => s.id !== id);
    setStudents(filtered);
  };

  const handleEdit = (student) => {
    setEditData(student);
  };

  const handleCancel = () => {
    setEditData(null);
  };

  return (
    <div>
      <h1>Student Dashboard</h1>

      <StudentForm
        onSubmit={handleSubmit}
        editData={editData}
        onCancel={handleCancel}
      />

      <hr />

      {students.length === 0 ? (
        <h3>No students found</h3>
      ) : (
        students.map((s) => (
          <div key={s.id} style={{ border: "1px solid", margin: 10 }}>
            <p>{s.name}</p>
            <p>{s.age}</p>
            <p>{s.email}</p>

            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
