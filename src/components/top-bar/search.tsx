import React from 'react';
import styled from "styled-components";

const Search = () => {
  return (
    <SearchField type={"text"} />
  );
};

export default Search;

const SearchField = styled.input`
  border: 0;
  margin-right: auto;
  margin-left: 10px;
  height: 30px;
  width: 200px;
  border-bottom: 2px solid #8B959E;
  font-size: 16px;
  background: transparent;
  //box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;
