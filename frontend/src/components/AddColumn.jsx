import React, {useRef, useState} from 'react';


const useFocus = () => {
	const htmlElRef = useRef(null);
	const setFocus = () => {htmlElRef.current && htmlElRef.current.focus()};

	return [htmlElRef,  setFocus];
}


function AddColumn(props) {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState("");
  const [inputRef, setInputFocus] = useFocus();

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
    <div className="text-sm text-gray-600">
      {
        showNewColumnButton ?
          <button onClick={() => setShowNewColumnButton(false) && setInputFocus()}>New column</button>
          :
          <input autoFocus type="text" className="border rounded-md px-2 py-1 outline-none focus:outline-none" value={value} onChange={(event => setValue(event.target.value))} onKeyDown={handleInputComplete} onBlur={() => setShowNewColumnButton(true)} />
      }
    </div>
  );
}

export default AddColumn;
