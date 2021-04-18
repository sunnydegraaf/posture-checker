import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import useInterval from "@use-it/interval";
import Check from "./components/Check";

import "./css/App.css";

let classifier;

function App() {
  const videoRef = useRef();
  const [start, setStart] = useState(false);
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    classifier = ml5.imageClassifier("./model/model.json", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setLoaded(true);
        });
    });
  }, []);

  useInterval(() => {
    if (classifier && start) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        setResult(results);
      });
    }
  }, 500);

  const toggle = () => {
    setStart(!start);
    setResult([]);
  };

  return (
    <div className="container">
      <div className="capture">
        <video
          ref={videoRef}
          style={{ transform: "scale(-1, 1)" }}
          width="100%"
          height="auto"
        />
        {loaded && (
          <button onClick={() => toggle()}>{start ? "Stop" : "Begin"}</button>
        )}
      </div>
      <div className="result">
        {result.length > 0 && <Check data={result[0]} />}
      </div>
    </div>
  );
}

export default App;
