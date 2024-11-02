// ComposeModal.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiconnector } from "../../services/apiconnector";

const Todomodal = ({ showModal, setShowModal, messageid }) => {
  const [name, setname] = useState("");
  const [body, setBody] = useState("");
  const { email } = useSelector((state) => state.User);
  const savetodo = async (e) => {
    e.preventDefault();
    try {
      const response = await apiconnector(
        "POST",
        "https://octopus-app-6g5qm.ondigitalocean.app/api/store",
        {
          email,
          name,
          description: body,
          messageid,
        }
      );
      //   alert("Message sent successfully!");
      console.log("res", response);
      setShowModal(false); // Close modal on success
    } catch (error) {
      console.error("Error saving todo:", error);
      alert("Failed to send message");
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md shadow-md w-full max-w-lg max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Add Todo</h2>
          <form onSubmit={savetodo}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="subject">
                Name
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="body">
                description
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="10"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Todomodal;
