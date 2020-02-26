import React from 'react';
import {LIST_GAP, MIN_CARD_WIDTH} from "../../constants";

const CardsGrid = (props: any) => {
  const {
    children,
    width,
  } = props;

  const itemsPerRow = Math.ceil((width - LIST_GAP) / (MIN_CARD_WIDTH + LIST_GAP));
  return (
    <div>
      {
        children
      }
    </div>
  );
};

export default CardsGrid;
