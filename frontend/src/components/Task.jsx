import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';


const Container = styled.div`
  border: 1px solid black;
  border-radius: 2px;
  padding: 8px;
  margin: 10px auto;
  max-width: 75%;
  background-color: white;
`;

function Task(props) {
  function deleteTask(columnId, index, taskId) {
    const column = props.board.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(index, 1);

    const tasks = props.board.tasks;
    const {[taskId]: oldTask, ...newTasks} = tasks;

    props.setBoard({
      ...props.board,
      columns: {
        ...props.board.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds
        }
      },
      tasks: newTasks
    });
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      { provided => (
        <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {props.task.content}
          <span onClick={() => deleteTask(props.columnId, props.index, props.task.id)}> [x]</span>
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
