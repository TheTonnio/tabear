import React from 'react';
import { CARD_WIDTH, CONTAINER_MARGIN, LIST_GAP, WRAPPER_MARGIN } from "../../constants";
import { LayoutConfigContext } from '../../store/layout-config-context';

const CardsGrid = (props: PropTypes) => {
  const {
    children,
    width,
  } = props;

  const maxItemsPerRow = Math.ceil((width + LIST_GAP - (WRAPPER_MARGIN * 2) - (CONTAINER_MARGIN * 2)) / (CARD_WIDTH + LIST_GAP)) - 1;
  const layoutConfig = { maxItemsPerRow };

  return (
    <LayoutConfigContext.Provider value={layoutConfig}>
      {
        children
      }
    </LayoutConfigContext.Provider>
  );
};

export default CardsGrid;

type PropTypes = {
  children: JSX.Element[]

  width: number
}
