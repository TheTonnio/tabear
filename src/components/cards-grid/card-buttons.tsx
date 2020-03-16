import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CardButtons = (props: PropTypes) => {
  const { isEditing, onEdit, onRemove, onSave, onCancel } = props;

  return (
      <>
        { isEditing
          ? (
            <ButtonsWrapper className={"card-buttons"}>
              <Button
                className={"card-button-editing"}
                onClick={onSave}
              >
                <CardButtonIcon icon={faCheck}/>
              </Button>
              <Button
                className={"card-button-editing"}
                onClick={onCancel}
                color={"#FF491F"}
              >
                <RemoveIcon icon={faTimes}/>
              </Button>
            </ButtonsWrapper>
          ) : (
            <ButtonsWrapper className={"card-buttons"}>
              <Button onClick={onEdit}>
                <CardButtonIcon icon={faPen}/>
              </Button>
              <Button
                onClick={onRemove}
                color={"#FF491F"}
              >
                <RemoveIcon icon={faTrash}/>
              </Button>
            </ButtonsWrapper>
          )
        }
      </>
  );
};

export default CardButtons;

interface PropTypes {
  isEditing: boolean
  onEdit: () => void
  onRemove: () => void
  onSave: () => void
  onCancel: () => void
}

const ButtonsWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CardButtonIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  font-size: 10px;
`;

const RemoveIcon = styled(CardButtonIcon)`
  top: -1px;
  font-size: 12px;
`;

const Button = styled.button`
  position: relative;
  background: ${(props: { color?: string }) => props.color || "#0075EB"};
  border: 0;
  margin-left: 5px;
  border-radius: 18px;
  height: 24px;
  width: 24px;
  color: #fff;
  font-size: 10px;
  cursor: pointer;
  transition: transform .3s;
  transform: scale(0);
  
  &.card-button-editing {
    transform: scale(1);
  }
  
  &:hover {
    transform: scale(1.5);
  }
`;
