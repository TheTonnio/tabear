import React from 'react';
import styled from "styled-components";

const IconButton = (props: PropTypes) => {
  const { action, color, icon, className, isEditing } = props;
  const defaultButtonColor = "#0075EB";
  const ButtonIcon = () => icon;

  return (
      <Button
        className={className}
        onClick={action}
        color={color || defaultButtonColor}
        isEditing={!!isEditing}
      >
        <ButtonIcon/>
      </Button>
  );
};

export default IconButton;

interface PropTypes {
  action: (...args: any) => any
  icon: JSX.Element
  color?: string
  className?: string
  isEditing?: boolean
}

const Button = styled.button`
  position: relative;
  background: ${(props: { color: string, isEditing: boolean }) => props.color};
  border: 0;
  margin-left: 5px;
  border-radius: 25px;
  height: 25px;
  width: 25px;
  color: #fff;
  font-size: 10px;
  cursor: pointer;
  transition: transform .3s;
  transform: scale(0);
  
  &:hover {
    transform: scale(1.5);
  }
`;
