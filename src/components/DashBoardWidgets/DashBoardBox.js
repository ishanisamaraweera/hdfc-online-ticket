import React from "react";
import "./statuscard.css";

export default function DashBoardBox({ icon, title, count }) {
  return (
    <div className="status-card">
      <div className="status-card__icon">
        <i className={icon}></i>
      </div>
      <div className="status-card__info">
        <p>{count}</p>
        <span>{title}</span>
      </div>
    </div>
  );
}
