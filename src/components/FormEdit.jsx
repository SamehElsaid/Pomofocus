import React, { useEffect, useRef, useState } from "react";
import { HiMiniArrowSmallDown, HiMiniArrowSmallUp } from "react-icons/hi2";
import { Zoom } from "react-reveal";

function FormEdit({ todos, val, setTodos, setEdit, openEdit, handleDelete }) {
  const [err, setErro] = useState(false);
  const [data, setData] = useState(false);
  const [openText, setOpenText] = useState(false);
  const divElem = useRef();

  useEffect(() => {
    setData(val);
  }, [val, openEdit]);
  useEffect(() => {
    let intervalId;
    if (openEdit === data?.id) {
      if (divElem.current) {
        intervalId = setInterval(() => {
          divElem.current.parentElement.parentElement.style.height =
            divElem.current.clientHeight + "px";
        }, 100);
      }
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [data, openEdit, divElem]);
  const setHight = () => {
    divElem.current.parentElement.parentElement.style.height = 0 + "px";
  };
  return (
    <div ref={divElem}>
      {data && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (data.name.trim().length === 0) {
              setErro(true);
              return setTimeout(() => {
                setErro(false);
              }, 2000);
            }
            const newData = [...todos];
            const FindData = todos.find((ele) => ele.id === data.id);
            FindData.name = data.name;
            FindData.est = data.est;
            FindData.note = data.note;
            FindData.done = data.done;
            setTodos(newData);
            setEdit(false);
            setData(false);
            setTimeout(() => {
              setHight();
            }, 0);
            // handleSubmit();
          }}
          className="formTask  || select-none"
        >
          <div className="pt-3 || pb-9 || px-5 || text-[#555555]">
            <input
              className="inputStyle || outline-none"
              placeholder="What are you working on?"
              onChange={(e) => {
                setData((prev) => ({ ...prev, name: e.target.value }));
              }}
              value={data.name}
              type="text"
            />
            <Zoom appear left duration={500} opposite collapse when={err}>
              <p className="text-red-500 || text-sm">This Filed Is Required</p>
            </Zoom>
            <h2>Est Pomodoros</h2>
            <div className="flex || items-center || gap-3 || my-5 || flex-wrap">
              <input
                type="number"
                value={data.done}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, done: e.target.value }));
                }}
                style={{
                  margin: "0",
                }}
                className="numberInput outline-none"
              />
              /
              <input
                type="number"
                value={data.est}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, est: e.target.value }));
                }}
                className="numberInput outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="flex || items-center || gap-1">
                <div
                  className="arrow"
                  onClick={() => {
                    setData((prev) => ({ ...prev, est: +prev.est + 1 }));
                  }}
                >
                  <HiMiniArrowSmallUp className="text-2xl" />
                </div>
                <div
                  className="arrow"
                  onClick={() => {
                    if (data.est !== 1) {
                      setData((prev) => ({ ...prev, est: +prev.est - 1 }));
                    }
                  }}
                >
                  <HiMiniArrowSmallDown className="text-2xl" />
                </div>
              </div>
            </div>

            <Zoom
              appear
              center
              duration={500}
              opposite
              collapse
              when={!openText}
            >
              <div
                onClick={(e) => {
                  setOpenText(true);
                }}
                className="addNote"
              >
                +Add Note
              </div>
            </Zoom>
            <Zoom
              appear
              center
              duration={500}
              opposite
              collapse
              when={openText}
            >
              <textarea
                className="bSPdnR || outline-none "
                placeholder="Some notes..."
                value={data.note}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, note: e.target.value }));
                }}
              ></textarea>
            </Zoom>
          </div>
          <div className="footerTask">
            <div className="mr-auto">
              <button
                type="button"
                className="taksBtn cancelBtn"
                onClick={() => {
                  setEdit(false);
                  setData(false);
                  handleDelete(val.id);
                }}
              >
                Delete
              </button>
            </div>
            <button
              type="button"
              className="taksBtn cancelBtn"
              onClick={() => {
                setEdit(false);
                setData(false);
                setTimeout(() => {
                  setHight();
                }, 0);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="taksBtn saveBtn">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FormEdit;
