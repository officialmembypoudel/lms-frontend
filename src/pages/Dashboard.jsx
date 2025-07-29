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
import EditBookModal from "../components/EditBookModal";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
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

  const fetchBooks = async () => {
    try {
      setBooksLoading(true);
      const response = await fetch("http://localhost:5003/api/books", {
        method: "GET",
      });

      const responseData = await response.json();

      console.log(responseData);

      setBooks(responseData.data);
      responseData.success && setBooksLoading(false);
    } catch (error) {
      console.log(error);
      setBooksLoading(false);
    }
  };
  const getDashboardData = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5003/api/dashboard", {
        method: "GET",
      });

      const responseData = await response.json();

      console.log(responseData);

      if (responseData.success) {
        setDashboardData(responseData.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    getDashboardData();
  }, []);

  const handleIssueBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5003/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: selectedBook?._id,
          issuedTo: issuanceData.issuedTo,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        const updatedBooks = books.map((book) => {
          if (selectedBook?._id === book._id) {
            return { ...book, availability: false };
          }

          return book;
        });

        setBooks(updatedBooks);
        setSelectedBook(null);
        setShowBookModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBookClick = (book) => {
    setToBeEditedBook(book);
    setShowEditBookModal(true);
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

  return (
    <div className="px-4">
      <h1 className="pt-20 pb-4 text-3xl font-bold">
        Welcome, {user?.name?.split(" ")[0]}
      </h1>
      {loading ? (
        <div className="py-6">
          <Loader fullscreen={false} />
        </div>
      ) : (
        <div className="flex justify-between mb-8">
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

      <h2 className="mb-4 text-2xl font-semibold">Books ({books.length})</h2>
      {booksLoading ? (
        <div className="py-6">
          <Loader fullscreen={false} />
        </div>
      ) : (
        <div className="flex gap-4 justify-between">
          {books.map((book) => {
            return (
              <MembersContext>
                <BookCard
                  key={book._id}
                  book={book}
                  handleBookClick={() => {
                    setShowBookModal(true);
                    setSelectedBook(book);
                  }}
                  handleEditBookClick={handleEditBookClick}
                />
              </MembersContext>
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

      <EditBookModal
        toBeEditedBook={toBeEditedBook}
        open={showEditBookModal}
        onClose={() => {
          setShowEditBookModal(false);
          setToBeEditedBook(null);
        }}
        onSubmit={handleEditBookSubmit}
      />
    </div>
  );
};

export default Dashboard;
