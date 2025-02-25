import type React from "react";
import { useState } from "react";
import styled from "styled-components";

const DataFilterContainer = styled.div`
  margin-bottom: 30px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 22px;
    margin-bottom: 20px;
    color: #2c3e50;
    border-left: 4px solid #f39c12;
    padding-left: 10px;
  }

  .filter-controls {
    display: flex;
    gap: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      font-size: 14px;
      font-weight: bold;
      color: #34495e;
    }

    select {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #bdc3c7;
      font-size: 14px;
      background-color: white;
      color: #2c3e50;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #3498db;
      }
    }
  }
`;
const DataTableContainer = styled.div`
  margin-bottom: 30px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 22px;
    margin-bottom: 20px;
    color: #2c3e50;
    border-left: 4px solid #e74c3c;
    padding-left: 10px;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }

    th {
      background-color: #3498db;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 14px;
    }

    tr:nth-child(even) {
      background-color: #f8f9fa;
    }

    tr:hover {
      background-color: #e8f4fd;
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
`;

const DataTable: React.FC = () => {
  const [dateRange, setDateRange] = useState("last7days");
  const [category, setCategory] = useState("all");
  const data = [
    {
      id: 1,
      title: "First Blog Post",
      views: 1234,
      comments: 56,
      date: "2023-06-01",
    },
    {
      id: 2,
      title: "Second Blog Post",
      views: 987,
      comments: 43,
      date: "2023-06-05",
    },
    {
      id: 3,
      title: "Third Blog Post",
      views: 1543,
      comments: 78,
      date: "2023-06-10",
    },
    {
      id: 4,
      title: "Fourth Blog Post",
      views: 765,
      comments: 32,
      date: "2023-06-15",
    },
  ];

  return (
    <DataTableContainer>
      <h2>数据详情</h2>
      <DataFilterContainer>
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="dateRange">统计时间:</label>
            <select
              id="dateRange"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="last7days">近7天</option>
              <option value="last30days">近30天</option>
              <option value="lastMonth">近一个月</option>
              <option value="lastYear">近一年</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="category">文章类型:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">所有类型</option>
              <option value="technology">技术文章</option>
              <option value="lifestyle">生活文章</option>
            </select>
          </div>
        </div>
      </DataFilterContainer>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>浏览量</th>
            <th>评论</th>
            <th>日期</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.views}</td>
              <td>{item.comments}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DataTableContainer>
  );
};

export default DataTable;
