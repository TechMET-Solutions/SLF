// Loader.jsx

const Loader = () => {
  return (
    <div  className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}>
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
