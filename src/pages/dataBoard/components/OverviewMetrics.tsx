import type React from "react";
import styled from "styled-components";

const OverviewMetricsContainer = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .metric-card {
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .metric-value {
      font-size: 24px;
      font-weight: bold;
    }
  }
`;

const OverviewMetrics: React.FC = () => {
  return (
    <OverviewMetricsContainer>
      <h2>关键指标</h2>
      <div className="metrics-grid">
        <div
          className="metric-card"
          style={{
            backgroundColor: "#e6f7ff",
            borderLeft: "4px solid #1890ff",
          }}
        >
          <h3 style={{ color: "#0050b3" }}>页面浏览量</h3>
          <p className="metric-value" style={{ color: "#1890ff" }}>
            10,234
          </p>
        </div>
        <div
          className="metric-card"
          style={{
            backgroundColor: "#f6ffed",
            borderLeft: "4px solid #52c41a",
          }}
        >
          <h3 style={{ color: "#237804" }}>活跃用户</h3>
          <p className="metric-value" style={{ color: "#52c41a" }}>
            1,234
          </p>
        </div>
        <div
          className="metric-card"
          style={{
            backgroundColor: "#fff7e6",
            borderLeft: "4px solid #faad14",
          }}
        >
          <h3 style={{ color: "#ad6800" }}>评论</h3>
          <p className="metric-value" style={{ color: "#faad14" }}>
            567
          </p>
        </div>
        <div
          className="metric-card"
          style={{
            backgroundColor: "#fff1f0",
            borderLeft: "4px solid #f5222d",
          }}
        >
          <h3 style={{ color: "#a8071a" }}>新的订阅</h3>
          <p className="metric-value" style={{ color: "#f5222d" }}>
            89
          </p>
        </div>
      </div>
    </OverviewMetricsContainer>
  );
};

export default OverviewMetrics;
