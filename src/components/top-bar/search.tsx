import React from 'react';
import styled from "styled-components";
import {defaultAccent} from "../../constants";

const Search = React.forwardRef(({ isActive, onSearch }: PropTypes, ref) => {
  return (
    <SearchField
      // @ts-ignore
      ref={ref}
      onKeyUp={onSearch}
      isActive={isActive}
      type={"text"}
    />
  );
});

export default Search;

const SearchField = styled.input`
  border: 0;
  margin-right: -37px;
  margin-left: 10px;
  height: 30px;
  border-bottom: 2px solid ${defaultAccent};
  font-size: 16px;
  background: transparent;
  transition: width .4s;
  padding: 0;
  width: ${({ isActive }: { isActive: boolean }) => isActive ? 200 : 0}px;
`;

interface PropTypes {
  isActive: boolean
  onSearch: any
}
