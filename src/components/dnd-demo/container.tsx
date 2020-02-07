import React, { useRef } from 'react'
import styled from "styled-components";
import Box from "./box";
import {useDrop} from "react-dnd";

const Container = ({ data, tasks, moveCard }: any) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'box',
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
    hover(item: any) {
      if (tasks.length === 0 && item.containerId !== data.id) {
        moveCard(item.id, -1, -1, item.containerId, data.id);
        item.containerId = data.containerId
      }
    },
  });

  return (
    <ContainerWrapper ref={drop}>
      <ContainerName>
        {data.name}
      </ContainerName>
      {
        tasks.map((task: any, index: number) =>
          <Box
            data={task}
            key={task.id}
            index={task.index}
            moveCard={moveCard}
          />)
      }
    </ContainerWrapper>
  );
};

export default Container;













const ContainerWrapper = styled.div`
  width: 300px;
  background: #ccc;
  height: 500px;
  margin-right: 50px;
`;

const ContainerName = styled.div`
  margin-bottom: 15px;
  width: 100%;
  background: #77a6ff;
  height: 50px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
