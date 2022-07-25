import React, { useState } from 'react';

function AddColumn(props) {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState("");

  function handleInputComplete(event) {
    if (event.key === "Enter") {
      addColumn(event.target.value);

      setShowNewColumnButton(true);
      setValue("");
    }
  }

  function addColumn(title) {
    const newColumnId = "column-" + Math.floor(Math.random() * 1000000);

    const newColumnOrder = Array.from(props.board.columnOrder);
    newColumnOrder.push(newColumnId);

    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: []
    }

    props.setBoard({
      ...props.board,
      columns: {
        ...props.board.columns,
        [newColumnId]: newColumn
      },
      columnOrder: newColumnOrder
    });
  }

  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 rounded mt-4 px-5 py-3 border border-gray text-gray-700 font-semibold tracking-wide text-sm">
        {
          showNewColumnButton ?
            <button onClick={() => setShowNewColumnButton(false)}>New column</button>
            :
            <input type="text" value={value} onChange={(event => setValue(event.target.value))} onKeyDown={handleInputComplete} />
        }
      </div>
    </div>
  );
}

export default AddColumn;
