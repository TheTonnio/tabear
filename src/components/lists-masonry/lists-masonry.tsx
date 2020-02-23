import React from 'react';
import styled from "styled-components";
import {LIST_GAP, MIN_CARD_WIDTH} from "../../constants";

const ListsMasonry = ({ children, width }: any) => {
  const columns = Math.ceil((width - LIST_GAP) / (MIN_CARD_WIDTH + LIST_GAP));
  const colsNumber = columns > 1 ? columns - 1 : 1;
  const gap = LIST_GAP;

  const layout = getMasonryLayout(children, colsNumber, gap);
  return (
    <Wrapper>
      {layout}
    </Wrapper>
  );
};

const getMasonryLayout = (children: Element[] = [], colsNumber: number = 0, gap: number = 0) => {
  const columns: Array<ChildrenNodes> = Array.from(new Array(colsNumber), _ => []);

  children.forEach((child: Element, index: number) => {
    const columnIndex = index % colsNumber;
    columns[columnIndex].push(
      <Column gap={gap} key={index}>
        {child}
      </Column>
    );
  });


  return columns.map((col: ChildrenNodes, index: number) => (
    <ColumnWrapper gap={index ? gap : 0} key={index}>
      {columns[index]}
    </ColumnWrapper>
  ));
};

const Wrapper = styled.div`
  display: flex
`;

const ColumnWrapper = styled.div`
  margin-left: ${(props: { gap: number}) => props.gap}px;
  flex: 1;
`;

const Column = styled.div`
  margin-bottom: ${(props: { gap: number}) => props.gap}px;
`;

type ChildrenNodes = Array<JSX.Element>;

type PropTypes = {
  columns: number
  gap: number
  children: any
}

export default ListsMasonry;
