import React, { useEffect, useRef, useState } from "react";
import Todo from "./Todo";
import Zoom from "react-reveal/Zoom";
import { TransitionGroup } from "react-transition-group";
import Form from "./Form";
import { FiMoreVertical } from "react-icons/fi";
import CountdownTimer from "./CountdownTimer";
import { IoIosNuclear } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
import { LiaSaveSolid } from "react-icons/lia";
import {
  AiFillPlusCircle,
  AiOutlineDelete,
  AiOutlineSetting,
} from "react-icons/ai";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PopUp from "./PopUp";

function TodoContainer() {
  const [step, setStep] = useState("two");
  const [task, setTask] = useState(false);
  const [todos, setTodos] = useState([]);
  const [per, setPer] = useState(0);
  const [openText, setOpenText] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [todo, setTodo] = useState({
    id: "",
    name: "",
    est: 1,
    note: "",
    done: 0,
  });
  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  function handleInput(event) {
    setTodo((preVal) => {
      return { ...preVal, name: event.target.value };
    });
  }

  function handleSubmit(event) {
    let newTodo = {
      name: todo.name,
      id: Math.floor(Math.random() * 1000),
      est: todo.est,
      note: todo.note,
      done: todo.done,
    };
    setTodos((preval) => [...preval, newTodo]);
    setOpenText(false);
    setTask(false);
    setTodo({
      id: "",
      name: "",
      est: 1,
      note: "",
      done: 0,
    });
  }

  function handleCancel() {
    setTodo({
      id: "",
      name: "",
      est: 1,
      note: "",
      done: 0,
    });
    setTask(false);
    setOpenText(false);
  }

  function handleDelete(itemID) {
    setTodos((preVal) => {
      return preVal.filter((i) => i.id !== itemID);
    });
    setOpenText(false);
  }

  function renderTodos() {
    return todos
      .slice()
      .sort((a, b) => (a.est === a.done ? 1 : -1))
      .map((t, index) => (
        <Todo
          key={t.id}
          id={t.id}
          todos={todos}
          setTodos={setTodos}
          val={t}
          handleDelete={handleDelete}
          index={index}
        />
      ));
  }
  const perantOFAccount = useRef();
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        perantOFAccount.current &&
        !perantOFAccount.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [perantOFAccount]);

  useEffect(() => {
    let intervalId;
    if (task) {
      if (document.querySelector(".mainAddTask")) {
        intervalId = setInterval(() => {
          document.querySelector(".mainAddTask").parentElement.style.height =
            document.querySelector(".mainAddTask").clientHeight + "px";
        }, 100);
      }
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [task]);
  const [setting, setSeting] = useState(false);
  const [referch, setReferch] = useState(0);
  return (
    <>
      <PopUp
        open={setting}
        setOpen={setSeting}
        referch={referch}
        setReferch={setReferch}
      ></PopUp>
      <div
        className={`
        bg-[#2b687f]
          App || transition-colors || duration-300  || ${
            !task ? "" : ""
          } ||  min-h-screen py-[40px] || overflow-hidden`}
      >
        <div className="w-fit || mx-auto || rounded-3xl || overflow-hidden || shadow-2xl">
          <div className="max-w-2xl || mx-auto">
            <img
              src="./assents/img/vida.png"
              className="w-full || object-cover"
              alt=""
            />
          </div>
          <div className="container || bg-white || pb-10">
            <div className="flex || relative || overflow-x-hidden || items-center || justify-between || pt-10 || pb-5 || mb-5 || border-b || border-[#0000001a] ">
              <div
                style={{ transform: `translateX(-${100 - per}%)` }}
                className="h-[2px] || transition-X || absolute || w-full || bg-black || bottom-0"
              ></div>
              <div className="w-full">
                <ul className="flex || items-center || justify-between || gap-3">
                  <a
                    href="http://Vidaworkstation.com"
                    className={`flex || items-center || gap-1 bgMain || bg-[#2b687f]/80 || select-none || cursor-pointer`}
                  >
                    <p>
                      <AiOutlineSetting />
                    </p>
                    <p>Home</p>
                  </a>
                  <li
                    onClick={() => setSeting(true)}
                    className={`flex || items-center || gap-1 bgMain || bg-[#2b687f]/80 || select-none || cursor-pointer`}
                  >
                    <p>
                      <AiOutlineSetting />
                    </p>
                    <p>Setting</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="max-w-full md:max-w-[424px] mx-auto">
              <div className={`bgMain  bg-[#2b687f]/80`}>
                <CountdownTimer
                  referch={referch}
                  setReferch={setReferch}
                  step={step}
                  setStep={setStep}
                  setPer={setPer}
                />
              </div>
              <div className="mx-auto">
                <h2 className="text-center || text-lg || mt-5">
                  Time to focus!
                </h2>
                <div className="flex || items-center || justify-between || text-xl || pb-3 || border-b-2 border-gray-200">
                  <span>Tasks</span>
                  <div
                    ref={perantOFAccount}
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                    className="bg-black/30 || text-white || relative duration-300 || hover:bg-black/40 || rounded-md || cursor-pointer || w-[35px] || h-[35px] || flex || justify-center || items-center"
                  >
                    <FiMoreVertical />
                    <Zoom
                      appear
                      center
                      duration={300}
                      opposite
                      collapse
                      when={showMenu}
                    >
                      <div className="absolute || text-[#555] || text-sm || min-w-[220px] || bg-white || rounded-md || top-[calc(100%+20px)] || right-0 || shadow-lg || z-10">
                        <button
                          onClick={() => {
                            const newData = todos.filter(
                              (ele) => ele.est !== ele.done
                            );
                            setTodos(newData);
                          }}
                          className="flex || hover:bg-gray-200 || pr-2 || pl-3 || py-3 || rounded-md || duration-300 || w-full || items-center || gap-1 || flex-wrap"
                        >
                          <AiOutlineDelete />
                          <span>Clear finished tasks</span>
                        </button>
                        <button
                          onClick={() => {
                            const newData = todos.map((item) => ({
                              ...item,
                              done: 0,
                            }));

                            setTodos(newData);
                          }}
                          className="flex || hover:bg-gray-200 || pr-2 || pl-3 || py-3 || rounded-md || duration-300 || w-full || items-center || gap-1 || flex-wrap"
                        >
                          <BsCheckLg />
                          <span>Clear act pomodoros</span>
                        </button>
                        <button
                          onClick={() => {
                            localStorage.setItem(
                              "todos",
                              JSON.stringify(todos)
                            );
                          }}
                          className="flex || hover:bg-gray-200 || pr-2 || pl-3 || py-3 || rounded-md || duration-300 || w-full || items-center || gap-1 || flex-wrap"
                        >
                          <LiaSaveSolid />
                          <span>Save takes</span>
                        </button>
                        <button
                          onClick={() => {
                            localStorage.removeItem("todos");
                          }}
                          className="flex || hover:bg-gray-200 || pr-2 || pl-3 || py-3 || rounded-md || duration-300 || w-full || items-center || gap-1 || flex-wrap"
                        >
                          <IoIosNuclear />
                          <span>Clear saved takes</span>
                        </button>
                        <button
                          onClick={() => {
                            setTodos([]);
                          }}
                          className="flex || border-t || border-gray-200 || hover:bg-gray-200 || pr-2 || pl-3 || py-3 || rounded-md || duration-300 || w-full || items-center || gap-1 || flex-wrap"
                        >
                          <AiOutlineDelete />
                          <span>Clear all takes</span>
                        </button>
                      </div>
                    </Zoom>
                  </div>
                </div>
                <TransitionGroup>
                  <DndProvider backend={HTML5Backend}>
                    <div className="my-3 || mt-9 || flex || flex-col || gap-3">
                      {renderTodos()}
                    </div>
                  </DndProvider>
                </TransitionGroup>
                <Zoom
                  appear
                  center
                  duration={300}
                  opposite
                  collapse
                  when={!task}
                >
                  <button
                    onClick={() => {
                      setTask(true);
                    }}
                    className="taskbtb  || py-5 || gap-1"
                  >
                    <span>
                      <AiFillPlusCircle className="text-2xl" />
                    </span>
                    <span> Add Task</span>
                  </button>
                </Zoom>
                <Zoom
                  appear
                  center
                  duration={500}
                  opposite
                  collapse
                  when={task}
                >
                  <div className="mainAddTask">
                    <Form
                      setTodo={setTodo}
                      val={todo}
                      handleSubmit={handleSubmit}
                      handleInput={handleInput}
                      handleCancel={handleCancel}
                      openText={openText}
                      setOpenText={setOpenText}
                    />
                  </div>
                </Zoom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoContainer;
