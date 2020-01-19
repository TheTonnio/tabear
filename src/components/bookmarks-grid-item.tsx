import React, { useRef } from 'react'
import { Bookmark } from '../../models/bookmark';
import styled from "styled-components";
import { PrimaryCardAnimated } from "../shared/styles/primary-card";
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core'


interface DragItem {
  index: number
  id: string
  type: string
}

function BookmarksGridItem({ record, index, moveCard }: PropTypes) {
  const {
    url, iconUrl, name, description, id,
  } = record;

  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'card',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card' as any, id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    // @ts-ignore
    <BookmarkCard href={url} as="a" ref={ref}>
      <BookmarkCardMainInfo>
        <BookmarkCardImageWrapper>
          <BookmarkCardImage
            imageUrl={iconUrl || `${url}/favicon.ico`}
          />
        </BookmarkCardImageWrapper>
        <BookmarkCardTitle>{name}</BookmarkCardTitle>
      </BookmarkCardMainInfo>
      <BookmarkCardDescription>{description}</BookmarkCardDescription>
    </BookmarkCard>
  );
}

export default BookmarksGridItem;

type PropTypes = {
  record: Bookmark
  index: number
  moveCard: (a: any, b: any) => void
}

const BookmarkCard = styled(PrimaryCardAnimated)`
  display: flex;
  flex-direction: column;
  transition: .3s;
  overflow: hidden;
  text-decoration: none;
  
  &:hover {
    transform: scale(1.04);
  }
`;

const BookmarkCardMainInfo = styled.div`
  display: flex;
  height: 100%;
  padding: 0 12px;
`;

const BookmarkCardDescription = styled.div`
    display: flex;
    align-items: center;
    height: 2.2em;
    font-size: 14px;
    line-height: 1.1em;
    padding: 13px 0 13px 10px;
    overflow: hidden;
    box-sizing: content-box;
    background: #F3F2F8;
    color: #3c78bf;
`;

const BookmarkCardImage = styled.div`
  width: 30px;
  height: 30px;
  background-image: url("${(props: { imageUrl: string }) => props.imageUrl}");
  background-size: cover;
`;

const BookmarkCardImageWrapper = styled.div`
  display: flex;
  width: 30px;
  padding-top: 12px;
`;

const BookmarkCardTitle = styled.p`
  display: flex;
  width: 100%;
  padding: 12px 0 0 15px;
  margin: 0;
  color: #000;
  font-weight: 600;
`;
