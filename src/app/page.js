"use client";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [logLines, setLogLines] = useState([]);
  const logContainerRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      setLogLines((prevLines) => [...prevLines, event.data]);
      // Scroll to the bottom of the log container
      if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Log Viewer</h1>
      <div className="log-container" ref={logContainerRef}>
        {logLines.map((line, index) => {
          return (
            <>
              <div key={index}>{line}</div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
