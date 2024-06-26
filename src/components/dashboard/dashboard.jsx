import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../reducers/BookReducer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyModal from "../../model";
import { actions as action } from "../../reducers/LoginReducer";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false)
  let [edit, setEdit] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    actions.fetchBooks(dispatch);
  }, [dispatch]);
  const booksData = useSelector((state) => state.book.books);


  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await actions.deleteBook(dispatch, id);
      console.log(response);

      if (response && response.status === 200) {
        toast.success("Book deleted successfully");
        actions.fetchBooks(dispatch)
      } else if (response?.data?.message) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during book creation:", error);
      toast.error("Book creation failed. Please try again.");
    }

  }
  // Logout
  const handleLogout = async () => {
    action.logoutAction(dispatch)
    localStorage.clear();
    navigate("/login");

  };
  // Delete User Account as well as books
  const handleDeleteAccount = async () => {
    try {
      const response = await actions.deleteUserAndBooks(dispatch);
      if (response && response.status === 200) {
        console.log(response, "response");
        toast.success("Books and user deleted successfully");
        action.logoutAction(dispatch)
        localStorage.clear();
        navigate("/login");
      } else if (response?.data?.message) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during book creation:", error);
      toast.error("user and books deleted failed. Please try again.");
    }
  }
  return (
    <>
      {isOpen && <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        edit={edit}
      />}
      <nav className="bg-gradient-to-r from-indigo-800 to-blue-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-white text-lg font-bold">Book Management System</h1>
            </div>
            <div className="flex items-center">
              <div className="hidden md:block">
                <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => navigate("/bookshelf")}>Book Shelf</button>
                <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleDeleteAccount}>Delete Account</button>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button onClick={() => setIsOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add Book</button>
                <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>


        <div className="container mx-auto mt-3">
          <div className="flex justify-end">        
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 mb-4 border border-gray-300 rounded"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Author Name</th>
                  <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                  <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Publication Date</th>
                  <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Publication House</th>
                  <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Publication Year</th>
                  <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.map(book => (
                  <tr key={book.title} className="hover:bg-gray-100">
                    <td className="px-3 py-4 whitespace-nowrap">{book.title}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{book.authorName}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{book.genre.title}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{book.publicationDate}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{book.publicationHouse}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{book.publicationYear}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{book.status}</td>
                    <td className="px-3 py-4 whitespace-nowrap space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                        setEdit(book);
                        setIsOpen(true)
                      }}>Edit</button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(book._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </>
  );
};
export default Dashboard;