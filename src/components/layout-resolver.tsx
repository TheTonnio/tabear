import React from 'react';
import { LayoutType } from "../models/layout-type";
import { LAYOUT_TYPES_CODES } from "../constants";
import MasonryLayout from "./lists-masonry/lists-masonry";
import { Collection } from "../models/collection";
import { Bookmark } from "../models/bookmark";
import BookmarkCollection from "./cards-grid/cards-collection";
import CardsGrid from "./cards-grid/cards-grid";

class LayoutResolver extends React.Component<any, StateTypes> {

  private layoutComponents = {
    masonry: MasonryLayout,
    grid: CardsGrid
  };

  private layoutCollectionComponents = {
    masonry: BookmarkCollection,
    grid: BookmarkCollection
  };

  constructor(props: any) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { width } = this.state;
    const {
      layoutType,
      collectionsOrder,
      onAddBookmarkButtonClick,
      moveCard,
      setDraggingItemId,
      draggingItemId,
      bookmarks,
      collections
    } = this.props;

    const componentName = layoutType === LAYOUT_TYPES_CODES.Grid ? 'grid' : 'masonry';
    const Layout = this.layoutComponents[componentName];
    const LayoutCollection = this.layoutCollectionComponents[componentName];


    return (
      <Layout
        width={width}
      >
        {
          collectionsOrder.map((collectionId: string, index: number) => {
            const collection: Collection = collections[collectionId];
            const bookmarksList: Bookmark[] = collection.bookmarksIds.map((id: string) => bookmarks[id]);
            return (
              <LayoutCollection
                key={collectionId}
                bookmarks={bookmarksList}
                onAddBookmarkButtonClick={onAddBookmarkButtonClick}
                moveCard={moveCard}
                collection={collection}
                collectionIndex={index}
                setDraggableItem={setDraggingItemId}
                draggableItemId={draggingItemId}
                layoutType={layoutType}
              />
            );
          })
        }
      </Layout>
    )
  }
}

type PropTypes = {
  layoutType: LayoutType
  children: any
}

type StateTypes = {
  width: number
  height: number
}

export default LayoutResolver;
