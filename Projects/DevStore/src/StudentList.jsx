import StudentItem from "./StudentItem";

const StudentList = ({ students, onDelete, onEdit }) => {
  if (students.length === 0) {
    return <h3>No Data Found</h3>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => (
          <StudentItem
            key={s.id}
            student={s}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
