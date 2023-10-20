import React, { useEffect, useRef, useState } from "react";
import { BsSoundwave } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { PiTimerThin } from "react-icons/pi";
import { toast } from "react-toastify";

function PopUp({ open, setOpen, referch, setReferch }) {
  const audioRef = useRef(null);

  const [data, setData] = useState({
    pom: 0,
    short: 0,
    long: 0,
    alarmSound: "alert",
    tickingSound: "",
  });
  useEffect(() => {
    const time = JSON.parse(localStorage.getItem("time")) ?? false;
    if (time) {
      setData({
        pom: +time.pom,
        short: +time.short,
        long: +time.long,
        alarmSound: time.alarmSound,
        tickingSound: time.tickingSound,
      });
    }
  }, [referch]);
  const handleAlarmSoundChange = (e) => {
    const selectedValue = e.target.value;
    if (e.target.value !== "") {
      audioRef.current.src = `./assents/sound/` + e.target.value + ".mp3";
      audioRef.current.play().catch((error) => {});
      setData((prevData) => ({ ...prevData, alarmSound: selectedValue }));
    } else {
      setData((prevData) => ({ ...prevData, alarmSound: "" }));
    }
  };

  const handleTickingSoundChange = (e) => {
    const selectedValue = e.target.value;
    audioRef.current.src = `./assents/sound/` + e.target.value + ".mp3";
    audioRef.current.play().catch((error) => {});
    setData((prevData) => ({ ...prevData, tickingSound: selectedValue }));
  };

  return (
    <div
      className={`kZXCiQ ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      } duration-300`}
    >
      <audio ref={audioRef} src="./assents/sound/alert.mp3" preload="auto" />
      <div onClick={() => setOpen(false)} className="fixed inset-0"></div>
      <div className="eGoAxl">
        <div className="flex || items-center || justify-between || py-4 || border-b border-gray-300 || px-4 || mb-5">
          <p>Setting</p>
          <IoClose
            onClick={() => setOpen(false)}
            className="text-2xl || cursor-pointer || select-none"
          />
        </div>
        <div className="px-4 || py-4 || border-b border-gray-300">
          <div className="flex || items-center || gap-2 || text-xl || text-gray-400">
            <PiTimerThin className="text-2xl" />
            <p>Timer</p>
          </div>
          <p className="my-3">Time (minutes)</p>
          <div className="flex || items-center || justify-between || flex-wrap || gap-3">
            <div className="">
              <p className="text-gray-400">Vida</p>
              <input
                type="number"
                value={data.pom}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, pom: e.target.value }));
                }}
                style={{
                  margin: "0",
                }}
                className="numberInput outline-none"
              />
            </div>
            <div className="">
              <p className="text-gray-400">Short Break</p>
              <input
                type="number"
                value={data.short}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, short: e.target.value }));
                }}
                style={{
                  margin: "0",
                }}
                className="numberInput outline-none"
              />
            </div>
            <div className="">
              <p className="text-gray-400">Long Break</p>
              <input
                type="number"
                value={data.long}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, long: e.target.value }));
                }}
                style={{
                  margin: "0",
                }}
                className="numberInput outline-none"
              />
            </div>
          </div>
        </div>
        <div className="px-4 || py-3">
          <div className="flex || items-center || mt-4 || gap-2 || text-xl || text-gray-400">
            <BsSoundwave className="text-2xl" />
            <p>SOUND</p>
          </div>
          <div className="mt-3 || py-2">
            <label htmlFor="alarmSoundSelect" className="text-gray-400 block ">
              Alarm Sound
            </label>
            <select
              id="alarmSoundSelect"
              onChange={handleAlarmSoundChange}
              value={data.alarmSound}
              className="selectInput outline-none"
            >
              <option value="alert">Alert</option>
              <option value="Bell">Bell</option>
              <option value="Emergency">Emergency</option>
              <option value="Popular">Popular</option>
              <option value="Greece">Greece</option>
            </select>
          </div>
          <div className="mt-3 || py-2">
            <label
              htmlFor="tickingSoundSelect"
              className="text-gray-400 block "
            >
              Ticking Sound
            </label>
            <select
              id="tickingSoundSelect"
              onChange={handleTickingSoundChange}
              value={data.tickingSound}
              className="selectInput outline-none"
            >
              <option value="">None</option>
              <option value="Ticking">Ticking</option>
              <option value="Tiktok">Tiktok</option>
              <option value="Electricity">Electricity</option>
            </select>
          </div>
        </div>
        <div className="flex || items-center || justify-between || py-4 || border-t border-gray-300 || px-4">
          <button
            onClick={() => {
              localStorage.setItem("time", JSON.stringify(data));
              setOpen(false);
              setReferch(referch + 1);
              toast.success("Saved changes");
            }}
            className="taksBtn saveBtn || ml-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
