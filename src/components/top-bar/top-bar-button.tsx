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
  width: 30px;
  height: 30px;
  margin-left: 12px;
  background: #fff;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 0 3px rgba(0,0,0,.2);
  transition: transform .3s,opacity .3s;
  color: #3c78bf;
`;


export default TopBarButton;
