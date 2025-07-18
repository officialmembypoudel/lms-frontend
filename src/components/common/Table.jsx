import React from "react";

const Table = () => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-300 hover:bg-gray-50">
          <th className="py-4 p-2 text-left text-gray-500 text-sm font-medium">
            Phone
          </th>
          <th className="py-4 p-2 text-left text-gray-500 text-sm font-medium">
            Name
          </th>
          <th className="py-4 p-2 text-left text-gray-500 text-sm font-medium">
            City
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-300  hover:bg-gray-50">
          <td className="py-4 p-2 text-sm font-medium">9876543455</td>
          <td className="py-4 p-2 text-sm">Ram</td>
          <td className="py-4 p-2 text-sm">Janakpur</td>
        </tr>
        <tr className="border-b border-gray-300  hover:bg-gray-50">
          <td className="py-4 p-2 text-sm font-medium">9876543458</td>
          <td className="py-4 p-2 text-sm">Mars</td>
          <td className="py-4 p-2 text-sm">Sydney</td>
        </tr>
        <tr className=" hover:bg-gray-50">
          <td className="py-4 p-2 text-sm font-medium">9876543459</td>
          <td className="py-4 p-2 text-sm">Pluto</td>
          <td className="py-4 p-2 text-sm">New York</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
