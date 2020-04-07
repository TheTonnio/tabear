import React, {useContext, useEffect, useState} from 'react';
import BookmarksContainer from './components/bookmarks-container';
import Storage from './utils/storage';
import LocalStorage from './utils/localStorage';
import { ENV_DEVELOPMENT } from './constants';
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
import AppDataProvider from "./components/app-data-provider";
import LoadingSpinner from "./components/loading-spinner";
import {AppData} from "./models/app-data";
import {searchBookmarksByQuery} from "./utils/search-bookmsrks-by-query";
import {addCollection} from "./actions/collections";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const DashboardWrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;

const storage: Storage = process.env.NODE_ENV === ENV_DEVELOPMENT
  ? new LocalStorage() // Is used to imitate Chrome Extensions Storage API during dev process
  : new Storage();

const App = () => {
  //   this.setBookmarks = this.setBookmarks.bind(this);
  //   this.setCollections = this.setCollections.bind(this);
  //   this.setCollectionsOrder = this.setCollectionsOrder.bind(this);
  //   this.setConfigValue = this.setConfigValue.bind(this);
  //   this.setLayoutType = this.setLayoutType.bind(this);
  //   this.searchBookmarks = this.searchBookmarks.bind(this);
  //   this.addNewCollection = this.addNewCollection.bind(this);
  //
  //   // Seed with mock data
  //   this.storage.saveData('bookmarks', initialState.bookmarks);
  //   this.storage.saveData('collections', initialState.collections);
  //   this.storage.saveData('collectionsOrder', initialState.collectionsOrder);
  //   this.storage.saveData('config', initialState.config);
  // };
  //
  // setBookmarks(bookmarks: Bookmarks): void {
  //   this.storage.saveData('bookmarks', bookmarks);
  //   this.setState({ bookmarks });
  // }
  //
  // setCollections(collections: Collections): void {
  //   this.storage.saveData('collections', collections);
  //   this.setState({ collections });
  // }
  //
  // addNewCollection() {
  //   const { collections, collectionsOrder } = this.state;
  //   const id = v4();
  //
  //   const updatedCollectionsOrder = [ id, ...collectionsOrder ];
  //   const updatedCollections = {
  //     ...collections,
  //     [id]: {
  //       id: id,
  //       name: "New Collection",
  //       bookmarksIds: [],
  //       isCollapsed: false,
  //     }
  //   };
  //
  //   this.setCollections(updatedCollections);
  //   this.setCollectionsOrder(updatedCollectionsOrder);
  // }
  //
  // setCollectionsOrder(collectionsOrder: string[]): void {
  //   this.storage.saveData('collectionsOrder', collectionsOrder);
  //   this.setState({ collectionsOrder });
  // }
  //
  // setConfigValue(fieldName: string, value: any) {
  //   const config = { ...this.state.config, [fieldName]: value };
  //   this.storage.saveData('config', config);
  //   this.setState({ config });
  // }
  //
  // setLayoutType(value: LayoutType) {
  //   this.setConfigValue("layoutType", value);
  // }



  const [ isSearchMode, setSearchMode ] = useState<boolean>(false);
  const [ isDataLoaded, setDataLoaded ] = useState<boolean>(false);
  const [ appConfig, setAppConfig ] = useState<Config>(defaultConfig); // TODO: Add Interface for config
  const [ data, setData ] = useState<AppData>({
    bookmarks: {},
    collections: {},
    collectionsOrder: [],
    filteredBookmarks: {},
  });

  const handleSearch = (bookmarks: Bookmarks, query?: string): void => {
    let filteredBookmarks = { ...bookmarks };

    if (query && query.length) {
      setSearchMode(true);
      filteredBookmarks = searchBookmarksByQuery(data.bookmarks, query);
    } else {
      setSearchMode(false);
    }

    setData({
      ...data,
      filteredBookmarks,
    });
  };

  const setConfigValue = (fieldName: string, value: any) => {
    const config = { ...setAppConfig, [fieldName]: value };
    storage.saveData('config', config);
    setAppConfig(config as Config);
  };

  const fetchAppData = async (): Promise<void> => {
    const {
      collections,
      bookmarks,
      collectionsOrder,
      config
    } = await storage.getDataObject([
      'bookmarks',
      'collections',
      'collectionsOrder',
      'config',
    ]);

    const appConfig = config || defaultConfig;

    setAppConfig({ ...appConfig, setConfigValue });
    setData({
      ...data,
      bookmarks: bookmarks || {},
      collections: collections || {},
      collectionsOrder: collectionsOrder || [],
    });
    setDataLoaded(true);
  };

  useEffect( (): void => {
    fetchAppData().then();
  }, []);

  console.log(isDataLoaded);
  return (
    isDataLoaded ?
      (
        <AppDataProvider data={data}>
          <ConfigContext.Provider value={appConfig}>
            <DndProvider backend={Backend}>
              <AppWrapper>
                <TopBar
                  onSetLayoutType={(layoutType) => setAppConfig({ ...appConfig, layoutType })}
                  onSearch={(query) => handleSearch(data.bookmarks, query)}
                  layoutType={appConfig.layoutType}
                />
                <DashboardWrapper>
                  <BookmarksContainer
                    layoutType={appConfig.layoutType}
                    isSearchMode={isSearchMode}
                  />
                {/*  <OpenTabsPanel/>*/}
                </DashboardWrapper>
              </AppWrapper>
            </DndProvider>
          </ConfigContext.Provider>
        </AppDataProvider>
          ) : <LoadingSpinner/>
  );
};

export default App;
