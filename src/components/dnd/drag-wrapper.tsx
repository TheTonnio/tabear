import React, { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { DraggableItemTypes } from "../../constants";
import { DnDSource } from "../../models/dnd-source";
import { DnDDestination } from "../../models/dnd-destination";

const DragDropProvider = (props: PropTypes) => {
  const { dragSource, setDraggingItemId, dropDestination, moveCard, children } = props;

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

interface PropTypes {
  children: JSX.Element[]
  dragSource: DnDSource
  dropDestination: DnDDestination
  setDraggingItemId: (id: string | null) => void
  moveCard: (source: any, destination: any, draggableId: string) => void
}
