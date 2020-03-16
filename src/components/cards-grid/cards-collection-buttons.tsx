import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleDown, faCheck, faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../shared/icon-button";
import {defaultRed} from "../../constants";

const CardsCollectionButtons = (props: PropTypes) => {
  const {
    isEditing,
    isCollectionCollapsed,
    onSave,
    onCancel,
    onActionMenuButtonClick,
    onCollapseButtonClick,
  } = props;

  return (
    <ButtonsGroup>
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

      <CollapseButton
        onClick={onCollapseButtonClick}
        isCollectionCollapsed={isCollectionCollapsed}
      >
        <FontAwesomeIcon
          icon={faAngleDown}
        />
      </CollapseButton>
      <ActionMenuButton
        onClick={onActionMenuButtonClick}
      >
        <FontAwesomeIcon icon={faEllipsisV}/>
      </ActionMenuButton>
    </ButtonsGroup>
  );
};

export default CardsCollectionButtons;

interface PropTypes {
  isEditing: boolean
  isCollectionCollapsed: boolean
  onSave: () => void
  onCancel: () => void
  onActionMenuButtonClick: () => void
  onCollapseButtonClick: () => void
}

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center; 
  margin-left: auto;
`;

const ButtonsWrapper = styled.div`
  position: relative;
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

const HeaderButton = styled.button`
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: transform .3s, opacity .3s;
  color: #0075EB;
  background: transparent;
`;

const ActionMenuButton = styled(HeaderButton)`
  font-size: 17px;
`;

const CollapseButton = styled(HeaderButton)`
  margin-right: 3px;
  font-size: 25px;
  transform: ${({ isCollectionCollapsed }: { isCollectionCollapsed: boolean }) => `rotate(${isCollectionCollapsed ? 180 : 0}deg)`};

  &:hover {
    opacity: .7;
  }
`;
