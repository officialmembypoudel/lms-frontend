import React from "react";
import Card from "./common/Card";

const BookCard = ({ book }) => {
  return (
    <Card customClass="w-auto !p-3 bg-white border border-gray-300 !rounded-xl shadow">
      <div className="flex items-start justify-between mb-4 gap-6">
        <h4 className="text-md min-w-[120px] font-bold">{book?.title}</h4>
        <div className=" px-4 mt-1 text-center border border-green-200 bg-green-100 rounded-3xl">
          <p className="text-xs font-bold text-black">{"Available"}</p>
        </div>
      </div>
      <p className="mb-2 text-sm font-medium">{book?.author}</p>
      <p className="mb-2 text-sm text-gray-500 font-medium">
        ISBN: {book?.isbn}
      </p>
      <div className="flex items-center justify-between mt-4">
        <div className=" px-4 text-center border border-gray-200 rounded-3xl">
          <p className="text-sm">{book?.genre}</p>
        </div>

        <p className="text-xs">
          {new Date(book?.publicationDate).getFullYear()}
        </p>
      </div>
    </Card>
  );
};

export default BookCard;
