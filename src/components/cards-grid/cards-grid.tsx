import React, {useContext} from 'react';
import { CARD_WIDTH, CONTAINER_MARGIN, LIST_GAP, WRAPPER_MARGIN } from "../../constants";
import {ConfigContext} from '../../store/config-context';
import styled from "styled-components";
import {NoDataFound} from "../no-data-found";

const CardsGrid = (props: PropTypes) => {
  const {
    children,
    width,
  } = props;

  const { isPanelCollapsed, maxItemsPerRow, setConfigValue } = useContext(ConfigContext);
  const panelWidth = isPanelCollapsed ? 20 : 300;
  const girdMaxItemsPerRow = Math.ceil((width - panelWidth + LIST_GAP - (WRAPPER_MARGIN * 2) - (CONTAINER_MARGIN * 2)) / (CARD_WIDTH + LIST_GAP)) - 1;

  if (girdMaxItemsPerRow !== maxItemsPerRow) {
    setConfigValue("maxItemsPerRow", girdMaxItemsPerRow);
  }

  return (
    <Grid className={isPanelCollapsed ? "" : "grid-narrow"}>
      {
        children && children.length
          ? children
          : <NoDataFound/>
      }
    </Grid>
  );
};

export default CardsGrid;

const Grid = styled.div`
  width: 100%;
  padding-right: 30px;
  transition: .3s padding-right;
  
  &.grid-narrow {
    padding-right: 300px;
  }
`;

type PropTypes = {
  children?: any[]
  width: number
}
