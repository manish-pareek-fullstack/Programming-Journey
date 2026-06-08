import './loader.css'
const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
    </div>
  );
  // Remove the inline style={{ display:'flex', ... }} — className handles it
};

export default Loader;
