import React, { Dispatch, useState } from 'react';
import { Bookmark } from '../../models/bookmark';
import { Collection } from '../../models/collection';
import styled from "styled-components";
import Card from "./card";
import { DraggableItemTypes } from "../../constants";
import CardsCollectionHeader from "./cards-collection-header";
import { LayoutType } from "../../models/layout-type";
import DropWrapper from "../dnd/drop-wrapper";
import CardsPlaceholder from "./cards-placeholder";

const CardsCollection = ({
  bookmarks,
  collection,
  onAddBookmarkButtonClick,
  moveCard,
  setDraggingItemId,
  draggableItemId,
  layoutType,
}: PropTypes) => {
  const {
    id, name, description,
  } = collection;

  const [ isCollectionCollapsed, toggleCollection ] = useState<boolean>(false);
  const hasBookmarks = !!bookmarks.length;
  const destination = {
    type: DraggableItemTypes.BOOKMARK,
    id,
    index: 0
  };

  return (
    <DropWrapper
      acceptType={DraggableItemTypes.BOOKMARK}
      destination={destination}
      moveCard={moveCard}
    >
      <OuterWrapper>
        <Wrapper>
            <CardsCollectionHeader
              name={name}
              description={description}
              isCollectionCollapsed={isCollectionCollapsed}
              disabled={!hasBookmarks}
              toggleCollection={() => toggleCollection(!isCollectionCollapsed)}
            />
          <InnerWrapper>
            {
              hasBookmarks ? (
                <Grid>
                  {
                    bookmarks.map((bookmark: Bookmark, index: number) => (
                      <Card
                        key={bookmark.id}
                        index={index}
                        collectionId={id}
                        bookmark={bookmark}
                        draggableItemId={draggableItemId}
                        moveCard={moveCard}
                        setDraggingItemId={setDraggingItemId}
                      />
                    ))
                  }
                </Grid>
              ) : (
                <CardsPlaceholder/>
              )
            }
          </InnerWrapper>
        </Wrapper>
      </OuterWrapper>
    </DropWrapper>
  );
};

export default CardsCollection;

type PropTypes = {
  bookmarks: Bookmark[]
  collection: Collection
  collectionIndex: number
  draggableItemId: string | null
  onAddBookmarkButtonClick: (id: string) => void
  setDraggingItemId: Dispatch<string | null>
  layoutType: LayoutType
  moveCard: (source: any, destination: any, draggableId: string) => void
}

const OuterWrapper = styled.div`
  padding: 0 30px;
`;

const Wrapper = styled.div`
  margin: 0 0 40px;
  padding: 10px 20px;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 40px -12px #999;
  border: 1px solid #f4f4f4;
`;

const InnerWrapper = styled.div`

  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 230px));
  grid-auto-rows: 130px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin: 25px 0 15px;
`;

