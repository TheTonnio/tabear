import React, {useContext} from 'react';
import BookmarksContainer from './components/bookmarks-container';
import Storage from './utils/storage';
import LocalStorage from './utils/localStorage';
import { ENV_DEVELOPMENT, LAYOUT_TYPES_CODES } from './constants';
import styled from 'styled-components'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { Bookmarks } from "./models/bookmarks";
import { Collections } from "./models/collections";
import TopBar from "./components/top-bar/top-bar";
import { LayoutType } from "./models/layout-type";
import OpenTabsPanel from "./components/tabs-panel/tabs-panel";
import initialState from './mock/initial-data';
import { ConfigContext } from "./store/config-context";
import {Config, defaultConfig} from "./constants/config";
import v4 from "uuid/v4";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const DashboardWrapper = styled.div`
  margin-top: 10px;
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
      filteredBookmarks: {},
      collections: {},
      collectionsOrder: [],
      config: defaultConfig,
      isSearchMode: false,
      isDataLoaded: false,
    };

    this.setBookmarks = this.setBookmarks.bind(this);
    this.setCollections = this.setCollections.bind(this);
    this.setCollectionsOrder = this.setCollectionsOrder.bind(this);
    this.setConfigValue = this.setConfigValue.bind(this);
    this.setLayoutType = this.setLayoutType.bind(this);
    this.searchBookmarks = this.searchBookmarks.bind(this);
    this.addNewCollection = this.addNewCollection.bind(this);

    // Seed with mock data
    // this.storage.saveData('bookmarks', initialState.bookmarks);
    // this.storage.saveData('collections', initialState.collections);
    // this.storage.saveData('collectionsOrder', initialState.collectionsOrder);
    // this.storage.saveData('config', initialState.config);
  }

  async componentDidMount(): Promise<void> {
    const {
      collections, bookmarks, collectionsOrder, config,
    } = await this.storage.getDataObject([
      'bookmarks',
      'collections',
      'collectionsOrder',
      'config',
    ]);

    const appConfig = config || defaultConfig;

    this.setState({
      bookmarks: bookmarks || {},
      collections: collections || {},
      collectionsOrder: collectionsOrder || [],
      config: { ...appConfig, setConfigValue: this.setConfigValue },
      isDataLoaded: true
    });
  }

  setBookmarks(bookmarks: Bookmarks): void {
    this.storage.saveData('bookmarks', bookmarks);
    this.setState({ bookmarks });
  }

  setCollections(collections: Collections): void {
    this.storage.saveData('collections', collections);
    this.setState({ collections });
  }

  addNewCollection() {
    const { collections, collectionsOrder } = this.state;
    const id = v4();

    const updatedCollectionsOrder = [ id, ...collectionsOrder ];
    const updatedCollections = {
      ...collections,
      [id]: {
        id: id,
        name: "New Collection",
        bookmarksIds: [],
        isCollapsed: false,
      }
    };

    this.setCollections(updatedCollections);
    this.setCollectionsOrder(updatedCollectionsOrder);
  }

  setCollectionsOrder(collectionsOrder: string[]): void {
    this.storage.saveData('collectionsOrder', collectionsOrder);
    this.setState({ collectionsOrder });
  }

  setConfigValue(fieldName: string, value: any) {
    const config = { ...this.state.config, [fieldName]: value };
    this.storage.saveData('config', config);
    this.setState({ config });
  }

  setLayoutType(value: LayoutType) {
    this.setConfigValue("layoutType", value);
  }

  searchBookmarks(query?: string) {
    const { bookmarks } = this.state;

    if (query && query.length) {
      const formattedQuery = query.toLowerCase();
      const filteredBookmarks = { ...bookmarks };
      const bookmarksObjKeys = Object.keys(bookmarks);

      bookmarksObjKeys.filter(key => {
        const { name, description } = bookmarks[key];

        if (`${name}${description}`.toLocaleLowerCase().indexOf(formattedQuery) === -1) {
          delete filteredBookmarks[key];
        }
      });

      this.setState({ filteredBookmarks, isSearchMode: true });
    } else {
      this.setState({ bookmarks, isSearchMode: false });
    }
  }

  render() {
    const {
      bookmarks,
      collections,
      collectionsOrder,
      filteredBookmarks,
      config,
      isSearchMode,
      isDataLoaded,
    } = this.state;

    return (
      <ConfigContext.Provider value={config}>
        <DndProvider backend={Backend}>
          <AppWrapper>
            <TopBar
              onSetLayoutType={this.setLayoutType}
              onSearch={this.searchBookmarks}
              onCollectionAdd={this.addNewCollection}
              layoutType={config.layoutType}
            />
            <DashboardWrapper>
              <BookmarksContainer
                bookmarks={isSearchMode ? filteredBookmarks : bookmarks}
                collections={collections}
                collectionsOrder={collectionsOrder}
                layoutType={config.layoutType}
                onBookmarksUpdate={this.setBookmarks}
                onCollectionsUpdate={this.setCollections}
                onCollectionsOrderUpdate={this.setCollectionsOrder}
                isSearchMode={isSearchMode}
                isDataLoaded={isDataLoaded}
              />
              <OpenTabsPanel/>
            </DashboardWrapper>
          </AppWrapper>
        </DndProvider>
      </ConfigContext.Provider>
    );
  }
}

export default App;

type StateTypes = {
  bookmarks: Bookmarks
  filteredBookmarks: Bookmarks
  collections: Collections
  collectionsOrder: string[]
  config: Config
  isDataLoaded: boolean
  isSearchMode: boolean
}
