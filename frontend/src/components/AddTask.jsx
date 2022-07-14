import React, { useState } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  margin: 10px 10px 5px 10px;
  padding: 5px 0;
  border-top: 1px solid black;
  width: 100%;
  text-align: center;
`

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
    <Container>
      {
        showNewTaskButton ?
          <button onClick={() => setShowNewTaskButton(false)}>New task</button>
          :
          <input type="text" value={value} onChange={(event => setValue(event.target.value))} onKeyDown={handleInputComplete} />
      }
    </Container>
  )
}

export default AddTask;
