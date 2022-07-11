import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';


const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  border-radius: 2px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Title = styled.h3`
  margin: 10px 10px 5px 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid black;
  width: 100%;
  text-align: center;
`

const TaskList = styled.div`
  padding: 8px;
`

function Column(props) {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      { provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>
          <Droppable droppableId={props.column.id} direction="vertical" type="task">
            { provided => (
              <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                {
                  props.tasks.map((task, index) =>
                    <Task key={task.id} task={task} columnId={props.column.id} index={index} />
                  )
                }
                {provided.placeholder}
            </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}

export default Column;
