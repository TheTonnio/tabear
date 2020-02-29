import React, { useRef } from 'react';
import { useDrag } from "react-dnd";
import { DnDSource } from "../../models/dnd-source";

const DragWrapper = (props: PropTypes) => {
  const { dragSource, children } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    item: {
      type: dragSource.type,
      id: dragSource.id,
      index: dragSource.index,
      draggableId: dragSource.draggableId,
      overload: dragSource.overload,
    }
  });

  drag(ref);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

export default DragWrapper;

interface PropTypes {
  children: JSX.Element | JSX.Element[]
  dragSource: DnDSource
}
