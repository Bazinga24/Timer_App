import React from "react";
import "./TimerList.css";

export default function TimerList({
  timers,
  startTimer,
  pauseTimer,
  resetTimer,
}) {
  return (
    <div className="timer-list">
      {timers.map((timer) => {
        const progress = ((1 - timer.remaining / timer.duration) * 100).toFixed(
          1
        );

        return (
          <div key={timer.id} className="timer-item">
            <div className="timer-details">
              <div>
                <strong>{timer.name}</strong> ({timer.category})
              </div>
              <div>Time left: {timer.remaining}s</div>
              <div>Status: {timer.status}</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="timer-controls">
              <button onClick={() => startTimer(timer.id)}>Start</button>
              <button onClick={() => pauseTimer(timer.id)}>Pause</button>
              <button onClick={() => resetTimer(timer.id)}>Reset</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
