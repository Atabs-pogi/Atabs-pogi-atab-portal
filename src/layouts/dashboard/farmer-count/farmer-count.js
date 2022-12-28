/* eslint-disable no-unused-vars */
import * as React from "react";
import farmerService from "services/farmer-service";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

export default function TotalFarmerCount() {
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const handleSearch = () => {
    setLoading(true);
    farmerService
      .getFarmerCount()
      .then((res) => {
        setCount(res?.data || 0);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <ComplexStatisticsCard
      icon="leaderboard"
      title="Total Farmers"
      count={count}
      percentage={{
        color: "success",
      }}
    />
  );
}
