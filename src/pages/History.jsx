import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getData, saveData } from "../utils/storage";
import "./History.css";

export default function History() {
  const [history, setHistory] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const data = getData("timersData") || { timers: [], history: [] };
    setHistory(data.history || []);
  }, [location]);

  const clearHistory = () => {
    // Clear history in localStorage
    const data = getData("timersData") || { timers: [], history: [] };
    saveData("timersData", { timers: data.timers, history: [] });
    setHistory([]);
  };

  return (
    <div className="container history-container">
      <h2>Completed Timers</h2>
      {history.length === 0 ? (
        <p>No completed timers yet.</p>
      ) : (
        <>
          <button onClick={clearHistory} className="clear-button">
            Clear History
          </button>
          {history.map((item, index) => (
            <div key={index} className="completed-timer">
              <strong>{item.name}</strong>
              <div>
                Completed at: {new Date(item.completedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
