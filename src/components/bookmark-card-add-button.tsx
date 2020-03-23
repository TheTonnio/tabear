import styled from "styled-components";
import { PrimaryCardAnimated } from "../shared/styles/primary-card";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {defaultAccent} from "../constants";

const BookmarkCardAddButton = ({ onAddClick }: PropTypes) => {
  return (
    <Button
      as="button"
      type="button"
      onClick={() => onAddClick()}
    >
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  );
};

interface PropTypes {
  onAddClick: () => void
}

const Button = styled(PrimaryCardAnimated)`
  background-color: #F3F2F8;
  font-size: 30px;
  color: ${defaultAccent};
  border: 0;
  opacity: .75;
`;

export default BookmarkCardAddButton;
