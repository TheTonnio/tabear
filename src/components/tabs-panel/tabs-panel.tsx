import React, {useEffect, useMemo, useState} from 'react';
import TabsData from '../../mock/tabs-data';
import { TabsApi } from "../../utils/tabsApi";
import {ENV_DEVELOPMENT, REGEXP_INTERNAL_CHROME_PATH} from "../../constants";
import styled from "styled-components";
import TabsList from "./tabs-list";
type Tab = chrome.tabs.Tab;

const TabsPanel = (props: PropTypes) => {
  const [ tabs, setTabs ] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchTabs = async () => {
      const tabs = process.env.NODE_ENV === ENV_DEVELOPMENT ? TabsData : await TabsApi.getActiveList();
      setTabs(tabs);
    };

    fetchTabs();
  }, []);

  const filteredTabs = tabs.filter(tab => !!tab.url && !REGEXP_INTERNAL_CHROME_PATH.test(tab.url));

  return (
    <Panel>
      <TabsList tabs={filteredTabs}/>
    </Panel>
  );
};

interface PropTypes {

}

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  box-shadow: 2px 2px 40px -12px #999;
  border: 1px solid #f4f4f4;
  background: #fff;
`;

export default TabsPanel;
