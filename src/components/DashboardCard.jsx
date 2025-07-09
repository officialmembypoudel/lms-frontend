import React from "react";
import Card from "./common/Card";

const DashboardCard = ({ title, count }) => {
  return (
    <Card>
      <div className="flex items-center justify-between gap-6">
        <h3 className="text-3xl font-bold">{title}</h3>
        <h3 className="text-4xl font-bold text-center">{count}</h3>
      </div>
    </Card>
  );
};

export default DashboardCard;
