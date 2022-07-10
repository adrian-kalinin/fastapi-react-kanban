import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
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
    return data.board;
  }

  return (
    <Container>
      Board
    </Container>
  );
}

export default Board;
