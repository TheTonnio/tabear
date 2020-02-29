import React from 'react';
import { useDrop } from "react-dnd";
import { DnDSource } from "../../models/dnd-source";

const DropWrapper = (props: PropTypes) => {
  const { acceptType, moveCard, destination, children } = props;
  const [, drop] = useDrop({
    accept: acceptType,
    hover(source: any) {
      if (source && destination && source.id !== destination.id) {
        moveCard(source, destination, source.draggableId);
        source.index = destination.index;
        source.id = destination.id;
      }
    },
  });

  return (
    <div ref={drop}>
      {children}
    </div>
  );
};

export default DropWrapper;

interface PropTypes {
  children: JSX.Element | JSX.Element[]
  acceptType: string | string[]
  destination: any
  moveCard: any
  // moveCard: (source: any, destination: any, draggableId: string) => void
}
