import React, { useState, useEffect, useRef } from "react";
import check1 from "../assets/img/check-1.ico";
import check2 from "../assets/img/check-2.ico";
import check3 from "../assets/img/check-3.ico";
import { Zoom } from "react-reveal";

const CountdownTimer = ({ setPer, step, setStep, referch }) => {
  const [initialTime, setInitialTime] = useState(1);
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setloading] = useState(false);
  const audioRef = useRef(null);
  const tickingSoundRef = useRef(null);
  const [timeVal, setTimeVal] = useState(false);
  const [playTickingSound, setPlayTickingSound] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    const time = JSON.parse(localStorage.getItem("time")) ?? false;
    setTimeVal(time);
    if (step === "one") {
      if (time?.pom && time?.pom !== "0") {
        setTime(time?.pom * 60);
        setInitialTime(time?.pom * 60);
      } else {
        setTime(25 * 60);
        setInitialTime(25 * 60);
      }

      setFavicon(check1);
    } else if (step === "two") {
      if (time?.short && time?.short !== "0") {
        setTime(time?.short * 60);
        setInitialTime(time?.short * 60);
      } else {
        setTime(5 * 60);
        setInitialTime(5 * 60);
      }
      setFavicon(check2);
    } else if (step === "thi") {
      if (time?.long && time?.long !== "0") {
        setTime(time?.long * 60);
        setInitialTime(time?.long * 60);
      } else {
        setTime(15 * 60);
        setInitialTime(15 * 60);
      }

      setFavicon(check3);
    }
  }, [step, referch]);

  const setFavicon = (faviconUrl) => {
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = faviconUrl;
    document.getElementsByTagName("head")[0].appendChild(link);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        if (playTickingSound) {
          tickingSoundRef.current.loop = true;
          tickingSoundRef.current.play().catch((error) => {});
        }
      }, 1000);
    } else {
      setPlayTickingSound(false);
    }

    if (time === 0) {
      if (audioRef.current) {
        if (audioRef.current) {
          audioRef.current.play().catch((error) => {});
        }
      }
      // Show an alert when the timer reaches zero
      setTime(initialTime);
      setIsRunning(false);
      setTimeout(() => {
        window.alert("Time is up!");
      }, 1000);
      setShowBtn(true);
    }

    return () => clearInterval(intervalId);
  }, [initialTime, isRunning, time, audioRef, playTickingSound, step, setStep]);

  useEffect(() => {
    if (!playTickingSound) {
      tickingSoundRef.current.pause();
      tickingSoundRef.current.currentTime = 0;
    }
  }, [playTickingSound]);

  const startTimer = () => {
    setIsRunning(true);
    setPlayTickingSound(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setPlayTickingSound(false);
    if (tickingSoundRef.current) {
      tickingSoundRef.current.pause();
      tickingSoundRef.current.currentTime = 0;
    }
  };

  const resetTimer = () => {
    setTime(initialTime);
    setIsRunning(false);
    setPlayTickingSound(false);
    if (tickingSoundRef.current) {
      tickingSoundRef.current.pause();
      tickingSoundRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    setPer(((initialTime - time) / initialTime) * 100);
  }, [initialTime, setPer, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    document.title = `${formattedTime} Time to focus!`;
  }, [formattedTime, time]);

  useEffect(() => {
    setPer(0);
  }, [setPer, step]);

  useEffect(() => {
    const timeOur = setTimeout(() => {
      setloading(true);
    }, 2000);
    return () => {
      clearInterval(timeOur);
    };
  }, []);
  const changeBtn = (val) => {
    setShowBtn(false);
   
    if (val === "two") {
      return setStep("two");
    }
    if (val === "thi") {
      return setStep("thi");
    }
  };
  return (
    <div className=" md:min-w-[400px]">
      <div className="flex selectBtn items-center justify-center">
        <button
          onClick={() => {
            setShowBtn(false);
            setStep("one");
          }}
          className={`${step === "one" ? "btnTime" : ""}`}
        >
          Focus
        </button>
        <button
          onClick={() => {
            setShowBtn(false);
            setStep("two");
          }}
          className={`${step === "two" ? "btnTime" : ""}`}
        >
          Short Break
        </button>
        <button
          onClick={() => {
            setShowBtn(false);
            setStep("thi");
          }}
          className={`${step === "thi" ? "btnTime" : ""}`}
        >
          Long Break
        </button>
      </div>
      <div
        className={`${
          showBtn ? "text-[30px] md:text-[60px]" : "text-[60px] md:text-[120px]"
        }   text-center`}
      >
        {formattedTime}
      </div>
      <div className="pb-5">
        {!isRunning ? (
          <div className="text-center || flex || flex-col || items-center">
            <Zoom appear center duration={300} opposite collapse when={showBtn}>
              <button
                className="btn btnNew flex  items-center || justify-center"
                onClick={() => {
                  changeBtn("two");
                }}
                disabled={isRunning}
              >
                Short Break
              </button>
            </Zoom>
            <Zoom appear center duration={300} opposite collapse when={showBtn}>
              <button
                className="btn btnNew flex  items-center || justify-center"
                onClick={() => {
                  changeBtn("thi");
                }}
                disabled={isRunning}
              >
                Long Break
              </button>
            </Zoom>
            <button className="btn" onClick={startTimer} disabled={isRunning}>
              Start
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <button
                className="btn"
                onClick={pauseTimer}
                disabled={!isRunning}
              >
                Pause
              </button>
            </div>
          </>
        )}
        <Zoom
          appear
          center
          duration={300}
          opposite
          collapse
          when={initialTime !== time && !isRunning && loading}
        >
          <div className="text-center">
            <button className="btn" onClick={resetTimer} disabled={isRunning}>
              Reset
            </button>
          </div>
        </Zoom>
      </div>

      {/* <div className="text-center">
            <button className="btn" onClick={resetTimer} disabled={isRunning}>
              Reset
            </button>
          </div> */}
      <audio
        ref={audioRef}
        src={`${
          timeVal
            ? timeVal.alarmSound === ""
              ? "./assents/sound/alert.mp3"
              : "./assents/sound/" + timeVal.alarmSound + ".mp3"
            : "./assents/sound/alert.mp3"
        }`}
        preload="auto"
      />
      <audio
        ref={tickingSoundRef}
        src={`${
          timeVal
            ? timeVal.tickingSound === ""
              ? ""
              : "./assents/sound/" + timeVal.tickingSound + ".mp3"
            : ""
        }`}
        preload="auto"
      />
    </div>
  );
};

export default CountdownTimer;
