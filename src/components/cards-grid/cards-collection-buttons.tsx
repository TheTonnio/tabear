import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../shared/icon-button";
import {defaultRed} from "../../constants";

const CardsCollectionButtons = (props: PropTypes) => {
  const { isEditing, onSave, onCancel } = props;

  return (
    <>
      { isEditing
        ? (
          <ButtonsWrapper className={"collection-header-buttons"}>
            <IconButton
              className={"editing"}
              action={onSave}
              icon={<CardButtonIcon icon={faCheck}/>}
              isEditing={isEditing}
            />
            <IconButton
              className={"editing"}
              action={onCancel}
              color={defaultRed}
              icon={<LargeIcon icon={faTimes}/>}
              isEditing={isEditing}
            />
          </ButtonsWrapper>
        ) : null
      }
    </>
  );
};

export default CardsCollectionButtons;

interface PropTypes {
  isEditing: boolean
  onSave: () => void
  onCancel: () => void
}

const ButtonsWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 5px;
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
