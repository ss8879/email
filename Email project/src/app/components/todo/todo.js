import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";
import { apiconnector } from "@/app/services/apiconnector";

export default function Todo() {
  const { email } = useSelector((state) => state.User);
  const [arr, setArr] = useState([]);

  async function getTodos() {
    try {
      const response = await apiconnector(
        "POST",
        "https://octopus-app-6g5qm.ondigitalocean.app/api/gettodo",
        { email }
      );
      console.log("response", response);
      setArr(response.data.todos.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setArr([]); // Clear array in case of error
    }
  }

  async function handleDone(_id) {
    try {
      console.log("hey", _id);
      const response = await apiconnector(
        "POST",
        "https://octopus-app-6g5qm.ondigitalocean.app/api/delete",
        { _id }
      );
      console.log("response", response);
      getTodos();
    } catch (error) {
      console.error("Error marking todo as done:", error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap h-screen w-screen text-black p-4">
      <AnimatePresence>
        {arr.length === 0 ? (
          <motion.div
            key="no-todos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="text-center my-auto w-full"
          >
            No todos to display.
          </motion.div>
        ) : (
          arr.map((message, index) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:w-1/2 lg:w-1/3 p-4"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6">
                <div className="font-bold text-blue-500">
                  <a href={`/${message.messageid}`}>{message.messageid}</a>
                </div>
                <div className="text-gray-600 mt-2">{message.name}</div>
                <div className="text-gray-600 mt-2">{message.description}</div>
                <div
                  onClick={() => handleDone(message._id)}
                  className="flex items-center mt-4 cursor-pointer text-blue-500 font-bold hover:text-blue-700"
                >
                  Mark as Done <CheckIcon className="ml-1 h-5 w-5" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
