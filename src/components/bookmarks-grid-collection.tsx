import React, { useState, useCallback } from 'react';
import BookmarksGridItem from './bookmarks-grid-item';
import { Bookmark } from '../../models/bookmark';
import { Collection } from '../../models/collection';
import styled from "styled-components";
import { PrimaryCard, PrimaryCardAnimated } from "../shared/styles/primary-card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import update from 'immutability-helper'
import { useDrop } from 'react-dnd'

const BookmarksGridCollection = ({
  bookmarks, record, onAddBookmarkButtonClick, moveCard
}: PropTypes) => {
  const {
    id, name, description, emoji,
  } = record;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'bookmark',
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
    hover(item: any) {
      if (bookmarks.length === 0 && item.collectionId !== record.id) {
        moveCard(item.id, -1, -1, item.collectionId, record.id);
        item.collectionId = record.id
      }
    },
  });

  return (
    <BookmarksCollection ref={drop}>
      <BookmarksCollectionHeader>
        {/*<span>{emoji}</span>*/}
        <BookmarksCollectionHeaderTitle>{name}</BookmarksCollectionHeaderTitle>
        <BookmarksCollectionHeaderDescription>{description}</BookmarksCollectionHeaderDescription>
      </BookmarksCollectionHeader>
      <BookmarksCollectionBookmarks>
        {
          bookmarks.map((bookmark: any) => (
            <BookmarksGridItem
              key={bookmark.id}
              record={bookmark}
              index={bookmark.index}
              moveCard={moveCard}
            />
          ))
        }
        <AddBookmarkButton
          as="button"
          type="button"
          onClick={() => onAddBookmarkButtonClick(id)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </AddBookmarkButton>
      </BookmarksCollectionBookmarks>
    </BookmarksCollection>
  );
};

export default BookmarksGridCollection;

type PropTypes = {
  bookmarks: Bookmark[]
  record: Collection
  collectionIndex: number
  onAddBookmarkButtonClick: (id:string) => void
  moveCard: (id: string, fromIndex: number, toIndex: number, fromContainerId: string, toContainerId: string) => void
  // onDrop: (item: any) => any
}

const BookmarksCollection = styled.div`
  margin: 50px 0;
  padding: 0 20px;
  width: 100%;
`;

const BookmarksCollectionHeader = styled(PrimaryCard)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 7px 12px;
  margin: 0 auto 20px;
`;

const BookmarksCollectionHeaderTitle = styled.span`
  position: relative;
  padding-right: 10px;
  font-size: 18px;
  font-weight: bold;
  
  &::after {
  content: '';
    position: absolute;
    top: 0;
    right: 0;
    background: #3c78bf;
    width: 1px;
    height: 100%;
  }
`;

const BookmarksCollectionHeaderDescription = styled.span`
  margin-top: -1px;
  padding-left: 10px;
  color: #3c78bf;
`;

const BookmarksCollectionBookmarks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 230px));
  grid-auto-rows: 130px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const AddBookmarkButton = styled(PrimaryCardAnimated)`
  background-color: #F3F2F8;
  font-size: 30px;
  color: #3c78bf;
  border: 0;
`;
