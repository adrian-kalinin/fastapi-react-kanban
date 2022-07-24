import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';
import AddColumn from './AddColumn';
import AddTask from './AddTask';


const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

function Board(props) {
  const initialData = {tasks: {}, columns: {}, columnOrder: []};
  const [board, setBoard] = useState(initialData);

  useEffect(() => {
    fetchBoard().then(data => setBoard(data));
  }, []);

  async function fetchBoard() {
    const response = await fetch('/board');
    const data = await response.json();
    return data['board'];
  }

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.indent === source.index) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoard({
        ...board,
        columnOrder: newColumnOrder
      });
    }

    if (type === "task") {
      const startColumn = board.columns[source.droppableId];
      const finishColumn = board.columns[destination.droppableId];

      if (startColumn === finishColumn) {
        const newTaskIds = Array.from(startColumn.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...startColumn,
          taskIds: newTaskIds
        }

        setBoard({
          ...board,
          columns: {
            ...board.columns,
            [newColumn.id]: newColumn
          }
        });

      } else {
        const newStartTaskIds = Array.from(startColumn.taskIds);
        const newFinishTaskIds = Array.from(finishColumn.taskIds);

        newStartTaskIds.splice(source.index, 1);
        newFinishTaskIds.splice(destination.index, 0, draggableId);

        const newStartColumn = {
          ...startColumn,
          taskIds: newStartTaskIds
        }

        const newFinishColumn = {
          ...finishColumn,
          taskIds: newFinishTaskIds
        }

        setBoard({
          ...board,
          columns: {
            ...board.columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn
          }
        })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddColumn board={board} setBoard={setBoard} />
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        { provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {
              board.columnOrder.map((columnId, index) => {
                const column = board.columns[columnId];
                const tasks = column.taskIds.map(taskId => board.tasks[taskId]);
                return <Column key={column.id} column={column} tasks={tasks} index={index} board={board} setBoard={setBoard} />;
              })
            }
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
