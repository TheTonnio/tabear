import React from 'react';
import { CARD_WIDTH, CONTAINER_MARGIN, LIST_GAP, WRAPPER_MARGIN } from "../../constants";
import { LayoutConfigContext } from '../../store/layout-config-context';
import styled from "styled-components";

const CardsGrid = (props: PropTypes) => {
  const {
    children,
    width,
  } = props;

  const maxItemsPerRow = Math.ceil((width + LIST_GAP - (WRAPPER_MARGIN * 2) - (CONTAINER_MARGIN * 2)) / (CARD_WIDTH + LIST_GAP)) - 1;
  const layoutConfig = { maxItemsPerRow };

  return (
    <Grid>
      <LayoutConfigContext.Provider value={layoutConfig}>
        {
          children
        }
      </LayoutConfigContext.Provider>
    </Grid>
  );
};

export default CardsGrid;

const Grid = styled.div`
  width: 100%;
  padding-right: 300px;
`;

type PropTypes = {
  children: JSX.Element[]

  width: number
}
