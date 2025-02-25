"use client";

import type React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const RealTimeMonitorContainer = styled.div`
  margin-bottom: 30px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 22px;
    margin-bottom: 20px;
    color: #2c3e50;
    border-left: 4px solid #9b59b6;
    padding-left: 10px;
  }

  .monitor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .monitor-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      font-size: 16px;
      margin-bottom: 10px;
      color: #34495e;
    }

    .monitor-value {
      font-size: 24px;
      font-weight: bold;
      color: #9b59b6;
    }
  }
`;

const RealTimeMonitor: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [lastPageView, setLastPageView] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      setActiveUsers(Math.floor(Math.random() * 100) + 1);
      setLastPageView(`/blog/post-${Math.floor(Math.random() * 20) + 1}`);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <RealTimeMonitorContainer>
      <h2>实时数据监控</h2>
      <div className="monitor-grid">
        <div className="monitor-card">
          <h3>活跃用户</h3>
          <p className="monitor-value">{activeUsers}</p>
        </div>
        <div className="monitor-card">
          <h3>最后浏览地址</h3>
          <p className="monitor-value">{lastPageView}</p>
        </div>
      </div>
    </RealTimeMonitorContainer>
  );
};

export default RealTimeMonitor;
