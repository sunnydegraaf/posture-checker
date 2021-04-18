import React from "react";

const Check = (props) => {
  const data = props.data;
  const label = data.label;
  const confidence = parseFloat(data.confidence.toFixed(2));
  console.log(label, confidence);

  function getFaviconEl() {
    return document.getElementById("favicon");
  }

  function getTitleEl() {
    return document.getElementById("title");
  }

  const handleGood = () => {
    const favicon = getFaviconEl();
    const title = getTitleEl();
    title.innerHTML = "Your posture is good";
    favicon.href = "/happy.png";
  };

  const handleBad = () => {
    const favicon = getFaviconEl();
    const title = getTitleEl();
    title.innerHTML = "Your posture is bad";
    favicon.href = "/sad.png";
  };

  if (label === "Bad posture") {
    handleBad();
  } else {
    handleGood();
  }

  return (
    <div>
      <h1>You have:</h1>
      <p>{label}</p>
    </div>
  );
};
export default Check;
