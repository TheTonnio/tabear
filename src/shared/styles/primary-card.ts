import styled from "styled-components";

export const PrimaryCard = styled.div`
  background: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
  cursor: grab;
`;

export const PrimaryCardAnimated = styled(PrimaryCard)`
  transition: transform .3s, opacity .3s;
  
  &:hover {
    transform: scale(1.04);
    opacity: 1;
  }
  
  &:active {
    transform: scale(1.1);
  }
`;
