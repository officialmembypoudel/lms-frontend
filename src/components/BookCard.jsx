import React from "react";
import Card from "./common/Card";

const BookCard = ({ book }) => {
  return (
    <Card customClass="w-[350px]">
      <h4 className="text-2xl font-bold mb-4">{book?.title}</h4>
      <p className="mb-2 text-lg">{book?.author}</p>
      <p className="text-xs">{book?.publicationDate}</p>
    </Card>
  );
};

export default BookCard;
