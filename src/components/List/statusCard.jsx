import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../reducers/BookReducer";
import { toast } from "react-toastify"; 
import { useNavigate } from "react-router-dom"; 

const Statuses = [
  { status: "plan to read", title: "Plan to Read" },
  { status: "reading", title: "Reading" },
  { status: "completed", title: "Completed" },
];

const StatusBasedBooks = () => {
  const [selectedStatusMap, setSelectedStatusMap] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const booksData = useSelector((state) => state.book.books);

  useEffect(() => {
    actions.fetchBooks(dispatch);
  }, [dispatch]);

  const handleStatusChange = async (e, id) => {
    const selectedStatus = e.target.value;
    setSelectedStatusMap((prevMap) => ({
      ...prevMap,
      [id]: selectedStatus,
    }));

    try {
      const response = await actions.updatePrompt(dispatch, id, { status: selectedStatus });

      if (response && response.status === 200) {
        toast.success("Book updated successfully");
        actions.fetchBooks(dispatch);
      } else if (response?.data?.message) {
        toast.error(response.data.message);
      } else {
        toast.error("Failed to update book status");
      }
    } catch (error) {
      console.error("Error updating book status:", error);
      toast.error("Failed to update book status");
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full mb-4">
        <button onClick={handleGoBack} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4">
          Back
        </button>
      </div>
      {Statuses.map((statusItem) => (
        <div key={statusItem.status} className="w-full lg:w-1/3 px-4 mb-4">
          <h2 className="text-lg font-bold mb-2">{statusItem.title}</h2>
          {booksData
            .filter((book) => book.status === statusItem.status)
            .map((book) => (
              <div key={book._id} className="bg-gray-200 p-4 mb-2">
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p>Author: {book.authorName}</p>
                <div className="w-1/4 lg:w-1/3 px-4 mb-4">
                  <h2 className="text-lg font-bold mb-2">Select Status</h2>
                  <select
                    className="bg-white border border-gray-300 rounded px-4 py-2 w-full"
                    value={selectedStatusMap[book._id] || ""}
                    onChange={(e) => handleStatusChange(e, book._id)}
                  >
                    <option value="">Select Status</option>
                    {Statuses.map((status) => (
                      <option key={status.status} value={status.status}>
                        {status.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default StatusBasedBooks;
