import React from 'react';
import styled from "styled-components";


const BookmarkCardImage = ({ url, iconUrl}: PropTypes) => {
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
  background-image: url("${(props: { iconUrl: string }) => props.iconUrl}");
  background-size: cover;
`;

export default BookmarkCardImage;
