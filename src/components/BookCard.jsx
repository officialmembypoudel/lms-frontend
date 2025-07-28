import React from "react";
import Card from "./common/Card";
import { FiEdit2 } from "react-icons/fi";

const BookCard = ({ book, handleBookClick, handleEditBookClick }) => {
  return (
    <Card
      onClick={handleBookClick}
      customClass="w-auto !px-3 !py-3 bg-white border border-gray-300 !rounded-xl shadow"
    >
      <div className="flex items-center gap-6 mb-4">
        <h4 className="text-md min-w-[120px] font-bold">{book?.title}</h4>
        <div
          className={`border ${
            book?.availability
              ? "border-green-200 bg-green-100"
              : "border-red-200 bg-red-100"
          } px-4 py-1 text-center rounded-3xl`}
        >
          <p className="text-xs font-bold text-black">
            {book?.availability ? "Available" : "Borrowed"}
          </p>
        </div>
      </div>
      <p className="mb-2 text-sm font-medium">{book?.author}</p>
      <p className="mb-2 text-sm text-gray-500 font-medium">
        ISBN: {book?.isbn}
      </p>
      <div className="flex items-center justify-between mt-4">
        <div className="px-4 text-center border border-gray-200 rounded-3xl">
          <p className="text-sm">{book?.genre}</p>
        </div>

        <p className="text-xs m-0">
          {new Date(book?.publicationDate).getFullYear()}
        </p>

        <div
          onClick={(e) => {
            e.stopPropagation();
            handleEditBookClick(book);
          }}
          className="hover:bg-green-100 p-1 rounded-lg text-green-500"
        >
          <FiEdit2 size={14} />
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
