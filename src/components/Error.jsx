function Error({ children }) {
  return (
    <div className="bg-red-800 text-white text-center mb-5 py-3 uppercase font-bold rounded-md">
      <p>{children}</p>
    </div>
  );
}

export default Error;
