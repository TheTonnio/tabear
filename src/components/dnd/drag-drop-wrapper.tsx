import React, { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { DraggableItemTypes } from "../../constants";

const DragDropProvider = ({
  dragSource,
  setDraggingItemId,
  dropDestination,
  moveCard,
  children
}: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    item: {
      type: dragSource.type,
      id: dragSource.id,
      index: dragSource.index,
      draggableId: dragSource.draggableId,
    },
    begin: () => setDraggingItemId(dragSource.draggableId),
    end: () => setDraggingItemId(null)
  });

  const [, drop] = useDrop({
    accept: DraggableItemTypes.BOOKMARK,
    hover(source: any) {
      if (!ref.current) {
        return
      }

      moveCard(source, dropDestination, source.draggableId);
      source.index = dropDestination.index;
      source.id = dropDestination.id;
    },
  });

  drag(drop(ref));
  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

export default DragDropProvider;
