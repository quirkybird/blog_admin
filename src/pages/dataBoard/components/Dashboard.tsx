import type React from "react";
import styled from "styled-components";
import OverviewMetrics from "./OverviewMetrics";
import DataCharts from "./DataCharts";
import DataTable from "./DataTable";
import RealTimeMonitor from "./RealTimeMonitor";

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #1a365d;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid #4a90e2;
    padding-bottom: 10px;
  }
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <OverviewMetrics />
      <DataCharts />
      <DataTable />
      <RealTimeMonitor />
    </DashboardContainer>
  );
};

export default Dashboard;
