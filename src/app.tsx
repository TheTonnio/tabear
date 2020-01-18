import React from 'react';
import './app.css';
import BookmarksGrid from './components/bookmarks-grid';
import mockData from './mock-state';
import AddBookmarkForm from './components/add-bookmark-form';
import CreateCollectionForm from './components/create-collection-form';
import { Bookmark } from "../models/bookmark";
import { Collection } from "../models/collection";

class App extends React.Component<any, StateTypes> {
  constructor(props: any) {
    super(props);

    this.state = { ...this.getAppData(), selectedCollectionId: null, isAddCollectionFormShown: false };

    this.onAddBookmark = this.onAddBookmark.bind(this);
    this.onAddBookmarkButtonClick = this.onAddBookmarkButtonClick.bind(this);
    this.onCreateCollection = this.onCreateCollection.bind(this);
    this.onCreateCollectionButtonClick = this.onCreateCollectionButtonClick.bind(this);
  }

  getAppData() {
    return mockData;
  }

  onAddBookmark(newBookmark: Bookmark): void {
    const { bookmarks } = this.state;

    this.setState({
      bookmarks: [...bookmarks, newBookmark],
      selectedCollectionId: null,
    });
  }

  onCreateCollection(newCollection: Collection): void {
    const { collections } = this.state;

    this.setState({
      collections: [...collections, newCollection],
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
      collections, bookmarks, selectedCollectionId, isAddCollectionFormShown
    } = this.state;

    return (
      <div className="app">
        <button onClick={this.onCreateCollectionButtonClick}>Create Collection +</button>
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
              <AddBookmarkForm collectionId={selectedCollectionId} onAddBookmark={this.onAddBookmark} />
            </div>
          )
        }

        <BookmarksGrid
          collections={collections}
          bookmarks={bookmarks}
          onAddBookmarkButtonClick={this.onAddBookmarkButtonClick}
        />
      </div>
    );
  }
}

export default App;

type StateTypes = {
  bookmarks: Bookmark[]
  collections: Collection[]
  selectedCollectionId: string | null
  isAddCollectionFormShown: boolean
}
