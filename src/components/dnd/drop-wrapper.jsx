import React from 'react';
import { useDrop } from "react-dnd";

const DropWrapper = ({
  acceptType,
  moveCard,
  destination,
  children
}) => {
  const [, drop] = useDrop({
    accept: acceptType,
    hover(source) {
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
