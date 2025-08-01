import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import Card from "../components/common/Card";
import { makeApiRequest } from "../lib/api";

const getTransactionsColumn = ({ returnBook }) => {
  return [
    {
      label: "Book",
      key: "book",
      renderDetail: (row) => {
        return (
          row?.book?.title || (
            <span className="font-semibold text-red-400">
              Book has been removed
            </span>
          )
        );
      },
    },
    {
      label: "Issued To",
      key: "issuedTo",
      renderDetail: (row) => {
        return row?.issuedTo?.name;
      },
    },
    {
      label: "Issued By",
      key: "issuedBy",
      renderDetail: (row) => {
        return row?.issuedBy?.name;
      },
    },
    {
      label: "Returned To",
      key: "returnedTo",
      renderDetail: (row) => {
        return row?.returnedTo?.name || "-";
      },
    },
    {
      label: "Returned",
      key: "returned",

      renderDetail: (row) => {
        return Boolean(row.returned) ? (
          "Yes"
        ) : (
          <button
            className="px-3 py-2 bg-green-300 hover:bg-green-300/90 rounded-lg cursor-pointer"
            onClick={() => returnBook(row?._id)}
          >
            Return
          </button>
        );
      },
    },
    {
      label: "Issue Date",
      key: "issueDate",
      renderDetail: (row) => {
        const date = row.issueDate;
        return new Date(date).toDateString();
      },
    },
    {
      label: "Return Date",
      key: "returnDate",
      renderDetail: (row) => {
        const date = row.returnDate;
        return date ? new Date(date).toDateString() : "-";
      },
    },
  ];
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5003/api/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await response.json();

      console.log(responseData);

      if (responseData.success) {
        setTransactions(responseData.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const returnBook = async (transactionId) => {
    const { error, response } = await makeApiRequest({
      endpoint: `/transactions/${transactionId}/return`,
      method: "PATCH",
    });

    if (error) {
      return;
    }

    if (response.success) {
      const updatedTransactions = transactions.map((transaction) => {
        if (transaction?._id === response?.data?._id) {
          return response.data;
        }

        return transaction;
      });

      setTransactions(updatedTransactions);
    }
  };

  const columns = getTransactionsColumn({ returnBook });

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <div className="p-4 px-8 pt-20 lg:pt-4 mb-8 shadow">
        <h4 className="text-3xl font-semibold">Transactions</h4>
      </div>
      <div className="px-8">
        <Card customClass="bg-white border border-gray-300">
          <h5 className="text-2xl w-full overflow-x-auto mb-4 font-bold">
            Transaction History
          </h5>
          <Table columns={columns} data={transactions} />
        </Card>
      </div>
    </>
  );
};

export default Transactions;
