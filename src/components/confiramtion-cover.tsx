import React from 'react';
import styled from "styled-components";
import RectangleButton from "./rectangle-button";
import {defaultAccent} from "../constants";

const ConfirmationCover = (props: PropTypes) => {
  const {
    text,
    isHidden,
    onConfirm,
    onCancel,
    confirmButtonText,
    cancelButtonText,
  } = props;

  return (
    <Wrapper className={isHidden ? "hidden" : ""}>
      <ContentWrapper>
        <Text>{text}</Text>
        <Buttons>
          {
            onConfirm && confirmButtonText
              ? <RectangleButton text={confirmButtonText} onClick={onConfirm}/>
              : null
          }
          {
            onCancel && cancelButtonText
              ? <RectangleButton text={cancelButtonText} onClick={onCancel} style="error"/>
              : null
          }
        </Buttons>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: rgba(255, 255, 255, .85);
  visibility: visible;
  opacity: 1;
  transition: opacity .5s, visibility .5s;
    
  &.hidden {
    visibility: hidden;
    opacity: 0;
  }
`;

const ContentWrapper = styled.div`
  width: 80%;
  text-align: center;
`;

const Text = styled.p`
  color: ${defaultAccent};
  font-size: 18px;
  font-weight: bold;
`;

const Buttons = styled.div`
  margin-top: 25px;
`;

const Button = styled.button`
`;

const ConfirmButton = styled(Button)`
`;

const CancelButton = styled(Button)`
`;

interface PropTypes {
  text: string
  isHidden: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm?: (...args: any) => any
  onCancel?: (...args: any) => any
}

export default ConfirmationCover;
