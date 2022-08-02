import React, { useState, useRef } from 'react';


const useFocus = () => {
	const htmlElRef = useRef(null);
	const setFocus = () => {htmlElRef.current && htmlElRef.current.focus()};

	return [htmlElRef,  setFocus];
}


function AddTask(props) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState("");
  const [inputRef, setInputFocus] = useFocus();

  function handleInputComplete(event) {
    if (event.key === "Enter" && event.target.value !== "") {
      addNewTask(event.target.value, props.columnId);

      setShowNewTaskButton(true);
      setValue("");
    }
  }

  function addNewTask(content, columnId) {
    const newTaskId = "task-" + Math.floor(Math.random() * 1000000);

    const column = props.board.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);

    const newTask = {
      id: newTaskId,
      content: content
    };

    props.setBoard({
      ...props.board,
      tasks: {
        ...props.board.tasks,
        [newTaskId]: newTask
      },
      columns: {
        ...props.board.columns,
        [column.id]: {
          ...column,
          taskIds: newTaskIds
        }
      }
    });
  }

  return (
    <div className="mt-3 px-2 py-1 text-sm text-gray-600">
      {
        showNewTaskButton ?
          <button onClick={() => setShowNewTaskButton(false) && setInputFocus()}>New task</button>
          :
          <input autoFocus type="text" value={value} onChange={(event => setValue(event.target.value))} onKeyDown={handleInputComplete} onBlur={() => setShowNewTaskButton(true)} />
      }
    </div>
  )
}

export default AddTask;
