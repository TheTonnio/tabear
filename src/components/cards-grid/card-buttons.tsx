import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const CardButtons = () => {
  return (
    <ButtonsWrapper className={"card-buttons"}>
      <Button>
        <EditIcon icon={faPen}/>
      </Button>
      <Button>
        <RemoveIcon icon={faTimes}/>
      </Button>
    </ButtonsWrapper>
  );
};

export default CardButtons;

const ButtonsWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const EditIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  font-size: 10px;
`;

const RemoveIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: -1px;
  left: .5px;
  right: 0;
  bottom: 0;
  margin: auto;
  font-size: 12px;
`;

const Button = styled.button`
  position: relative;
  background: #0075EB;
  border: 0;
  margin-left: 5px;
  border-radius: 18px;
  height: 20px;
  width: 20px;
  color: #fff;
  font-size: 10px;
  cursor: pointer;
  transition: transform .3s;
  transform: scale(0);
  
  &:hover {
    transform: scale(1.5);
  }
`;
