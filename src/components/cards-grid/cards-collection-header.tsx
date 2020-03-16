import React, {useState} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faEllipsisV, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {defaultRed, WRAPPER_MARGIN} from "../../constants";
import CardsCollectionButtons from "./cards-collection-buttons";
import ActionMenu from "../shared/action-menu";
import {ActionMenuConfig} from "../../models/action-menu-config";

const CardsCollectionHeader = (props: PropTypes) => {
  const { name, description, isCollectionCollapsed, toggleCollection } = props;
  const [ isEditing, setEditingMode ] = useState(false);
  const [ isActionMenuShown, setActionMenuVisibility ] = useState(false);
  const actionMenuConfig: ActionMenuConfig = [
    {
      action: () => setEditingMode(true),
      text: "Rename",
      icon: <FontAwesomeIcon icon={faPen}/>
    }, {
      action: () => console.log("Remove"),
      text: "Remove",
      icon: <FontAwesomeIcon icon={faTrash}/>,
      iconColor: defaultRed
    },
  ];

  return (
    <Header>
      <Title>{name}</Title>
      <Description>{description}</Description>
      <CardsCollectionButtons
        isEditing={isEditing}
        onSave={ () => {} }
        onCancel={ () => {} }
      />
      <CollapseButton
        onClick={toggleCollection}
        isCollectionCollapsed={isCollectionCollapsed}
      >
        <FontAwesomeIcon
          icon={faAngleDown}
        />
      </CollapseButton>
      <ActionMenuButton
        onClick={() => setActionMenuVisibility(!isActionMenuShown)}
      >
        <FontAwesomeIcon icon={faEllipsisV}/>
      </ActionMenuButton>

      <ActionMenu
        config={actionMenuConfig}
        isActionMenuShown={isActionMenuShown}
      />
    </Header>
  );
};

interface PropTypes {
  name: string
  description: string
  isCollectionCollapsed: boolean
  toggleCollection: () => void
}

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px ${WRAPPER_MARGIN}px 0;
  margin: 0 auto 0;
`;

const Title = styled.span`
  position: relative;
  padding-right: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #0075EB;
  
  &::after {
  content: '';
    position: absolute;
    top: 0;
    right: 0;
    background: #0075EB;
    width: 2px;
    border-radius: 2px;
    height: 100%;
  }
`;

const Description = styled.span`
  margin-top: 1px;
  padding-left: 7px;
  color: #1A1C1F;
  font-weight: 500;
  font-size: 16px;
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
  margin-left: auto;
  font-size: 25px;
  transform: ${({ isCollectionCollapsed }: { isCollectionCollapsed: boolean }) => `rotate(${isCollectionCollapsed ? 180 : 0}deg)`};

  &:hover {
    opacity: .7;
  }
`;

export default CardsCollectionHeader;
