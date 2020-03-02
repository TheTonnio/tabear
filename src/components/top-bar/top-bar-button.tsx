import React from 'react';
import styled from "styled-components";

const TopBarButton = ({ icon, action }: PropTypes) => {
  return (
    <Button onClick={action}>
      { icon }
    </Button>
  );
};

interface PropTypes {
  action: () => any
  icon: any
}

const Button = styled.button`
  width: 35px;
  height: 35px;
  font-size: 16px;
  margin-left: 12px;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: opacity .3s;
  color: #0075EB;
  
  &:hover {
    opacity: .7;
  }
`;


export default TopBarButton;
