import React from "react";

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center -z-50">
      {" "}
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>
        <label htmlFor="remark">Remark</label>
        <input type="text" name="remark" id="remark-inp" placeholder="eg;-food,transport" />
        <br />
        <label htmlFor="amount">Amount</label>
        <input type="text" name="amount" id="amount-inp" placeholder="10" />
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          Cancel{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}
