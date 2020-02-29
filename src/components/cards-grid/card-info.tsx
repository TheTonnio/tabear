import React from 'react';
import CardImage from "./card-image";
import styled from "styled-components";
import CardButtons from "./card-buttons";

const CardInfo = (props: PropTypes) => {
  const {
    name,
    description,
    url,
    iconUrl,
    isDragging,
    draggingItemId,
  } = props;

  return (
    <Wrapper
      isDragging={isDragging}
      isActive={!!draggingItemId}
    >
      <CardButtons/>
      <Header>
        <CardImage url={url} iconUrl={iconUrl}/>
      </Header>
      <Title>{name}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
};

interface PropTypes {
  name: string
  description: string
  url?: string
  iconUrl?: string
  isDragging: boolean
  draggingItemId?: string | null
}

interface WrapperPropTypes {
  isDragging: boolean
  isActive: boolean
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    border-radius: 10px;
    transition: opacity .3s;
    // opacity: ${({ isDragging }: WrapperPropTypes) => !isDragging ? 1 : .4};
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
  padding: 0 12px;
`;

const Title = styled.div`
  width: 100%;
  padding: 0 10px 0;
  margin: auto 0 0;
  color: #1A1C1F;
  font-size: 17px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Description = styled.div`
  font-size: 15px;
  line-height: 1.1em;
  padding: 5px 10px 13px;
  overflow: hidden;
  box-sizing: content-box;
  color: #8B959E;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default CardInfo;
