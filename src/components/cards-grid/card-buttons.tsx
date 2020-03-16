import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../shared/icon-button";
import {defaultRed} from "../../constants";

const CardButtons = (props: PropTypes) => {
  const { isEditing, onEdit, onRemove, onSave, onCancel } = props;

  return (
      <>
        { isEditing
          ? (
            <ButtonsWrapper className={"card-buttons"}>
              <IconButton
                className={"editing"}
                action={onSave}
                icon={<CardButtonIcon icon={faCheck}/>}
                isEditing={isEditing}
              />
              <IconButton
                className={"card-button-editing"}
                action={onCancel}
                color={defaultRed}
                icon={<LargeIcon icon={faTimes}/>}
                isEditing={isEditing}
              />
            </ButtonsWrapper>
          ) : (
            <ButtonsWrapper className={"card-buttons"}>
              <IconButton
                action={onEdit}
                icon={<CardButtonIcon icon={faPen}/>}
              />
              <IconButton
                action={onRemove}
                color={defaultRed}
                icon={<LargeIcon icon={faTrash}/>}
              />
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

const LargeIcon = styled(CardButtonIcon)`
  top: -1px;
  font-size: 12px;
`;
