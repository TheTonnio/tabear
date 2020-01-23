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
      tabs: [],
      collections: [],
      bookmarks: [],
      tags: [],
      selectedCollectionId: null,
      isAddCollectionFormShown: false,
    };

    this.onAddBookmark = this.onAddBookmark.bind(this);
    this.onAddBookmarkButtonClick = this.onAddBookmarkButtonClick.bind(this);
    this.onCreateCollection = this.onCreateCollection.bind(this);
    this.onCreateCollectionButtonClick = this.onCreateCollectionButtonClick.bind(this);
    this.setBookmarks = this.setBookmarks.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const {
      tabs, collections, bookmarks, tags,
    } = await this.storage.getDataObject([
      'tabs',
      'collections',
      'bookmarks',
      'tags',
    ]);

    this.setState({
      tabs: tabs || [],
      collections: collections || [],
      bookmarks: bookmarks || [],
      tags: tags || [],
    });
  }

  onAddBookmark(newBookmark: Bookmark): void {
    const { bookmarks } = this.state;
    const updateBookmarks = [...bookmarks, newBookmark];

    this.storage.saveData('bookmarks', updateBookmarks);

    this.setState({
      bookmarks: [...updateBookmarks],
      selectedCollectionId: null,
    });
  }

  setBookmarks(bookmarks: Bookmark[]): void {
    this.storage.saveData('bookmarks', bookmarks);

    this.setState({
      bookmarks: bookmarks,
    });
  }

  onCreateCollection(newCollection: Collection): void {
    const { collections } = this.state;

    const updateCollections = [...collections, newCollection];

    this.storage.saveData('collections', updateCollections);

    this.setState({
      collections: [...updateCollections],
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
      collections,
      bookmarks,
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
            collections={collections}
            bookmarks={bookmarks}
            onAddBookmarkButtonClick={this.onAddBookmarkButtonClick}
            onBookmarksUpdate={this.setBookmarks}
          />
        </AppWrapper>
      </DndProvider>
    );
  }
}

export default App;

type StateTypes = {
  tabs: any[]
  bookmarks: Bookmark[]
  collections: Collection[]
  tags: any[]
  selectedCollectionId: string | null
  isAddCollectionFormShown: boolean
}
