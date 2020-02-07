/* eslint react/no-unused-state: 0 */

import React from 'react';
import BookmarksContainer from './components/bookmarks-container';
import AddBookmarkForm from './components/add-bookmark-form';
import CreateCollectionForm from './components/create-collection-form';
import { Bookmark } from './models/bookmark';
import { Collection } from './models/collection';
import Storage from './utils/storage';
import LocalStorage from './utils/localStorage';
import { ENV_DEVELOPMENT } from './constants';
import styled from 'styled-components'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import initialState from './initial-data';
import {Bookmarks} from "./models/bookmarks";
import {Collections} from "./models/collections";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;
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
    };

    this.onAddBookmark = this.onAddBookmark.bind(this);
    this.onAddBookmarkButtonClick = this.onAddBookmarkButtonClick.bind(this);
    this.onCreateCollection = this.onCreateCollection.bind(this);
    this.onCreateCollectionButtonClick = this.onCreateCollectionButtonClick.bind(this);
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

  onAddBookmark(newBookmark: Bookmark): void {
    const { bookmarks } = this.state;
    const updateBookmarks = { ...bookmarks, newBookmark };

    this.storage.saveData('bookmarks', updateBookmarks);

    this.setState({
      bookmarks: { ...updateBookmarks },
      selectedCollectionId: null,
    });
  }

  setBookmarks(bookmarks: Bookmarks): void {
    this.storage.saveData('bookmarks', bookmarks);

    this.setState({
      bookmarks: bookmarks,
    });
  }

  setCollections(collections: Collections): void {
    // this.storage.saveData('collections', collections);

    this.setState({
      collections: collections,
    });
  }

  onCreateCollection(newCollection: Collection): void {
    const { collections } = this.state;

    const updateCollections = { ...collections, [newCollection.id]: newCollection };

    this.storage.saveData('collections', updateCollections);

    this.setState({
      collections: { ...updateCollections },
      isAddCollectionFormShown: false,
    });
  }

  onAddBookmarkButtonClick(selectedCollectionId: string): void {
    this.setState({ selectedCollectionId });
  }

  onCreateCollectionButtonClick(): void {
    this.setState({ isAddCollectionFormShown: true });
  }

  render() {
    const {
      bookmarks,
      collections,
      collectionsOrder,
      selectedCollectionId,
      isAddCollectionFormShown,
    } = this.state;

    return (
      <DndProvider backend={Backend}>
        <AppWrapper>
          <button type="button" onClick={this.onCreateCollectionButtonClick}>Create Collection +</button>
          {
            isAddCollectionFormShown && (
              <div>
                <h3>Create Collection</h3>
                <CreateCollectionForm onCreateCollection={this.onCreateCollection} />
              </div>
            )
          }

          {
            selectedCollectionId && (
              <div>
                <h3>Add Bookmark</h3>
                <AddBookmarkForm
                  collectionId={selectedCollectionId}
                  onAddBookmark={this.onAddBookmark}
                />
              </div>
            )
          }

          <BookmarksContainer
            // @ts-ignore
            bookmarks={bookmarks}
            collections={collections}
            collectionsOrder={collectionsOrder}
            onAddBookmarkButtonClick={this.onAddBookmarkButtonClick}
            onBookmarksUpdate={this.setBookmarks}
            onCollectionsUpdate={this.setCollections}
          />
        </AppWrapper>
      </DndProvider>
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
}
