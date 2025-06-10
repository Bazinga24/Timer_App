import React from "react";

export default function TimerItem({
  timer,
  startTimer,
  pauseTimer,
  resetTimer,
}) {
  const progress = (timer.remaining / timer.duration) * 100;

  return (
    <div style={{ margin: "5px", padding: "5px", border: "1px solid #ddd" }}>
      <strong>{timer.name}</strong> ({timer.status})
      <div>Remaining: {timer.remaining}s</div>
      <div
        style={{
          background: "#eee",
          height: "10px",
          width: "100%",
          marginTop: "3px",
        }}
      >
        <div
          style={{
            background: "green",
            height: "10px",
            width: `${progress}%`,
          }}
        ></div>
      </div>
      <button onClick={() => startTimer(timer.id)}>Start</button>
      <button onClick={() => pauseTimer(timer.id)}>Pause</button>
      <button onClick={() => resetTimer(timer.id)}>Reset</button>
    </div>
  );
}
