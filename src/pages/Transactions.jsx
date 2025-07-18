import React from "react";
import Table from "../components/common/Table";
import Card from "../components/common/Card";

const Transactions = () => {
  return (
    <div className="px-2">
      <h1 className="text-5xl mb-8">Transactions</h1>

      <Card customClass="bg-white border border-gray-300">
        <h4 className="text-2xl mb-4 font-bold">Transaction History</h4>
        <Table />
      </Card>
    </div>
  );
};

export default Transactions;
