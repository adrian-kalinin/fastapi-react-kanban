import React, { useState } from 'react';


function AddTask(props) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState("");

  function handleInputComplete(event) {
    if (event.key === "Enter") {
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
    <div>
      {
        showNewTaskButton ?
          <button onClick={() => setShowNewTaskButton(false)}>New task</button>
          :
          <input type="text" value={value} onChange={(event => setValue(event.target.value))} onKeyDown={handleInputComplete} />
      }
    </div>
  )
}

export default AddTask;
