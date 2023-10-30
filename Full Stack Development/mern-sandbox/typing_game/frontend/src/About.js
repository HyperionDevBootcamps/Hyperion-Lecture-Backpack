import React, { useEffect, useState } from "react";

function About() {
  const TIME_LIMIT = 60;
  let [timer, setTimer] = useState(TIME_LIMIT);
  let [words, setWords] = useState([]);
  let [selectedWord, setSelectedWord] = useState(0);
  let [answer, setAnswer] = useState("");
  let [score, setScore] = useState(0);

  useEffect(() => {
    setWords(["cat", "dog", "hulk"]);
    const interval = setInterval(() => {
      setTimer(timer > 0 ? timer - 1 : TIME_LIMIT);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  let keyDownHandler = (e) => {
    if (e.key === "Enter") {
      if (answer === words[selectedWord]) {
        setAnswer("");
        setSelectedWord(
          selectedWord + 1 >= words.length ? 0 : selectedWord + 1
        );
        setTimer(TIME_LIMIT);
        setScore(score + 10);
      }
    }
  };

  return (
    <>
      <div>
        <p>{words[selectedWord]}</p>
        <input
          type="text"
          value={answer}
          onKeyDown={keyDownHandler}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
      </div>
      <div>
        <p>{answer}</p>
        <p>Timer: {timer}</p>
        <p>Score: {score}</p>
      </div>
    </>
  );
}

export default About;
