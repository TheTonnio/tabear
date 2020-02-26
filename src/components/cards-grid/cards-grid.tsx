import React from 'react';
import {CARD_WIDTH, CONTAINER_MARGIN, LIST_GAP, WRAPPER_MARGIN} from "../../constants";

const CardsGrid = (props: any) => {
  const {
    children,
    width,
  } = props;

  const itemsPerRow = Math.ceil((width + LIST_GAP - (WRAPPER_MARGIN * 2) - (CONTAINER_MARGIN * 2)) / (CARD_WIDTH + LIST_GAP)) - 1;

  return (
    <div>
      {
        children
      }
    </div>
  );
};

export default CardsGrid;
