// src/components/PDFButton.jsx

const PDFButton = ({ onDownload, label = "Descargar PDF", className = "" }) => {
  return (
    <button
      onClick={onDownload}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-black to-blue-700 text-white font-bold hover:shadow-lg transition ${className}`}
    >
      {label}
    </button>
  );
};

export default PDFButton;
