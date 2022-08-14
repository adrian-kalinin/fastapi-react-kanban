import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Navigate } from "react-router-dom";

import Column from "./Column";
import AddColumn from "./AddColumn";

function Board(props) {
  const initialData = { tasks: {}, columns: {}, columnOrder: [] };
  const [board, setBoard] = useState(initialData);
  const isMounted = useRef(false);

  useEffect(() => {
    fetchBoard().then((data) => setBoard(data));
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      saveBoard().then(() => {});
    } else {
      isMounted.current = true;
    }
  }, [board]);

  async function fetchBoard() {
    const response = await fetch("/api/board", {
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });

    const data = await response.json();

    return data["board"];
  }

  async function saveBoard() {
    await fetch("/api/board", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify(board),
    });
  }

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.indent === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoard({
        ...board,
        columnOrder: newColumnOrder,
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
          taskIds: newTaskIds,
        };

        setBoard({
          ...board,
          columns: {
            ...board.columns,
            [newColumn.id]: newColumn,
          },
        });
      } else {
        const newStartTaskIds = Array.from(startColumn.taskIds);
        const newFinishTaskIds = Array.from(finishColumn.taskIds);

        newStartTaskIds.splice(source.index, 1);
        newFinishTaskIds.splice(destination.index, 0, draggableId);

        const newStartColumn = {
          ...startColumn,
          taskIds: newStartTaskIds,
        };

        const newFinishColumn = {
          ...finishColumn,
          taskIds: newFinishTaskIds,
        };

        setBoard({
          ...board,
          columns: {
            ...board.columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn,
          },
        });
      }
    }
  }

  return (
    <>
      {props.token ? (
        <>
          <div className="container mx-auto flex justify-between my-5 px-2">
            <div className="flex items-center">
              <h5 className="text-gray-700 font-semibold">My board</h5>
            </div>
            <div className="flex justify-center">
              <AddColumn board={board} setBoard={setBoard} />
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <div
                  className="flex justify-center"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {board.columnOrder.map((columnId, index) => {
                    const column = board.columns[columnId];
                    const tasks = column.taskIds.map(
                      (taskId) => board.tasks[taskId]
                    );
                    return (
                      <Column
                        key={column.id}
                        column={column}
                        tasks={tasks}
                        index={index}
                        board={board}
                        setBoard={setBoard}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Board;
