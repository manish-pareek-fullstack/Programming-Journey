import { ClipLoader } from "react-spinners";
function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClipLoader size={50} />
    </div>
  );
}

export default Loader;
