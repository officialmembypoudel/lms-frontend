import React, { useContext, useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import DashboardCard from "../components/DashboardCard";
import { FiBook } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import Loader from "../components/common/Loader";
import Modal from "../components/common/modal";
import { MembersContext } from "../context/MembersContext";
import AddEditBookModal from "../components/AddEditBookModal";
import useAuth from "../hooks/useAuth";
import { makeApiRequest } from "../lib/api";
// import { toast } from "react-toastify";
import { NotificationContext } from "../components/common/Notification";

const Dashboard = () => {
  const { toast } = useContext(NotificationContext);
  const { user } = useAuth();
  const { members } = useContext(MembersContext);
  const [books, setBooks] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(true);
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [issuanceData, setIssuanceData] = useState({
    issuedTo: "",
    estimatedReturnDate: "",
  });

  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [toBeEditedBook, setToBeEditedBook] = useState(null);

  const [showAddBookModal, setshowAddBookModal] = useState(false);
  const [newBookInfo, setNewBookInfo] = useState(null);

  const fetchBooks = async () => {
    setBooksLoading(true);

    const { response, error } = await makeApiRequest({
      endpoint: "/books",
    });
    if (error) {
      setLoading(false);
      console.log(error);
      return;
    }

    setBooks(response.data);
    response.success && setBooksLoading(false);
  };

  const getDashboardData = async () => {
    setLoading(true);
    const { response, error } = await makeApiRequest({
      endpoint: "/dashboard",
    });

    if (error) {
      setLoading(false);
      console.log(error);
      return;
    }

    if (response.success) {
      setDashboardData(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
    if (user?.role !== "Member") {
      getDashboardData();
    }
  }, [user]);

  // useEffect(() => {
  //   if (books.length > 0) {
  //     toast("Dashboard loaded successfully!!!!!");
  //   }
  // }, [books]);

  const handleIssueBook = async () => {
    const { response, error } = await makeApiRequest({
      endpoint: "/transactions",
      method: "POST",
      body: {
        bookId: selectedBook?._id,
        issuedTo: issuanceData.issuedTo,
      },
    });
    if (error) {
      console.log(error);
      return;
    }

    if (response.success) {
      const updatedBooks = books.map((book) => {
        if (selectedBook?._id === book._id) {
          return { ...book, availability: false };
        }

        return book;
      });

      setBooks(updatedBooks);
      setSelectedBook(null);
      setShowBookModal(false);
      setDashboardData({
        ...dashboardData,
        issuedBooksCount: dashboardData.issuedBooksCount + 1,
      });
    }
  };

  const handleEditBookClick = (book) => {
    setToBeEditedBook(book);
    setShowEditBookModal(true);
  };
  const handleDeleteBook = async ({ id, onSuccess }) => {
    const { response, error } = await makeApiRequest({
      endpoint: `/books/${id}`,
      method: "DELETE",
    });

    if (error) {
      console.log(error);
      return;
    }
    onSuccess();
    if (response.success) {
      const updatedBook = books.filter((book) => book?._id !== id);

      setBooks(updatedBook);
      setDashboardData({
        ...dashboardData,
        bookCount: dashboardData.bookCount - 1,
      });
    }
    // remove book from books list too
  };

  const handleEditBookSubmit = async (bookInfo) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5003/api/books/${bookInfo?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookInfo),
        }
      );

      const responseData = await response.json();

      console.log("response", responseData);

      if (responseData.success) {
        setShowEditBookModal(false);
        setToBeEditedBook(null);
        const updatedBooks = books.map((book) => {
          if (book?._id === responseData?.data?._id) {
            return responseData?.data;
          }

          return book;
        });

        setBooks(updatedBooks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBookSubmit = async (bookInfo) => {
    const { response, error } = await makeApiRequest({
      endpoint: "/books",
      method: "POST",
      body: bookInfo,
    });
    if (error) {
      console.log(error);
      return;
    }

    console.log(response);

    if (response.success) {
      const newBook = response.data;

      setBooks([newBook, ...books]);

      setshowAddBookModal(false);
      setNewBookInfo(null);
      setDashboardData({
        ...dashboardData,
        bookCount: dashboardData.bookCount + 1,
      });
    }
  };

  return (
    <div className="px-4 py-6 min-h-screen bg-gray-50">
      <h1 className="pt-16 pb-4 text-3xl font-bold text-gray-800">
        Welcome, {user?.name?.split(" ")[0]}
      </h1>

      {user?.role !== "Member" && (
        <>
          {loading ? (
            <div className="py-6">
              <Loader fullscreen={false} />
            </div>
          ) : (
            <div className="flex justify-start lg:justify-between mb-8 flex-wrap gap-4">
              <DashboardCard
                title="Books"
                count={dashboardData?.bookCount}
                Icon={<FiBook size={38} color="blue" />}
              />
              <DashboardCard
                title="Members"
                count={dashboardData?.membersCount}
                Icon={<FiUsers size={38} color="green" />}
              />
              <DashboardCard
                title="Issued Books"
                count={dashboardData?.issuedBooksCount}
                Icon={<FiTrendingUp size={38} color="orange" />}
              />
              <DashboardCard
                title={"Return Due"}
                count={dashboardData?.returnDueCount}
                Icon={<FiClock size={38} color="red" />}
              />
            </div>
          )}
        </>
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className=" text-2xl font-semibold">Books ({books.length})</h2>
        {user?.role !== "Member" && (
          <button
            onClick={() => setshowAddBookModal(true)}
            className="bg-green-500 hover:bg-green-500/90 p-2 rounded-lg cursor-pointer text-white"
          >
            Add Book
          </button>
        )}
      </div>
      {booksLoading ? (
        <div className="py-6">
          <Loader fullscreen={false} />
        </div>
      ) : (
        <div className="flex gap-4  flex-wrap">
          {books.map((book) => {
            return (
              <BookCard
                key={book._id}
                book={book}
                handleBookClick={() => {
                  setShowBookModal(true);
                  setSelectedBook(book);
                }}
                handleEditBookClick={handleEditBookClick}
                handleDeleteBook={handleDeleteBook}
              />
            );
          })}
        </div>
      )}

      {/* Task: make an Issue book component */}
      <Modal
        open={showBookModal}
        onClose={() => {
          setShowBookModal(false);
          setSelectedBook(null);
          setIssuanceData({});
        }}
        title="Issue Book"
      >
        <div className="p-2 bg-green-100 border border-green-300 rounded-lg">
          <h5 className="font-semibold">{selectedBook?.title}</h5>
        </div>

        <div className="mt-8 space-y-4">
          <h5 className="font-semibold">Fill the issuance details</h5>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Issue To</label>
            <select
              value={issuanceData.issuedTo}
              onChange={(e) => {
                setIssuanceData({
                  ...issuanceData,
                  issuedTo: e.target.value,
                });
              }}
              className="w-1/2 p-2 rounded-lg border"
            >
              <option value="">Select Member</option>
              {members?.map((member) => {
                return (
                  <option key={member?._id} value={member?._id}>
                    {member?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={handleIssueBook}
              disabled={!issuanceData.issuedTo}
              className={`${
                issuanceData.issuedTo
                  ? "bg-green-500 text-white hover:bg-green-400"
                  : "bg-gray-200 text-gray-400"
              } p-2 px-4 rounded-lg cursor-pointer`}
            >
              Issue Book
            </button>
          </div>
        </div>
      </Modal>

      <AddEditBookModal
        toBeEditedBook={toBeEditedBook}
        open={showEditBookModal}
        onClose={() => {
          setShowEditBookModal(false);
          setToBeEditedBook(null);
        }}
        onSubmit={handleEditBookSubmit}
        modalTitle={"Edit Book"}
      />
      <AddEditBookModal
        toBeEditedBook={newBookInfo}
        open={showAddBookModal}
        onClose={() => {
          setNewBookInfo(null);
          setshowAddBookModal(false);
        }}
        onSubmit={handleAddBookSubmit}
        modalTitle={"Add Book"}
      />
    </div>
  );
};

export default Dashboard;
