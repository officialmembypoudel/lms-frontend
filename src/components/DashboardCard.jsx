import React from "react";
import Card from "./common/Card";

const DashboardCard = ({ title, count, Icon }) => {
  return (
    <Card customClass={"!p-3 !px-4"}>
      <div className="flex items-center justify-between gap-32">
        <div>
          <p className="text-sm">{title}</p>
          <h3 className="text-3xl font-bold">{count}</h3>
        </div>
        {Icon}
      </div>
    </Card>
  );
};

export default DashboardCard;
