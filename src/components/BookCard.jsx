import React, { useState } from "react";
import Card from "./common/Card";
import { FiEdit2, FiTrash } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import Modal from "./common/modal";
import { makeApiRequest } from "../lib/api";

const BookCard = ({ book, handleBookClick, handleDeleteBook }) => {
  const { user } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toBeDeletedBook, setToBeDeletedBook] = useState(null);

  return (
    <>
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

          {user?.role !== "Member" && (
            <div className="flex gap-3">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditBookClick(book);
                }}
                className="hover:bg-green-100 p-1 rounded-lg text-green-500"
              >
                <FiEdit2 size={14} />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                  setToBeDeletedBook(book);
                }}
                className="hover:bg-red-100 p-1 rounded-lg text-red-500"
              >
                <FiTrash size={14} />
              </div>
            </div>
          )}
        </div>
      </Card>
      <Modal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        title="Delete Book"
      >
        <div className="p-4 rounded-lg bg-red-50">
          <h4 className="font-semibold text-red-500">
            Are you Sure you want to delete?
          </h4>
          <p className="text-sm text-red-500 mt-4">
            This will delete{" "}
            <span className="font-semibold">{toBeDeletedBook?.title}</span>?
            This action is irreversible!
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              handleDeleteBook({
                id: toBeDeletedBook?._id,
                onSuccess: () => {
                  setToBeDeletedBook(null);
                  setShowDeleteModal(false);
                },
              });
            }}
            className="p-2 bg-red-500 text-white hover:bg-red-400 rounded-lg cursor-pointer"
          >
            Yes
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BookCard;
