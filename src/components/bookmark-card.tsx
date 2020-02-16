// @ts-nocheck
import React, { Dispatch, useRef, useContext } from 'react'
import styled from "styled-components";
import { PrimaryCard } from "../shared/styles/primary-card";
import { useDrag, useDrop } from "react-dnd";
import {DraggableItemTypes, LAYOUT_TYPES_CODES} from "../constants";
import DraggableBookmark from "../models/draggable-bookmark";
import { Bookmark } from "../models/bookmark";
import BookmarkCardInfo from "./bookmark-card-info";
import {LayoutType} from "../models/layout-type";
import { LayoutTypeContext } from '../store/layout-type-context'

const BookmarkCard = ({
  bookmark: {
    url,
    iconUrl,
    name,
    description,
    id
  },
  index,
  isDragging,
  moveCard,
  setDraggableItem,
  collectionId
}: PropTypes) => {
  const layoutType = useContext(LayoutTypeContext);
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    item: {
      type: DraggableItemTypes.BOOKMARK,
      id: collectionId,
      index,
      draggableId: id,
    },
    begin: () => setDraggableItem(id),
    end: () => setDraggableItem(null)
  });

  const [, drop] = useDrop({
    accept: DraggableItemTypes.BOOKMARK,
    hover(source: DraggableBookmark) {
      if (!ref.current) {
        return
      }

      const destination = {
        type: DraggableItemTypes.BOOKMARK,
        id: collectionId,
        index
      };

      moveCard(source, destination, source.draggableId);
      source.index = index;
      source.id = collectionId;
    },
  });

  drag(drop(ref));

  return (
    // @ts-ignore
    layoutType === LAYOUT_TYPES_CODES.Grid ? (<CardWrapper
      href={url}
      ref={ref}
      as="a"
      visible={!isDragging}
    >
      <BookmarkCardInfo
        layoutType={layoutType}
        name={name}
        description={description}
        url={url}
        iconUrl={iconUrl}
      />
    </CardWrapper>)
      : (
        <ListItemWrapper
          href={url}
          ref={ref}
          as="a"
          visible={!isDragging}
        >
          <ListItemImage iconUrl={iconUrl}/>
          {name} {description}
        </ListItemWrapper>
      )
  );
};

export default BookmarkCard;

type PropTypes = {
  bookmark: Bookmark
  index: number
  collectionId: string
  isDragging: boolean
  setDraggableItem: Dispatch<string | null>
  moveCard: (source: any, destination: any, draggableId: string) => void
}

const CardWrapper = styled(PrimaryCard)`
  overflow: hidden;
  text-decoration: none;
  opacity: ${(props: { visible: boolean }) => props.visible ? 1 : .4};
`;

const ListItemWrapper = styled.div`
  overflow: hidden;
  text-decoration: none;
  opacity: ${(props: { visible: boolean }) => props.visible ? 1 : .4};
  background: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
  cursor: pointer;
`;


const ListItemImage = styled.div`
  width: 30px;
  height: 30px;
  background-image: url("${(props: { iconUrl: string }) => props.iconUrl}");
  background-size: cover;
  background-repeat: no-repeat;
`;

