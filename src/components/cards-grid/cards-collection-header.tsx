import React, {useRef, useState} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import {defaultRed, WRAPPER_MARGIN} from "../../constants";
import CardsCollectionButtons from "./cards-collection-buttons";
import ActionMenu from "../shared/action-menu";
import { ActionMenuConfig } from "../../models/action-menu-config";
import { CollectionEditableFields } from "../../models/collection-editable-fields";

const CardsCollectionHeader = (props: PropTypes) => {
  const { name, description, isCollectionCollapsed, toggleCollection, onSave, onRemove } = props;
  const [ isEditing, setEditingMode ] = useState(false);
  const [ isActionMenuShown, setActionMenuVisibility ] = useState(false);;

  const titleInputRef = useRef<HTMLDivElement>(null);
  const descriptionInputRef = useRef<HTMLDivElement>(null);

  const [ collectionName, setName ] = useState<string>(name);
  const [ collectionDescription, setCardDescription ] = useState<string>(description);

  const showActionMenu = () => {
    setActionMenuVisibility(true);
    document.addEventListener("click", () => setActionMenuVisibility(false), { once: true });
  };

  const onFinishEdit = () => setEditingMode(false);

  const handleNameChange = (e: any) => setName(e.currentTarget.value);
  const handleDescriptionChange = (e: any) => setCardDescription(e.currentTarget.value);

  const onCancel = () => {
    setName(name);
    setCardDescription(description);
    onFinishEdit();
  };

  const handleSave = () => {
    onSave({ name: collectionName, description: collectionDescription });
    onFinishEdit();
  };

  const actionMenuConfig: ActionMenuConfig = [
    {
      action: () => console.log("Add"),
      text: "Add",
      icon: <FontAwesomeIcon icon={faPlus}/>
    }, {
      action: () => setEditingMode(true),
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
          <>
            <TitleInput
              type={"text"}
              value={collectionName}
              onChange={handleNameChange}
              // @ts-ignore
              ref={titleInputRef}
            />
            <Separator/>
            <DescriptionInput
              type={"text"}
              value={collectionDescription}
              onChange={handleDescriptionChange}
              // @ts-ignore
              ref={descriptionInputRef}
            />
          </>
        ) : (
          <>
            <Title>{name}</Title>
            <Description>{description}</Description>
          </>
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
  description: string
  isCollectionCollapsed: boolean
  toggleCollection: () => void
  onSave: (data: CollectionEditableFields) => void
  onRemove: () => void
}

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px ${WRAPPER_MARGIN}px 0;
  margin: 0 auto 0;
  white-space: nowrap;
`;



const TitleInput = styled.input`
  position: relative;
  width: 25%;
  padding-right: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #0075EB;
  border: 1px solid #0075EB;
  background: #F4F7FB;
  border-radius: 3px;
  padding-left: 10px;
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

const Separator = styled.div`
  position: relative;
  background: #0075EB;
  width: 2px;
  margin-left: 10px;
  border-radius: 2px;
  height: 21px;
  display: inline-block;
`;

const DescriptionInput = styled.input`
  width: 45%;
  margin-top: 1px;
  color: #1A1C1F;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid #0075EB;
  background: #F4F7FB;
  border-radius: 3px;
  padding: 2.5px 0 2.5px 10px;
  margin-left: 10px;
`;

const Description = styled.span`
  margin-top: 1px;
  padding-left: 7px;
  color: #1A1C1F;
  font-weight: 500;
  font-size: 16px;
`;

export default CardsCollectionHeader;
