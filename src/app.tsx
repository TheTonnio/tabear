/* eslint react/no-unused-state: 0 */

import React from 'react';
import BookmarksContainer from './components/bookmarks-container';
import AddBookmarkForm from './components/add-bookmark-form';
import CreateCollectionForm from './components/create-collection-form';
import { Bookmark } from './models/bookmark';
import { Collection } from './models/collection';
import Storage from './utils/storage';
import LocalStorage from './utils/localStorage';
import {ENV_DEVELOPMENT, LAYOUT_TYPES_CODES} from './constants';
import styled from 'styled-components'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import initialState from './mock/initial-data';
import { Bookmarks } from "./models/bookmarks";
import { Collections } from "./models/collections";
import TopBar from "./components/top-bar/top-bar";
import {LayoutType} from "./models/layout-type";
import { LayoutTypeContext } from './store/layout-type-context'
import OpenTabsPanel from "./components/tabs-panel/tabs-panel";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const DashboardWrapper = styled.div`
  display: flex;
`;


class App extends React.Component<undefined, StateTypes> {
  storage: Storage;

  constructor(props: undefined) {
    super(props);

    this.storage = process.env.NODE_ENV === ENV_DEVELOPMENT
      ? new LocalStorage() // Is used to imitate Chrome Extensions Storage API during dev process
      : new Storage();

    this.state = {
      bookmarks: {},
      collections: {},
      collectionsOrder: [],
      selectedCollectionId: null,
      isAddCollectionFormShown: false,
      layoutType: LAYOUT_TYPES_CODES.Grid
    };

    this.setBookmarks = this.setBookmarks.bind(this);
    this.setCollections = this.setCollections.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const {
      collections, bookmarks, collectionsOrder
    } = await this.storage.getDataObject([
      'bookmarks',
      'collections',
      'collectionsOrder',
    ]);

    this.setState({
      bookmarks: bookmarks || {},
      collections: collections || {},
      collectionsOrder: collectionsOrder || [],
    });

    // this.storage.saveData('bookmarks', initialState.bookmarks);
    // this.storage.saveData('collections', initialState.collections);
    // this.storage.saveData('collectionsOrder', initialState.collectionsOrder);
  }

  setBookmarks(bookmarks: Bookmarks): void {
    this.storage.saveData('bookmarks', bookmarks);
    this.setState({ bookmarks });
  }

  setCollections(collections: Collections): void {
    this.storage.saveData('collections', collections);
    this.setState({ collections });
  }

  setCollectionsOrder(collectionsOrder: string[]): void {
    this.storage.saveData('collectionsOrder', collectionsOrder);
    this.setState({ collectionsOrder });
  }

  setLayoutType(layoutType: LayoutType) {
    this.setState({ layoutType });
  }

  render() {
    const {
      bookmarks,
      collections,
      collectionsOrder,
      layoutType,
    } = this.state;

    return (
      <LayoutTypeContext.Provider value={layoutType}>
        <DndProvider backend={Backend}>
          <AppWrapper>
            <TopBar
              onSetLayoutType={this.setLayoutType}
            />

            <DashboardWrapper>
              <BookmarksContainer
                // @ts-ignore
                bookmarks={bookmarks}
                collections={collections}
                collectionsOrder={collectionsOrder}
                onBookmarksUpdate={this.setBookmarks}
                onCollectionsUpdate={this.setCollections}
                layoutType={layoutType}
              />

              <OpenTabsPanel/>
            </DashboardWrapper>
          </AppWrapper>
        </DndProvider>
      </LayoutTypeContext.Provider>
    );
  }
}

export default App;

type StateTypes = {
  bookmarks: Bookmarks
  collections: Collections
  collectionsOrder: string[]
  selectedCollectionId: string | null
  isAddCollectionFormShown: boolean
  layoutType: LayoutType
}
