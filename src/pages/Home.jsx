import React, { useState, useEffect } from "react";
import { saveData, getData } from "../utils/storage";
import TimerList from "../components/TimerList";
import "./Home.css";

export default function Home() {
  const [timers, setTimers] = useState([]);
  const [completedTimer, setCompletedTimer] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const data = getData("timersData") || { timers: [], history: [] };
    setTimers(data.timers || []);
  }, []);

  const addTimer = () => {
    if (name && duration && category) {
      const newTimer = {
        id: Date.now().toString(),
        name,
        duration: parseInt(duration),
        remaining: parseInt(duration),
        category,
        status: "Paused",
      };
      const data = getData("timersData");
      const updatedTimers = [...data.timers, newTimer];
      saveData("timersData", { timers: updatedTimers, history: data.history });
      setTimers(updatedTimers);
      setName("");
      setDuration("");
      setCategory("");
    }
  };

  const startTimer = (id) => {
    const updatedTimers = timers.map((timer) => {
      if (timer.id === id && timer.status !== "Running") {
        timer.status = "Running";
        timer.interval = setInterval(() => decrementTimers(), 1000);
      }
      return timer;
    });
    updateTimersInStorage(updatedTimers);
  };

  const pauseTimer = (id) => {
    const updatedTimers = timers.map((timer) => {
      if (timer.id === id && timer.status === "Running") {
        clearInterval(timer.interval);
        timer.status = "Paused";
      }
      return timer;
    });
    updateTimersInStorage(updatedTimers);
  };

  const resetTimer = (id) => {
    const updatedTimers = timers.map((timer) => {
      if (timer.id === id) {
        clearInterval(timer.interval);
        timer.remaining = timer.duration;
        timer.status = "Paused";
      }
      return timer;
    });
    updateTimersInStorage(updatedTimers);
  };

  const decrementTimers = () => {
    const data = getData("timersData");
    let activeTimers = [];
    let updatedHistory = [...data.history];

    timers.forEach((timer) => {
      if (timer.status === "Running") {
        if (timer.remaining > 0) {
          timer.remaining -= 1;
          activeTimers.push(timer);
        } else {
          clearInterval(timer.interval);
          updatedHistory.push({
            name: timer.name,
            completedAt: new Date(),
          });
          setCompletedTimer(timer.name);
        }
      } else {
        activeTimers.push(timer);
      }
    });

    saveData("timersData", { timers: activeTimers, history: updatedHistory });
    setTimers(activeTimers);
  };

  const updateTimersInStorage = (updatedTimers) => {
    const data = getData("timersData");
    saveData("timersData", { timers: updatedTimers, history: data.history });
    setTimers(updatedTimers);
  };

  return (
    <div className="container">
      <h2 className="home-header">Create New Timer</h2>
      <div className="input-group">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (sec)"
          type="number"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
      </div>
      <button onClick={addTimer}>Add Timer</button>

      <div className="active-timers">
        <h2>Active Timers</h2>
        <TimerList
          timers={timers}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          resetTimer={resetTimer}
        />
      </div>

      {completedTimer && (
        <div className="alert">🎉 Timer "{completedTimer}" completed!</div>
      )}
    </div>
  );
}
