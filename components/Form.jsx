import React, { useState } from "react";
import { HiMiniArrowSmallDown, HiMiniArrowSmallUp } from "react-icons/hi2";
import { Zoom } from "react-reveal";
function Form({
  handleSubmit,
  val,
  handleCancel,
  setTodo,
  openText,
  setOpenText,
}) {
  const [err, setErro] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (val.name.trim().length === 0) {
          setErro(true);
          return setTimeout(() => {
            setErro(false);
          }, 2000);
        }
        handleSubmit();
      }}
      className="formTask || select-none"
    >
      <div className="pt-3 || pb-9 || px-5 || text-[#555555]">
        <input
          className="inputStyle || outline-none"
          placeholder="What are you working on?"
          onChange={(e) => {
            setTodo((prev) => ({ ...prev, name: e.target.value }));
          }}
          type="text"
          value={val.name}
        />
        <Zoom appear left duration={500} opposite collapse when={err}>
          <p className="text-red-500 || text-sm">This Filed Is Required</p>
        </Zoom>
        <h2>Est Pomodoros</h2>
        <div className="flex || items-center || gap-3 || my-5 || flex-wrap">
          <input
            type="number"
            value={val.est}
            onChange={(e) => {
              setTodo((prev) => ({ ...prev, est: e.target.value }));
            }}
            className="numberInput outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="flex || items-center || gap-1">
            <div
              className="arrow"
              onClick={() => {
                setTodo((prev) => ({ ...prev, est: +prev.est + 1 }));
              }}
            >
              <HiMiniArrowSmallUp className="text-2xl" />
            </div>
            <div
              className="arrow"
              onClick={() => {
                if (val.est !== 1) {
                  setTodo((prev) => ({ ...prev, est: +prev.est - 1 }));
                }
              }}
            >
              <HiMiniArrowSmallDown className="text-2xl" />
            </div>
          </div>
        </div>
        <Zoom appear center duration={500} opposite collapse when={!openText}>
          <div onClick={() => setOpenText(true)} className="addNote">
            +Add Note
          </div>
        </Zoom>
        <Zoom appear center duration={500} opposite collapse when={openText}>
          <textarea
            className="bSPdnR || outline-none "
            placeholder="Some notes..."
            value={val.note}
            onChange={(e) => {
              setTodo((prev) => ({ ...prev, note: e.target.value }));
            }}
          ></textarea>
        </Zoom>
      </div>
      <div className="footerTask">
        <div className=""></div>
        <button
          type="button"
          className="taksBtn cancelBtn"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="taksBtn saveBtn">
          Save
        </button>
      </div>
    </form>
  );
}

export default Form;
