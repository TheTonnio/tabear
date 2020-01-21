import React, { useRef } from 'react'
import styled from "styled-components";
import { useDrag, useDrop } from 'react-dnd'

const Box = ({ data, index, moveCard }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{isDragging}, drag] = useDrag({
    item: { type: 'box', id: data.id, containerId: data.containerId, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'box',
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
    hover(item: any) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      moveCard(item.id, dragIndex, hoverIndex, item.containerId, data.containerId);

      item.index = hoverIndex
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref}>
      <BoxWrapper>
        {data.text}
      </BoxWrapper>
    </div>

  );
};

export default Box;

const BoxWrapper = styled.div`
  margin-bottom: 15px;
  width: 100%;
  height: 50px;
  background: #e2e2ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
