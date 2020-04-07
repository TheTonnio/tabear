import React, {useContext, useState} from 'react';
import { LayoutType } from "../models/layout-type";
import { LAYOUT_TYPES_CODES } from "../constants";
import MasonryLayout from "./lists-masonry/lists-masonry";
import { Collection } from "../models/collection";
import { Bookmark } from "../models/bookmark";
import CardsCollection from "./cards-grid/cards-collection";
import CardsGrid from "./cards-grid/cards-grid";
import { Bookmarks } from "../models/bookmarks";
import { Collections } from "../models/collections";
import {AppDataContext} from "../store/app-data-context";

const layoutComponents = {
  masonry: MasonryLayout,
  grid: CardsGrid
};

const layoutCollectionComponents = {
  masonry: CardsCollection,
  grid: CardsCollection
};

export const LayoutResolver = (props: any) => {
  // constructor(props: any) {
  //   super(props);
  //   this.state = { width: 0, height: 0 };
  //   this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  // }
  //
  // componentDidMount() {
  //   this.updateWindowDimensions();
  //   window.addEventListener('resize', this.updateWindowDimensions);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateWindowDimensions);
  // }
  //
  // updateWindowDimensions() {
  //   this.setState({ width: window.innerWidth, height: window.innerHeight });
  // }

  // render() {
  const [ windowSize, setWindowSize ] = useState<any>({ width: 0, height: 0 });
  const { bookmarks, collections, dispatch }: any = useContext(AppDataContext);
  const { width } = windowSize;

    const {
      layoutType,
      collectionsOrder,
      moveCard,
      moveCollection,
      setDraggingItemId,
      setDraggingItemCollectionId,
      draggingItemId,
      draggingCollectionItemId,
      onBookmarkUpdate,
      onBookmarkRemove,
      onCollectionUpdate,
      onCollectionRemove,
      isSearchMode,
    } = props;

    const componentName = layoutType === LAYOUT_TYPES_CODES.Grid ? 'grid' : 'masonry';
    const Layout = layoutComponents[componentName];
    const LayoutCollection = layoutCollectionComponents[componentName];

    return (
      <Layout width={width}>
        {
          (collectionsOrder.map((collectionId: string, index: number) => {
            const collection: Collection = collections[collectionId] || { };
            const bookmarksList: Bookmark[] = collection.bookmarksIds && collection.bookmarksIds.map((id: string) => bookmarks[id]).filter(Boolean) || [];

            return (bookmarksList && bookmarksList.length) || !isSearchMode ? (
              <LayoutCollection
                key={collectionId}
                bookmarks={bookmarksList}
                moveCard={moveCard}
                moveCollection={moveCollection}
                collection={collection}
                collectionIndex={index}
                setDraggingItemId={setDraggingItemId}
                setDraggingItemCollectionId={setDraggingItemCollectionId}
                draggingItemId={draggingItemId}
                draggingCollectionItemId={draggingCollectionItemId}
                layoutType={layoutType}
                onBookmarkUpdate={onBookmarkUpdate}
                onBookmarkRemove={onBookmarkRemove}
                onCollectionUpdate={onCollectionUpdate}
                onCollectionRemove={onCollectionRemove}
                onDispatch={dispatch}
              />
            ) : undefined;
          })).filter(Boolean)
        }
      </Layout>
    )
  };
// }

type PropTypes = {
  layoutType: LayoutType
  collectionsOrder: string[]
  moveCard: (source: any, destination: any, draggableId: string) => void
  moveCollection: (source: any, destination: any, draggableId: string) => void
  setDraggingItemId: (id?: string) => void
  setDraggingItemCollectionId: (id?: string) => void
  draggingItemId?: string | null
  draggingCollectionItemId?: string | null
  bookmarks: Bookmarks
  collections: Collections
  onBookmarkUpdate: (data: Bookmark) => void
  onBookmarkRemove: (id: string, collectionId: string) => void
  onCollectionUpdate: (data: Collection) => void
  onCollectionRemove: (id: string) => void
  isSearchMode: boolean
}

type StateTypes = {
  width: number
  height: number
}

export default LayoutResolver;
