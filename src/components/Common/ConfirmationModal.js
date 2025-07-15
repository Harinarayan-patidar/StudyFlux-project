import React from "react";

const ConfirmationModal = ({ modalData }) => {
  if (!modalData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] max-w-md text-center transform transition-all duration-300 scale-100 animate-scaleIn">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{modalData.text1}</h2>
        <p className="text-sm text-gray-600 mb-6">{modalData.text2}</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={modalData.btn1Handler}
          >
            {modalData.btn1text}
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            onClick={modalData.btn2Handler}
          >
            {modalData.btn2text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
