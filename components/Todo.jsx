import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { Zoom } from "react-reveal";
import FormEdit from "./FormEdit";

function Todo({ val, handleDelete, id, todos, setTodos, index }) {
  const [openEdit, setEdit] = useState(false);
  const [{ isDragging }, ref] = useDrag({
    type: "TODO",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TODO",
    hover: (draggedItem) => {
      if (!draggedItem) {
        return;
      }

      const { id: draggedId, index: draggedIndex } = draggedItem;
      if (draggedId === id) {
        return;
      }

      const sourceIndex = draggedIndex;
      const targetIndex = index;

      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        const [movedTodo] = updatedTodos.splice(sourceIndex, 1);
        updatedTodos.splice(targetIndex, 0, movedTodo);
        return updatedTodos;
      });

      draggedItem.index = index;
    },
  });
  useEffect(() => {
    let intervalId;
    if (!openEdit) {
      if (document.querySelector(`.select${id}`)) {
        intervalId = setInterval(() => {
          document.querySelector(`.select${id}`).parentElement.style.height =
            document.querySelector(`.select${id}`).clientHeight + "px";
        }, 100);
      }
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [id, openEdit]);
  return (
    <>
      <Zoom appear center duration={500} opposite collapse when={!openEdit}>
        <div
          ref={(node) => ref(drop(node))}
          style={{ opacity: isDragging ? 0.5 : 1 }}
          className={`bg-white || border-gray-300 || border || py-4 || px-4 || text-[#555] || rounded-md || border-l-4  || hover:border-[black] || duration-300 || cursor-pointer  select${id}`}
        >
          <div className="flex || justify-between ">
            <div className="flex || items-center || gap-1">
              <AiFillCheckCircle
                onClick={() => {
                  const newData = [...todos];
                  const FindData = todos.find((ele) => ele.id === id);
                  FindData.done = FindData.est;
                  setTodos(newData);
                }}
                className={`text-2xl || select-none || hover:opacity-50 || duration-300 ||  ${
                  val.done === val.est ? "text-red-500" : "text-[#dfdfdf]"
                }`}
              />
              <h3 className={` ${val.done === val.est ? "line-through" : ""} `}>
                {val.name}
              </h3>
            </div>
            <div className="flex || items-center || gap-4">
              <div className="">
                {val.done} / {val.est}
              </div>
              <div
                onClick={() => {
                  setEdit(val.id);
                }}
                className="flex || items-center || justify-center || w-[25px] || h-[25px] || rounded-md || duration-300 || border-2 || hover:bg-[#dfdfdf] || border-[#dfdfdf]"
              >
                <FiMoreVertical className="text-xl" />
              </div>
            </div>
          </div>
          {val.note.trim().length !== 0 && (
            <p className="noteTask">{val.note}</p>
          )}
        </div>
      </Zoom>
      <Zoom appear center duration={500} opposite collapse when={openEdit}>
        <FormEdit
          handleDelete={handleDelete}
          setEdit={setEdit}
          openEdit={openEdit}
          todos={todos}
          val={val}
          setTodos={setTodos}
        />
      </Zoom>
    </>
  );
}

export default Todo;
