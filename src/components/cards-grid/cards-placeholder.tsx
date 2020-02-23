import React from 'react';
import styled from "styled-components";

const CardsPlaceholder = () => {
  return (
    <Placeholder>
      <PlaceholderText>
        Drug tab or Click here to add new
      </PlaceholderText>
    </Placeholder>
  );
};

const Placeholder = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceholderText = styled.div`
  width: 100%;
  padding: 50px 0;
  border: 3px dashed #e8f2fc;
  border-radius: 10px;
  text-align: center;
  font-weight: 700;
  color: #6784A3;
  cursor: pointer;
`;

export default CardsPlaceholder;
