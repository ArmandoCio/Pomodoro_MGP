import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { isValidElement, useEffect } from "react";
import StartButton from "./StartButton";
import PauseButton from "./PauseButton";
import { useState } from "react";
import { useRef } from "react";
import { Box } from "@mui/system";

function Timer() {
  const workColor = "#9FC5FF";
  const breakColor = "#FFC59F";

  const [minutesLeft] = useState(25);
  const [breakminutesLeft] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(minutesLeft * 60);
  const [paused, setPaused] = useState(true);
  const [timerMode, setTimerMode] = useState("work");

  const pausedRef = useRef(paused);
  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(timerMode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function ModeSwitcher() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work" ? minutesLeft : breakminutesLeft) * 60;

      setTimerMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = minutesLeft * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (pausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return ModeSwitcher();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [minutesLeft, breakminutesLeft]);

  const totalTime =
    timerMode === "work" ? minutesLeft * 60 : breakminutesLeft * 60;
  const timerBarMath = (secondsLeft / totalTime) * 100;

  const displayMinutes = Math.floor(secondsLeft / 60);

  let displaySeconds = secondsLeft % 60;
  if (displaySeconds < 10) {
    displaySeconds = "0" + displaySeconds;
  }

  return (
    <Box>
       <div className="timerContainer">
      <div class="timer">
        <CircularProgressbar
          value={timerBarMath}
          text={displayMinutes + ":" + displaySeconds}
          styles={buildStyles({
            textColor: timerMode === "work" ? workColor : breakColor,
            pathColor: timerMode === "work" ? workColor : breakColor,
            tailColor: "rgba(255,255,255,.2)",
          })}
        />
        <div className="timerButtons" style={{ marginTop: "10px" }}>
          {paused ? (
            <StartButton
              onClick={() => {
                setPaused(false);
                pausedRef.current = false;
              }}
            />
          ) : (
            <PauseButton
              onClick={() => {
                setPaused(true);
                pausedRef.current = true;
              }}
            />
          )}
        </div>
      </div>
    </div>

    </Box>
   
  );
}

export default Timer;
