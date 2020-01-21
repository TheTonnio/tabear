import React, { useRef } from 'react'
import { Bookmark } from '../../models/bookmark';
import styled from "styled-components";
import { PrimaryCardAnimated } from "../shared/styles/primary-card";
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'

interface DragItem {
  index: number
  id: string
  type: string
}

function BookmarksGridItem({ record, index, moveCard }: PropTypes) {
  const {
    url, iconUrl, name, description, id, collectionId
  } = record;

  // const ref = useRef<HTMLDivElement>(null);
  // const [, drop] = useDrop({
  //   accept: 'bookmark',
  //   hover(item: DragItem, monitor: DropTargetMonitor) {
  //     if (!ref.current) {
  //       return
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;
  //
  //     if (dragIndex === hoverIndex) {
  //       return
  //     }
  //
  //     // moveCard(dragIndex, hoverIndex); // TODO: Uncomment
  //     item.index = hoverIndex
  //   },
  // });
  //
  // const [{ isDragging }, drag] = useDrag({
  //   item: { type: 'bookmark' as any, id, index, rawRecord: record },
  //   collect: (monitor: any) => ({
  //     // @ts-ignore
  //     monitorRecord: record,
  //     isDragging: monitor.isDragging(),
  //   }),
  // });
  //
  // const visible = !isDragging;
  // drag(drop(ref));

  const ref = useRef<HTMLDivElement>(null);

  const [{isDragging}, drag] = useDrag({
    item: { type: 'bookmark', id: record.id, collectionId: record.collectionId, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'bookmark',
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

      moveCard(item.id, dragIndex, hoverIndex, item.collectionId, record.collectionId);

      item.index = hoverIndex
    },
  });

  const visible = !isDragging;

  drag(drop(ref));

  return (
    // @ts-ignore
    <BookmarkCard href={url} as="a" ref={ref} visible={visible}>
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
  moveCard: (a: any, b: any, c: any, d: any, f: any) => void
}

const BookmarkCard = styled(PrimaryCardAnimated)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;
  opacity: ${(props: { visible: boolean }) => props.visible ? 1 : .6};
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
