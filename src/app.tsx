import React, { useEffect, useState } from 'react';
import AppDataProvider from "./components/app-data-provider";
import Backend from 'react-dnd-html5-backend'
import BookmarksContainer from './components/bookmarks-container';
import LoadingSpinner from "./components/loading-spinner";
import LocalStorage from './utils/localStorage';
import OpenTabsPanel from "./components/tabs-panel/tabs-panel";
import Storage from './utils/storage';
import TopBar from "./components/top-bar/top-bar";
import styled from 'styled-components'
import { AppConfig } from "./models/app-config";
import { AppData } from "./models/app-data";
import { Bookmarks } from "./models/bookmarks";
import { ConfigContext } from "./store/config-context";
import { DndProvider } from 'react-dnd'
import { ENV_DEVELOPMENT } from './constants';
import { defaultConfig } from "./constants/config";
import { searchBookmarksByQuery } from "./utils/search-bookmsrks-by-query";

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
  const [ isSearchMode, setSearchMode ] = useState<boolean>(false);
  const [ isDataLoaded, setDataLoaded ] = useState<boolean>(false);
  const [ appConfig, setAppConfig ] = useState<AppConfig>(defaultConfig); // TODO: Add Interface for config
  const [ data, setData ] = useState<AppData>({
    bookmarks: {},
    collections: {},
    collectionsOrder: [],
    filteredBookmarks: {},
  });

  const setConfigValue = (fieldName: string, value: any) => {
    const newConfig = { ...appConfig, [fieldName]: value };
    setAppConfig(newConfig as AppConfig);
    storage.saveData('config', newConfig);
  };

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

    setData({
      ...data,
      bookmarks: bookmarks || {},
      collections: collections || {},
      collectionsOrder: collectionsOrder || [],
    });

    setAppConfig({
      ...defaultConfig,
      ...config,
    });

    setDataLoaded(true);
  };

  useEffect( (): void => {
    fetchAppData().then();
  }, []);

  return (
    isDataLoaded ?
      (
        <AppDataProvider data={data}>
          <ConfigContext.Provider value={{ ...appConfig, setConfigValue }}>
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
                  <OpenTabsPanel
                    isPanelCollapsed={appConfig.isPanelCollapsed}
                    togglePanel={() => setConfigValue("isPanelCollapsed", !appConfig.isPanelCollapsed)}
                  />
                </DashboardWrapper>
              </AppWrapper>
            </DndProvider>
          </ConfigContext.Provider>
        </AppDataProvider>
      ) : <LoadingSpinner/>
  );
};

export default App;
