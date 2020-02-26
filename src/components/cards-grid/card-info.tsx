import React from 'react';
import CardImage from "./card-image";
import styled from "styled-components";

const CardInfo = ({
  name,
  description,
  url,
  iconUrl,
  layoutType,
  isDragging,
  draggableItemId,
}: PropTypes) => {
  return (
    <Wrapper
  // @ts-ignore
      isOutlined={!!draggableItemId}
      isDragging={isDragging}
    >
      <Header>
        <CardImage url={url} iconUrl={iconUrl}/>
        <Title>{name}</Title>
      </Header>
      <Description>{description}</Description>
    </Wrapper>
  );
};

interface PropTypes {
  name: string
  description: string
  layoutType: string
  url?: string
  iconUrl?: string
  isDragging: boolean
  draggableItemId?: string | null
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border: 3px solid #e8f2fc;
  border-radius: 5px;
  transition: border-color .25s;
  opacity: ${(props: { isDragging: boolean }) => !props.isDragging ? 1 : .4};
  overflow: hidden;
  
  }
  &:hover {
    border-color: ${(props: any) => props.isOutlined ? "#e8f2fc" : "#0F93FE"}
  }
`;

const Header = styled.div`
  display: flex;
  height: 100%;
  padding: 0 12px;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  height: 2.2em;
  font-size: 14px;
  line-height: 1.1em;
  padding: 13px 0 13px 10px;
  overflow: hidden;
  box-sizing: content-box;
  color: #3c78bf;
`;

const Title = styled.p`
  display: flex;
  width: 100%;
  padding: 12px 0 0 15px;
  margin: 0;
  color: #000;
  font-weight: 600;
`;

export default CardInfo;
