import React, {useRef, useState} from 'react';
import CardImage from "./card-image";
import styled from "styled-components";
import CardButtons from "./card-buttons";
import {defaultAccent} from "../../constants";

const CardInfo = (props: PropTypes) => {
  const {
    name,
    description,
    url,
    iconUrl,
    isDragging,
    draggingItemId,
    isEditing,
    onEdit,
    onRemove,
    onSave,
    onFinishEdit
  } = props;

  const titleInputRef = useRef<HTMLDivElement>(null);
  const descriptionInputRef = useRef<HTMLDivElement>(null);

  const [ cardName, setName ] = useState<string>(name);
  const [ cardDescription, setCardDescription ] = useState<string>(description);

  const handleNameChange = (e: any) => setName(e.currentTarget.value);
  const handleDescriptionChange = (e: any) => setCardDescription(e.currentTarget.value);

  const onCancel = () => {
    setName(name);
    setCardDescription(description);
    onFinishEdit();
  };

  const handleCardSave = () => {
    onSave({ name: cardName, description: cardDescription });
    onFinishEdit();
  };

  return (
    <Wrapper
      isDragging={isDragging}
      isActive={!!draggingItemId}
    >
      <CardButtons
        isEditing={isEditing}
        onEdit={onEdit}
        onRemove={onRemove}
        onCancel={onCancel}
        onSave={handleCardSave}
      />
      <Header>
        <CardImage url={url} iconUrl={iconUrl}/>
      </Header>
      <ContentWrapper
        // @ts-ignore
        isEditing={isEditing}
      >
        <Title
          type="text"
          value={cardName}
          readOnly={!isEditing}
          // @ts-ignore
          ref={titleInputRef}
          onChange={handleNameChange}
        />
        <Description
          type="text"
          value={cardDescription}
          readOnly={!isEditing}
          onChange={handleDescriptionChange}
          // @ts-ignore
          ref={descriptionInputRef}
        />
      </ContentWrapper>
    </Wrapper>
  );
};

interface PropTypes {
  name: string
  description: string
  url?: string
  iconUrl?: string
  isDragging: boolean
  isEditing: boolean
  draggingItemId?: string | null,
  onEdit: () => void
  onRemove: () => void
  onSave: (data: CardContent) => void
  onFinishEdit: () => void
}

interface WrapperPropTypes {
  isDragging: boolean
  isActive: boolean
}

interface CardContent {
  name: string
  description: string
}

const Wrapper = styled.div`
    padding: 0 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    border-radius: 10px;
    transition: opacity .3s;
    opacity: ${({ isDragging }: WrapperPropTypes) => !isDragging ? 1 : .4};
    overflow: hidden; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }
  
  &:hover .card-buttons > button {
    transform: scale(1);
    
    &:hover {
      transform: scale(1.15);
      opacity: .7;
    }
  }
`;

const Header = styled.div`
  display: flex;
  padding: 0;
`;

const Title = styled.input`
  width: 100%;
  margin: 0 0 0 -1px;
  padding: 0 0 4px 0;
  color: #1A1C1F;
  font-size: 17px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border: 0;
  cursor: inherit;
  background: transparent;
  user-select: none;
  
  &:not(:read-only) {
    cursor: auto;
    opacity: .7;
  }
`;

const Description = styled.input`
  width: 100%;
  font-size: 15px;
  line-height: 1.2em;
  padding: 5px 0 0;
  overflow: hidden;
  box-sizing: content-box;
  color: #8B959E;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  cursor: inherit;
  background: transparent;
  border: 0;
  user-select: none;
  
  &:not(:read-only) {
    cursor: auto;
    opacity: .7;
  }
`;

const ContentWrapper = styled.div`
  padding: 7px 10px;
  margin-top: auto;
  border-radius: 5px;
  margin-bottom: 5px;
  background: ${(props: any) => props.isEditing ? "#F4F7FB" : "transparent"};
`;

export default CardInfo;
