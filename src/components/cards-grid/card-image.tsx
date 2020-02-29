import React from 'react';
import styled from "styled-components";


const CardImage = (props: PropTypes) => {
  const { url, iconUrl } = props;

  return (
    <ImageWrapper>
      <Image iconUrl={iconUrl || `${url}/favicon.ico`}/>
    </ImageWrapper>
  );
};

interface PropTypes {
  url?: string
  iconUrl?: string
}

const ImageWrapper = styled.div`
  display: flex;
  width: 30px;
  padding-top: 12px;
`;

const Image = styled.div`
  width: 30px;
  height: 30px;
  padding: 10px;
  background-image: url("${(props: { iconUrl: string }) => props.iconUrl}");
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

export default CardImage;
