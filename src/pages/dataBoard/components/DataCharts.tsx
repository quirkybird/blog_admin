import type React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DataChartsContainer = styled.div`
  margin-bottom: 30px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 22px;
    margin-bottom: 20px;
    color: #2c3e50;
    border-left: 4px solid #3498db;
    padding-left: 10px;
  }

  .charts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
  }

  .chart {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    h3 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #34495e;
      text-align: center;
    }
  }
`;

const data = [
  { name: "Jan", pageViews: 4000, activeUsers: 2400 },
  { name: "Feb", pageViews: 3000, activeUsers: 1398 },
  { name: "Mar", pageViews: 2000, activeUsers: 9800 },
  { name: "Apr", pageViews: 2780, activeUsers: 3908 },
  { name: "May", pageViews: 1890, activeUsers: 4800 },
  { name: "Jun", pageViews: 2390, activeUsers: 3800 },
];

const DataCharts: React.FC = () => {
  return (
    <DataChartsContainer>
      <h2>数据趋势</h2>
      <div className="charts-container">
        <div className="chart">
          <h3>页面浏览量趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pageViews"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart">
          <h3>用户活跃比较</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="activeUsers" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DataChartsContainer>
  );
};

export default DataCharts;
