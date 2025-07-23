import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import DashboardCard from "../components/DashboardCard";
import { FiBook } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import Loader from "../components/common/Loader";
import Modal from "../components/common/modal";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(true);
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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

  // const handleBookClick = (book) => {
  //   setShowBookModal(true);
  //   setSelectedBook(book);
  // };

  return (
    <div className="px-4">
      <h1 className="pt-20 pb-4 text-3xl font-bold">Welcome, User</h1>
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
              <BookCard
                key={book._id}
                book={book}
                handleBookClick={() => {
                  setShowBookModal(true);
                  setSelectedBook(book);
                }}
              />
            );
          })}
        </div>
      )}

      <Modal
        open={showBookModal}
        onClose={() => {
          setShowBookModal(false);
          setSelectedBook(null);
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
              // value={"user-2"}
              className="w-1/2 p-2 rounded-lg border"
            >
              <option value={"user-1"}>User 1</option>
              <option value={"user-2"}>User 2</option>
              <option value={"user-3"}>User 3</option>
            </select>
          </div>
          <div className="flex justify-end mt-8">
            <button className="bg-green-500 p-2 px-4 rounded-lg text-white hover:bg-green-400 cursor-pointer">
              Issue Book
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
