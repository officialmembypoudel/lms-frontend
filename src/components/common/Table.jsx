import React from "react";

const Table = ({ data = [], columns = [] }) => {
  return (
    <div className="w-full max-h-[500px] overflow-y-auto">
      <table className="w-full">
        <thead className="sticky top-0  bg-white z-10">
          <tr className="hover:bg-gray-50">
            {columns.map((col, index) => {
              return (
                <th
                  key={index}
                  className=" py-4 p-2 text-left text-gray-500 text-sm font-medium"
                >
                  {col.label}
                </th>
              );
            })}
          </tr>
          <tr>
            <th colSpan={columns.length} className="h-[1px] bg-gray-300" />
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className={`${
                  data.length - 1 === rowIndex ? "" : "border-b border-gray-300"
                } hover:bg-gray-50`}
              >
                {columns.map((col, colIndex) => {
                  return (
                    <td
                      key={colIndex}
                      className={"py-4 p-2 text-sm font-medium" + col.class}
                    >
                      {col.renderDetail
                        ? col.renderDetail(row)
                        : row[col.key] || "-"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
