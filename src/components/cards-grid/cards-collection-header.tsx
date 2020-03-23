import React, {useRef, useState} from 'react';
import styled, {keyframes} from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import {defaultAccent, defaultRed, WRAPPER_MARGIN} from "../../constants";
import CardsCollectionButtons from "./cards-collection-buttons";
import ActionMenu from "../shared/action-menu";
import { ActionMenuConfig } from "../../models/action-menu-config";
import { CollectionEditableFields } from "../../models/collection-editable-fields";

const CardsCollectionHeader = (props: PropTypes) => {
  const { name, isCollectionCollapsed, toggleCollection, onSave, onRemove } = props;
  const [ isEditing, setEditingMode ] = useState(false);
  const [ isActionMenuShown, setActionMenuVisibility ] = useState(false);;

  const titleInputRef = useRef<HTMLDivElement>(null);

  const [ collectionName, setName ] = useState<string>(name);

  const showActionMenu = () => {
    if (!isActionMenuShown) {
      setActionMenuVisibility(true);
      document.addEventListener("click", () => setActionMenuVisibility(false), { once: true });
    }
  };

  const onFinishEdit = () => setEditingMode(false);
  const onEditButtonClick = () => !isEditing && setEditingMode(true);

  const handleNameChange = (e: any) => setName(e.currentTarget.value);

  const onCancel = () => {
    setName(name);
    onFinishEdit();
  };

  const handleSave = () => {
    onSave({ name: collectionName });
    onFinishEdit();
  };

  const actionMenuConfig: ActionMenuConfig = [
    {
      action: () => console.log("Add"),
      text: "Add",
      icon: <FontAwesomeIcon icon={faPlus}/>
    }, {
      action: () => onEditButtonClick(),
      text: "Rename",
      icon: <FontAwesomeIcon icon={faPen}/>
    }, {
      action: () => onRemove(),
      text: "Remove",
      icon: <FontAwesomeIcon icon={faTrash}/>,
      iconColor: defaultRed
    },
  ];

  return (
    <Header>
      {
        isEditing ? (
          <InputWrapper>
            <TitleInput
              type={"text"}
              value={collectionName}
              onChange={handleNameChange}
              // @ts-ignore
              ref={titleInputRef}
            />
          </InputWrapper>
        ) : (
          <Title>{name}</Title>
        )
      }

      <CardsCollectionButtons
        isEditing={isEditing}
        isCollectionCollapsed={isCollectionCollapsed}
        onSave={ () => handleSave() }
        onCancel={ () => onCancel() }
        onActionMenuButtonClick={() => showActionMenu()}
        onCollapseButtonClick={() => toggleCollection()}
      />

      <ActionMenu
        config={actionMenuConfig}
        isActionMenuShown={isActionMenuShown}
      />
    </Header>
  );
};

interface PropTypes {
  name: string
  isCollectionCollapsed: boolean
  toggleCollection: () => void
  onSave: (data: CollectionEditableFields) => void
  onRemove: () => void
}


const zoomIn = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;


const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px ${WRAPPER_MARGIN}px 0;
  margin: 0 auto 0;
  white-space: nowrap;

  .collection-header-buttons > .editing {
    margin-left: 7px;
    transform: scale(1);
    animation-name: ${zoomIn};
    animation-duration: .3s;
    
    &:hover {
      transform: scale(1.15);
    }
  }
`;

const increaseWidth = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`;



const InputWrapper = styled.div`
  position: relative;
  max-width: 230px;
  width: 40%;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${defaultAccent};
    animation-name: ${increaseWidth};
    animation-duration: .4s;
    animation-fill-mode: forwards;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  padding-right: 10px;
  padding-left: 0;
  font-size: 18px;
  font-weight: 800;
  color: ${defaultAccent};
  border: 0;
  font-family: 'Muli', sans-serif;
`;

const Title = styled.span`
  position: relative;
  padding-right: 10px;
  font-size: 18px;
  font-weight: bold;
  color: ${defaultAccent};
`;

export default CardsCollectionHeader;
