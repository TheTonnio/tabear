import React from 'react';
import { ButtonStyle } from "../models/button-style";
import styled from "styled-components";
import {DEFAULT_BUTTON_STYLE, defaultAccent, defaultRed} from "../constants";

const RectangleButton = (props: PropTypes) => {
  const { text, onClick, style = DEFAULT_BUTTON_STYLE } = props;

  return (
    <Button
      onClick={onClick}
      className={style}
    >
      {text}
    </Button>
  );
};

const Button = styled.button`
  background: ${defaultAccent};
  border: 0;
  border-radius: 20px;
  margin: 0 12px;
  color: #fff;
  padding: 7px 25px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  min-width: 85px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  transition: opacity .3s, transform .3s;
  transform: scale(1);
  
  &.error {
    background: ${defaultRed};
  }
  
  &:hover {
    opacity: .7;
    transform: scale(1.05);
  }
`;

interface PropTypes {
  text: string
  onClick: (...args: any) => any
  style?: ButtonStyle
}

export default RectangleButton;
