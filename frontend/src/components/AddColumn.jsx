import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px;
  padding: 5px 0;
  text-align: center;
`

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
    <Container>
      {
        showNewColumnButton ?
          <button onClick={() => setShowNewColumnButton(false)}>New column</button>
          :
          <input type="text" value={value} onChange={(event => setValue(event.target.value))} onKeyDown={handleInputComplete} />
      }
    </Container>
  );
}

export default AddColumn;
