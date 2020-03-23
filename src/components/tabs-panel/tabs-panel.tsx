import React, {useContext, useEffect, useMemo, useState} from 'react';
import TabsData from '../../mock/tabs-data';
import { TabsApi } from "../../utils/tabsApi";
import {defaultAccent, ENV_DEVELOPMENT, REGEXP_INTERNAL_CHROME_PATH} from "../../constants";
import styled from "styled-components";
import TabsList from "./tabs-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {ConfigContext} from "../../store/config-context";
type Tab = chrome.tabs.Tab;

const TabsPanel = (props: PropTypes) => {
  const [ tabs, setTabs ] = useState<Tab[]>([]);
  const { setConfigValue, isPanelCollapsed } = useContext(ConfigContext);

  useEffect(() => {
    const fetchTabs = async () => {
      const tabs = process.env.NODE_ENV === ENV_DEVELOPMENT ? TabsData : await TabsApi.getActiveList();
      setTabs(tabs);
    };

    fetchTabs();
  }, []);

  const filteredTabs = useMemo(() =>
    tabs.filter(tab => !!tab.url && !REGEXP_INTERNAL_CHROME_PATH.test(tab.url)), [tabs]);

  return (
    <Panel
      className={isPanelCollapsed ? "collapsed" : ""}
    >
      <InnerWrapper>
        <TabsList tabs={filteredTabs}/>
      </InnerWrapper>

      <TogglePanelButton
        className="toggle-panel-button"
        onClick={() => setConfigValue("isPanelCollapsed", !isPanelCollapsed)}
      >
         <Icon
           className="toggle-panel-button-icon"
           icon={faAngleRight}
         />
      </TogglePanelButton>
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border: 1px solid #f4f4f4;
  background: #fff;
  transition: .3s width;
  //overflow: auto;
  //z-index: -1;
  
  &:hover .toggle-panel-button {
    transform: scale(1);
    visibility: visible;
  }
  
  &.collapsed {
    width: 20px;
    
    .toggle-panel-button {
      transform: scale(1);
      visibility: visible;
        
        .toggle-panel-button-icon {
          transform: rotate(180deg);
        }
    }
  }
`;

const InnerWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

const TogglePanelButton = styled.button`
    margin: auto 0;
    position: absolute;
    top: 0; 
    bottom: 0;
    left: -14px; 
    border: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    background: ${defaultAccent};
    border-radius: 25px;
    width: 25px;
    height: 25px;
    z-index: 20;
    cursor: pointer;
    color: #fff;
    font-size: 19px;
    transform: scale(0);
    visibility: hidden;
    transition: .3s visibility, .3s transform;
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0; 
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`;

export default TabsPanel;
