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

const BookShelf = () => {
  const [selectedStatusMap, setSelectedStatusMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 
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
        toast.success("Book status updated successfully");
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
    navigate("/");
  };
  // search books
  const filteredBooks = booksData.filter((book) =>
  book.title.toLowerCase().includes(searchQuery.toLowerCase())
);
  // Sort the filteredBooks array based on title and sortOrder
  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });
  return (
    <div className="flex flex-wrap">
      <div className="w-full mb-4">
        <button
          onClick={handleGoBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800  m-3 font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
       Go Back
        </button>
      </div>
      <div className="w-full mb-4">
        <input
          type="text"
          placeholder="Search books..."
          className="bg-white border border-gray-300 rounded px-3 py-1 w-3/6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="w-full mb-4">
        <label htmlFor="sortOrder" className="mr-2">Sort by Title:</label>
        <select
          id="sortOrder"
          className="bg-white border border-gray-300 rounded px-3 py-1"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {Statuses.map((statusItem) => (
        <div key={statusItem.status} className="w-full lg:w-1/3 px-4 mb-4">
          <h2 className="text-lg font-bold mb-2">{statusItem.title}</h2>
          {sortedBooks?.filter((book) => book?.status === statusItem?.status)
            .map((book) => (
              <div key={book._id} className="bg-gray-200 p-4 mb-2 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-1 capitalize">{book.title}</h3>
                <p className="text-sm text-gray-700 capitalize">Author: {book.authorName}</p>
                <p className="text-sm text-gray-700 capitalize">Publication House: {book.publicationHouse}</p>
                <p className="text-sm text-gray-700 capitalize">Publication Date: {book.publicationDate.slice(0, 10)}</p>
                <p className="text-sm text-gray-700 capitalize">Genre: {book.genre.title}</p>
                <p className="text-sm text-gray-700 capitalize">Publication Year: {book.publicationYear}</p>
                <div className="mt-3">
                  <select
                    className="bg-white border border-gray-300 rounded px-3 py-1 w-full"
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

export default BookShelf;
